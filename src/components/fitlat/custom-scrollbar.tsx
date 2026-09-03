"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export function CustomScrollbar() {
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dragStartY = useRef(0);
  const startScrollTop = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateScrollbar = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    if (scrollHeight <= clientHeight) {
      setThumbHeight(0);
      return;
    }

    // Calculate height of thumb proportional to view (min 44px, max 80% viewport)
    const calculatedHeight = Math.max(
      44,
      Math.min(
        clientHeight * 0.8,
        (clientHeight / scrollHeight) * clientHeight
      )
    );
    setThumbHeight(calculatedHeight);

    // Calculate position
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = clientHeight - calculatedHeight - 16; // 8px margin top/bottom
    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
    const currentThumbTop = 8 + progress * maxThumbTop;

    setThumbTop(currentThumbTop);

    // Fade in on scroll, and set timer to fade down
    setIsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        setIsVisible(false);
      }
    }, 2000);
  }, [isDragging]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      updateScrollbar();
    });
    window.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar, { passive: true });

    return () => {
      cancelAnimationFrame(handle);
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [updateScrollbar]);

  // Drag logic
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    startScrollTop.current = window.scrollY;
    document.body.style.userSelect = "none";
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const trackRect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const maxScroll = scrollHeight - clientHeight;

    const targetProgress = Math.min(
      1,
      Math.max(0, clickY / clientHeight)
    );
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartY.current;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbTravel = clientHeight - thumbHeight - 16;

      if (maxThumbTravel <= 0) return;

      const scrollDelta = (deltaY / maxThumbTravel) * maxScroll;
      window.scrollTo(0, startScrollTop.current + scrollDelta);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, thumbHeight]);

  if (thumbHeight === 0) return null;

  return (
    <div
      onClick={handleTrackClick}
      onMouseEnter={() => setIsVisible(true)}
      className="fixed top-0 right-1.5 sm:right-2.5 z-[9999] h-full w-3 flex justify-center cursor-pointer select-none"
      aria-hidden="true"
    >
      <div
        onMouseDown={handleThumbMouseDown}
        style={{
          transform: `translateY(${thumbTop}px)`,
          height: `${thumbHeight}px`,
        }}
        className={`w-2 sm:w-2.5 rounded-full border border-white/10 shadow-lg transition-colors duration-150 cursor-grab active:cursor-grabbing ${
          isDragging
            ? "bg-[#4a4a4a] border-primary/40 shadow-primary/20"
            : isVisible
            ? "bg-[#282828] hover:bg-[#3a3a3a] opacity-90 hover:opacity-100"
            : "bg-[#282828] opacity-35 hover:opacity-100"
        }`}
      />
    </div>
  );
}
