"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CopyrightIcon } from "@hugeicons/core-free-icons";
import { LogoMark } from "./logo-mark";
import { content } from "@/content";

const FOOTER_COLUMNS = content.footer.columns;

// The footer's oversized wordmark treatment splits the brand name into two
// stacked halves ("FIT" / "LAT") and, on mobile, one letter per grid cell.
// Both derive from content.site.wordmark rather than being retyped, so the
// treatment stays correct if the wordmark ever changes.
const WORDMARK_FIRST = content.site.wordmark.slice(0, 3);
const WORDMARK_SECOND = content.site.wordmark.slice(3);
const WORDMARK_FIRST_LETTERS = WORDMARK_FIRST.split("");
const WORDMARK_SECOND_LETTERS = WORDMARK_SECOND.split("");

/** Extra trailing width, in `em` of the shared font-size, to leave room
 * for the © badge appended after "LAT" so it never overflows past the
 * fitted line. */
const BADGE_RESERVE_EM = 0.18 /* icon size */ + 0.06 /* its margin-left */;

/** "LAT" renders a touch smaller than "FIT" — purely a visual call, not a
 * fit constraint. */
const LAT_SCALE = 0.9;

/** Solve to fill this fraction of the available width, not all of it —
 * 100% read as stretched/oversized once columns stopped being forced to
 * equal thirds (see below). Purely a visual call. */
const FILL_RATIO = 0.8;

type FitState = { fitSize: number; latSize: number };

/**
 * Mobile/tablet (<768px) FITLAT wordmark — "FIT" stacked over "LAT"+©, one
 * shared 3-column grid (F/L, I/A, T/T per column) so both words share
 * identical column boundaries.
 *
 * Columns are `auto`-width, not equal thirds — each sizes to its own
 * content, so the letters sit at their natural spacing instead of being
 * stretched across the full row with dead air between them.
 *
 * Alignment within each column is chosen per letter-pair, not a blanket
 * center: F and L are both left-stroke letterforms (the vertical stroke
 * sits at the glyph's own left edge, open space to the right), so
 * *centering their bounding boxes* actually shifts F's stroke right of
 * L's — centering is only optically correct for symmetric pairs. Column 1
 * therefore aligns start; columns 2/3 (I/A, T/T — both left-right
 * symmetric) center normally.
 *
 * Font-size comes from measuring the *actual* rendered glyph widths of two
 * invisible, never-mutated reference spans (linear in font-size, so one
 * measurement solves it exactly), capped by a `svh` budget so the block
 * can never grow taller than the footer has room for.
 */
function MobileWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fitMeasureRef = useRef<HTMLSpanElement>(null);
  const latMeasureRef = useRef<HTMLSpanElement>(null);
  const [fit, setFit] = useState<FitState>();

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const fitEl = fitMeasureRef.current;
    const latEl = latMeasureRef.current;
    if (!wrap || !fitEl || !latEl) return;

    const measure = () => {
      const availableWidth = wrap.getBoundingClientRect().width * FILL_RATIO;
      const refSize = parseFloat(getComputedStyle(fitEl).fontSize) || 16;
      const kFit = fitEl.getBoundingClientRect().width / refSize;
      const kLatText = latEl.getBoundingClientRect().width / refSize;

      // Whichever word is proportionally wider per unit of font-size (LAT,
      // once its badge gutter is counted) sets the shared baseline; LAT
      // then scales down a touch from that baseline.
      const widthFit = availableWidth / Math.max(kFit, kLatText + BADGE_RESERVE_EM);
      const heightCap = window.innerHeight * 0.15;
      const fitSize = Math.min(widthFit, heightCap);
      setFit({ fitSize, latSize: fitSize * LAT_SCALE });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    // Self-hosted display font can still be loading at first measurement —
    // re-fit once it's actually painted, or the fit locks in against
    // fallback-font metrics and never corrects itself.
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  const columnGap = fit ? fit.fitSize * 0.02 : undefined;

  return (
    <div ref={wrapRef} className="md:hidden mt-space-h3 w-full flex justify-center select-none overflow-hidden pb-1" aria-hidden="true">
      {/* Invisible, never-mutated reference spans — measured for their
          natural glyph width only, decoupled from the visible grid below. */}
      <span ref={fitMeasureRef} className="absolute invisible whitespace-nowrap font-[850] text-[min(30vw,18svh)]">
        {WORDMARK_FIRST}
      </span>
      <span ref={latMeasureRef} className="absolute invisible whitespace-nowrap font-[850] text-[min(30vw,18svh)]">
        {WORDMARK_SECOND}
      </span>

      <div
        className="relative inline-grid grid-cols-[auto_auto_auto] font-[850] leading-[0.78] text-[min(30vw,18svh)]"
        style={{ columnGap }}
      >
        {/* Row 1 — "FIT", one letter per column; row 2 below shares these
            same 3 column tracks (plain 3-column grid, nothing explicit
            beyond that — an out-of-range explicit placement for the badge
            here would silently grow the grid to 4 *explicit* columns and
            make these auto-placed letters wrap on 4 instead of 3). */}
        <div className="contents" style={fit ? { fontSize: fit.fitSize } : undefined}>
          <span className="justify-self-start">{WORDMARK_FIRST_LETTERS[0]}</span>
          <span className="justify-self-center">{WORDMARK_FIRST_LETTERS[1]}</span>
          <span className="justify-self-center">{WORDMARK_FIRST_LETTERS[2]}</span>
        </div>
        {/* Row 2 — "LAT", same column tracks as row 1 above. */}
        <div className="contents" style={fit ? { fontSize: fit.latSize } : undefined}>
          <span className="justify-self-start">{WORDMARK_SECOND_LETTERS[0]}</span>
          <span className="justify-self-center">{WORDMARK_SECOND_LETTERS[1]}</span>
          <span className="justify-self-center">{WORDMARK_SECOND_LETTERS[2]}</span>
        </div>
        {/* © badge — positioned off the grid itself (100% of its width =
            right after column 3) rather than as a grid item, and vertically
            at row 2's known top (row 1's own height, from the shared
            leading). */}
        <HugeiconsIcon
          icon={CopyrightIcon}
          size="0.18em"
          strokeWidth={1.5}
          style={fit ? { fontSize: fit.latSize, top: fit.fitSize * 0.78 } : undefined}
          className="absolute left-full ml-[0.2em]"
        />
      </div>
    </div>
  );
}

/**
 * Site Footer — Minimal & Practical Parallax Sticky Reveal Footer
 * - Height is driven by `svh` (smallest viewport height) everywhere, not
 *   `dvh`/`vh` — this sizes the footer to fit even when a mobile browser's
 *   URL bar is fully expanded, so the wordmark/© never clips as the bar
 *   collapses/reappears during scroll (iOS Safari + Android Chrome).
 * - Nav columns are auto-width flex (not equal-width grid cells), so the
 *   visual gutters between "Manifesto/Privacy Policy/Twitter" etc. match
 *   the CSS gap instead of the widest cell forcing dead space.
 * - Below `md` (768px) the footer is a full `100svh` panel, physically
 *   overlapping the screen area the fixed header occupies (the header's
 *   z-index just draws over it) — `pt-[88px]` is that header's 72px height
 *   plus a 16px gap, not decorative spacing, so it must stay flat across
 *   the whole <md range rather than shrinking at `sm`. At `md`+ the footer
 *   is only the bottom 55vh of the viewport and never reaches the header,
 *   so `pt-10` there is ordinary breathing room, unrelated to the header.
 * - FITLAT wordmark: one centered line ≥`md` (`13vw`, capped 195px,
 *   unchanged from the original desktop-only value); below `md`,
 *   `MobileWordmark` measures "FIT" and "LAT"+© to solve one shared,
 *   centered font-size instead of guessing with a multiplier.
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
        <div className="relative z-10 flex h-full w-full max-w-[1440px] flex-col justify-between mx-auto px-space-body-lg lg:px-xxl pt-[88px] md:pt-10 pb-[max(1rem,env(safe-area-inset-bottom,1rem))] md:pb-2">
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

          <MobileWordmark />

          {/* Bottom: FITLAT © wordmark — desktop only, ≥md */}
          <div className="hidden md:flex mt-auto w-full justify-center select-none overflow-hidden pb-1" aria-hidden="true">
            <p className="relative flex items-baseline font-[850] leading-[0.78] tracking-[-0.035em] text-[min(13vw,195px)] pr-[0.22em]">
              <span>{WORDMARK_FIRST}</span>
              <span className="relative">
                {WORDMARK_SECOND}
                <HugeiconsIcon
                  icon={CopyrightIcon}
                  size="0.18em"
                  strokeWidth={1.5}
                  className="absolute left-full top-0 ml-[0.06em]"
                />
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
