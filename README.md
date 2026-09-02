<div align="center">

# FITLAT

**Train like it matters.**

[![Version](https://img.shields.io/badge/version-0.1.0-orange.svg?style=flat-square)](CHANGELOG.md)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Private-red.svg?style=flat-square)](#)

A high-performance, responsive marketing website and design system for **FitLat** — a premier strength and conditioning facility based in Islamabad.

[Features](#-features) • [Design System](#-design-system) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Changelog](#-changelog)

</div>

---

## ⚡ Overview

FitLat is designed for athletes, students, and working professionals who train with purpose. Built with a restrained, physical, and industrial aesthetic, the site provides a seamless, content-driven experience that puts the training floor and coaching methodology front and center.

### Key Philosophy
- **Physical & Restrained**: Built on a solid near-black canvas (`#0A0A0A`) with a single high-contrast primary accent (`#FA823A`).
- **Performance First**: Built on Next.js 16 with Turbopack for instant rendering and optimized static generation.
- **Accessibility & Motion Discipline**: Strict motion limits with full `prefers-reduced-motion` compliance across all interactions.
- **Token-Driven Architecture**: Fully typed CSS custom properties bridged into Tailwind CSS v4 `@theme` with custom ESLint AST enforcement.

---

## 🚀 Features

- **Hero & Value Proposition**: High-impact headlines with fluid grotesk typography and direct call-to-action pathways.
- **Proof Strip & Signature Divider**: Real metric indicators coupled with a brushed-steel `MetallicDivider` featuring a hardware-accelerated light-sweep interaction.
- **Gym Floor & Facility Gallery**: Showcase of lifting platforms, turf sled tracks, recovery suites, and training bays.
- **Coaches & Programming**: Minimalist profile cards highlighting coach backgrounds, credentials, and programming blocks.
- **Member Testimonials**: Verified floor reviews and real member stories.
- **Tiered Membership System**: Transparent pricing structures covering Student, Casual, and Professional Athlete tiers.
- **Automated Design Enforcement**: Custom ESLint rules that prevent arbitrary pixel sizes, hardcoded hex values, and accessible focus omissions.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | React framework with Turbopack and static page prerendering |
| **Core** | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) | Type-safe modern React architecture |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first `@theme` utility engine with custom token bridging |
| **Primitives** | [Base UI](https://base-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) | Accessible, unstyled headless UI primitives |
| **Icons** | [Hugeicons React](https://hugeicons.com/) | Clean, stroke-consistent icon suite |
| **Code Quality** | [ESLint 9](https://eslint.org/) | Static analysis with custom AST design-token verification |

---

## 🎨 Design System

Complete documentation for tokens, primitives, and extension rules is available in [`docs/design/design-system.md`](docs/design/design-system.md).

### Color Tokens
- `canvas` (`#0A0A0A`) — Deep page background
- `surface` (`#161616`) — Card and input background
- `surface-card` (`#1C1C1C`) — Elevated surfaces & featured tier cards
- `hairline` (`#2A2A2A`) — 1px structural borders & dividers
- `primary` (`#FA823A`) — Single structural accent for CTAs, active states, and highlights
- `ink` (`#F5F5F3`) — High-contrast primary typography

### Typography & Spacing
- **Typography Scale**: Fluid `clamp()` scale configured in [`src/styles/typography.css`](src/styles/typography.css) and [`tailwind.config.js`](tailwind.config.js) (`text-h1` through `text-h4`, `text-body`, `text-small`, `text-caption`).
- **Motion Spec**: Single cubic-bezier easing curve (`ease-fitlat: cubic-bezier(0.22, 1, 0.36, 1)`) with fast (200ms) and slow (600ms) durations.

---

## 📂 Project Structure

```
FitLat/
├── docs/
│   └── design/
│       └── design-system.md       # Design system documentation & token catalog
├── public/                        # Static assets & icons
├── src/
│   ├── app/
│   │   ├── globals.css            # Global CSS, Tailwind v4 @theme, and token bridges
│   │   ├── layout.tsx             # Root layout with Inter font configuration
│   │   └── page.tsx               # Design system showcase and landing view
│   ├── components/
│   │   ├── fitlat/                # Domain-specific FitLat components
│   │   │   ├── badge-pill.tsx     # Uppercase kicker badges
│   │   │   ├── coach-card.tsx     # Coach profile card
│   │   │   ├── feature-card.tsx   # Facility gallery card
│   │   │   ├── metallic-divider.tsx # Brushed-steel animated divider
│   │   │   ├── pricing-card.tsx   # Membership tier card
│   │   │   ├── stat-tile.tsx      # Numerical proof metric tile
│   │   │   └── testimonial-card.tsx # Member review card
│   │   └── ui/                    # Base UI / shadcn primitives
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── separator.tsx
│   ├── lib/
│   │   └── utils.ts               # Class name merging utility (clsx + tailwind-merge)
│   └── styles/
│       ├── tokens.css             # CSS custom properties for color, shape, motion, space
│       └── typography.css         # Font definitions and text tracking utilities
├── CHANGELOG.md                   # Version history and release notes
├── CLAUDE.md                      # Brand rules, constraints, and project memory
├── CONTENT.md                     # Source of truth for all copy & section content
├── eslint.config.mjs              # ESLint flat config with custom token enforcement rules
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies and scripts
└── tailwind.config.js             # Fluid clamp type scale configuration
```

---

## 🏁 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`

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

Start the Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run start
```

### Code Quality & Linting

Run ESLint to check for syntax and design-system compliance:
```bash
npm run lint
```

---

## 📦 Releases & Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for detailed release notes and migration guides.

- **Current Version**: `v0.1.0` (2026-09-02) — Next.js 16 architecture, design token system, UI primitives, and domain component library.
- **Previous**: `v0.1-pre-beta` (2026-09-01) — Initial repository scaffolding.

---

## 📄 License

Proprietary. All rights reserved © 2026 FitLat.