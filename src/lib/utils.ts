import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Plain `twMerge` only knows Tailwind's own class names. Fitlat's custom
// theme adds short, word-like utility names (text-h2, text-caps, ...) that
// don't match any of its known groups, so it falls back to lumping every
// unrecognized `text-{word}` class into one generic "could be a color"
// bucket — which silently drops earlier classes when two unrelated custom
// utilities collide there (e.g. `text-h2 text-ink` kept only `text-ink`,
// and `text-caps text-primary` kept only `text-primary`, both real bugs
// this shipped with). Teaching it these groups explicitly fixes that: each
// custom utility now only conflicts with its own kind.
const TYPE_SCALE = ["display", "h1", "h2", "h3", "h4", "body-lg", "body", "small", "caption", "body-accent"].map(
  (step) => `text-${step}`
)

const customTwMerge = extendTailwindMerge<"fitlat-text-caps" | "fitlat-text-tabular">({
  extend: {
    classGroups: {
      "font-size": TYPE_SCALE,
      "fitlat-text-caps": ["text-caps"],
      "fitlat-text-tabular": ["text-tabular"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
