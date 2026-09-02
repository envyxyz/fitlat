# Changelog

All notable changes to the FitLat project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
