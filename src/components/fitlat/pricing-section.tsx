import { PricingCard } from "./pricing-card";
import { content } from "@/content";

const TIERS = content.pricing.tiers;

/**
 * Pricing / Membership Section — CLAUDE.md section order #7.
 * Heading: "Membership"
 * Intro: "Come see the floor before you commit to anything."
 * 3 pricing cards with distinct tiers and primary featured tier.
 */
export function PricingSection() {
  return (
    <section
      id="membership"
      data-nav-surface="canvas"
      aria-label="Membership plans"
      className="bg-canvas py-space-h1 lg:py-space-h2 border-t border-hairline"
    >
      <div className="mx-auto max-w-[1440px] px-space-body-lg lg:px-xxl">
        {/* Section Header */}
        <div className="mb-space-h1 max-w-2xl">
          <span className="text-caption text-caps text-primary block mb-space-caption">
            {content.pricing.eyebrow}
          </span>
          <h2 className="text-h2 text-ink">{content.pricing.heading}</h2>
          <p className="mt-space-caption text-body-lg text-ink-secondary">
            {content.pricing.intro}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-space-body md:grid-cols-3 items-stretch">
          {TIERS.map((tier) => (
            <PricingCard
              key={tier.tier}
              tier={tier.tier}
              price={tier.price}
              period={tier.period}
              tag={tier.tag}
              features={tier.features}
              ctaLabel={tier.ctaLabel}
              featured={tier.featured}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
