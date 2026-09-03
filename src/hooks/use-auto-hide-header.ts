"use client";

import { useEffect, useState } from "react";

/**
 * True once the header should hide itself — scrolling down past `threshold`
 * hides it, scrolling back up shows it again. Direction is measured against
 * the last sampled scroll position rather than every frame, so a jittery
 * trackpad doesn't flicker the header. Meant for the mobile header, where
 * there's no room to keep a full-width bar pinned open while reading.
 */
export function useAutoHideHeader(threshold = 8): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < threshold) return;
      // Never hide right at the top — only once there's real distance to
      // scroll back through.
      setHidden(delta > 0 && y > 80);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
