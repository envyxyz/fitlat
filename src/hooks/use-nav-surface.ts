"use client";

import { useEffect, useState } from "react";

export type NavSurface = "transparent" | "canvas" | "canvas-soft";

const DEFAULT_SURFACE: NavSurface = "transparent";
const RESIZE_DEBOUNCE_MS = 150;

/**
 * Tracks which `[data-nav-surface]` section is directly under the fixed
 * header, so the header can recolor itself to match. Uses a 1px
 * IntersectionObserver band pinned to the header's bottom edge instead of a
 * scroll listener — no per-frame work, no forced reflow, and it only fires
 * when a section actually crosses the header line.
 *
 * The band's bottom margin bakes in `window.innerHeight` at creation time.
 * Mobile URL-bar collapse/expand changes that value without a `resize`
 * event, so `windowHeight` state (updated on a debounced `resize` listener)
 * forces the observer to be recreated with a fresh margin — otherwise the
 * band can drift off the header line, or collapse to zero height, and the
 * surface silently freezes on whatever color it last reported.
 */
export function useNavSurface(headerHeight: number): NavSurface {
  const [surface, setSurface] = useState<NavSurface>(DEFAULT_SURFACE);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    let timer: number | undefined;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setWindowHeight(window.innerHeight), RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (windowHeight === 0) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-surface]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Multiple sections can straddle a 1px band during fast scrolls —
        // the one nearest the top of the viewport is the one under the header.
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        const value = topMost.target.getAttribute("data-nav-surface") as NavSurface | null;
        if (value) setSurface(value);
      },
      {
        rootMargin: `-${headerHeight}px 0px -${Math.max(windowHeight - headerHeight - 1, 0)}px 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [headerHeight, windowHeight]);

  return surface;
}
