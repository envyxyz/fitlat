# Fitlat — Project Memory

## Project

Fitlat is a gym marketing site.

**Stack:** Next.js, Tailwind, shadcn/ui, GSAP with ScrollTrigger, Motion (formerly Framer Motion).

## Design direction

- Near-black base: `#0A0A0A`
- Single accent color: `#FA823A`
- Oversized grotesk display type (Neue Montreal or General Sans, self-hosted)
- Motion-blurred training imagery used as texture/background, not literal photo grids
- Restrained, physical, minimal-but-not-empty

**Explicitly avoid** decorative AI-generated defaults:
- No gradient blobs
- No generic stock-photo hero grids
- No glassmorphism unless it's earned

## Section order (final)

1. Header
2. Hero
3. Proof strip — metallic animated divider between Hero and Proof strip
4. Gallery — emphasizing environment/facilities
5. Coaches — compact
6. Testimonials
7. Pricing/Join — 3 tiers: Student, Casual, Professional Athlete
8. Footer

## Constraints

- No component libraries beyond shadcn/ui
- No animation libraries beyond GSAP and Motion
- One accent color only
- One easing curve and two duration values across all motion
- All motion wrapped in `prefers-reduced-motion`
- Max one signature animated moment site-wide

## Content source of truth

All copy, tokens, and content per section live in `CONTENT.md` at the project root. Treat it as authoritative when building components — do not invent copy independently. If a section in `CONTENT.md` is still empty/TODO, do not build that section's content, or use an obvious placeholder marker and flag it rather than writing real-sounding copy.

## Layout grid — 12-column alignment (hard rule)

Every full-width section must sit inside the **same canonical container** so
left/right edges line up across the entire page, top to bottom. This is not
a per-section choice.

**The canonical container** (copy this exact class string onto every
section's outermost content wrapper — `SiteHeader`, `Hero`, `ProofStrip`,
`GallerySection`, `CoachesSection`, `TestimonialsSection`, `PricingSection`,
`SiteFooter` all already use it):

```
mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl
```

- `max-w-[1440px]` — the one page content width. Never introduce a second
  max-width (e.g. `max-w-[1540px]`) for "just this section" — that was a
  real bug this audit found and fixed (Gallery was drifting to a wider
  container than every other section, breaking edge alignment).
- `px-space-body-lg lg:px-xxl` — the one responsive side-gutter pair (20px →
  48px at `lg`). Don't add extra intermediate breakpoint steps (e.g. a
  `md:px-lg` some sections used to have) unless every section adopts the
  same step — a lone section with an extra step throws off alignment at
  that breakpoint even though it lines up at others.
- Do not hand-roll `px-*`/`max-w-*` combinations per component. If a section
  genuinely needs a different width (e.g. a full-bleed image), that's a
  child element breaking out of the container (`w-screen` + negative
  margins, or a wrapper outside the container), never a change to the
  container itself.

**Internal grids** (columns of cards, the hero's copy/media split, etc.)
should divide evenly into 12 — use `grid-cols-12` with `col-span-*` (see
`Hero`'s content grid) where columns need asymmetric widths, or a plain
`grid-cols-{2,3,4,6,12}` where they're even (coach cards = 3, gallery cells =
4, pricing tiers = 3). Gutters (`gap-*`) should stay consistent with the
site's spacing scale (`src/styles/tokens.css`), not arbitrary pixel values.

Before adding a new section or component that spans full page width, check
it against this rule: does its outermost wrapper use the exact canonical
container string above? If not, it will misalign with the rest of the page.
See `docs/design/design-system.md` for the full token catalog this container
math is built from.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
