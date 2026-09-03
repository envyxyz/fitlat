"use client";

import { LogoMark } from "./logo-mark";

/**
 * Site Footer — Minimal & Practical Parallax Sticky Reveal Footer
 * Refinements:
 * - Desktop height: 55vh (min-h: 440px)
 * - Parallel & equal-height top row: left text (decreased) matches link columns (increased size & gap)
 * - Desktop FITLAT wordmark: 100% center-aligned with copyright mark pinned next to the top of the T
 * - Copyright circle: C glyph mathematically centered via dominantBaseline="central"
 * - Mobile: 100dvh with header clearance and 2-line responsive wordmark
 */
export function SiteFooter() {
  return (
    <footer
      id="visit"
      data-nav-surface="canvas-soft"
      aria-label="Site footer"
      className="relative w-full h-[100svh] min-h-[100svh] md:h-[55vh] md:min-h-[440px] overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[100svh] min-h-[100svh] md:h-[55vh] md:min-h-[440px] bg-canvas text-ink-secondary flex flex-col justify-between overflow-hidden">
        {/* Seamless Ultra-Subtle Granite Texture Overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/textures/granite-seamless.jpg')] bg-repeat bg-[size:500px_500px] opacity-[0.07] mix-blend-screen pointer-events-none"
          aria-hidden="true"
        />

        {/* Inner Content Container — incorporates safe-area-inset-bottom for mobile browser toolbars */}
        <div className="relative z-10 flex flex-col justify-between h-full max-w-[1440px] mx-auto w-full px-space-body-lg md:px-lg lg:px-xxl pt-[76px] sm:pt-[92px] md:pt-10 pb-[max(1rem,env(safe-area-inset-bottom,1rem))] md:pb-2">
          {/* Top Section: Fitlat Logo + Tagline (Left) & Navigation (Right) — parallel & equal in height */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-y-4 sm:gap-y-space-h2 w-full">
            {/* Left: Fitlat Brand LogoMark & Headline */}
            <div className="flex flex-col items-start text-left">
              {/* Fitlat Logo */}
              <div
                className="size-8 sm:size-9 md:size-7 flex items-center justify-start text-primary"
                aria-hidden="true"
              >
                <LogoMark className="size-full" />
              </div>

              {/* Tagline tailored to Fitlat */}
              <h2 className="mt-2 text-xl sm:text-h4 md:text-[21px] lg:text-[22px] font-medium tracking-tight text-ink leading-[1.3] [text-wrap:unset] max-w-none text-left">
                <span className="block whitespace-nowrap">Fitlat is the standard</span>
                <span className="block whitespace-nowrap">you’ve been training for.</span>
              </h2>
            </div>

            {/* Right: Navigation Grid — 3 side-by-side columns on mobile to conserve vertical space */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:gap-space-h1 lg:gap-space-h2">
              {/* Column 1: USEFUL */}
              <div className="flex flex-col gap-1.5 sm:gap-3">
                <span className="text-[11px] sm:text-caption text-caps text-ink-muted font-semibold tracking-wider">
                  USEFUL
                </span>
                <ul className="flex flex-col space-y-1.5 sm:space-y-2.5 text-sm sm:text-body-lg text-ink-secondary">
                  <li>
                    <a
                      href="#about"
                      className="hover:text-ink transition-colors duration-[var(--duration-fast)]"
                    >
                      Manifesto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#coaches"
                      className="hover:text-ink transition-colors duration-[var(--duration-fast)]"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: LEGAL */}
              <div className="flex flex-col gap-1.5 sm:gap-3">
                <span className="text-[11px] sm:text-caption text-caps text-ink-muted font-semibold tracking-wider">
                  LEGAL
                </span>
                <ul className="flex flex-col space-y-1.5 sm:space-y-2.5 text-sm sm:text-body-lg text-ink-secondary">
                  <li>
                    <a
                      href="#"
                      className="hover:text-ink transition-colors duration-[var(--duration-fast)]"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-ink transition-colors duration-[var(--duration-fast)]"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: UPDATES */}
              <div className="flex flex-col gap-1.5 sm:gap-3">
                <span className="text-[11px] sm:text-caption text-caps text-ink-muted font-semibold tracking-wider">
                  UPDATES
                </span>
                <ul className="flex flex-col space-y-1.5 sm:space-y-2.5 text-sm sm:text-body-lg text-ink-secondary">
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink transition-colors duration-[var(--duration-fast)]"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink transition-colors duration-[var(--duration-fast)]"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section - Mobile (<md): Full-Width 2-Line FIT / LAT © Wordmark */}
          <div className="md:hidden w-full mt-auto select-none overflow-hidden pb-1" aria-hidden="true">
            <svg
              viewBox="0 0 360 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-h-[26svh] text-ink-secondary overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* FIT line */}
              <text
                x="0"
                y="100"
                fontFamily="var(--font-sans), Inter, system-ui, -apple-system, sans-serif"
                fontSize="125"
                fontWeight="800"
                letterSpacing="-0.04em"
                fill="currentColor"
              >
                FIT
              </text>

              {/* LAT line */}
              <text
                x="0"
                y="215"
                fontFamily="var(--font-sans), Inter, system-ui, -apple-system, sans-serif"
                fontSize="125"
                fontWeight="800"
                letterSpacing="-0.04em"
                fill="currentColor"
              >
                LAT
              </text>

              {/* Copyright Symbol — centered C inside circle, aligned to top of T */}
              <g transform="translate(255, 125)">
                <circle
                  cx="13"
                  cy="13"
                  r="11"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  fill="none"
                />
                <text
                  x="13"
                  y="13"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
                  fontSize="12"
                  fontWeight="700"
                  fill="currentColor"
                >
                  C
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Section - Desktop (≥md): Center-Aligned FITLAT Wordmark with Centered Copyright Icon */}
          <div className="hidden md:flex w-full mt-auto items-end justify-center select-none overflow-hidden pb-1" aria-hidden="true">
            <div className="relative inline-flex items-center justify-center">
              {/* Perfectly Center-Aligned FITLAT Wordmark */}
              <span className="font-sans font-[850] text-[13vw] 2xl:text-[195px] tracking-[-0.035em] leading-[0.78] text-ink-secondary text-center">
                FITLAT
              </span>

              {/* Copyright Badge — pinned next to the top vertical line of the T */}
              <div className="absolute left-[calc(100%+8px)] lg:left-[calc(100%+12px)] top-[14%] -translate-y-1/2">
                <svg
                  className="size-6 lg:size-7 xl:size-8 text-ink-secondary"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <text
                    x="18"
                    y="18"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
                    fontSize="17"
                    fontWeight="700"
                    fill="currentColor"
                  >
                    C
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Hidden Semantic Tag for Screen Readers & SEO */}
          <span className="sr-only">
            FITLAT © — All rights reserved. Strength and conditioning gym.
          </span>
        </div>
      </div>
    </footer>
  );
}
