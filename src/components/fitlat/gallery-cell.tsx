"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type CellVariant =
  | "heading"
  | "photo"
  | "stone-story"
  | "stone-vertical"
  | "stone-quote";

export interface GalleryCellData {
  id: string;
  variant: CellVariant;
  title?: ReactNode;
  year?: string;
  story?: string;
  quote?: string;
  author?: string;
  imageSrc?: string;
  revealSrc?: string;
  alt?: string;
  caption?: string;
  aspectClass?: string;
  imagePosition?: "top" | "bottom" | "center";
}

interface GalleryCellProps extends GalleryCellData {
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export function GalleryCell({
  variant,
  title,
  year,
  story,
  quote,
  author,
  imageSrc,
  revealSrc,
  alt = "Fitlat Facility & Proof",
  caption,
  onClick,
  className,
  isActive = false,
}: GalleryCellProps) {
  // Common container styling: square aspect ratio, overflow hidden, cursor pointer, smooth transitions
  const baseClasses = cn(
    "group relative isolate flex flex-col justify-between overflow-hidden",
    "aspect-square w-full rounded-[3px] transition-all duration-300",
    "cursor-pointer select-none",
    "border border-white/10 hover:border-primary/40",
    "hover:shadow-2xl hover:shadow-primary/5",
    isActive && "border-primary/40 shadow-2xl shadow-primary/5",
    className
  );

  // 1. Heading Tile (Dark Stone card with condensed bold typography, e.g. (1,1) & (3,4))
  if (variant === "heading") {
    return (
      <div
        data-gallery-tile
        onClick={onClick}
        className={cn(
          baseClasses,
          "bg-[#0e0e0e] p-6 sm:p-8 justify-between"
        )}
      >
        {/* Subtle stone background */}
        <Image
          src="/images/gallery/stone-texture.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover opacity-60 mix-blend-overlay"
        />

        {/* Optional hover reveal background photo with soft, low-opacity orange tint */}
        {revealSrc && (
          <div className={cn("absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100", isActive && "opacity-100")}>
            <Image
              src={revealSrc}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={cn("object-cover brightness-70 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out", isActive && "scale-105")}
            />
            {/* Low-opacity orange overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/20 to-black/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-primary/15 mix-blend-screen" />
          </div>
        )}

        {/* Title Content */}
        <div className="relative z-10 my-auto">
          <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-bold uppercase tracking-tight text-ink leading-[0.92] max-w-[12ch]">
            {title}
          </h2>
        </div>

        {/* Diagonal expand arrow on hover */}
        {revealSrc && (
          <div className={cn("relative z-10 self-end opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1", isActive && "opacity-100 translate-x-0")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-primary"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  // 2. Full Photo Tile (e.g. lifting platforms, sled track, free weights, group bay)
  if (variant === "photo" && imageSrc) {
    return (
      <div
        data-gallery-tile
        onClick={onClick}
        className={cn(
          baseClasses,
          "bg-[#111111]"
        )}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={cn("object-cover brightness-95 contrast-105 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100", isActive && "scale-105 brightness-100")}
        />

        {/* Subtle dark vignette and low-opacity warm orange ambient sweep on hover */}
        <div className={cn("absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-70 transition-opacity duration-300 group-hover:opacity-40", isActive && "opacity-40")} />
        <div className={cn("absolute inset-0 bg-primary/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-screen", isActive && "opacity-100")} />

        {/* Caption text */}
        {caption && (
          <div className="absolute bottom-3 left-4 z-10 max-w-[80%] opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-[11px] sm:text-xs font-medium text-white/90 drop-shadow-md">
              {caption}
            </span>
          </div>
        )}

        {/* Diagonal expand arrow icon on hover */}
        <div className={cn("absolute bottom-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75 border border-white/10", isActive && "opacity-100 scale-100")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    );
  }

  // 3. Stone Tile - Vertical Stat / Year (e.g. "14,000" vertical)
  if (variant === "stone-vertical") {
    return (
      <div
        data-gallery-tile
        onClick={onClick}
        className={cn(
          baseClasses,
          "bg-[#141414] p-6 sm:p-8"
        )}
      >
        {/* Dark Granite / Stone Texture */}
        <Image
          src="/images/gallery/stone-texture.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hover photo reveal with low-opacity orange/sepia filter */}
        {revealSrc && (
          <div className={cn("absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100", isActive && "opacity-100")}>
            <Image
              src={revealSrc}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={cn("object-cover brightness-75 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out", isActive && "scale-105")}
            />
            {/* Low opacity orange gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-screen" />
          </div>
        )}

        {/* Left top caption */}
        {story && (
          <div className="relative z-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70">
              {story}
            </p>
          </div>
        )}

        {/* Vertical Rotated Stat on right */}
        <div className="relative z-10 flex h-full w-full justify-end items-center">
          <span
            className={cn("font-condensed text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-primary", isActive && "text-primary")}
            style={{ writingMode: "vertical-rl" }}
          >
            {year}
          </span>
        </div>

        {/* Diagonal expand arrow on hover */}
        {revealSrc && (
          <div className={cn("absolute bottom-4 left-4 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100", isActive && "opacity-100")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-primary"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  // 4. Stone Tile - Member Quote Card (e.g. Priya Malhotra quote)
  if (variant === "stone-quote") {
    return (
      <div
        data-gallery-tile
        onClick={onClick}
        className={cn(
          baseClasses,
          "bg-[#141414] p-6 sm:p-7 justify-between"
        )}
      >
        {/* Dark Granite / Stone Texture */}
        <Image
          src="/images/gallery/stone-texture.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hover photo reveal with low-opacity orange/sepia filter */}
        {revealSrc && (
          <div className={cn("absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100", isActive && "opacity-100")}>
            <Image
              src={revealSrc}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={cn("object-cover brightness-70 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out", isActive && "scale-105")}
            />
            {/* Low opacity orange gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-screen" />
          </div>
        )}

        {/* Quote text at top */}
        <div className="relative z-10">
          <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed max-w-[28ch]">
            {quote}
          </p>
        </div>

        {/* Author / Bottom content */}
        <div className="relative z-10 flex items-end justify-between">
          <span className={cn("font-condensed text-sm sm:text-base font-bold tracking-wider uppercase text-white/80 transition-colors duration-300 group-hover:text-primary", isActive && "text-primary")}>
            {author}
          </span>

          {/* Diagonal expand arrow on hover */}
          {revealSrc && (
            <div className={cn("opacity-0 transition-all duration-300 group-hover:opacity-100", isActive && "opacity-100")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-primary"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 5. Default Stone Tile - Story / Stat Card (e.g. 1,200+, 6, 90+)
  return (
    <div
      data-gallery-tile
      onClick={onClick}
      className={cn(
        baseClasses,
        "bg-[#141414] p-6 sm:p-7 justify-between"
      )}
    >
      {/* Dark Granite / Stone Texture */}
      <Image
        src="/images/gallery/stone-texture.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Hover photo reveal with low-opacity orange/sepia filter */}
      {revealSrc && (
        <div className={cn("absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100", isActive && "opacity-100")}>
          <Image
            src={revealSrc}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={cn("object-cover brightness-70 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out", isActive && "scale-105")}
          />
          {/* Low opacity orange gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-screen" />
        </div>
      )}

      {/* Top Content: Stat / Year or Story */}
      <div className="relative z-10">
        {year && (
          <span className={cn("font-condensed text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-none transition-colors duration-300 group-hover:text-primary", isActive && "text-primary")}>
            {year}
          </span>
        )}
        {!year && story && (
          <p className="text-xs sm:text-sm font-medium text-ink leading-snug max-w-[28ch]">
            {story}
          </p>
        )}
      </div>

      {/* Bottom Content: Story or Year, plus expand icon */}
      <div className="relative z-10 flex items-end justify-between">
        {year && story && (
          <p className="text-xs sm:text-sm font-normal text-white/70 leading-snug max-w-[24ch]">
            {story}
          </p>
        )}
        {year && !story && <div />}
        {!year && !story && <div />}

        {/* Diagonal expand arrow on hover */}
        {revealSrc && (
          <div className={cn("ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105", isActive && "opacity-100 scale-105")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-primary"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
