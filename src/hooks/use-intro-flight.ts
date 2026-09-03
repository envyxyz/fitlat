"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isFlightStarted, markFlightStarted, subscribeFlightStarted } from "@/lib/intro";

// Intro is now ~4s; if a loader error strands the header at -translate-y-full
// indefinitely, this forces it down. Not a real countdown — markFlightStarted()
// normally fires ~3.4s in (settle + 2 laps + final lap + hold).
const FAILSAFE_DELAY = 6000;
const getServerSnapshot = () => false;

/**
 * True the instant the intro flight begins — fires slightly before
 * `useIntroDone`, which fires when the flight *lands*. Used by `SiteHeader`
 * to start its slide-down concurrently with the mark's flight, so the bar
 * is in place when the mark arrives, enabling a true crossfade handoff
 * instead of a sequential appear-then-fade.
 *
 * On a returning visit (session already shown) this is already true on mount,
 * so the header renders in its landed position immediately with no slide.
 */
export function useIntroFlight(): boolean {
  const started = useSyncExternalStore(
    subscribeFlightStarted,
    isFlightStarted,
    getServerSnapshot
  );

  useEffect(() => {
    if (started) return;
    const failsafe = window.setTimeout(() => markFlightStarted(), FAILSAFE_DELAY);
    return () => window.clearTimeout(failsafe);
  }, [started]);

  return started;
}
