"use client";

import { LogoMark } from "./logo-mark";

/**
 * Site Footer — Minimal & Practical Parallax Sticky Reveal Footer
 * Features:
 * - Desktop: ~45vh (<50%), single-line full-width FITLAT ©
 * - Phone: 100dvh, 96px top clearance (immune to fixed header overlap)
 * - Enlarged flush-left brand logo and tailored subtext
 * - Consistent 2em vertical spacing between mobile navigation sections
 * - Massive, proportional 2-line FIT / LAT © wordmark filling mobile width
 * - Perfectly centered vector copyright badge
 */
export function SiteFooter() {
  return (
    <footer
      id="visit"
      data-nav-surface="canvas-soft"
      aria-label="Site footer"
      className="relative w-full h-[100dvh] md:h-[45vh] md:min-h-[380px] md:max-h-[460px] overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[100dvh] md:h-[45vh] md:min-h-[380px] md:max-h-[460px] bg-canvas text-ink-secondary flex flex-col justify-between overflow-hidden">
        {/* Seamless Ultra-Subtle Granite Texture Overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/textures/granite-seamless.jpg')] bg-repeat bg-[size:500px_500px] opacity-[0.07] mix-blend-screen pointer-events-none"
          aria-hidden="true"
        />

        {/* Inner Content Container with 96px top headroom on mobile to clear fixed header */}
        <div className="relative z-10 flex flex-col justify-between h-full max-w-[1440px] mx-auto w-full px-space-body-lg md:px-lg lg:px-xxl pt-[92px] sm:pt-[96px] md:pt-space-h2 pb-space-sm md:pb-space-small">
          {/* Top Section: Fitlat Logo + Tagline & Navigation */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-y-space-h2 w-full">
            {/* Left: Fitlat Brand LogoMark & Headline */}
            <div className="flex flex-col items-start text-left">
              {/* Fitlat Logo (Enlarged and flush-left) */}
              <div
                className="size-10 md:size-8 flex items-center justify-start text-primary"
                aria-hidden="true"
              >
                <LogoMark className="size-full" />
              </div>

              {/* Tagline tailored to Fitlat */}
              <h2 className="mt-space-sm text-h4 sm:text-h3 font-medium tracking-tight text-ink leading-snug [text-wrap:unset] max-w-none text-left">
                <span className="block whitespace-nowrap">Fitlat is the standard</span>
                <span className="block whitespace-nowrap">you’ve been training for.</span>
              </h2>
            </div>

            {/* Right: Navigation Grid (Consistent 2em vertical spacing on mobile) */}
            <div className="flex flex-col gap-y-space-h2 sm:grid sm:grid-cols-3 sm:gap-space-h1 lg:gap-space-h2">
              {/* Column 1: USEFUL */}
              <div className="flex flex-col gap-space-xs">
                <span className="text-caption text-caps text-ink-muted font-medium">
                  USEFUL
                </span>
                <ul className="flex flex-col space-y-space-xs text-body text-ink-secondary">
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
              <div className="flex flex-col gap-space-xs">
                <span className="text-caption text-caps text-ink-muted font-medium">
                  LEGAL
                </span>
                <ul className="flex flex-col space-y-space-xs text-body text-ink-secondary">
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
              <div className="flex flex-col gap-space-xs">
                <span className="text-caption text-caps text-ink-muted font-medium">
                  UPDATES
                </span>
                <ul className="flex flex-col space-y-space-xs text-body text-ink-secondary">
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
          <div className="md:hidden w-full mt-auto select-none overflow-hidden pb-space-xs" aria-hidden="true">
            <svg
              viewBox="0 0 360 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-ink-secondary overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* FIT line */}
              <text
                x="0"
                y="110"
                fontFamily="var(--font-sans), Inter, system-ui, -apple-system, sans-serif"
                fontSize="135"
                fontWeight="800"
                letterSpacing="-0.04em"
                fill="currentColor"
              >
                FIT
              </text>

              {/* LAT line */}
              <text
                x="0"
                y="235"
                fontFamily="var(--font-sans), Inter, system-ui, -apple-system, sans-serif"
                fontSize="135"
                fontWeight="800"
                letterSpacing="-0.04em"
                fill="currentColor"
              >
                LAT
              </text>

              {/* Perfectly Center-Aligned Copyright Symbol beside LAT */}
              <g transform="translate(295, 175)">
                <circle
                  cx="25"
                  cy="25"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                />
                <text
                  x="25"
                  y="32"
                  textAnchor="middle"
                  fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
                  fontSize="22"
                  fontWeight="800"
                  fill="currentColor"
                >
                  C
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Section - Desktop (≥md): Single-Line Full-Width FITLAT © Wordmark */}
          <div className="hidden md:block w-full mt-auto select-none overflow-hidden" aria-hidden="true">
            <svg
              viewBox="0 0 1440 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-ink-secondary overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Proportional FITLAT text */}
              <text
                x="0"
                y="155"
                fontFamily="var(--font-sans), Inter, system-ui, -apple-system, sans-serif"
                fontSize="195"
                fontWeight="800"
                letterSpacing="-0.035em"
                fill="currentColor"
              >
                FITLAT
              </text>

              {/* Circled Copyright Icon beside the last T */}
              <g transform="translate(1290, 18)">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <text
                  x="32"
                  y="41"
                  textAnchor="middle"
                  fontFamily="var(--font-sans), Inter, system-ui, sans-serif"
                  fontSize="30"
                  fontWeight="800"
                  fill="currentColor"
                >
                  C
                </text>
              </g>
            </svg>
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
