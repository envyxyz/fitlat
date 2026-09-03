/**
 * Loader -> page handoff.
 *
 * `Loader` renders before `{children}` in `layout.tsx`, so its intro effect
 * commits before the hero's does. A bare `window` event would race-lose on
 * the "already shown this session" path: the loader bails out instantly and
 * dispatches into a room nothing has subscribed to yet. A module-level latch
 * fixes that — anything that mounts after the fact just reads the flag.
 *
 * Two latches are managed here:
 *
 *   `introDone`      — fires when the flight *lands* (mark arrives in header).
 *                     Drives the header logo crossfade (`useIntroDone`).
 *   `flightStarted`  — fires when the flight *begins* (mark starts moving).
 *                     Drives the header slide-down (`useIntroFlight`) so the
 *                     bar comes down concurrently with the mark instead of
 *                     waiting for it to land.
 */

// ─── introDone ───────────────────────────────────────────────────────────────

let introDone = false;
const introDoneListeners = new Set<() => void>();

export function isIntroDone(): boolean {
  return introDone;
}

export function markIntroDone(): void {
  if (introDone) return;
  introDone = true;
  introDoneListeners.forEach((listener) => listener());
}

/** Test/StrictMode-only escape hatch — mirrors the loader's own cleanup. */
export function resetIntroDone(): void {
  introDone = false;
}

export function subscribeIntroDone(callback: () => void): () => void {
  introDoneListeners.add(callback);
  return () => introDoneListeners.delete(callback);
}

// ─── flightStarted ───────────────────────────────────────────────────────────

let flightStarted = false;
const flightStartedListeners = new Set<() => void>();

export function isFlightStarted(): boolean {
  return flightStarted;
}

export function markFlightStarted(): void {
  if (flightStarted) return;
  flightStarted = true;
  flightStartedListeners.forEach((listener) => listener());
}

/** Test/StrictMode-only escape hatch — mirrors the loader's own cleanup. */
export function resetFlightStarted(): void {
  flightStarted = false;
}

export function subscribeFlightStarted(callback: () => void): () => void {
  flightStartedListeners.add(callback);
  return () => flightStartedListeners.delete(callback);
}
