import { cn } from "@/lib/utils";

interface StatTileProps {
  value: string;
  label: string;
  className?: string;
}

/**
 * Proof-strip stat — see design-fitlat.md `stat-tile`.
 * Number in the primary accent, label in ink-muted eyebrow caps.
 */
export function StatTile({ value, label, className }: StatTileProps) {
  return (
    <div className={cn("flex flex-col items-center gap-space-caption text-center", className)}>
      <span className="text-h2 text-primary">{value}</span>
      <span className="text-caption text-caps text-ink-muted">{label}</span>
    </div>
  );
}
