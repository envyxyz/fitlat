import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  detail: string;
  avatar?: ReactNode;
  className?: string;
}

/** Member testimonial — see design-fitlat.md `testimonial-card`. */
export function TestimonialCard({
  quote,
  name,
  detail,
  avatar,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn("rounded-lg bg-surface border border-hairline", className)}>
      <CardContent className="flex flex-col gap-space-small p-space-body-lg">
        <span aria-hidden="true" className="text-h2 leading-none text-primary">
          &ldquo;
        </span>
        <p className="text-body-lg text-ink-secondary leading-relaxed flex-1">{quote}</p>
        <footer className="mt-space-small flex items-center gap-space-small border-t border-hairline/60 pt-space-small text-small text-ink-muted">
          {avatar}
          <div>
            <span className="block text-body-accent text-ink">{name}</span>
            <span className="block text-caption text-ink-muted">{detail}</span>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
