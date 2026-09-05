import { StatTile } from "./stat-tile";
import { MetallicDivider } from "./metallic-divider";
import { content } from "@/content";

/**
 * Proof Strip — CLAUDE.md section order #3.
 * Proof metrics (from `content.proof`, the single source shared with the
 * gallery's stat cells) followed by the metallic divider.
 */
export function ProofStrip() {
  const stats = Object.values(content.proof);

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
