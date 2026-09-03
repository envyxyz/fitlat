import { StatTile } from "./stat-tile";
import { MetallicDivider } from "./metallic-divider";

/**
 * Proof Strip — CLAUDE.md section order #3.
 * 4 key proof metrics followed by the metallic divider.
 */
export function ProofStrip() {
  const stats = [
    { value: "1,200+", label: "Members Trained" },
    { value: "14,000", label: "Floor Space (sq ft)" },
    { value: "6", label: "Years Open" },
    { value: "90+", label: "Coached Sessions Weekly" },
  ];

  return (
    <section
      data-nav-surface="canvas"
      aria-label="Gym statistics"
      className="bg-canvas border-t border-hairline py-space-h2"
    >
      <div className="mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl">
        <div className="grid grid-cols-2 gap-y-space-h1 gap-x-space-body md:grid-cols-4 md:gap-space-body">
          {stats.map((stat) => (
            <StatTile key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
      <div className="mt-space-h2">
        <MetallicDivider />
      </div>
    </section>
  );
}
