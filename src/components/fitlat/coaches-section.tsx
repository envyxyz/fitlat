import Image from "next/image";
import { CoachCard } from "./coach-card";
import { content } from "@/content";

const COACHES = content.coaches.members;

/**
 * Coaches Section — CLAUDE.md section order #5.
 * Heading: "Coached, not just supervised"
 * 3 coach cards with high-contrast portraits and authentic bios.
 */
export function CoachesSection() {
  return (
    <section
      id="coaches"
      data-nav-surface="canvas"
      aria-label="Coaches"
      className="bg-canvas py-space-h1 lg:py-space-h2 border-t border-hairline"
    >
      <div className="mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl">
        {/* Section Header */}
        <div className="mb-space-h1 max-w-2xl">
          <span className="text-caption text-caps text-primary block mb-space-caption">
            {content.coaches.eyebrow}
          </span>
          <h2 className="text-h2 text-ink">{content.coaches.heading}</h2>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 gap-space-body md:grid-cols-3">
          {COACHES.map((coach) => (
            <CoachCard
              key={coach.name}
              name={coach.name}
              role={coach.role}
              bio={coach.bio}
              className="border border-hairline transition-[border-color] duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:border-primary/40 group overflow-hidden"
              photo={
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-canvas-soft mb-space-small">
                  <Image
                    src={coach.image}
                    alt={`${coach.name} — ${coach.role} coach at Fitlat`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent opacity-60"
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
