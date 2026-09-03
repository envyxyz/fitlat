# Changelog

All notable changes to the FitLat project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-09-03

### Added
- **Complete Homepage Assembly** (`src/app/page.tsx`): Assembled full production landing experience strictly adhering to the 12-column canonical container grid and section sequence (SiteHeader → Hero → Facilities & Archive Grid → Coaches → Testimonials → Pricing → SiteFooter).
- **Hero Section & Virtual Tour** (`src/components/fitlat/hero.tsx`, `tour-modal.tsx`):
  - Full-bleed training visual background with three-layer canvas vignette and smooth entrance reveal latch.
  - Interactive virtual facility tour modal (`TourModal`) leveraging Base UI `Dialog` with floating launch affordance and video preview.
- **Proof Strip & Metrics** (`src/components/fitlat/proof-strip.tsx`):
  - Key performance metrics with numerical proof tiles (`StatTile`) and brushed-steel `MetallicDivider` featuring a light-sweep transition.
- **Gallery & Facilities Section** (`src/components/fitlat/gallery-section.tsx`, `gallery-grid.tsx`, `gallery-cell.tsx`):
  - Uniform 4-column archive grid pattern (`heading`, `image`, `label`, `quote`, `cta` cell variants).
  - Fullscreen zoomable lightbox viewer (`ImageViewer`) supporting drag-to-pan, pinch/scroll zoom, and keyboard navigation.
  - One-shot GSAP `ScrollTrigger.batch` reveal animation.
- **Coaching Staff Section** (`src/components/fitlat/coaches-section.tsx`):
  - Disciplined coach profile presentation (`CoachCard`) with credential tags, specialization blocks, and bio previews.
- **Member Testimonials Section** (`src/components/fitlat/testimonials-section.tsx`):
  - Authentic athlete quotes, transformation context, and member attribution cards (`TestimonialCard`).
- **Membership & Pricing Section** (`src/components/fitlat/pricing-section.tsx`):
  - Transparent 3-tier membership matrix (Student, Casual, Professional Athlete) with monthly/annual billing toggle.
  - Enhanced `PricingCard` with featured tier highlighting and integrated checkout/action triggers.
- **Sticky Reveal Parallax Footer** (`src/components/fitlat/site-footer.tsx`):
  - Fixed background reveal mechanism creating a deep dimensional parallax effect as the main page canvas scrolls away.
  - Real-time Islamabad gym operational status indicator ("Open Now until 11:00 PM" / "Closed"), brand statement, newsletter dispatch, and social coordinates.
- **Global Hardware-Accelerated Custom Scrollbar** (`src/components/fitlat/custom-scrollbar.tsx`):
  - Floating custom scrollbar indicator with proportional thumb geometry, drag-to-scrub support, and automatic idle fade-out.
- **Site Header & Responsive Mobile Navigation** (`src/components/fitlat/site-header.tsx`, `mobile-menu.tsx`, `menu-toggle.tsx`):
  - IntersectionObserver-driven surface transitions (`useNavSurface`) that automatically blend between transparent and solid glass surfaces.
  - Full-screen mobile menu drawer with Base UI dialog primitives and custom shock easing animation.
- **LogoMark Vector Primitive** (`src/components/fitlat/logo-mark.tsx`, `public/logo.svg`):
  - Centralized SVG brand glyph supporting stroke-drawing animations and solid brand fills.
- **Intro Loader v2** (`src/components/fitlat/loader.tsx`):
  - 5-second cinematic GSAP entrance sequence featuring logo tracing, erase passes, and seamless flight animation into the header target.
- **`useIntroDone` & `useIntroReveal` Hooks** (`src/hooks/use-intro-done.ts`, `src/hooks/use-intro-reveal.ts`):
  - React 19 `useSyncExternalStore` integration for rock-solid cross-component animation state synchronization without cascading renders.

### Changed
- Refactored `src/app/page.tsx` from internal design-system showcase to full marketing experience (kitchen sink relocated to `/kitchen-sink`).
- Updated slow duration token (`--duration-slow`) to 850ms and reveal stagger to 90ms for calibrated, deliberate motion.
- Modernized `PricingCard` and `TestimonialCard` styling to adhere strictly to AST design system rules.

