"use client";

import { useState, useEffect } from "react";
import { GalleryGrid } from "./gallery-grid";
import { GalleryCell, type GalleryCellData } from "./gallery-cell";
import { ImageViewer, type ViewerImage } from "./image-viewer";

const VIEWER_IMAGES: ViewerImage[] = [
  {
    src: "/images/gallery/lifting-platforms.jpg",
    alt: "Main lifting platforms on the Fitlat floor, early morning",
    caption: "Main lifting platforms, 6am — Calibrated iron & Olympic barbells",
  },
  {
    src: "/images/gallery/sled-track.jpg",
    alt: "Turf sled track along the east wall",
    caption: "Turf sled track, east wall — High output sprints and conditioning",
  },
  {
    src: "/images/gallery/free-weights.jpg",
    alt: "Free weight section on the training floor",
    caption: "Free weight section — Custom dumbbells up to 150 lbs",
  },
  {
    src: "/images/gallery/recovery-room.jpg",
    alt: "Fitlat recovery room",
    caption: "Recovery room — Infrared therapy, compression, and mobility tools",
  },
  {
    src: "/images/gallery/group-bay.jpg",
    alt: "Group training bay before an early class",
    caption: "Group training bay — 90+ coached strength blocks weekly",
  },
];

/**
 * 12-cell matrix (3 rows x 4 columns) integrating Fitlat's facilities,
 * key trust statistics (1,200+ members, 14k sq ft, 6 years, 90+ sessions),
 * member quotes, and high-impact facility imagery.
 */
const CELLS: (GalleryCellData & { viewerIndex: number })[] = [
  // --- ROW 1 ---
  {
    id: "cell-1-1",
    variant: "heading",
    title: (
      <>
        WHERE THE
        <br />
        WORK
        <br />
        HAPPENS
      </>
    ),
    revealSrc: "/images/gallery/group-bay.jpg",
    alt: "Fitlat training floor and community",
    viewerIndex: 4,
  },
  {
    id: "cell-1-2",
    variant: "stone-story",
    year: "1,200+",
    story:
      "Members trained on our floor with individualized programming and active coaching.",
    revealSrc: "/images/gallery/lifting-platforms.jpg",
    alt: "Fitlat main lifting platforms at 6am",
    viewerIndex: 0,
  },
  {
    id: "cell-1-3",
    variant: "photo",
    imageSrc: "/images/gallery/lifting-platforms.jpg",
    alt: "Main lifting platforms on the Fitlat floor, early morning",
    caption: "Main lifting platforms, 6am",
    viewerIndex: 0,
  },
  {
    id: "cell-1-4",
    variant: "stone-vertical",
    year: "14,000",
    story: "SQ FT FLOOR",
    revealSrc: "/images/gallery/sled-track.jpg",
    alt: "14,000 square feet training floor",
    viewerIndex: 1,
  },

  // --- ROW 2 ---
  {
    id: "cell-2-1",
    variant: "photo",
    imageSrc: "/images/gallery/sled-track.jpg",
    alt: "Turf sled track along the east wall",
    caption: "Turf sled track, east wall",
    viewerIndex: 1,
  },
  {
    id: "cell-2-2",
    variant: "stone-story",
    year: "6",
    story:
      "Years operating without gimmicks, trends, or wasted machine space.",
    revealSrc: "/images/gallery/free-weights.jpg",
    alt: "6 years operating in strength training",
    viewerIndex: 2,
  },
  {
    id: "cell-2-3",
    variant: "photo",
    imageSrc: "/images/gallery/free-weights.jpg",
    alt: "Free weight section on the training floor",
    caption: "Free weight section",
    viewerIndex: 2,
  },
  {
    id: "cell-2-4",
    variant: "stone-story",
    story:
      "Custom-welded steel racks, calibrated competition plates, and coaches who stay active on every rep.",
    revealSrc: "/images/gallery/recovery-room.jpg",
    alt: "Fitlat strength standards and coaching",
    viewerIndex: 3,
  },

  // --- ROW 3 ---
  {
    id: "cell-3-1",
    variant: "stone-story",
    year: "90+",
    story:
      "Coached small-group strength and conditioning sessions weekly from 5am.",
    revealSrc: "/images/gallery/group-bay.jpg",
    alt: "90+ coached sessions weekly",
    viewerIndex: 4,
  },
  {
    id: "cell-3-2",
    variant: "photo",
    imageSrc: "/images/gallery/recovery-room.jpg",
    alt: "Fitlat recovery room",
    caption: "Recovery & mobility bay",
    viewerIndex: 3,
  },
  {
    id: "cell-3-3",
    variant: "stone-quote",
    quote:
      '"A coach actually watched my form without me asking. First gym where coaching is real."',
    author: "PRIYA MALHOTRA — MEMBER SINCE 2023",
    revealSrc: "/images/gallery/lifting-platforms.jpg",
    alt: "Member testimonial Priya Malhotra",
    viewerIndex: 0,
  },
  {
    id: "cell-3-4",
    variant: "heading",
    title: (
      <>
        FITLAT
        <br />
        ARCHIVE
        <br />
        & INTENT
      </>
    ),
    revealSrc: "/images/gallery/group-bay.jpg",
    alt: "Fitlat Archive and Intent",
    viewerIndex: 4,
  },
];

export function GallerySection() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeCellId, setActiveCellId] = useState<string | null>(null);

  // Reset active card engagement when clicking outside the gallery tiles
  useEffect(() => {
    if (!activeCellId) return;

    const handlePointerDownOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-gallery-tile]")) {
        setActiveCellId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => document.removeEventListener("pointerdown", handlePointerDownOutside);
  }, [activeCellId]);

  const handleCellClick = (id: string, viewerIndex: number) => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouch) {
      if (activeCellId === id) {
        // Second tap on the already engaged card: open fullscreen lightbox!
        setActiveImageIndex(viewerIndex);
        setViewerOpen(true);
      } else {
        // First tap: engage hover state and show orange arrow / reveal photo
        setActiveCellId(id);
      }
    } else {
      // Desktop with mouse: open directly on click (hover is already shown by cursor)
      setActiveImageIndex(viewerIndex);
      setViewerOpen(true);
    }
  };

  return (
    <section
      id="facilities"
      aria-labelledby="facilities-heading"
      data-nav-surface="canvas"
      className="scroll-mt-16 bg-canvas py-12 md:py-20 lg:py-28"
    >
      {/* Container with generous side spacing and balanced max width */}
      <div className="mx-auto w-full max-w-[1440px] px-space-body-lg lg:px-xxl">
        <GalleryGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {CELLS.map((cell) => (
            <GalleryCell
              key={cell.id}
              {...cell}
              isActive={activeCellId === cell.id}
              onClick={() => handleCellClick(cell.id, cell.viewerIndex)}
            />
          ))}
        </GalleryGrid>
      </div>

      {/* Interactive Minimalist Lightbox Viewer */}
      <ImageViewer
        images={VIEWER_IMAGES}
        initialIndex={activeImageIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </section>
  );
}
