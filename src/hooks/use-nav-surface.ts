"use client";

import { useEffect, useState } from "react";

export type NavSurface = "transparent" | "canvas" | "canvas-soft";

const DEFAULT_SURFACE: NavSurface = "transparent";

/**
 * Tracks which `[data-nav-surface]` section is directly under the fixed
 * header, so the header can recolor itself to match. Uses a 1px
 * IntersectionObserver band pinned to the header's bottom edge instead of a
 * scroll listener — no per-frame work, no forced reflow, and it only fires
 * when a section actually crosses the header line.
 */
export function useNavSurface(headerHeight: number): NavSurface {
  const [surface, setSurface] = useState<NavSurface>(DEFAULT_SURFACE);

  useEffect(() => {
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
        rootMargin: `-${headerHeight}px 0px -${Math.max(window.innerHeight - headerHeight - 1, 0)}px 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [headerHeight]);

  return surface;
}