### Removed
- Deprecated legacy `FeatureCard` in favor of modular `GalleryCell`.
- Removed raw CSS rgba declarations in favor of core design system tokens.

### Fixed
- Resolved React 19 `react-hooks/set-state-in-effect` warnings in `custom-scrollbar.tsx`, `image-viewer.tsx`, and `use-intro-done.ts`.
- Enforced zero-raw-rgba ESLint compliance on floating header glass styles.

## [0.2.0] - 2026-09-02

### Added
- **First-load intro loader** (`src/components/fitlat/loader.tsx`): Six-column full-viewport black overlay shown once per browser session on the site's first load only (sessionStorage-gated — never replays on client-side navigation or a same-tab reload).
  - The Fitlat mark traces itself once as a moving stroke segment (drawn with the Web Animations API against `stroke-dasharray`/`stroke-dashoffset`) that draws ahead and erases behind, never holding a fully filled state, tracing at a constant linear rate.
  - Mark fades and scales in on mount, holds briefly once fully traced, then fades and scales out.
  - The six columns exit upward right-to-left in a fixed 300ms total stagger, revealing the page beneath in a shutter-like reveal.
  - Fully respects `prefers-reduced-motion`: skips the trace/column choreography and dismisses after a brief static hold.
  - Announced to assistive tech via `role="status"`/`aria-live="polite"`; decorative layers marked `aria-hidden`.

## [0.1.0] - 2026-09-02

### Added
- **Next.js 16 App Router Foundation**: Initialized Next.js 16 with React 19, TypeScript, and Turbopack compiler support.
- **Design Token System**: Complete custom CSS token layer (`src/styles/tokens.css`, `src/styles/typography.css`) integrated with Tailwind CSS v4 `@theme`:
  - Industrial near-black palette (`--canvas: #0a0a0a`, `--canvas-soft: #121212`, `--surface: #161616`, `--surface-card: #1c1c1c`, `--hairline: #2a2a2a`).
  - Strict single structural accent (`--primary: #fa823a`, `--primary-active: #c8682e`).
  - Neutral text hierarchy (`--ink`, `--ink-secondary`, `--ink-muted`, `--ink-faint`).
  - Standardized radius scale (`--radius-scale-xs` through `--radius-scale-xl`).
  - Restrained motion system (`--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)`, `--duration-fast: 200ms`, `--duration-slow: 600ms`) with full `prefers-reduced-motion` compliance.
- **Fluid Typography Scale**: Fluid `clamp()` type scale for display headings (`h1`–`h4`) and body copy (`body-lg`, `body`, `small`, `caption`) tuned for high-impact grotesk display typography.
- **Base UI & Primitive Components** (`src/components/ui/`):
  - `Button`: Tight industrial styling (`rounded-sm`), primary/outline/secondary/ghost/destructive variants.
  - `Card`: Container primitives (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`).
  - `Badge`: Standardized badges and pills.
  - `Separator`: Hairline divider primitive.
- **FitLat Domain Components** (`src/components/fitlat/`):
  - `BadgePill`: High-contrast kicker labels and category tags with uppercase tracking.
  - `CoachCard`: Minimalist coach profiles displaying specialty and bio.
  - `FeatureCard`: Facility and equipment showcase cards for gym floor areas.
  - `MetallicDivider`: Brushed-steel horizontal divider with light-sweep motion effect.
  - `PricingCard`: Membership tier card supporting standard and highlighted/featured tiers.
  - `StatTile`: Key proof metrics with prominent primary-accent numerical values.
  - `TestimonialCard`: Clean quotation cards with member attribution.
- **Design System Documentation**: Added comprehensive architecture catalog in `docs/design/design-system.md` covering tokens, typography, primitives, motion, fonts, and extension patterns.
- **Content Source of Truth**: Added authoritative copy and section specification in `CONTENT.md`.
- **Project Guidelines**: Defined brand rules, architectural constraints, and development guidelines in `CLAUDE.md`.
- **ESLint Design System Rules**: Configured AST-based ESLint rules in `eslint.config.mjs` enforcing design token compliance and preventing arbitrary styling escapes.

### Changed
- **Documentation**: Overhauled `README.md` with complete technical stack details, project structure, component catalog, setup instructions, and design system reference.

---

## [0.1-pre-beta] - 2026-09-01

### Added
- Initial project repository setup and baseline placeholder README.
