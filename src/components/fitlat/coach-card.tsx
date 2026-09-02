import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CoachCardProps {
  photo?: ReactNode;
  name: string;
  role: string;
  bio: string;
  className?: string;
}

/**
 * Compact coach profile — see design-fitlat.md `coach-card`.
 * Deliberately minimal: photo, name, role/specialty, one-line bio. No more.
 */
export function CoachCard({ photo, name, role, bio, className }: CoachCardProps) {
  return (
    <Card size="sm" className={cn("rounded-md bg-surface-card", className)}>
      <CardContent className="flex flex-col gap-space-caption">
        {photo}
        <span className="text-h4">{name}</span>
        <span className="text-small text-caps text-ink-muted">{role}</span>
        <p className="text-small text-ink-secondary">{bio}</p>
      </CardContent>
    </Card>
  );
}
