"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isIntroDone, markIntroDone, subscribeIntroDone } from "@/lib/intro";

// Matches useIntroReveal's failsafe: never let a loader error strand the
// header logo at opacity:0 forever. Not a real countdown — markIntroDone()
// normally fires ~4.7s in, on the flight's own completion.
const FAILSAFE_DELAY = 7000;
const getServerSnapshot = () => false;

/**
 * True the instant the intro is done — no post-loader delay, unlike
 * `useIntroReveal`. Drives the header logo's crossfade: on a fresh load it
 * flips the moment the loader's flight lands the mark in this exact spot,
 * on a returning visit within the same session it's already true on mount
 * (no loader run, nothing to wait for).
 */
export function useIntroDone(): boolean {
  const done = useSyncExternalStore(
    subscribeIntroDone,
    isIntroDone,
    getServerSnapshot
  );

  useEffect(() => {
    if (done) return;
    const failsafe = window.setTimeout(() => markIntroDone(), FAILSAFE_DELAY);
    return () => window.clearTimeout(failsafe);
  }, [done]);

  return done;
}
