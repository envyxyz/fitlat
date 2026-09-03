import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The Fitlat mark, traced by `Loader` on the intro and reused wherever the
 * brand icon (not the `FITLAT` text wordmark) needs to render — the header's
 * logo slot, and the intro's flight-to-header landing target.
 */
export const LOGO_PATH =
  "M 108.3 40.5 A 11.3 11.3 0 1 0 85.7 40.5 A 11.3 11.3 0 1 0 108.3 40.5 Z " +
  "M 33 108 L 51 108 L 69 89 L 73 89 L 95 107 L 103 107 L 106 104 L 106 78 L 102 65 L 89 57 L 59 57 L 47 69 L 87 69 L 92 74 L 93 86 L 77 76 L 65 76 L 59 79 Z";

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
