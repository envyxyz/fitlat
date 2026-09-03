"use client";

import { cn } from "@/lib/utils";

interface MenuToggleProps {
  open: boolean;
  className?: string;
}

/**
 * Three-bar burger that morphs into a cross — the "shock animation" curve
 * (`--motion-ease-shock`, 500ms) drives every bar so the icon and the panel
 * it drives read as one gesture. Hand-drawn with three `<span>`s rather than
 * an icon glyph: a glyph swap can't morph, it can only cross-fade.
 */
export function MenuToggle({ open, className }: MenuToggleProps) {
  const barClass = "absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-ink transition-[transform,opacity] duration-[var(--duration-shock)] ease-[var(--motion-ease-shock)] motion-reduce:transition-none";

  return (
    <span className={cn("relative block size-6", className)} aria-hidden="true">
      <span
        className={barClass}
        style={{ transform: open ? "translate(-50%, -50%) rotate(45deg)" : "translate(-50%, -50%) translateY(-6px)" }}
      />
      <span
        className={barClass}
        style={{
          transform: "translate(-50%, -50%)",
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className={barClass}
        style={{ transform: open ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, -50%) translateY(6px)" }}
      />
    </span>
  );
}
