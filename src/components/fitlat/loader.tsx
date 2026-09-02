"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * First-load intro loader. Six full-height black columns cover the viewport
 * while the mark traces itself once (a moving stroke segment, drawing ahead
 * and erasing behind — never a filled/held state), then the mark fades out
 * and the columns exit upward right-to-left in a fixed 300ms stagger,
 * revealing the page underneath.
 *
 * Shown once per browser session (sessionStorage-gated): first tab open only,
 * never on client-side navigation or a reload within the same tab session.
 */

const LOGO_PATH =
  "M 108.3 40.5 A 11.3 11.3 0 1 0 85.7 40.5 A 11.3 11.3 0 1 0 108.3 40.5 Z " +
  "M 33 108 L 51 108 L 69 89 L 73 89 L 95 107 L 103 107 L 106 104 L 106 78 L 102 65 L 89 57 L 59 57 L 47 69 L 87 69 L 92 74 L 93 86 L 77 76 L 65 76 L 59 79 Z";

const COLUMN_COUNT = 6;
const LOGO_ENTER_DURATION = 240;
const TRACE_DURATION = 1000;
const HOLD_DURATION = 220;
const LOGO_EXIT_DURATION = 220;
const EXIT_TOTAL = 300;
const EXIT_COLUMN_DURATION = 180;
const EXIT_STEP = (EXIT_TOTAL - EXIT_COLUMN_DURATION) / (COLUMN_COUNT - 1);
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SESSION_KEY = "fitlat-loader-shown";

type Phase = "enter" | "trace" | "hold" | "exit";

export function Loader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [phase, setPhase] = useState<Phase>("enter");
  const pathRef = useRef<SVGPathElement>(null);

  // Flip enter -> trace on the next frame so the logo's opacity/scale
  // transition actually runs instead of starting already at its end state.
  useEffect(() => {
    if (phase !== "enter") return;
    const raf = requestAnimationFrame(() => setPhase("trace"));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShouldRender(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = pathRef.current;
    let cancelled = false;
    const timers: number[] = [];

    const finish = () => {
      document.body.style.overflow = previousOverflow;
      if (!cancelled) setShouldRender(false);
    };

    if (reduceMotion || !path) {
      timers.push(window.setTimeout(finish, 500));
      return () => {
        cancelled = true;
        timers.forEach(window.clearTimeout);
        document.body.style.overflow = previousOverflow;
        // Undo the guard too: React StrictMode's dev-only double-invoke
        // (setup -> cleanup -> setup) must produce a real run on its second
        // pass, not see its own first pass's flag and bail out instantly.
        sessionStorage.removeItem(SESSION_KEY);
      };
    }

    const length = path.getTotalLength();
    const trail = Math.min(60, length * 0.15);
    path.style.strokeDasharray = `${trail} ${length - trail}`;

    // Linear, not the site's shared ease-out: that curve front-loads motion
    // and settles by ~40% of the duration, which reads as the trail freezing
    // for the rest of the run. A path sweep needs constant speed instead.
    const trace = path.animate(
      [{ strokeDashoffset: length + trail }, { strokeDashoffset: 0 }],
      { duration: TRACE_DURATION, easing: "linear", fill: "forwards" }
    );

    trace.onfinish = () => {
      if (cancelled) return;
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setPhase("hold");
          timers.push(
            window.setTimeout(() => {
              if (cancelled) return;
              setPhase("exit");
              timers.push(window.setTimeout(finish, EXIT_TOTAL + 60));
            }, LOGO_EXIT_DURATION)
          );
        }, HOLD_DURATION)
      );
    };

    return () => {
      cancelled = true;
      trace.cancel();
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previousOverflow;
      // See the reduced-motion branch above for why this is undone here too.
      sessionStorage.removeItem(SESSION_KEY);
    };
  }, []);

  if (!shouldRender) return null;

  const exiting = phase === "exit";
  const logoVisible = phase !== "enter" && phase !== "exit";

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-[100] flex">
      <span className="sr-only">Loading Fitlat</span>

      {Array.from({ length: COLUMN_COUNT }).map((_, i) => {
        const fromRight = COLUMN_COUNT - 1 - i;
        return (
          <div
            key={i}
            aria-hidden="true"
            className="h-full flex-1 bg-canvas motion-reduce:transition-none"
            style={{
              transform: exiting ? "translateY(-100%)" : "translateY(0%)",
              transition: `transform ${EXIT_COLUMN_DURATION}ms ${EASE} ${exiting ? fromRight * EXIT_STEP : 0}ms`,
            }}
          />
        );
      })}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "scale(1)" : exiting ? "scale(1.06)" : "scale(0.92)",
          transition: exiting
            ? `opacity ${LOGO_EXIT_DURATION}ms ${EASE}, transform ${LOGO_EXIT_DURATION}ms ${EASE}`
            : `opacity ${LOGO_ENTER_DURATION}ms ${EASE}, transform ${LOGO_ENTER_DURATION}ms ${EASE}`,
        }}
      >
        <svg
          width="96"
          height="96"
          viewBox="0 0 150 150"
          fill="none"
          className="motion-reduce:hidden"
        >
          <path
            ref={pathRef}
            d={LOGO_PATH}
            stroke="var(--primary)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="96"
          height="96"
          viewBox="0 0 150 150"
          fill="var(--primary)"
          className="hidden motion-reduce:block"
        >
          <path d={LOGO_PATH} />
        </svg>
      </div>
    </div>
  );
}
