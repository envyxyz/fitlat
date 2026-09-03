import Image from "next/image";
import { CoachCard } from "./coach-card";

const COACHES = [
  {
    name: "Marcus Whitfield",
    role: "Strength & Conditioning",
    bio: "Ten years coaching collegiate lifters before he brought the same programming to Fitlat's floor.",
    image: "/images/coaches/marcus-whitfield.jpg",
  },
  {
    name: "Renata Cole",
    role: "Mobility & Recovery",
    bio: "Started as a physical therapist; got tired of only seeing people after something already went wrong.",
    image: "/images/coaches/renata-cole.jpg",
  },
  {
    name: "Devon Ashworth",
    role: "Performance Training",
    bio: "Former semi-pro sprinter who builds Fitlat's athlete-tier programming block by block.",
    image: "/images/coaches/devon-ashworth.jpg",
  },
];

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
            Expert Pedigree
          </span>
          <h2 className="text-h2 text-ink">Coached, not just supervised</h2>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 gap-space-body md:grid-cols-3">
          {COACHES.map((coach) => (
            <CoachCard
              key={coach.name}
              name={coach.name}
              role={coach.role}
              bio={coach.bio}
              className="border border-hairline transition-all duration-[var(--duration-fast)] ease-[var(--motion-ease)] hover:border-primary/40 group overflow-hidden"
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
