"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { LOGO_HEAD_PATH, LOGO_BODY_PATH, LOGO_PATH } from "./logo-mark";
import { markIntroDone, markFlightStarted, resetIntroDone, resetFlightStarted } from "@/lib/intro";

gsap.registerPlugin(CustomEase);
// Mirrors --motion-ease exactly, so the flight lands on the same curve as
// everything else — the loader is the site's one documented exception on
// *duration* (see tokens.css), not on easing.
CustomEase.create("fitlatEase", "M0,0 C0.22,1 0.36,1 1,1");

/**
 * The site's one signature animated moment (see design-system.md "Motion").
 * A single ~4s GSAP timeline, once per browser session, first tab-open only:
 *
 *   settle → trace (erase) → trace (erase) → trace (draws and stays)
 *   → hold → flight to the header → handoff
 *
 * The trace is a continuous, constant-velocity motion — no easing stops, no
 * gaps, no dead-beat between passes. Two sub-shapes (head circle + body) are
 * traced as separate `<path>` elements in lockstep, so their progress is
 * normalized to each shape's own length. This kills the teleport seam that
 * the combined path produces (the circle is ~17% of total length, so the
 * jump between subpaths is very visible).
 *
 * Head/tail are independent scalars driven from a single `{progress}` proxy.
 * The visible arc is rendered per-frame as a computed stroke-dasharray of:
 *
 *   0 <tail> <head−tail> <rest>
 *
 * with dashoffset fixed at 0. This form expresses any arc — including
 * wrap-around — with no reset seam or technique change between passes.
 * The final pass is identical to the erase passes except the tail stops
 * following; the stroke accumulates and is left standing.
 *
 * The header bar slides down concurrently with the flight (`markFlightStarted`
 * → `useIntroFlight` in `SiteHeader`) so it is already in place when the mark
 * arrives. `markIntroDone` fires on flight completion to trigger the header
 * logo crossfade. Scroll is locked for the full run and released on landing.
 */

const SESSION_KEY = "fitlat-loader-shown";
const FLIGHT_EASE = "fitlatEase";

/** All intro timing constants in one place (total = 4.00s) — edit here to retune. */
const INTRO = {
  settleDuration: 0.25,   // fade-in from scale 0.94
  lapDuration: 1.00,      // each of the 2 erase laps (constant velocity)
  finalLapDuration: 0.95, // draw-and-stay lap
  holdDuration: 0.20,     // brief pause before flight
  flightDuration: 0.60,   // mark flies to header
  /** Trailing arc length as a fraction of the full path length. */
  trailRatio: 0.15,
  /** Cap on trailing arc so very long paths don't produce an oversized trail. */
  trailMax: 60,
} as const;

const REDUCED_MOTION_HOLD = 400;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Apply dasharray/dashoffset to render the arc [headFrac … tailFrac] on a
 * path of `length` px. Both fractions are in [0, 1] with head ≥ tail.
 *
 * Uses `strokeDashoffset = -tail` with a single dash of `head - tail` followed
 * by a large gap. This completely eliminates the zero-length initial dash that
 * previously caused visible dot artifacts at path origins under `stroke-linecap: round`.
 */
function applyArc(el: SVGPathElement, length: number, headFrac: number, tailFrac: number) {
  const head = headFrac * length;
  const tail = tailFrac * length;
  const arcLen = head - tail;

  if (arcLen <= 0.001) {
    el.style.opacity = "0";
    el.style.strokeDasharray = `0 ${length * 3}`;
    el.style.strokeDashoffset = "0";
    return;
  }

  el.style.opacity = "1";
  el.style.strokeDasharray = `${arcLen} ${length * 3}`;
  el.style.strokeDashoffset = `${-tail}`;
}

