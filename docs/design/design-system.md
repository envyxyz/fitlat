# Fitlat Design System

Source of truth for brand direction: [CLAUDE.md](../../CLAUDE.md). Source of
truth for copy: [CONTENT.md](../../CONTENT.md). This document is the token
catalog, primitive catalog, and extension procedure for everything in
between.

Stack: Next.js (App Router) + Tailwind CSS v4 (CSS-first `@theme`) +
shadcn/ui (`base-maia` style, Base UI primitives, hugeicons) + GSAP/Motion for
the two animated moments the brand allows.

## Why two type-scale systems exist

`tailwind.config.js` already had a hand-tuned fluid `clamp()` type scale
(`h1`–`h4`, `body-lg`/`body`/`small`/`caption`) before this design system was
built, and it's preserved as-is rather than replaced — Tailwind v4's
CSS-first `@theme` font-size keys can't express the
`[size, {lineHeight, letterSpacing, fontWeight}]` tuple shape that scale
uses, so `globals.css` bridges it in with `@config "../../tailwind.config.js"`
instead of migrating it. **Every typography reference below uses these
existing token names** (`text-h1`, `text-body`, etc.) — treat
`tailwind.config.js` + `src/styles/typography.css` as the typography system,
full stop. Do not introduce a second, parallel type-token vocabulary.

## Token catalog

All tokens live in [`src/styles/tokens.css`](../../src/styles/tokens.css),
imported into [`src/app/globals.css`](../../src/app/globals.css), which also
aliases them into Tailwind's `@theme` so they're available as utility classes
(`bg-canvas`, `text-ink`, `border-hairline`, `rounded-lg`, …) — never as raw
hex/px in component code.

### Color

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#0a0a0a` | Page background, site-wide. Fixed — there is no light mode. |
| `--canvas-soft` | `#121212` | Footer band, empty-state frames — barely lifted off canvas. |
| `--surface` | `#161616` | Default card/panel/input fill. |
| `--surface-card` | `#1c1c1c` | A further-lifted fill for elevated surfaces (coach cards, featured pricing tier, modals). |
| `--hairline` | `#2a2a2a` | 1px borders/dividers — the primary depth tool, since shadows barely register on near-black. |
| `--ink` | `#f5f5f3` | Primary text. |
| `--ink-secondary` | `#c7c7c4` | Secondary body copy (testimonial quotes). |
| `--ink-muted` | `#8f8f8c` | Supporting copy, stat labels, footer text. |
| `--ink-faint` | `#55554f` | Captions, placeholders — lowest-priority text. |
| `--primary` | `#fa823a` | **The only structural accent.** CTAs, active states, featured-tier border, proof-strip stat numbers. Never decorative. |
| `--primary-active` | `#c8682e` | Pressed state of primary (≈20% darker). |
| `--on-primary` | `#0a0a0a` | Text/icons on a primary-filled surface. |
| `--accent-metallic` | `#b8bcc0` | Scoped to `MetallicDivider` only. Never a CTA, link, or structural fill. |
| `--status-success` / `-warning` / `-error` / `-info` (+ `-bg`, `-border`) | — | Reserved for state (form validation, save confirmations). Never reused for chart/category identity — there is no categorical palette in this system since the site has no data visualization. |

### Shape

Sharp/industrial, on purpose — see CLAUDE.md's "no glassmorphism unless
earned" and "restrained, physical" direction.

| Token | Value | Use |
|---|---|---|
| `--radius-scale-xs` (`rounded-xs`) | 2px | Form fields, inline badges |
| `--radius-scale-sm` (`rounded-sm`) | 4px | Buttons, utility chips |
| `--radius-scale-md` (`rounded-md`) | 6px | Coach cards, smaller tiles |
| `--radius-scale-lg` (`rounded-lg`) | 8px | Feature/pricing/testimonial cards |
| `--radius-scale-xl` (`rounded-xl`) | 12px | Large containers, modals, the base `Card` primitive |
| `--radius-scale-full` (`rounded-full`) | 9999px | `BadgePill` only — the one place a full curve appears |

### Motion

One easing curve, two durations, site-wide (CLAUDE.md constraint) — this is a
hard rule, not a starting point.

| Token | Value | Use |
|---|---|---|
| `--motion-ease` (`ease-fitlat`) | `cubic-bezier(0.22, 1, 0.36, 1)` | Every animation on the site |
| `--duration-fast` | 200ms | Micro-interactions |
| `--duration-slow` | 600ms | The hero reveal, the proof-strip shimmer |

`@media (prefers-reduced-motion: reduce)` is wired globally in
`tokens.css` — it collapses all animation/transition durations to near-zero.
Component-level `motion-safe:` variants (see `MetallicDivider`) are still the
right call for anything with an infinite or attention-grabbing loop.

**The one signature animated moment** is the hero's motion-blurred imagery
resolving into focus on load. Nothing else on the site should compete with it
for attention — `MetallicDivider`'s shimmer is deliberately quieter, gated
behind `motion-safe:`, and runs once.

### Spacing

Two coexisting scales, both real, used for different things:

- **`space-*`** (`space-caption` 4px → `space-h1` 48px, in `tailwind.config.js`) —
  the original scale, keyed to type-scale steps. Use for spacing that
  relates to a heading/body block (`mb-space-h2` after an `h2`).
- **`spacing-xxs`…`spacing-xxl`** (4px → 48px, in `tokens.css`) — a plain 8px
  scale for general layout gaps (`gap-space-body`, grid gutters) that aren't
  tied to a specific type role.

If you're spacing *around type*, reach for `space-*`. If you're spacing a
*layout* (grid gaps, section padding), reach for the 8px scale.

## Primitives catalog

