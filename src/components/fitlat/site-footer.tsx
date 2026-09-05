"use client";

import { LogoMark } from "./logo-mark";
import { content } from "@/content";

const FOOTER_COLUMNS = content.footer.columns;

/**
 * Site Footer — Minimal & Practical Parallax Sticky Reveal Footer
 * - Height is driven by `svh` (smallest viewport height) everywhere, not
 *   `dvh`/`vh` — this sizes the footer to fit even when a mobile browser's
 *   URL bar is fully expanded, so the wordmark/© never clips as the bar
 *   collapses/reappears during scroll (iOS Safari + Android Chrome).
 * - Nav columns are auto-width flex (not equal-width grid cells), so the
 *   visual gutters between "Manifesto/Privacy Policy/Twitter" etc. match
 *   the CSS gap instead of the widest cell forcing dead space.
 * - One FITLAT wordmark markup for every breakpoint instead of swapping to a
 *   different SVG at `md`. Below `sm` (640px) "LAT" + © wrap to a second
 *   line, sized to fill the line (`30vw`, `18svh`-capped so a short
 *   landscape viewport can't force a clip); at `sm` and up it's one line,
 *   center-aligned, sized `13vw` capped at 195px (identical to the old
 *   desktop-only value) with the copyright badge folded into the optical
 *   center via `pr`.
 */
export function SiteFooter() {
  return (
    <footer
      id="visit"
      data-nav-surface="canvas-soft"
      aria-label="Site footer"
      className="relative w-full h-[100svh] md:h-[55vh] md:min-h-[440px] overflow-hidden"
      // `overflow-hidden` above does NOT clip the `position: fixed` child
      // below — only `clip-path` does. This identity-rect clip is what
      // makes the sticky-reveal parallax work; do not replace it with
      // `contain: paint` (that would make this element a containing block
      // for the fixed child and break the parallax outright).
      style={{ clipPath: "inset(0)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[100svh] md:h-[55vh] md:min-h-[440px] overflow-hidden bg-canvas text-ink-secondary before:absolute before:inset-0 before:bg-[url('/images/textures/granite-seamless.jpg')] before:bg-repeat before:bg-[size:500px_500px] before:opacity-[0.07] before:mix-blend-screen before:content-['']">
        {/* Inner Content Container — incorporates safe-area-inset-bottom for mobile browser toolbars */}
        <div className="relative z-10 flex h-full w-full max-w-[1440px] flex-col justify-between mx-auto px-space-body-lg lg:px-xxl pt-[76px] sm:pt-[92px] md:pt-10 pb-[max(1rem,env(safe-area-inset-bottom,1rem))] md:pb-2">
          {/* Top Section: Fitlat Logo + Tagline (Left) & Navigation (Right) */}
          <div className="flex flex-col gap-y-4 sm:gap-y-space-h2 md:flex-row md:items-start md:justify-between md:gap-x-space-h3 lg:gap-x-space-h1">
            {/* Left: Fitlat Brand LogoMark & Headline */}
            <div className="flex flex-col items-start">
              <div className="size-8 sm:size-9 md:size-7 text-primary" aria-hidden="true">
                <LogoMark className="size-full" />
              </div>

              <h2 className="mt-2 text-xl sm:text-h4 md:text-[21px] lg:text-[22px] font-medium tracking-tight text-ink leading-[1.3] [text-wrap:unset] max-w-none">
                {content.footer.headlineLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Right: Navigation — auto-width columns, 3 stacked rows on phone */}
            <nav aria-label="Footer" className="flex flex-col gap-y-space-h4 md:flex-row md:gap-x-space-h3 lg:gap-x-space-h1">
              {FOOTER_COLUMNS.map((column) => {
                const headingId = `footer-heading-${column.heading.toLowerCase()}`;
                return (
                  <div key={column.heading} className="flex flex-col gap-1.5 sm:gap-3">
                    <span id={headingId} className="text-[11px] sm:text-caption text-caps text-ink-muted font-semibold">
                      {column.heading}
                    </span>
                    <ul aria-labelledby={headingId} className="flex flex-col space-y-1.5 sm:space-y-2.5 text-sm sm:text-body-lg">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="transition-colors duration-[var(--duration-fast)] hover:text-ink focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom: FITLAT © wordmark — one line ≥sm, wraps to two below it */}
          <div className="mt-auto flex w-full justify-start sm:justify-center select-none overflow-hidden pb-1" aria-hidden="true">
            <p className="relative inline-flex flex-wrap items-baseline font-[850] leading-[0.78] tracking-[-0.035em] text-[min(30vw,18svh)] sm:text-[min(13vw,195px)] sm:pr-[0.22em]">
              <span>FIT</span>
              <span className="relative block w-full sm:inline sm:w-auto">
                LAT
                <svg
                  viewBox="0 0 36 36"
                  className="absolute left-full top-[0.1em] ml-[0.06em] size-[0.17em]"
                >
                  <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="3" fill="none" />
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
              </span>
            </p>
          </div>

          {/* Hidden Semantic Tag for Screen Readers & SEO */}
          <span className="sr-only">{content.footer.legalLine}</span>
        </div>
      </div>
    </footer>
  );
}
