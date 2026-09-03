"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Archive-grid container — see design-fitlat.md `gallery-grid`. Owns only
 * the entrance choreography; column count and gutters are the caller's
 * `className` (see `GallerySection`).
 *
 * One-shot GSAP `ScrollTrigger.batch` reveal — clip-path wipe + 24px rise,
 * staggered in DOM order, fires once. Deliberately quieter than the hero's
 * blur-resolve entrance, which stays the site's one signature moment (see
 * design-system.md "Motion"). Children opt in via `data-gallery-tile`.
 */
export function GalleryGrid({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tiles = container.querySelectorAll<HTMLElement>("[data-gallery-tile]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const ease = rootStyle.getPropertyValue("--motion-ease").trim() || "cubic-bezier(0.22, 1, 0.36, 1)";
    const duration = parseFloat(rootStyle.getPropertyValue("--duration-slow")) / 1000 || 0.6;

    const ctx = gsap.context(() => {
      gsap.set(tiles, { clipPath: "inset(0% 0% 100% 0%)", y: 24 });

      ScrollTrigger.batch(tiles, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration,
            ease,
            stagger: 0.05,
            overwrite: true,
          }),
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
