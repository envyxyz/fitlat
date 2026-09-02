import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  className?: string;
}

/**
 * Pricing tier card — see design-fitlat.md `pricing-plan-card` /
 * `pricing-plan-card-featured`. The featured tier (Professional Athlete) is
 * distinguished by a primary-accent border, not a color-fill flip.
 */
export function PricingCard({
  tier,
  price,
  period,
  features,
  ctaLabel,
  featured = false,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "rounded-lg",
        featured ? "border border-primary bg-surface-card" : "bg-surface",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-h4">{tier}</CardTitle>
        <p className="text-h3">
          {price}
          <span className="text-small text-ink-muted"> / {period}</span>
        </p>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-space-caption text-small text-ink-secondary">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={featured ? "default" : "outline"} className="w-full">
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}

export type { PricingCardProps };