### shadcn-generated (`src/components/ui/`)

`Button`, `Card` (+ `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/
`CardFooter`/`CardAction`), `Badge`, `Separator` — installed via
`npx shadcn add <name>`, then hand-adjusted for Fitlat's shape language
(shadcn's `base-maia` preset defaults to pill buttons/badges/rounder cards;
`Button` and `Card` were tightened to `rounded-sm`/`rounded-xl`, `Badge` kept
at `rounded-full` since that matches the spec). **Do not hand-edit these
components' variant classes for one-off needs** — add a variant, or compose
a Fitlat-specific wrapper (see below) instead.

To add more (`Tooltip`, `Accordion`, etc.): `npx shadcn add <component>`,
then check its default radius/color classes against the Shape table above
before using it — the `base-maia` preset's defaults (pill shapes, chart/
sidebar tokens this project doesn't use) don't automatically match Fitlat's
brand.

### Fitlat-specific (`src/components/fitlat/`)

Compose shadcn primitives + tokens into Fitlat's actual section vocabulary
(CLAUDE.md's section order: Header → Hero → Proof Strip → Gallery → Coaches
→ Testimonials → Pricing → Footer):

- **`StatTile`** — proof-strip stat (`{value, label}`), number in `--primary`.
- **`MetallicDivider`** — the proof-strip divider between Hero and Proof
  Strip. Deliberately subordinate motion (see Motion table above).
- **`FeatureCard`** — gallery/facility card.
- **`CoachCard`** — compact coach profile (`{photo, name, role, bio}`) —
  stays minimal on purpose, don't add fields without a second real need.
- **`TestimonialCard`** — member testimonial (`{quote, name, detail}`).
- **`PricingCard`** — one pricing tier (`{tier, price, period, features,
  ctaLabel, featured}`). `featured` flips to a `--primary`-bordered
  `surface-card` fill, not a color-inverted surface — this is the
  Professional Athlete tier's only visual distinction.
- **`BadgePill`** — eyebrow/kicker label, wraps `Badge` with the caps/
  tracking treatment from `typography.css`'s `.text-caps`.

`src/app/page.tsx` currently renders all of these together as a design-system
showcase (not a real page) — replace it with the actual CLAUDE.md section
order once CONTENT.md's copy is filled in.

## Font

`Inter` (via `next/font/google`, `--font-sans`) is standing in for the
licensed **General Sans / Neue Montreal** self-hosted display face CLAUDE.md
calls for. To swap in the real font once licensed files are available:

1. Add the font files under `public/fonts/`.
2. In `src/app/layout.tsx`, replace the `Inter` import with `next/font/local`
   pointed at those files, keeping the `variable: "--font-sans"` binding —
   nothing downstream needs to change, every component reads `font-sans`.
3. Re-check the fluid type scale's `letterSpacing` values in
   `tailwind.config.js` — they were tuned assuming a grotesk with Inter-like
   metrics; a different face may need the tracking re-balanced.

## Enforcement

`eslint.config.mjs` has a `fitlat/design-system-enforcement` block (scoped to
`src/**/*.{ts,tsx}`, exempting `src/components/ui/**` and `src/styles/**`,
which are where these patterns are legitimately defined) banning:

- Hardcoded hex colors and `rgb()`/`rgba()` — use a token.
- Sub-13px arbitrary text sizes (`text-[9px]`, `text-[10px]`).
- Raw icon-sizing classes (`w-4 h-4` etc.) outside a primitive's own file.
- `focus:outline-none` with no paired `focus-visible:` ring.

Each rule was verified with a probe file (written, confirmed to error, then
deleted) rather than just read from the config — see the commit that
introduced this file for that verification. If you add a new rule here,
verify it the same way before trusting it.

**If another file-scoped `no-restricted-syntax` block is ever added** to
`eslint.config.mjs` for files that overlap `src/**/*.{ts,tsx}`, ESLint flat
config *replaces* same-key blocks rather than merging them — copy
`designSystemRules` into the new block too, or these rules silently stop
applying to that overlap.

## Adding a token

1. Check the tables above — a token for this already existing is more likely
   than not.
2. If it's genuinely new, add it to `src/styles/tokens.css` in the relevant
   `:root` group (color / shape / motion / spacing).
3. If a Tailwind utility should read it directly (`bg-my-token`), add the
   `--color-my-token: var(--my-token);` alias in the `@theme inline` block in
   `globals.css`. **Name the alias differently from the raw token** — an
   identically-named `@theme` key and `:root` variable is a circular
   `var()` reference and silently resolves to nothing (this bit the
   `--radius-*`/`--ease-fitlat` tokens during setup; they're now
   `--radius-scale-*`/`--motion-ease` internally for exactly this reason).
4. Add a row to the relevant table in this doc in the same commit.

## Adding a theme

Fitlat intentionally ships **one fixed look** — CLAUDE.md specifies a single
near-black canvas and single accent color, with no light mode and no stated
need for brand variants. The `.dark` class in `tokens.css` is mirrored to the
same values (not a real second theme) purely so any shadcn component that
branches on dark-mode variants doesn't fall back to a stock light palette.

If a real second theme is ever needed (a seasonal campaign palette, a
white-label variant), the mechanism is: add a `[data-theme="name"] { }` block
in `tokens.css` that overrides the *entire* neutral + accent ramp together
(never partially — a half-overridden ramp is how a cool-grey card ends up on
a warm-brown page), leaving `--status-*` untouched since those are state, not
brand.

## Adding a size step to a primitive

Only add a new size/variant prop once a **second real occurrence** needs it —
not for a single screen's one-off. If only one place ever needs a bigger
`CoachCard` photo, that's a local `className` override at the call site, not
a new `size="xl"` prop on the primitive.
