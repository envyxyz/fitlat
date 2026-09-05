"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { TourModal } from "./tour-modal";
import { useIntroReveal } from "@/hooks/use-intro-reveal";
import { content } from "@/content";

const hero = content.hero;

/**
 * Hero — CLAUDE.md section order #2.
 * Redesigned with the cinematic dark aesthetic of the reference:
 * - Full-height atmospheric training backdrop with directional canvas vignettes.
 * - Oversized 2-line display headline with wide container math.
 * - Dual high-contrast action CTA buttons.
 * - Signature floating interactive floor tour card with avatar stack & video modal trigger.
 */
export function Hero() {
  const revealed = useIntroReveal();
  const heroImageRef = useRef<HTMLImageElement>(null);

  return (
    <section
      data-nav-surface="transparent"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-canvas pt-20 pb-space-h1 lg:pb-space-h2"
    >
      {/* Background Cinematic Training Image. `will-change` is scoped to the
          blur/scale transition's duration only (cleared on transitionend) —
          an unblurred fill image doesn't need its own compositor layer once
          the reveal is done. */}
      <Image
        ref={heroImageRef}
        src={hero.backgroundImage.src}
        alt={hero.backgroundImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center] transition-[filter,transform] duration-[var(--duration-slow)] ease-[var(--motion-ease)]"
        style={{
          filter: revealed ? "blur(0px)" : "blur(14px)",
          transform: revealed ? "scale(1)" : "scale(1.04)",
          willChange: revealed ? undefined : "filter, transform",
        }}
        onTransitionEnd={() => {
          if (heroImageRef.current) heroImageRef.current.style.willChange = "";
        }}
      />

      {/* Cinematic Vignette Wash — dark moody overlays derived strictly from --canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/75 to-canvas/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 60%, transparent 20%, var(--canvas) 85%)",
        }}
      />

      {/* Content Grid */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-end gap-space-h2 px-space-body-lg lg:grid lg:grid-cols-12 lg:items-end lg:gap-space-body lg:px-xxl">
        {/* Left Column: Heading, Subtext & CTAs */}
        <div className="flex flex-col gap-space-body lg:col-span-8 xl:col-span-7">
          {/* Kicker Eyebrow */}
          <Reveal revealed={revealed} from="left" index={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 px-3 py-1 text-caption text-caps text-ink-secondary backdrop-blur-md">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-primary animate-pulse"
              />
              <span>{hero.eyebrow}</span>
            </div>
          </Reveal>

          {/* Display Heading — 2-line guarantee with wide max-w */}
          <Reveal revealed={revealed} from="left" index={1}>
            <h1 className="text-display text-ink max-w-measure-display tracking-tight">
              {hero.headline}
            </h1>
          </Reveal>

          {/* Positioning Copy */}
          <Reveal revealed={revealed} from="left" index={2}>
            <p className="text-body-lg text-ink-secondary max-w-measure">
              {hero.positioning}
            </p>
          </Reveal>

          {/* Dual Action CTAs */}
          <Reveal revealed={revealed} from="left" index={3}>
            <div className="flex flex-col gap-space-small pt-space-xs sm:flex-row sm:items-center">
              <a href={hero.ctaPrimary.href} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-6 font-semibold">
                  {hero.ctaPrimary.label}
                </Button>
              </a>
              <a href={hero.ctaSecondary.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-6 border-hairline bg-surface/60 backdrop-blur-md hover:bg-surface-card"
                >
                  {hero.ctaSecondary.label}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Floating Interactive Floor Tour Card (Reference Signature) */}
        <Reveal
          revealed={revealed}
          from="right"
          index={4}
          className="lg:col-span-4 lg:col-start-9 flex justify-start lg:justify-end"
        >
          <TourModal>
            <div className="group relative w-full max-w-[24rem] overflow-hidden rounded-xl border border-hairline bg-surface-card/90 p-3 shadow-2xl backdrop-blur-lg transition-[border-color] duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:border-primary/50">
              {/* Card Video/Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-canvas-soft">
                <Image
                  src={hero.tourCard.previewImage.src}
                  alt={hero.tourCard.previewImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-canvas/40 transition-colors group-hover:bg-canvas/20"
                />

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex size-12 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-transform duration-[var(--duration-fast)] ease-[var(--motion-ease)] group-hover:scale-110">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping"
                    />
                    {/* SVG Play Triangle */}
                    <svg
                      className="relative ml-0.5 size-5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Subtle top tag */}
                <div className="absolute top-2 left-2 rounded-sm bg-canvas/80 px-2 py-0.5 text-caption text-caps text-ink backdrop-blur-sm">
                  {hero.tourCard.tag}
                </div>
              </div>

              {/* Card Footer: Avatars + Social Proof */}
              <div className="mt-3 flex items-center justify-between px-1">
                {/* Overlapping Avatar Stack */}
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    {hero.tourCard.avatars.map((avatar) => (
                      <div
                        key={avatar.src}
                        className="relative size-7 rounded-full border-2 border-surface-card overflow-hidden"
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="ml-2 text-caption font-semibold text-primary">
                    {hero.tourCard.countLabel}
                  </span>
                </div>

                {/* Caption text */}
                <div className="text-right">
                  <span className="block text-caption text-caps text-ink-muted">
                    {hero.tourCard.captionTop}
                  </span>
                  <span className="block text-small font-medium text-ink">
                    {hero.tourCard.captionBottom}
                  </span>
                </div>
              </div>
            </div>
          </TourModal>
        </Reveal>
      </div>
    </section>
  );
}
