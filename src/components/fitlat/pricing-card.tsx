import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePill } from "./badge-pill";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  tier: string;
  currency: string;
  price: string;
  period: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  tag?: string;
  className?: string;
}

/**
 * Pricing tier card — see design-fitlat.md `pricing-plan-card` /
 * `pricing-plan-card-featured`. The featured tier (Casual) is distinguished
 * by a primary-accent border, not a color-fill flip.
 */
export function PricingCard({
  tier,
  currency,
  price,
  period,
  features,
  ctaLabel,
  ctaHref,
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
          : "border-hairline bg-surface hover:border-ink-faint",
        className
      )}
    >
      <CardHeader className="p-space-body-lg pb-space-small">
        <div className="flex items-center justify-between mb-space-caption">
          <CardTitle className="text-h4 text-ink">{tier}</CardTitle>
          {tag && (
            <BadgePill
              className={featured ? "border-primary/50 text-primary" : "text-ink-faint"}
            >
              {tag}
            </BadgePill>
          )}
        </div>
        <div className="flex items-baseline gap-xxs">
          <span className="text-body-lg text-ink-muted">{currency}</span>
          <span className="text-h2 font-bold text-ink">{price}</span>
          <span className="text-small text-ink-muted">{period}</span>
        </div>
      </CardHeader>
      <CardContent className="px-space-body-lg py-space-small flex-1">
        <ul className="flex flex-col gap-space-small text-small text-ink-secondary">
          {features.map((feature) => (
            <li key={feature} className="relative pl-md before:absolute before:left-0 before:top-[0.9em] before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary">
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-space-body-lg pt-space-small">
        <Button
          variant={featured ? "default" : "outline"}
          size="lg"
          render={<a href={ctaHref} />}
          nativeButton={false}
          className={cn(
            "w-full h-11",
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
