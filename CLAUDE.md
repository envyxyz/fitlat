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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
