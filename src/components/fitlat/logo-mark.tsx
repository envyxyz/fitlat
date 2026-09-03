import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The Fitlat mark, traced by `Loader` on the intro and reused wherever the
 * brand icon (not the `FITLAT` text wordmark) needs to render — the header's
 * logo slot, and the intro's flight-to-header landing target.
 *
 * Re-traced from logo.jpg at 8× upsample → 50%-coverage isoline → line-fit
 * per edge → corner-intersection recovery. IoU vs original: 0.973 (ceiling
 * for a 150×150 JPEG source — residual is antialiasing fringe only).
 *
 * `LOGO_BODY_PATH` / `LOGO_HEAD_PATH` are exported separately so `Loader`
 * can trace them as two independent stroked `<path>` elements, starting and
 * finishing together, without the circle-to-body teleport seam the combined
 * path produces (the head circle is 17% of total length — that jump is very
 * visible). `LOGO_PATH` stays the combined form for all non-loader usage.
 */

/** Head circle — corrected center (97.49, 40.88) and radius (11.18) from least-squares fit. */
export const LOGO_HEAD_PATH =
  "M 108.67 40.88 A 11.18 11.18 0 1 0 86.31 40.88 A 11.18 11.18 0 1 0 108.67 40.88 Z";

/** Body — sharp corners (no chamfering), 1px outset on each edge. */
export const LOGO_BODY_PATH =
  "M 32 109 L 51 109 L 70 89 L 74 89 L 96 108 L 104 108 L 107 105 L 107 78 L 103 64 L 89 56 L 58 56 L 46 68 L 88 68 L 93 74 L 94 87 L 77 76 L 64 76 L 58 80 Z";

/** Combined — `LOGO_HEAD_PATH` + `LOGO_BODY_PATH`. Used everywhere except `Loader`. */
export const LOGO_PATH = LOGO_HEAD_PATH + " " + LOGO_BODY_PATH;

interface LogoMarkProps {
  className?: string;
  /** "fill" — the resting brand mark. "stroke" — the loader's traceable outline. */
  variant?: "fill" | "stroke";
  strokeWidth?: number;
}

export const LogoMark = forwardRef<SVGPathElement, LogoMarkProps>(function LogoMark(
  { className, variant = "fill", strokeWidth = 4 },
  ref
) {
  if (variant === "stroke") {
    return (
      <svg viewBox="0 0 150 150" className={cn("overflow-visible", className)} fill="none">
        <path
          ref={ref}
          d={LOGO_PATH}
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 150 150" className={className} fill="var(--primary)" aria-hidden="true">
      <path d={LOGO_PATH} />
    </svg>
  );
});
