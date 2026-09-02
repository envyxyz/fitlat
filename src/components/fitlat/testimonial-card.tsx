import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  detail: string;
  className?: string;
}

/** Member testimonial — see design-fitlat.md `testimonial-card`. */
export function TestimonialCard({ quote, name, detail, className }: TestimonialCardProps) {
  return (
    <Card className={cn("rounded-lg bg-surface", className)}>
      <CardContent className="flex flex-col gap-space-small">
        <span aria-hidden="true" className="text-h2 leading-none text-primary">
          &ldquo;
        </span>
        <p className="text-body-lg text-ink-secondary">{quote}</p>
        <footer className="text-small text-ink-muted">
          <span className="text-body-accent text-ink">{name}</span> — {detail}
        </footer>
      </CardContent>
    </Card>
  );
}
