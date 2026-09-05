"use client";

import { Fragment, useState, useEffect } from "react";
import { GalleryGrid } from "./gallery-grid";
import { GalleryCell, type GalleryCellData } from "./gallery-cell";
import { ImageViewer, type ViewerImage } from "./image-viewer";
import { content } from "@/content";

const VIEWER_IMAGES: ViewerImage[] = content.gallery.viewerImages.map((img) => ({ ...img }));

/**
 * 12-cell matrix (3 rows x 4 columns) built from `content.gallery.cells`.
 * Numbered cells pull their figure from `content.proof` via `statKey` so a
 * stat only lives in one place; the quote cell pulls from
 * `content.testimonials` via `testimonialIndex` for the same reason.
 */
const CELLS: (GalleryCellData & { viewerIndex: number })[] = content.gallery.cells.map((cell) => {
  const base = {
    id: cell.id,
    variant: cell.variant,
    revealSrc: "revealSrc" in cell ? cell.revealSrc : undefined,
    alt: cell.alt,
    viewerIndex: cell.viewerIndex,
  };

  if (cell.variant === "heading") {
    return {
      ...base,
      title: cell.titleLines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      )),
    };
  }

  if (cell.variant === "photo") {
    return { ...base, imageSrc: cell.imageSrc, caption: cell.caption };
  }

  if (cell.variant === "stone-quote") {
    const testimonial = content.testimonials.items[cell.testimonialIndex];
    return {
      ...base,
      quote: `"${testimonial.quote}"`,
      author: `${testimonial.name.toUpperCase()} — ${testimonial.detail.toUpperCase()}`,
    };
  }

  // stone-story / stone-vertical
  const stat = "statKey" in cell && cell.statKey ? content.proof[cell.statKey] : undefined;
  return {
    ...base,
    year: stat?.value,
    story: cell.story,
  };
});

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
        <h2 id="facilities-heading" className="sr-only">
          {content.gallery.heading}
        </h2>
        <p className="sr-only">{content.gallery.intro}</p>
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
