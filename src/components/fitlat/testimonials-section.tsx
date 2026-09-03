import Image from "next/image";
import { TestimonialCard } from "./testimonial-card";

const TESTIMONIALS = [
  {
    quote:
      "I switched gyms four times before Fitlat. This is the first one where a coach actually watched my form without me asking.",
    name: "Priya Malhotra",
    detail: "Member since 2023",
    image: "/images/testimonials/priya-malhotra.jpg",
  },
  {
    quote:
      "Between clinicals I get maybe forty minutes. The coaches here plan around that instead of pretending I have two hours.",
    name: "James Okonkwo",
    detail: "Member since 2024",
    image: "/images/testimonials/james-okonkwo.jpg",
  },
  {
    quote:
      "I train for competition, not for a hobby, and Fitlat is the only gym nearby that didn't treat that as a weird request.",
    name: "Sofia Reyes",
    detail: "Member since 2022",
    image: "/images/testimonials/sofia-reyes.jpg",
  },
];

/**
 * Testimonials Section — CLAUDE.md section order #6.
 * Heading: "From the floor"
 * 3 authentic member reviews with quote marks and avatar portraits.
 */
export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-nav-surface="canvas-soft"
      aria-label="Member testimonials"
      className="bg-canvas-soft py-space-h1 lg:py-space-h2 border-t border-hairline"
    >
      <div className="mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl">
        {/* Section Header */}
        <div className="mb-space-h1 max-w-2xl">
          <span className="text-caption text-caps text-primary block mb-space-caption">
            Member Proof
          </span>
          <h2 className="text-h2 text-ink">From the floor</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-space-body md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              detail={t.detail}
              className="h-full flex flex-col justify-between transition-all duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:border-primary/40"
              avatar={
                <div className="relative size-10 overflow-hidden rounded-full border border-hairline bg-surface-card shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
