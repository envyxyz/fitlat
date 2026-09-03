<div align="center">

<img src="public/logo.svg" width="88" height="88" alt="FitLat Logo" style="border-radius: 18px; margin-bottom: 12px;" />

# FITLAT

**Train like it matters.**

[![Version](https://img.shields.io/badge/version-0.3.0-FA823A.svg?style=flat-square)](CHANGELOG.md)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-149eca?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-0ae448?style=flat-square&logo=greensock)](https://gsap.com/)
[![Base UI](https://img.shields.io/badge/Base_UI-1.7-8957e5?style=flat-square)](https://base-ui.com/)
[![License](https://img.shields.io/badge/license-Private-red.svg?style=flat-square)](#)

A high-performance, dark-industrial marketing website and strict design system for **FitLat** — Islamabad's premier strength, conditioning, and athletic performance facility.

[Overview](#-overview) • [Brand Colors](#-brand-colors-widget) • [Sitemap & Architecture](#-minimal-sitemap-widget) • [Tech Stack](#-tech-stack) • [Libraries Used](#-libraries-used) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [Changelog](#-releases--changelog)

</div>

---

## ⚡ Overview

FitLat is engineered for competitive athletes, strength trainees, and disciplined professionals who demand serious training environments. Designed with a restrained, tactile, and physical aesthetic, the interface puts the training floor, coaching standards, and athletic proof front and center.

### Core Architectural Principles
- **Physical & Restrained**: Grounded on a deep near-black void (`#0A0A0A`) accented by a single high-contrast primary orange (`#FA823A`).
- **Canonical 12-Column Alignment**: Every viewport section is bound to the exact same canonical container (`mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl`) ensuring continuous vertical edge-to-edge rhythm.
- **Calibrated Motion Engine**: Strict motion discipline featuring a single signature cubic-bezier curve (`cubic-bezier(0.22, 1, 0.36, 1)`), zero decorative fluff, and complete `prefers-reduced-motion` compliance.
- **AST-Level Token Enforcement**: Custom ESLint AST rules prevent raw hex colors, unsanctioned `rgba()` functions, arbitrary sub-caption font sizes, and unaccessible outlines.

---

## 🎨 Brand Colors Widget

FitLat strictly adheres to a monochromatic industrial foundation with a single structural accent. No arbitrary gradients, no neon halos, and no decorative pastel fills.

| Swatch | Token | Hex | HSL / Value | Semantic Role |
|:---:|:---|:---|:---|:---|
| <img src="https://via.placeholder.com/20/0a0a0a/000000?text=+" width="20" height="20" /> | `--canvas` | `#0A0A0A` | `hsl(0, 0%, 4%)` | Deep page canvas background |
| <img src="https://via.placeholder.com/20/121212/000000?text=+" width="20" height="20" /> | `--canvas-soft` | `#121212` | `hsl(0, 0%, 7%)` | Softened background & floating panels |
| <img src="https://via.placeholder.com/20/161616/000000?text=+" width="20" height="20" /> | `--surface` | `#161616` | `hsl(0, 0%, 9%)` | Baseline card and container background |
| <img src="https://via.placeholder.com/20/1c1c1c/000000?text=+" width="20" height="20" /> | `--surface-card` | `#1C1C1C` | `hsl(0, 0%, 11%)` | Elevated surface & featured pricing tiers |
| <img src="https://via.placeholder.com/20/2a2a2a/000000?text=+" width="20" height="20" /> | `--hairline` | `#2A2A2A` | `hsl(0, 0%, 16%)` | Structural 1px borders & dividers |
| <img src="https://via.placeholder.com/20/fa823a/000000?text=+" width="20" height="20" /> | `--primary` | `#FA823A` | `hsl(22, 95%, 61%)` | Primary brand accent, active states, key CTAs |
| <img src="https://via.placeholder.com/20/c8682e/000000?text=+" width="20" height="20" /> | `--primary-active` | `#C8682E` | `hsl(22, 63%, 48%)` | Active and pressed accent state |
| <img src="https://via.placeholder.com/20/b8bcc0/000000?text=+" width="20" height="20" /> | `--accent-metallic` | `#B8BCC0` | `hsl(210, 6%, 74%)` | Scoped to the metallic divider light-sweep |
| <img src="https://via.placeholder.com/20/f5f5f3/000000?text=+" width="20" height="20" /> | `--ink` | `#F5F5F3` | `hsl(60, 4%, 96%)` | High-contrast display & headline typography |
| <img src="https://via.placeholder.com/20/c7c7c4/000000?text=+" width="20" height="20" /> | `--ink-secondary` | `#C7C7C4` | `hsl(60, 2%, 78%)` | Secondary body copy & descriptions |
| <img src="https://via.placeholder.com/20/8f8f8c/000000?text=+" width="20" height="20" /> | `--ink-muted` | `#8F8F8C` | `hsl(60, 1%, 56%)` | Captions, stats kickers, and metadata |

---

## 🗺 Minimal Sitemap Widget

The user journey is structured around an intentional narrative arc from initial attention to facility immersion, coaching credibility, and direct conversion.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              SITE HEADER                               │
│  LogoMark Glyph • Intersection Glass Transition • Full-Screen Nav Menu  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                       01. HERO & VALUE PROPOSITION                     │
│  Display Typography • Vignetted Training Canvas • Virtual Tour Modal   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                     02. PROOF STRIP & SIGNATURE DIVIDER                │
│  Operational Metrics • Hardware-Accelerated Metallic Light Sweep       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    03. FACILITIES & TRUST ARCHIVE GRID                 │
│  4-Col Gold's Gym Archive Grid • Pan & Zoom Lightbox (`ImageViewer`)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                     04. COACHING METHODOLOGY & STAFF                   │
│  Minimalist Coach Cards • Credential Tags • Programming Framework      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    05. ATHLETE PROOF & TESTIMONIALS                    │
│  Verified Member Quotes • Transformation Stats • Member Attributions   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    06. MEMBERSHIP TIERS & PRICING                      │
│  Student / Casual / Athlete • Monthly vs Annual Billing Toggle         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    07. STICKY REVEAL PARALLAX FOOTER                   │
│  Live Islamabad Gym Hours • Brand Statement • Dispatch • Coordinates   │
└────────────────────────────────────────────────────────────────────────┘
```

### Global Interactive Modals & Experiences
- **Intro Loader v2**: 5-second cinematic GSAP logo tracing, erase passes, and seamless flight into the header target.
- **Virtual Tour Modal (`TourModal`)**: Accessible Base UI dialog featuring immersive video/photo previews of the gym floor.
- **Lightbox Image Viewer (`ImageViewer`)**: Fullscreen lightbox with smooth mouse drag-to-pan, pinch/scroll zoom, and thumbnail strip navigation.
- **Custom Hardware Scrollbar (`CustomScrollbar`)**: Floating scrub bar with proportional thumb dimensions and idle fade timers.

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|:---|:---|:---|:---|
| **Framework** | [Next.js](https://nextjs.org/) | `16.3.4` | App Router, Turbopack compiler, static generation |
| **Runtime / Library** | [React](https://react.dev/) | `19.2.8` | Concurrent React engine, `useSyncExternalStore` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Strict type safety across components and design tokens |
| **CSS Architecture** | [Tailwind CSS](https://tailwindcss.com/) | `4.x` | `@theme` token bridging, utility engine, zero runtime CSS |
| **Compiler & Bundler** | Next Turbopack | Built-in | Sub-second fast refresh and build compilation |
| **Linter & Analyzer** | [ESLint](https://eslint.org/) | `9.x` | Core Web Vitals, TypeScript ESLint, custom AST rules |

---

## 📚 Libraries Used

| Library | Version | Description & Role |
|:---|:---|:---|
| **[`gsap`](https://gsap.com/)** | `^3.15.0` | Powers the signature intro loader timeline, logo flight handoff, and `ScrollTrigger.batch` section reveals. |
| **[`@base-ui/react`](https://base-ui.com/)** | `^1.7.0` | Accessible, completely unstyled headless primitives (Dialog, Portal, Transitions) for modals and menus. |
| **[`shadcn`](https://ui.shadcn.com/)** | `^4.19.1` | Base primitive foundation adapted into FitLat's token and dark-industrial palette. |
| **[`@hugeicons/react`](https://hugeicons.com/)** | `^1.1.10` | High-quality, stroke-consistent icon suite (`@hugeicons/core-free-icons`). |
| **[`class-variance-authority`](https://cva.style/)** | `^0.7.1` | Type-safe variant configuration for design system components (buttons, badges, cards). |
| **[`clsx`](https://github.com/lukeed/clsx)** | `^2.1.1` | Utility for constructing conditional className strings without overhead. |
| **[`tailwind-merge`](https://github.com/dcastil/tailwind-merge)** | `^3.6.0` | Safely resolves and merges Tailwind utility class conflicts. |
| **[`tw-animate-css`](https://github.com/animate-css)** | `^1.4.0` | Hardware-accelerated CSS keyframe animations for UI micro-interactions. |
| **[`eslint-config-next`](https://nextjs.org/docs/app/building-your-application/configuring/eslint)** | `16.3.4` | Next.js and React 19 recommended linting configurations. |

---

## 📂 Project Structure

```
FitLat/
├── docs/
│   └── design/
│       └── design-system.md       # Architectural specification & token catalog
├── public/
│   ├── images/                    # High-resolution gym floor & portrait assets
│   │   ├── coaches/               # Coach headshots & profiles
│   │   ├── gallery/               # Gym floor, platforms & equipment
│   │   ├── hero/                  # Atmospheric training visuals
│   │   └── testimonials/          # Member transformation & quote avatars
│   └── logo.svg                   # Brand mark vector asset
├── src/
│   ├── app/
│   │   ├── globals.css            # Tailwind v4 @theme, tokens, and CSS reset
│   │   ├── layout.tsx             # Root layout with Inter font and intro loader
│   │   ├── page.tsx               # Production homepage assembly
│   │   └── kitchen-sink/          # Dedicated design system component showcase
│   ├── components/
│   │   ├── fitlat/                # Domain-specific FitLat components
│   │   │   ├── coaches-section.tsx
│   │   │   ├── custom-scrollbar.tsx
│   │   │   ├── gallery-cell.tsx
│   │   │   ├── gallery-grid.tsx
│   │   │   ├── gallery-section.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── image-viewer.tsx
│   │   │   ├── loader.tsx
│   │   │   ├── logo-mark.tsx
│   │   │   ├── menu-toggle.tsx
│   │   │   ├── metallic-divider.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   ├── pricing-card.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   ├── proof-strip.tsx
│   │   │   ├── reveal.tsx
│   │   │   ├── site-footer.tsx
│   │   │   ├── site-header.tsx
│   │   │   ├── stat-tile.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   └── tour-modal.tsx
│   │   └── ui/                    # Base UI & shadcn primitives
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── separator.tsx
│   │       └── skeleton.tsx
│   ├── hooks/
│   │   ├── use-intro-done.ts      # useSyncExternalStore intro listener
│   │   ├── use-intro-reveal.ts    # Latch-synchronized page reveal hook
│   │   └── use-nav-surface.ts     # IntersectionObserver header surface tracker
│   ├── lib/
│   │   ├── intro.ts               # Module-level intro latch & subscriber set
│   │   ├── nav.ts                 # Navigation route definitions
│   │   └── utils.ts               # Utility helpers (cn)
│   └── styles/
│       ├── tokens.css             # Root CSS custom properties
│       └── typography.css         # Fluid clamp typography definitions
├── CHANGELOG.md                   # Keep a Changelog compliant release notes
├── CLAUDE.md                      # Brand guidelines and engineering constraints
├── CONTENT.md                     # Single source of truth for all copy and content
├── eslint.config.mjs              # ESLint flat config with custom AST rules
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies, scripts, and semver version (0.3.0)
└── tailwind.config.js             # Fluid clamp typography scales
```

---

## 🏁 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10+`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/envyxyz/fitlat.git
   cd fitlat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To inspect the isolated component testbed, visit [http://localhost:3000/kitchen-sink](http://localhost:3000/kitchen-sink).

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Start the production server locally:
```bash
npm run start
```

### Code Quality & AST Verification

Run ESLint to verify typography sizes, token compliance, and accessibility:
```bash
npm run lint
```

---

## 📦 Releases & Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for detailed notes on each release.

- **Current Release**: [`v0.3.0`](CHANGELOG.md#030---2026-09-03) (2026-09-03) — Complete homepage launch, virtual tour modal, zoomable lightbox image viewer, parallax sticky footer, and React 19 `useSyncExternalStore` animation pipeline.
- **Previous Releases**:
  - `v0.2.0` (2026-09-02) — Cinematic first-load intro loader with logo trace and shutter choreography.
  - `v0.1.0` (2026-09-02) — Initial Next.js 16 architecture, design token system, and primitive components.

---

## 📄 License

Proprietary. All rights reserved © 2026 FitLat.