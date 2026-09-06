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

- Always use the `/caveman` plugin to cut down token usage
- No component libraries beyond shadcn/ui
- No animation libraries beyond GSAP and Motion
- One accent color only
- One easing curve and two duration values across all motion
- All motion wrapped in `prefers-reduced-motion`
- Max one signature animated moment site-wide

## Execution & Delivery Rules

- **Don't over-engineer**: Deliver lean, concise, and optimal outputs. Avoid unnecessary abstractions or bloat.
- **High confidence**: Execute decisively with high confidence.
- **Parallel execution**: Run parallel agents/subagents to get tasks done sooner whenever applicable.
- **Mission-critical reliability**: Outputs must work correctly and reliably without breaking ("if the outputs don't work I get fired").

## Token usage

- Always use `/caveman` plugin to cut down token usage.

## Content source of truth

All copy, tokens, and content per section live in `CONTENT.md` at the project root. Treat it as authoritative when building components — do not invent copy independently. If a section in `CONTENT.md` is still empty/TODO, do not build that section's content, or use an obvious placeholder marker and flag it rather than writing real-sounding copy.

## `src/content.ts` is the only place copy lives in code (hard rule)

`CONTENT.md` is the human-readable spec; `src/content.ts` is its typed, in-code mirror, and every component reads from it. This is not optional and not per-component discretion.

- **No hardcoded user-facing strings in components.** Headings, body copy, labels, button text, alt text, stat numbers, testimonial quotes, coach bios, nav items, footer links: all of it comes from `import { content } from "@/content"`, never a literal string typed inline in a `.tsx` file. Aria-labels and other pure accessibility/structural chrome (dialog close labels, landmark roles) are the one exception — those aren't editorial content and don't need a `content.ts` entry.
- **One fact, one field.** If the same number, name, or phrase shows up in more than one section (e.g. a stat quoted in both the proof strip and a gallery cell, or a testimonial reused in a gallery quote card), it lives once in `content.ts` and every usage references that field (or an index/key into it), never a second copy of the literal string.
- **Update `CONTENT.md` first, then mirror the change into `content.ts`.** They must never drift: if you change one, change the other in the same pass.
- **Before adding any new visible text to a component**, check whether `content.ts` already has a field for it. If not, add the field to the right section of `content.ts` (and to `CONTENT.md`), then reference it. Never take the shortcut of typing the string directly into the component "for now."
- **When reviewing or extending any component**, grep it for quoted string literals in JSX/props first. A stray hardcoded string is a bug, not a style nit.

## Copy style

- No em dashes anywhere in copy shown to the user (headings, body text, labels, alt text). Use a comma, colon, semicolon, or a new sentence instead. En dashes in numeric ranges (`5am–10pm`, `Mon–Fri`) are fine; the em dash specifically is not.
- Keep copy professional and grounded: plain, active sentences, concrete specifics over vague marketing language, no invented statistics. See `staff.md`-sourced facts as the model for tone.

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
