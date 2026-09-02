import { cn } from "@/lib/utils";

/**
 * Proof-strip divider — see design-fitlat.md `metallic-divider`.
 *
 * Deliberately quiet: this is NOT the site's signature animated moment (that's
 * the hero's motion-blurred imagery reveal). The shimmer sweep is short,
 * low-contrast, and gated behind `motion-safe:` so `prefers-reduced-motion`
 * users get a static metallic band instead.
 */
export function MetallicDivider({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn("relative h-px w-full overflow-hidden border-y border-hairline bg-canvas", className)}
    >
      <div
        className="absolute inset-y-0 -inset-x-full w-1/3 bg-gradient-to-r from-transparent via-accent-metallic to-transparent motion-safe:animate-fitlat-shimmer"
      />
    </div>
  );
}