export function Loader() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  const markWrapRef = useRef<HTMLDivElement>(null);
  const headPathRef = useRef<SVGPathElement>(null);
  const bodyPathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGSVGElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!shouldRender) {
      markFlightStarted();
      markIntroDone();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const preventScroll = (event: Event) => event.preventDefault();
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    const releaseScroll = () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };

    const finish = () => {
      releaseScroll();
      setShouldRender(false);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headPath = headPathRef.current;
    const bodyPath = bodyPathRef.current;

    if (reduceMotion || !headPath || !bodyPath) {
      markFlightStarted();
      markIntroDone();
      const t = window.setTimeout(finish, REDUCED_MOTION_HOLD);
      return () => {
        window.clearTimeout(t);
        releaseScroll();
        // React StrictMode's dev-only double-invoke (setup → cleanup → setup)
        // must produce a real run on its second pass, not see its own first
        // pass's flag and bail out instantly.
        sessionStorage.removeItem(SESSION_KEY);
        resetIntroDone();
        resetFlightStarted();
      };
    }

    const headLen = headPath.getTotalLength();
    const bodyLen = bodyPath.getTotalLength();
    const headTrail = Math.min(INTRO.trailMax, headLen * INTRO.trailRatio);
    const bodyTrail = Math.min(INTRO.trailMax, bodyLen * INTRO.trailRatio);

    // Start both paths fully hidden.
    applyArc(headPath, headLen, 0, 0);
    applyArc(bodyPath, bodyLen, 0, 0);

    // `gsap.context` scopes every tween/timeline created inside it so a
    // single `.revert()` on unmount kills all of them, mid-flight or not.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      // ── Settle ──────────────────────────────────────────────────────────────
      tl.set(markWrapRef.current, { opacity: 0, scale: 0.94 });
      tl.to(markWrapRef.current, {
        opacity: 1,
        scale: 1,
        duration: INTRO.settleDuration,
        ease: "power2.out",
      });

      // ── Two erase laps (constant velocity, no gaps) ──────────────────────────
      // Each lap: the head sweeps from 0→1 at constant speed. The tail trails
      // behind by `trailRatio`, clamped so it never overshoots the head.
      // After each lap the arc is reset to 0 with no seam (dashoffset never
      // changes — only the dasharray values do).
      for (let lap = 0; lap < 2; lap++) {
        const proxy = { p: 0 };
        tl.to(proxy, {
          p: 1,
          duration: INTRO.lapDuration,
          ease: "none", // constant velocity — the single biggest fix for "pre-recorded" feel
          onUpdate() {
            const h = proxy.p;
            const t = Math.max(0, h - headTrail / headLen);
            applyArc(headPath, headLen, h, t);
            const tb = Math.max(0, h - bodyTrail / bodyLen);
            applyArc(bodyPath, bodyLen, h, tb);
          },
          onComplete() {
            // Reset to hidden for the next lap without a visible seam.
            applyArc(headPath, headLen, 0, 0);
            applyArc(bodyPath, bodyLen, 0, 0);
          },
        });
      }

      // ── Final lap: draw and stay ─────────────────────────────────────────────
      // Identical motion to the erase laps, except the tail is frozen at 0 for
      // the entire duration — the stroke accumulates behind the head and stays.
      // No technique change, no dasharray swap, same constant velocity.
      {
        const proxy = { p: 0 };
        tl.to(proxy, {
          p: 1,
          duration: INTRO.finalLapDuration,
          ease: "none",
          onUpdate() {
            const h = proxy.p;
            // tail = 0: the arc always starts at 0, growing as head advances
            applyArc(headPath, headLen, h, 0);
            applyArc(bodyPath, bodyLen, h, 0);
          },
        });
      }

      // ── Hold ─────────────────────────────────────────────────────────────────
      tl.to({}, { duration: INTRO.holdDuration });

      // ── Flight ───────────────────────────────────────────────────────────────
      tl.add(() => {
        const candidates = Array.from(
          document.querySelectorAll<HTMLElement>("[data-intro-logo-target]")
        );
        const target = candidates.find((el) => el.offsetParent !== null) ?? candidates[0];
        const wrap = markWrapRef.current;
        if (!target || !wrap) {
          markFlightStarted();
          markIntroDone();
          return;
        }

        // The header uses the Tailwind v4 standalone `translate` CSS property
        // (not `transform`) for its slide. Both must be neutralised before
        // measuring, otherwise getBoundingClientRect() returns the off-screen
        // position and the mark flies to the wrong spot.
        const header = target.closest<HTMLElement>("header");
        const prevHeaderTransform = header?.style.transform ?? "";
        const prevHeaderTranslate = header?.style.translate ?? "";
        const prevHeaderTransition = header?.style.transition ?? "";
        if (header) {
          header.style.transition = "none";
          header.style.transform = "none";
          header.style.translate = "none";
          void header.offsetHeight; // force reflow so measurement is correct
        }

        const targetRect = target.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();

        if (header) {
          header.style.transform = prevHeaderTransform;
          header.style.translate = prevHeaderTranslate;
          void header.offsetHeight; // force reflow before restoring transition
          header.style.transition = prevHeaderTransition;
        }

        const scale = targetRect.width / wrapRect.width;
        const dx = targetRect.left + targetRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
        const dy = targetRect.top + targetRect.height / 2 - (wrapRect.top + wrapRect.height / 2);

        // Signal the header to start its slide-down now (concurrent with flight).
        markFlightStarted();

        // Add will-change for compositor promotion during flight only.
        wrap.style.willChange = "transform";

        gsap.to(wrap, {
          x: dx,
          y: dy,
          scale,
          duration: INTRO.flightDuration,
          ease: FLIGHT_EASE,
          onComplete() {
            wrap.style.willChange = "";
            markIntroDone(); // triggers header logo crossfade
          },
        });
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: INTRO.flightDuration,
          ease: FLIGHT_EASE,
        });
        // Stroke fades out in the first ~60% of the flight.
        gsap.to([headPath, bodyPath], {
          opacity: 0,
          duration: INTRO.flightDuration * 0.6,
          ease: FLIGHT_EASE,
        });
        // Fill fades in from 30% of the flight onward — true crossfade.
        gsap.to(fillRef.current, {
          opacity: 1,
          duration: INTRO.flightDuration * 0.6,
          delay: INTRO.flightDuration * 0.3,
          ease: FLIGHT_EASE,
        });
      });

      // Holds `tl` open — and `finish()` (its onComplete) back — until the
      // flight tweens above have visually landed and the header logo crossfade
      // has caught up. No fixed HANDOFF_HOLD; we just wait for the flight.
      tl.to({}, { duration: INTRO.flightDuration });
    });

    return () => {
      ctx.revert();
      releaseScroll();
      sessionStorage.removeItem(SESSION_KEY);
      resetIntroDone();
      resetFlightStarted();
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-[100]">
      <span className="sr-only">Loading Fitlat</span>

      <div ref={backdropRef} aria-hidden="true" className="absolute inset-0 bg-canvas motion-reduce:hidden" />
      <div aria-hidden="true" className="hidden motion-reduce:block absolute inset-0 bg-canvas" />

      <div className="relative flex size-full items-center justify-center">
        <div
          ref={markWrapRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="pointer-events-none relative size-24 motion-reduce:hidden"
        >
          {/* Two separate stroked paths — head circle and body — traced in
              lockstep. Progress is normalised to each path's own length so
              they start and finish together. This eliminates the teleport
              seam that the combined path produces between the circle end and
              the body start (~17% of total length = very visible jump). */}
          <svg viewBox="0 0 150 150" className="absolute inset-0 size-full" fill="none">
            <path
              ref={headPathRef}
              d={LOGO_HEAD_PATH}
              stroke="var(--primary)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0 }}
            />
            <path
              ref={bodyPathRef}
              d={LOGO_BODY_PATH}
              stroke="var(--primary)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0 }}
            />
          </svg>
          {/* Fill version fades in during the flight (stroke-to-fill crossfade). */}
          <svg
            ref={fillRef}
            viewBox="0 0 150 150"
            className="absolute inset-0 size-full opacity-0"
            fill="var(--primary)"
          >
            <path d={LOGO_PATH} />
          </svg>
        </div>

        {/* Reduced-motion: show the filled mark immediately, no trace. */}
        <svg
          viewBox="0 0 150 150"
          aria-hidden="true"
          className="hidden size-24 motion-reduce:block"
          fill="var(--primary)"
        >
          <path d={LOGO_PATH} />
        </svg>
      </div>
    </div>
  );
}
