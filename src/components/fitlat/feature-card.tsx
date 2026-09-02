import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  image?: ReactNode;
  caption: string;
  className?: string;
}

/** Gallery / facility card — see design-fitlat.md `feature-card`. */
export function FeatureCard({ image, caption, className }: FeatureCardProps) {
  return (
    <Card className={cn("rounded-lg bg-surface", className)}>
      {image}
      <CardContent>
        <p className="text-body-lg text-ink">{caption}</p>
      </CardContent>
    </Card>
  );
}
