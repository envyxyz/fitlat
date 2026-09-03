"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { LOGO_PATH } from "./logo-mark";
import { markIntroDone, resetIntroDone } from "@/lib/intro";

gsap.registerPlugin(CustomEase);
// Mirrors --motion-ease exactly, so the flight lands on the same curve as
// everything else — the loader is the site's one documented exception on
// *duration* (see tokens.css), not on easing.
CustomEase.create("fitlatEase", "M0,0 C0.22,1 0.36,1 1,1");

/**
 * The site's one signature animated moment (see design-system.md "Motion").
 * A single ~5s GSAP timeline, once per browser session, first tab-open only:
 *
 *   settle -> trace (erase) -> breath -> trace (erase) -> breath
 *   -> trace (draws and stays) -> hold -> flight to the header -> handoff
 *
 * The first two traces draw ahead and erase behind, like the existing
 * intro; the third is the same stroke sweep but never erases, so the mark
 * is left fully drawn. It then flies — position, scale, stroke-to-fill
 * crossfade — into whichever `[data-intro-logo-target]` is laid out at
 * that moment (the header swaps which of its two copies is visible per
 * breakpoint), while the black backdrop fades away behind it. The header's
 * own copy fades in right under the arriving mark (`useIntroDone`) before
 * this overlay unmounts, so the handoff has no visible pop.
 *
 * Scroll is locked (both `overflow: hidden` and a wheel/touch guard) for
 * the full run and released the moment the mark lands, not before.
 */

const SESSION_KEY = "fitlat-loader-shown";
const CALM_EASE = "power1.inOut";
const FLIGHT_EASE = "fitlatEase";

const SETTLE_DURATION = 0.28;
const PASS_DURATION = 1.05;
const BREATH_DURATION = 0.16;
const FINAL_DRAW_DURATION = 1.15;
const HOLD_DURATION = 0.28;
const FLIGHT_DURATION = 0.65;
const HANDOFF_HOLD = 0.22;
const REDUCED_MOTION_HOLD = 400;

const TRAIL_MAX = 60;
const TRAIL_RATIO = 0.15;

export function Loader() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const markWrapRef = useRef<HTMLDivElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGSVGElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!shouldRender) {
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
    const path = strokePathRef.current;

    if (reduceMotion || !path) {
      markIntroDone();
      const t = window.setTimeout(finish, REDUCED_MOTION_HOLD);
      return () => {
        window.clearTimeout(t);
        releaseScroll();
        // React StrictMode's dev-only double-invoke (setup -> cleanup ->
        // setup) must produce a real run on its second pass, not see its
        // own first pass's flag and bail out instantly.
        sessionStorage.removeItem(SESSION_KEY);
        resetIntroDone();
      };
    }

    const length = path.getTotalLength();
    const trail = Math.min(TRAIL_MAX, length * TRAIL_RATIO);
    path.style.strokeDasharray = `${trail} ${length - trail}`;
    path.style.strokeDashoffset = `${length + trail}`;

    // `gsap.context` scopes every tween/timeline created inside it (including
    // the ones fired from the `tl.add` callback below, which aren't children
    // of `tl` itself) so a single `.revert()` on unmount is guaranteed to
    // kill all of them, mid-flight or not.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      tl.set(markWrapRef.current, { opacity: 0, scale: 0.94 });
      tl.to(markWrapRef.current, { opacity: 1, scale: 1, duration: SETTLE_DURATION, ease: CALM_EASE });

      // Two calm erase passes: the trail sweeps the path once, drawing
      // ahead and erasing behind, never holding a filled state.
      for (let pass = 0; pass < 2; pass++) {
        tl.fromTo(
          path,
          { strokeDashoffset: length + trail },
          { strokeDashoffset: 0, duration: PASS_DURATION, ease: CALM_EASE }
        );
        tl.set(path, { strokeDashoffset: length + trail });
        tl.to({}, { duration: BREATH_DURATION });
      }

      // Final pass: a plain draw-in (full dasharray) that's left standing.
      tl.set(path, { strokeDasharray: `${length} ${length}`, strokeDashoffset: length });
      tl.to(path, { strokeDashoffset: 0, duration: FINAL_DRAW_DURATION, ease: CALM_EASE });

      tl.to({}, { duration: HOLD_DURATION });

      tl.add(() => {
        const candidates = Array.from(
          document.querySelectorAll<HTMLElement>("[data-intro-logo-target]")
        );
        const target = candidates.find((el) => el.offsetParent !== null) ?? candidates[0];
        const wrap = markWrapRef.current;
        if (!target || !wrap) {
          markIntroDone();
          return;
        }

        // The header slides in from `-translate-y-full` and only reaches
        // its resting position once `markIntroDone()` (below) flips
        // `logoLanded` — which hasn't happened yet at this exact instant.
        // Measuring now would read its still-off-screen position and fly
        // the mark to the wrong spot, so briefly neutralize the transform,
        // measure, then put it back — synchronous, so nothing paints
        // in between.
        const header = target.closest<HTMLElement>("header");
        const prevHeaderTransform = header?.style.transform ?? "";
        const prevHeaderTransition = header?.style.transition ?? "";
        if (header) {
          header.style.transition = "none";
          header.style.transform = "none";
          void header.offsetHeight;
        }

        const targetRect = target.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();

        if (header) {
          header.style.transform = prevHeaderTransform;
          void header.offsetHeight;
          header.style.transition = prevHeaderTransition;
        }
        const scale = targetRect.width / wrapRect.width;
        const dx = targetRect.left + targetRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
        const dy = targetRect.top + targetRect.height / 2 - (wrapRect.top + wrapRect.height / 2);

        gsap.to(wrap, {
          x: dx,
          y: dy,
          scale,
          duration: FLIGHT_DURATION,
          ease: FLIGHT_EASE,
          onComplete: markIntroDone,
        });
        gsap.to(backdropRef.current, { opacity: 0, duration: FLIGHT_DURATION, ease: FLIGHT_EASE });
        gsap.to(strokePathRef.current, {
          opacity: 0,
          duration: FLIGHT_DURATION * 0.6,
          ease: FLIGHT_EASE,
        });
        gsap.to(fillRef.current, {
          opacity: 1,
          duration: FLIGHT_DURATION * 0.6,
          delay: FLIGHT_DURATION * 0.3,
          ease: FLIGHT_EASE,
        });
      });
      // Holds `tl` open — and `finish()` (its onComplete) back — until the
      // flight tweens above have visually landed and sat still long enough
      // for the header's own crossfade to catch up (see `useIntroDone`).
      tl.to({}, { duration: FLIGHT_DURATION + HANDOFF_HOLD });
    });

    return () => {
      ctx.revert();
      releaseScroll();
      sessionStorage.removeItem(SESSION_KEY);
      resetIntroDone();
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
          className="pointer-events-none relative size-24 motion-reduce:hidden"
        >
          <svg viewBox="0 0 150 150" className="absolute inset-0 size-full" fill="none">
            <path
              ref={strokePathRef}
              d={LOGO_PATH}
              stroke="var(--primary)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            ref={fillRef}
            viewBox="0 0 150 150"
            className="absolute inset-0 size-full opacity-0"
            fill="var(--primary)"
          >
            <path d={LOGO_PATH} />
          </svg>
        </div>

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
