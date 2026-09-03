/**
 * Loader -> page handoff.
 *
 * `Loader` renders before `{children}` in `layout.tsx`, so its intro effect
 * commits before the hero's does. A bare `window` event would race-lose on
 * the "already shown this session" path: the loader bails out instantly and
 * dispatches into a room nothing has subscribed to yet. A module-level latch
 * fixes that — anything that mounts after the fact just reads the flag.
 */

let introDone = false;
const listeners = new Set<() => void>();

export function isIntroDone(): boolean {
  return introDone;
}

export function markIntroDone(): void {
  if (introDone) return;
  introDone = true;
  listeners.forEach((listener) => listener());
}

/** Test/StrictMode-only escape hatch — mirrors the loader's own cleanup. */
export function resetIntroDone(): void {
  introDone = false;
}

export function subscribeIntroDone(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
