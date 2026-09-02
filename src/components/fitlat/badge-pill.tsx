import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Eyebrow / kicker label — see design-fitlat.md `badge-pill`. */
export function BadgePill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Badge variant="outline" className={cn("text-caps border-hairline text-primary", className)}>
      {children}
    </Badge>
  );
}
