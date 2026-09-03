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

`display` (`text-display`, `clamp(3rem, …, 7rem)`, `lh 0.95`, `-0.05em`) was
added above `h1` for the hero headline — CLAUDE.md calls for "oversized
grotesk display type" and `h1` tops out at 80px, which reads as a normal
heading rather than a hero statement at 1440px+.

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
| `--radius-scale-sm` (`rounded-sm`) | 4px | Utility chips |
| `--radius-scale-md` (`rounded-md`) | 6px | Buttons, coach cards, smaller tiles |
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
| `--duration-slow` | 850ms | The post-intro page reveal, the hero image resolve, the proof-strip shimmer |

**Documented exception — the "shock" animation.** `--motion-ease-shock`
(`cubic-bezier(0.804, 0.005, 0.55, 0.666)`) and `--duration-shock` (350ms)
are a second, deliberate curve/duration pair, reserved for the mobile full-
screen menu (`MobileMenu`, `MenuToggle`): the burger-to-cross morph, the
panel's slide-up, and its staggered text reveal. It's an abrupt hang-then-
slam ease-in, distinct on purpose from the site's smooth ease-out — never
apply it elsewhere without calling it out as "the shock animation" the way
this exception is.

**Documented exception — the intro's own timeline.** `Loader` runs a single
~4s GSAP timeline (settle, two continuous constant-velocity erase passes, a
final draw that persists, a hold, then the flight into the header) built from
its own local constants, not `--duration-fast`/`--duration-slow` — a one-shot,
once-per-session sequence is a different animation category than a repeatable
transition/micro-interaction, the thing the two-duration rule is scoped to.
The mark traces its head circle and body as two separate paths in lockstep
at constant velocity (no easing stops or inter-lap pauses), and the flight
itself eases on `--motion-ease` exactly (registered as a GSAP `CustomEase`
from the same cubic-bezier), so the handoff into the header lands on the
site's one curve.

`@media (prefers-reduced-motion: reduce)` is wired globally in
`tokens.css` — it collapses all animation/transition durations to near-zero.
Component-level `motion-safe:` variants (see `MetallicDivider`) are still the
right call for anything with an infinite or attention-grabbing loop.

**The one signature animated moment is the intro `Loader`**: the mark tracing
itself, then landing in the header. Nothing else on the site should compete
with it for attention — the hero's blur-to-sharp image resolve and the page's
post-intro `Reveal` stagger are the same gesture finishing, not a second
signature moment; `MetallicDivider`'s shimmer is deliberately quieter still,
gated behind `motion-safe:`, and runs once.

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

**Hazard — the `spacing-{sm,md,lg,xl}` names collide with Tailwind's own
built-in scale.** In Tailwind v4, `--spacing-<key>` is the *single* namespace
every spacing-driven utility reads from — not just `p-*`/`gap-*`, but also
`w-*`, `h-*`, `size-*`, `max-w-*`, `min-w-*`. Because `globals.css`'s
`@theme inline` block defines `--spacing-sm`/`-md`/`-lg`/`-xl` (12px/16px/
24px/32px, aliasing `tokens.css`'s `--space-sm`, etc. — the 8px layout
scale), **bare Tailwind size utilities using those same key names are
silently redefined project-wide**: `max-w-sm` no longer means Tailwind's
usual 24rem, it means 12px. This is a real bug this audit found and fixed —
a hero card used `max-w-sm` expecting ~384px and collapsed to a few pixels
wide. `xxs`/`xxl` are safe (no Tailwind default uses those names); `sm`/
`md`/`lg`/`xl` are not.

**Rule:** never use a bare `w-`, `h-`, `size-`, `max-w-`, or `min-w-` utility
with a `sm`/`md`/`lg`/`xl` suffix — you will get the 8px spacing token, not
Tailwind's conventional size. Use an arbitrary value instead
(`max-w-[24rem]`), or `max-w-measure`/`max-w-measure-display` for
type-measure widths. `gap-*`/`p-*`/`m-*` with those same suffixes are fine
and intentional — that collision is the whole point of the token (`gap-lg`
*should* mean 24px here).
### Layout grid

