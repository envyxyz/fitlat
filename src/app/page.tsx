import { TypographyExample } from "@/components/TypographyExample";
import {
  BadgePill,
  CoachCard,
  FeatureCard,
  MetallicDivider,
  PricingCard,
  StatTile,
  TestimonialCard,
} from "@/components/fitlat";
import { Button } from "@/components/ui/button";

/**
 * Design-system showcase. Not a real page — verifies the token layer and
 * primitives render correctly. Replace with real sections per CONTENT.md.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-space-h1 bg-canvas px-space-body-lg py-space-h1">
      <BadgePill>Design System</BadgePill>

      <TypographyExample />

      <div className="flex gap-space-small">
        <Button>Join Fitlat</Button>
        <Button variant="outline">Book a tour</Button>
      </div>

      <div className="grid grid-cols-3 gap-space-body">
        <StatTile value="450+" label="Members" />
        <StatTile value="12" label="Coaches" />
        <StatTile value="24/7" label="Access" />
      </div>

      <MetallicDivider />

      <div className="grid grid-cols-3 gap-space-body">
        <FeatureCard caption="Full equipment floor" />
        <CoachCard name="Ayesha Raza" role="Strength & Conditioning" bio="Ten years coaching competitive lifters." />
        <TestimonialCard
          quote="Fitlat changed how I train."
          name="Bilal K."
          detail="Member since 2023"
        />
      </div>

      <div className="grid grid-cols-3 gap-space-body">
        <PricingCard tier="Student" price="PKR 4,500" period="mo" features={["Full floor access", "Group classes"]} ctaLabel="Join" />
        <PricingCard
          tier="Professional Athlete"
          price="PKR 12,000"
          period="mo"
          features={["Full floor access", "1:1 coaching", "Recovery suite"]}
          ctaLabel="Join"
          featured
        />
        <PricingCard tier="Casual" price="PKR 7,500" period="mo" features={["Full floor access"]} ctaLabel="Join" />
      </div>
    </div>
  );
}
