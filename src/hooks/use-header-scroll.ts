"use client";

import { useEffect, useRef, useState } from "react";

interface HeaderScrollState {
  /** True once scrolled past `threshold` — drives the desktop "island". */
  scrolled: boolean;
  /** True once scrolling down past 80px — drives the mobile auto-hide. */
  mobileHidden: boolean;
}

const HIDE_DELTA = 8;

/**
 * One rAF-throttled scroll listener producing both signals the header needs
 * (`useScrolled` + `useAutoHideHeader` merged) — previously two separate
 * `scroll` listeners each reading `window.scrollY` on every event, on top of
 * GSAP's own ScrollTrigger. Direction for `mobileHidden` is measured against
 * the last *sampled* (rAF-throttled) position, matching the original
 * `useAutoHideHeader` behavior, so a jittery trackpad still doesn't flicker
 * the header.
 */
export function useHeaderScroll(threshold = 24): HeaderScrollState {
  const [state, setState] = useState<HeaderScrollState>({ scrolled: false, mobileHidden: false });
  const lastYRef = useRef(0);
  const mobileHiddenRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    let frame = 0;
    const sample = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      const scrolled = y > threshold;
      let mobileHidden = mobileHiddenRef.current;
      if (Math.abs(delta) >= HIDE_DELTA) {
        mobileHidden = delta > 0 && y > 80;
        mobileHiddenRef.current = mobileHidden;
        lastYRef.current = y;
      }

      setState((prev) =>
        prev.scrolled === scrolled && prev.mobileHidden === mobileHidden
          ? prev
          : { scrolled, mobileHidden }
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
