"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold`. Drives the desktop
 * header's glass "dynamic island" transition — a plain scroll listener
 * rather than IntersectionObserver since there's no fixed section boundary
 * to watch, just a raw scroll position.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
