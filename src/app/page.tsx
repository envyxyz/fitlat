import {
  SiteHeader,
  Hero,
  GallerySection,
  CoachesSection,
  TestimonialsSection,
  PricingSection,
  SiteFooter,
} from "@/components/fitlat";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10 bg-canvas flex flex-1 flex-col overflow-x-hidden w-full max-w-full">
        {/* Section 2: Hero (Attention) with floating tour card */}
        <Hero />

        {/* Section 3: Facilities, Trust Metrics & Archive Grid */}
        <GallerySection />

        {/* Section 5: Coaches (Desire) */}
        <CoachesSection />

        {/* Section 6: Testimonials (Desire) */}
        <TestimonialsSection />

        {/* Section 7: Pricing / Membership (Action) */}
        <PricingSection />
      </main>

      {/* Section 8: Parallax Sticky Reveal Footer */}
      <SiteFooter />
    </>
  );
}

