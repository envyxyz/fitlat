"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { BadgePill } from "./badge-pill";
import { cn } from "@/lib/utils";

interface TourModalProps {
  children: React.ReactNode;
}

/**
 * Floor Tour Modal — accessible preview dialog triggered from the hero's
 * signature floating card. Built on Base UI's `Dialog` with focus trapping,
 * escape-key dismissal, and smooth entering transition.
 */
export function TourModal({ children }: TourModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        nativeButton={false}
        render={
          <div
            role="button"
            tabIndex={0}
            aria-label="Watch Fitlat Floor Tour video"
            className="w-full cursor-pointer text-left transition-transform duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          />
        }
      >
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md",
            "transition-opacity duration-[var(--duration-slow)] ease-[var(--motion-ease)]",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-3xl -translate-x-1/2 -translate-y-1/2",
            "rounded-xl border border-hairline bg-surface p-space-body-lg shadow-2xl",
            "transition-all duration-[var(--duration-slow)] ease-[var(--motion-ease)]",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0"
          )}
        >
          <div className="flex items-center justify-between pb-space-body border-b border-hairline">
            <div className="flex items-center gap-space-small">
              <BadgePill className="border-primary/40">
                <span aria-hidden="true" className="mr-1 inline-block size-1.5 rounded-full bg-primary" />
                Floor Tour Preview
              </BadgePill>
              <span className="text-small text-ink-muted hidden sm:inline">14,000 sq ft Strength Facility</span>
            </div>
            <Dialog.Close
              aria-label="Close tour modal"
              className="flex size-9 items-center justify-center rounded-sm text-ink-muted transition-colors hover:text-ink hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-h4 leading-none select-none">✕</span>
            </Dialog.Close>
          </div>

          <div className="relative mt-space-body aspect-video w-full overflow-hidden rounded-lg border border-hairline bg-canvas-soft">
            <Image
              src="/images/gallery/lifting-platforms.jpg"
              alt="Fitlat main training floor and lifting platforms"
              fill
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-space-body flex items-end justify-between">
              <div className="flex flex-col gap-space-caption">
                <span className="text-h4 text-ink">Main Lifting Platforms & Turf</span>
                <span className="text-small text-ink-secondary">
                  Custom Olympic racks, Eleiko plates, calibrated bars, and 60m turf sled run.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-space-body flex flex-col sm:flex-row items-center justify-between gap-space-body">
            <div className="flex items-center gap-space-xs text-small text-ink-muted">
              <span className="size-2 rounded-full bg-status-success" />
              <span>Floor Open Now · 5:00 AM – 10:00 PM</span>
            </div>
            <div className="flex items-center gap-space-small w-full sm:w-auto">
              <Dialog.Close
                render={
                  <Button variant="outline" className="flex-1 sm:flex-initial">
                    Close Preview
                  </Button>
                }
              />
              <a href="#membership" className="flex-1 sm:flex-initial">
                <Button className="w-full">
                  Join Fitlat
                </Button>
              </a>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
