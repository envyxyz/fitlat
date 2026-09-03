"use client";

import { useLayoutEffect, useState } from "react";
import { isIntroDone, subscribeIntroDone } from "@/lib/intro";

const POST_LOADER_DELAY = 200; // --duration-fast, matches the loader's own exit gap
// The intro is a ~5s GSAP timeline (settle + 2 erase passes + final draw +
// hold + flight — see loader.tsx); this only needs to be safely past that,
// never a real countdown, since `markIntroDone()` normally fires well
// before it on the flight's own completion.
const FAILSAFE_DELAY = 7000; // never let a loader error strand the hero at opacity:0

/**
 * True once the hero's entrance reveal should run: 200ms after the intro
 * loader clears (or immediately, on reduced motion / the "already shown
 * this session" path).
 *
 * Starts `false` on every render, server or client — `window.matchMedia`
 * can't be read during SSR/static prerendering, and a lazy `useState`
 * initializer that reads it only on the client produces a server/client
 * value mismatch. React's hydration diagnostics are explicit that a
 * mismatched `style` attribute is logged but never patched, which would
 * permanently strand the hero at its pre-reveal styles for reduced-motion
 * users — the exact bug this shape avoids. `useLayoutEffect`, matching
 * `Loader`'s own reduced-motion branch, corrects it before first paint so
 * there's no visible flash.
 */
export function useIntroReveal(): boolean {
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const reveal = () => setRevealed(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const timers: number[] = [];

    if (isIntroDone()) {
      timers.push(window.setTimeout(reveal, POST_LOADER_DELAY));
      return () => timers.forEach(window.clearTimeout);
    }

    const unsubscribe = subscribeIntroDone(() => {
      timers.push(window.setTimeout(reveal, POST_LOADER_DELAY));
    });
    const failsafe = window.setTimeout(reveal, FAILSAFE_DELAY);
    timers.push(failsafe);

    return () => {
      unsubscribe();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return revealed;
}
