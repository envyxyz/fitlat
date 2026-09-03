"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { MenuToggle } from "./menu-toggle";
import { NAV_ITEMS, FOOTER_CONTACT } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Mirrors --duration-shock (350ms) — the panel's own slide duration. Text
// waits this long after the panel starts opening before it appears, and the
// panel waits the text's own close duration before it starts sliding away —
// so the two never move at the same time in either direction.
const PANEL_DURATION = 350;
const TEXT_STAGGER = 50;
const TEXT_CLOSE_DURATION = 180;

/**
 * Full-screen mobile nav. Built on Base UI's `Dialog` for focus trap, scroll
 * lock, Escape/outside-press dismissal, and `inert` background — the
 * `transitionStatus` state it exposes (`data-open`/`data-closed`/
 * `data-starting-style`/`data-ending-style`) is what lets the panel and its
 * text animate on the way out, not just in, without an unmount race.
 *
 * Everything here runs on the "shock" animation (`--motion-ease-shock`,
 * `--duration-shock`) rather than the site's default ease/duration pair —
 * a deliberate, documented exception (see design-system.md "Motion").
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="relative flex size-11 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        aria-label="Open menu"
      >
        <MenuToggle open={false} />
      </Dialog.Trigger>
      <Dialog.Portal keepMounted>
        <Dialog.Popup
          style={{
            // Opening: panel moves immediately. Closing: it waits for the
            // text to finish retracting first (see MenuLine) so the two
            // never move at once.
            transitionDelay: open ? "0ms" : `${TEXT_CLOSE_DURATION}ms`,
          }}
          className={cn(
            "fixed inset-0 z-[90] flex h-dvh w-full flex-col bg-canvas",
            "translate-y-full transition-transform duration-[var(--duration-shock)] ease-[var(--motion-ease-shock)]",
            "data-[open]:translate-y-0",
            // Forces the pre-transition frame on enter: data-open and
            // data-starting-style both land on the same paint that removes
            // `hidden`, so without this compound (higher-specificity)
            // override the panel would render already-open with nothing to
            // transition from.
            "data-[starting-style]:data-[open]:translate-y-full",
            "motion-reduce:transition-none"
          )}
        >
          <div className="flex h-16 items-center justify-between px-space-body-lg">
            <Dialog.Close
              className="relative flex size-11 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              aria-label="Close menu"
            >
              <MenuToggle open />
            </Dialog.Close>
            <a
              href="#membership"
              className="flex size-11 items-center justify-center rounded-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              aria-label="Join Fitlat"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={22} strokeWidth={2} />
            </a>
          </div>

          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <nav className="flex flex-1 flex-col justify-center gap-xs px-space-body-lg">
            {NAV_ITEMS.map((item, index) => (
              <MenuLine key={item.href} index={index}>
                <Dialog.Close
                  nativeButton={false}
                  render={
                    <a href={item.href} className="text-display text-ink transition-colors duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:text-primary" />
                  }
                >
                  {item.label}
                </Dialog.Close>
              </MenuLine>
            ))}
          </nav>

          <div className="flex flex-col gap-xxs border-t border-hairline px-space-body-lg py-space-h4 text-body text-ink-muted">
            <MenuLine index={NAV_ITEMS.length}>{FOOTER_CONTACT.hours}</MenuLine>
            <MenuLine index={NAV_ITEMS.length + 1}>{FOOTER_CONTACT.phone}</MenuLine>
            <MenuLine index={NAV_ITEMS.length + 2}>
              <span className="flex gap-sm">
                {FOOTER_CONTACT.socials.map((social) => (
                  <span key={social.label}>{social.handle}</span>
                ))}
              </span>
            </MenuLine>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * LineMaskSplit-style reveal: `overflow-hidden` wrapper clips an inner
 * element that slides from `translateY(100%)` → `0`. No opacity — the mask
 * alone creates the reveal/retract, so text appears to rise from (and
 * retract into) its own baseline.
 *
 * All timing is driven by Base UI's `data-open` / `data-ending-style`
 * attributes via CSS, never by the React `open` state prop. This avoids
 * the frame-gap race between React state and DOM attribute updates that
 * previously caused a visible jitter on close.
 *
 * Entry: each line waits `PANEL_DURATION + index * TEXT_STAGGER` ms via
 * the `--stagger` custom property, then rises over `PANEL_DURATION` ms.
 * Exit: all lines retract simultaneously (delay 0) over a quicker
 * `TEXT_CLOSE_DURATION` ms — the panel itself holds back until this
 * finishes (see `Dialog.Popup` transitionDelay above).
 */
function MenuLine({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div className="relative h-fit overflow-hidden">
      <div
        className={cn(
          // Resting state: fully below the clip mask
          "translate-y-full",
          // Transition setup: transform only, shock easing
          "transition-transform ease-[var(--motion-ease-shock)]",
          // Default (closed) duration — used for the exit animation
          `duration-[${TEXT_CLOSE_DURATION}ms]`,
          // Entry: once panel is open and starting-style has cleared,
          // slide up into view with the longer entry duration + stagger
          "[[data-open]:not([data-starting-style])_&]:translate-y-0",
          `[[data-open]:not([data-starting-style])_&]:duration-[${PANEL_DURATION}ms]`,
          "[[data-open]:not([data-starting-style])_&]:delay-[var(--stagger)]",
          // Exit: data-ending-style fires on close — slide back down,
          // no delay, using the default (shorter) duration already set
          "[[data-ending-style]_&]:translate-y-full",
          "[[data-ending-style]_&]:delay-0",
          // a11y
          "motion-reduce:transition-none motion-reduce:!translate-y-0"
        )}
        style={{ "--stagger": `${PANEL_DURATION + index * TEXT_STAGGER}ms` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
