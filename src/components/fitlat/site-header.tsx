"use client";

import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { LogoMark } from "./logo-mark";
import { MobileMenu } from "./mobile-menu";
import { NAV_ITEMS } from "@/lib/nav";
import { useNavSurface } from "@/hooks/use-nav-surface";
import { useIntroReveal } from "@/hooks/use-intro-reveal";
import { useIntroDone } from "@/hooks/use-intro-done";
import { useIntroFlight } from "@/hooks/use-intro-flight";
import { useScrolled } from "@/hooks/use-scrolled";
import { useAutoHideHeader } from "@/hooks/use-auto-hide-header";
import { cn } from "@/lib/utils";

const HEADER_HEIGHT = 72;

// Translucent + blurred rather than a flat fill — the header reads as glass
// over whatever section is under it, on every breakpoint, not just the
// desktop "island" state.
const SURFACE_CLASS: Record<string, string> = {
  transparent: "bg-canvas/40 border-transparent backdrop-blur-xl",
  canvas: "bg-canvas/70 border-hairline backdrop-blur-xl",
  "canvas-soft": "bg-canvas-soft/70 border-hairline backdrop-blur-xl",
};

/**
 * Fixed site header — recolors to the section currently under it via
 * `useNavSurface`. Transparent over the hero, solid canvas everywhere else.
 * ≥768px: mark (left) + centered nav + CTA. <768px: burger (left) + mark
 * (centered) + `MobileMenu`'s plus-as-CTA (right) — see the grid layout
 * below. The mark itself is the intro loader's landing target on both
 * breakpoints (`data-intro-logo-target`, `useIntroDone`).
 *
 * On first load the whole bar sits off-screen (`-translate-y-full`) and
 * slides down the moment the loader's mark starts its flight toward the header
 * (`useIntroFlight`) — concurrent with the mark, so the bar is already in
 * place when the mark arrives, enabling a true crossfade. The header's own
 * logo fades in on `useIntroDone` (flight landing), not on flight start, so
 * there's no early flash. On a returning visit within the same session both
 * signals are already true on mount, so no slide plays.
 *
 * `Loader` corrects for the header still being off-screen at measurement time
 * (see its flight `tl.add` step) — it neutralises both `transform` and
 * `translate` before reading `getBoundingClientRect()`, so the destination
 * is the true resting position regardless of the bar's current slide state.
 *
 * On desktop, once the page scrolls past a small threshold, the inner bar
 * contracts into a floating glass "island" (`useScrolled`) — a CSS-only
 * backdrop-blur treatment, no external lib. On mobile there's no room for
 * that, so instead the bar itself hides on scroll-down and reappears on
 * scroll-up (`useAutoHideHeader`) — desktop is always pinned open.
 */
export function SiteHeader() {
  const revealed = useIntroReveal();
  const logoLanded = useIntroDone();
  const flightStarted = useIntroFlight();
  const surface = useNavSurface(HEADER_HEIGHT);
  const scrolled = useScrolled(24);
  const mobileHidden = useAutoHideHeader();
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header
      ref={headerRef}
      data-surface={surface}
      style={{
        height: HEADER_HEIGHT,
        transition:
          "translate var(--duration-slow) var(--motion-ease), transform var(--duration-slow) var(--motion-ease), background-color var(--duration-fast) var(--motion-ease), border-color var(--duration-fast) var(--motion-ease), backdrop-filter var(--duration-fast) var(--motion-ease)",
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b md:translate-y-0",
        !flightStarted ? "-translate-y-full" : mobileHidden ? "-translate-y-full" : "translate-y-0",
        SURFACE_CLASS[surface],
        scrolled && "md:border-transparent md:bg-transparent md:backdrop-blur-none"
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-full max-w-[1440px] grid-cols-3 items-center px-space-body-lg transition-[max-width,margin,padding,border-radius,background-color,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--motion-ease)] md:flex md:justify-between lg:px-xxl",
          scrolled &&
            "md:mt-sm md:h-[64px] md:max-w-3xl md:rounded-full md:border md:border-hairline md:bg-canvas/70 md:px-lg md:shadow-2xl md:backdrop-blur-xl lg:px-lg"
        )}
      >
        {/* Mobile: burger — left cell of the 3-col grid. Desktop: the mark
            takes this slot instead (see below) — never both. */}
        <div className="justify-self-start md:hidden">
          <MobileMenu />
        </div>

        {/* The intro loader's flight target. Starts invisible and only ever
            crossfades in once the traced mark lands here (see `Loader` +
            `useIntroDone`) — on a returning visit within the same session
            that's immediate, on a fresh load it's the flight's landing. Two
            copies (mobile-centered, desktop-left) so the loader can measure
            whichever one is actually laid out at flight time. */}
        <a
          href="#"
          aria-label="Fitlat home"
          data-intro-logo-target
          className={cn(
            "col-start-2 flex size-11 items-center justify-center justify-self-center transition-opacity duration-[var(--duration-fast)] ease-[var(--motion-ease)] md:hidden",
            scrolled && "md:size-9"
          )}
          style={{ opacity: logoLanded ? 1 : 0 }}
        >
          <LogoMark className="size-full" />
        </a>
        <a
          href="#"
          aria-label="Fitlat home"
          data-intro-logo-target
          className={cn(
            "hidden size-11 transition-opacity duration-[var(--duration-fast)] ease-[var(--motion-ease)] md:block",
            scrolled && "md:size-9"
          )}
          style={{ opacity: logoLanded ? 1 : 0 }}
        >
          <LogoMark className="size-full" />
        </a>

        <Reveal revealed={revealed} index={1} className="hidden md:block">
          <nav aria-label="Primary" className="flex items-center">
            {NAV_ITEMS.map((item, index) => (
              <span key={item.href} className="flex items-center">
                {index > 0 && <span aria-hidden="true" className="mx-lg h-4 w-px bg-hairline" />}
                <a
                  href={item.href}
                  className="text-body-lg text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:text-ink"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
        </Reveal>

        {/* Mobile: plus opens Join Fitlat directly — right cell of the grid.
            Desktop: the full CTA button takes this slot instead. */}
        <a
          href="#membership"
          aria-label="Join Fitlat"
          className="flex size-11 items-center justify-center justify-self-end rounded-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:hidden"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={22} strokeWidth={2} />
        </a>
        <Reveal revealed={revealed} from="right" index={2} className="hidden md:block">
          <Button size="sm">Join Fitlat</Button>
        </Reveal>
      </div>
    </header>
  );
}
