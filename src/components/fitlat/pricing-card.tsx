import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePill } from "./badge-pill";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  tag?: string;
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
  tag,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative rounded-lg flex flex-col justify-between border transition-[border-color] duration-[var(--duration-fast)] ease-[var(--motion-ease)]",
        featured
          ? "border-primary bg-surface-card shadow-lg shadow-primary/5"
          : "border-hairline bg-surface hover:border-hairline/80",
        className
      )}
    >
      <CardHeader className="p-space-body-lg pb-space-small">
        <div className="flex items-center justify-between mb-space-caption">
          <CardTitle className="text-h4 text-ink">{tier}</CardTitle>
          {featured && (
            <BadgePill className="border-primary/50 text-primary">
              Most Popular
            </BadgePill>
          )}
          {tag && !featured && (
            <span className="text-caption text-caps text-ink-faint">{tag}</span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-h2 font-bold text-ink">{price}</span>
          <span className="text-small text-ink-muted">/ {period}</span>
        </div>
      </CardHeader>
      <CardContent className="px-space-body-lg py-space-small flex-1">
        <ul className="flex flex-col gap-space-small text-small text-ink-secondary">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-space-xs">
              <span
                aria-hidden="true"
                className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-space-body-lg pt-space-small">
        <Button
          variant={featured ? "default" : "outline"}
          className={cn(
            "w-full",
            featured ? "font-semibold text-on-primary" : "border-hairline"
          )}
        >
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}

export type { PricingCardProps };