The canonical page container and 12-column rule are documented in
[CLAUDE.md](../../CLAUDE.md#layout-grid--12-column-alignment-hard-rule) —
every full-width section wraps its content in
`mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl` so edges align site-wide.
That's the enforcement rule; this doc is just the token source it's built
from (`--space-body-lg` / `--spacing-xxl` above).

## Primitives catalog

### shadcn-generated (`src/components/ui/`)

`Button`, `Card` (+ `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/
`CardFooter`/`CardAction`), `Badge`, `Separator` — installed via
`npx shadcn add <name>`, then hand-adjusted for Fitlat's shape language
(shadcn's `base-maia` preset defaults to pill buttons/badges/rounder cards;
`Card` was tightened to `rounded-xl`, `Button` sits at `rounded-md` (one step
softer than its original `rounded-sm`, plus a touch more horizontal padding
per size step — a deliberate minor theme adjustment, not a scale change),
`Badge` kept at `rounded-full` since that matches the spec). **Do not
hand-edit these components' variant classes for one-off needs** — add a
variant, or compose a Fitlat-specific wrapper (see below) instead.

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
- **`GalleryCell`** — one cell of the Gallery section's archive grid
  (`{variant: "heading"|"image"|"label"|"quote"|"cta", ...}`). Flat cells
  (`heading`/`label`/`quote`) carry a permanent, static `blur(40px)`/12%-
  opacity crop of their own `revealSrc` photo as ground — material that
  reads as one wall with the `image` cells instead of a void beside them.
  `image` captions are visible at rest on a bottom scrim; hover/focus only
  deepens the scrim and draws in a 2px `--primary` rule. `cta` is the
  grid's one structural use of `--primary`. No cell is a focusable
  no-op — see CONTENT.md's Gallery entry before adding a sixth variant.
  Supersedes `FeatureCard`.
- **`GalleryGrid`** — the archive grid's container: owns only the one-shot
  GSAP `ScrollTrigger.batch` entrance (clip-path wipe + rise, DOM-order
  stagger), deliberately quieter than the hero's signature reveal. Column
  count/gutters are the caller's `className`.
- **`CoachCard`** — compact coach profile (`{photo, name, role, bio}`) —
  stays minimal on purpose, don't add fields without a second real need.
- **`TestimonialCard`** — member testimonial (`{quote, name, detail}`).
- **`PricingCard`** — one pricing tier (`{tier, price, period, features,
  ctaLabel, featured}`). `featured` flips to a `--primary`-bordered
  `surface-card` fill, not a color-inverted surface — this is the
  Professional Athlete tier's only visual distinction.
- **`BadgePill`** — eyebrow/kicker label, wraps `Badge` with the caps/
  tracking treatment from `typography.css`'s `.text-caps`.
- **`Reveal`** — `{children, from: "left"|"right"|"none", index, revealed}`.
  The hero/header entrance primitive: fade + 15px translate on the site's
  shared ease/duration, direction set by which side of center the content
  sits on, staggered via `index * 60ms`. Driven by `useIntroReveal`, never
  wired up ad hoc per component.
- **`SiteHeader`** — fixed header, section-reactive background via
  `useNavSurface` (`data-nav-surface="transparent"|"canvas"|"canvas-soft"`
  declared per section). ≥768px: wordmark + centered nav + CTA. <768px:
  burger (`MobileMenu`) + a direct "Join Fitlat" plus icon — no wordmark.
- **`MobileMenu`** / **`MenuToggle`** — the full-screen mobile nav (Base UI
  `Dialog`) and its burger-to-cross icon. Both run on the "shock" animation
  (see Motion above), not the site default.
- **`Hero`** — CLAUDE.md section #2. Owns the signature reveal (image
  blur-resolve + staggered `Reveal` copy) plus the vignette stack.
- **`GallerySection`** — CLAUDE.md section #4. A uniform 4-column archive
  grid (`GalleryGrid` of `GalleryCell`s) — the goldsgym.com "60 years"
  pattern. No separate contained header above the grid; the first cell
  (`variant="heading"`) doubles as the section heading, matching the
  reference layout. `id="facilities"` is the nav anchor target
  (`src/lib/nav.ts`); `scroll-mt-16` keeps it clear of the fixed header on
  an in-page jump.

`src/app/page.tsx` now composes `SiteHeader` + `Hero` + `GallerySection` as
the real page per CLAUDE.md's section order. The former all-primitives
showcase moved to `src/app/kitchen-sink/page.tsx` — still useful for
eyeballing the token layer, no longer mistakeable for the real homepage.

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
