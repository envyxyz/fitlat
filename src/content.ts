/**
 * Single content source for the Fitlat site. See CONTENT.md at the project
 * root for the human-readable version this is generated from — update that
 * file first, then mirror the change here. Every string a component shows
 * to a visitor should come from this module, not be typed inline.
 */

interface PricingTier {
  tier: string;
  price: string;
  period: string;
  tag?: string;
  features: string[];
  ctaLabel: string;
  featured: boolean;
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const content = {
  site: {
    name: "Fitlat",
    wordmark: "FITLAT",
    metaTitle: "Fitlat",
    metaDescription: "Fitlat — train with intent.",
  },

  header: {
    navItems: [
      { label: "Facilities", href: "#facilities" },
      { label: "Coaches", href: "#coaches" },
      { label: "Membership", href: "#membership" },
      { label: "Visit", href: "#visit" },
    ],
    ctaLabel: "Join Fitlat",
    ctaHref: "#membership",
    logoAriaLabel: "Fitlat home",
  },

  hero: {
    eyebrow: "Guidance Over Equipment",
    headline: "Train like it matters.",
    positioning:
      "Equipment alone doesn't build results — guidance does. Fitlat pairs a safe Islamabad training floor with highly qualified male and female coaches, group classes, and one-on-one programming built around you.",
    ctaPrimary: { label: "Book a Tour", href: "#facilities" },
    ctaSecondary: { label: "See Membership", href: "#membership" },
    backgroundImage: {
      src: "/images/hero/hero-training.jpg",
      alt: "Fitlat athletes training on the strength floor",
    },
    tourCard: {
      previewImage: {
        src: "/images/hero/hero-motion-texture.jpg",
        alt: "Fitlat athlete training preview",
      },
      tag: "Floor Tour",
      avatars: [
        { src: "/images/testimonials/priya-malhotra.jpg", alt: "Priya Malhotra" },
        { src: "/images/testimonials/james-okonkwo.jpg", alt: "James Okonkwo" },
        { src: "/images/testimonials/sofia-reyes.jpg", alt: "Sofia Reyes" },
      ],
      countLabel: "+200",
      captionTop: "Trusted by",
      captionBottom: "Islamabad",
    },
  },

  // Single source for every number quoted elsewhere on the site (gallery
  // stat cells, tour modal, hero tour card) — sourced from staff.md, not
  // invented. Reference these by key instead of retyping the figure.
  proof: {
    founderExperience: { value: "30+", label: "Years Sports Management Experience" },
    trainerExperience: { value: "11+", label: "Years Training Islamabad" },
    transformations: { value: "200+", label: "Client Transformations Coached" },
    certification: { value: "L3", label: "Certified Coaching Staff" },
  },

  gallery: {
    heading: "Where the work happens",
    intro: "A look at the floor, not a stock photo of one.",
    viewerImages: [
      {
        src: "/images/gallery/lifting-platforms.jpg",
        alt: "Main lifting platforms on the Fitlat floor, early morning",
        caption: "Main lifting platforms, 6am",
      },
      {
        src: "/images/gallery/sled-track.jpg",
        alt: "Turf sled track along the east wall",
        caption: "Turf sled track, east wall",
      },
      {
        src: "/images/gallery/free-weights.jpg",
        alt: "Free weight section on the training floor",
        caption: "Free weight section",
      },
      {
        src: "/images/gallery/recovery-room.jpg",
        alt: "Fitlat recovery room",
        caption: "Recovery & mobility bay",
      },
      {
        src: "/images/gallery/group-bay.jpg",
        alt: "Group training bay before an early class",
        caption: "Group training bay",
      },
    ],
    // 12-cell matrix (3 rows x 4 cols). `viewerIndex` points into
    // `viewerImages` above. `statKey` (when present) points into `proof`
    // above instead of restating a number.
    cells: [
      {
        id: "cell-1-1",
        variant: "heading" as const,
        titleLines: ["WHERE THE", "WORK", "HAPPENS"],
        revealSrc: "/images/gallery/group-bay.jpg",
        alt: "Fitlat training floor and community",
        viewerIndex: 4,
      },
      {
        id: "cell-1-2",
        variant: "stone-story" as const,
        statKey: "founderExperience" as const,
        story: "Years of sports management experience behind every program here.",
        revealSrc: "/images/gallery/lifting-platforms.jpg",
        alt: "Fitlat main lifting platforms at 6am",
        viewerIndex: 0,
      },
      {
        id: "cell-1-3",
        variant: "photo" as const,
        imageSrc: "/images/gallery/lifting-platforms.jpg",
        alt: "Main lifting platforms on the Fitlat floor, early morning",
        caption: "Main lifting platforms, 6am",
        viewerIndex: 0,
      },
      {
        id: "cell-1-4",
        variant: "stone-vertical" as const,
        statKey: "trainerExperience" as const,
        story: "TRAINING ISLAMABAD",
        revealSrc: "/images/gallery/sled-track.jpg",
        alt: "11+ years training Islamabad",
        viewerIndex: 1,
      },
      {
        id: "cell-2-1",
        variant: "photo" as const,
        imageSrc: "/images/gallery/sled-track.jpg",
        alt: "Turf sled track along the east wall",
        caption: "Turf sled track, east wall",
        viewerIndex: 1,
      },
      {
        id: "cell-2-2",
        variant: "stone-story" as const,
        statKey: "transformations" as const,
        story: "Client transformations coached across fat loss, rehab, and performance goals.",
        revealSrc: "/images/gallery/free-weights.jpg",
        alt: "200+ client transformations coached",
        viewerIndex: 2,
      },
      {
        id: "cell-2-3",
        variant: "photo" as const,
        imageSrc: "/images/gallery/free-weights.jpg",
        alt: "Free weight section on the training floor",
        caption: "Free weight section",
        viewerIndex: 2,
      },
      {
        id: "cell-2-4",
        variant: "stone-story" as const,
        story:
          "Every session starts with an assessment, not a machine — guidance before equipment.",
        revealSrc: "/images/gallery/recovery-room.jpg",
        alt: "Fitlat coaching philosophy",
        viewerIndex: 3,
      },
      {
        id: "cell-3-1",
        variant: "stone-story" as const,
        statKey: "certification" as const,
        story: "Certified trainers — corrective exercise, osteopathy, and strength coaching under one roof.",
        revealSrc: "/images/gallery/group-bay.jpg",
        alt: "Level 3 certified coaching staff",
        viewerIndex: 4,
      },
      {
        id: "cell-3-2",
        variant: "photo" as const,
        imageSrc: "/images/gallery/recovery-room.jpg",
        alt: "Fitlat recovery room",
        caption: "Recovery & mobility bay",
        viewerIndex: 3,
      },
      {
        id: "cell-3-3",
        variant: "stone-quote" as const,
        testimonialIndex: 0,
        revealSrc: "/images/gallery/lifting-platforms.jpg",
        alt: "Member testimonial",
        viewerIndex: 0,
      },
      {
        id: "cell-3-4",
        variant: "heading" as const,
        titleLines: ["FITLAT", "ARCHIVE", "& INTENT"],
        revealSrc: "/images/gallery/group-bay.jpg",
        alt: "Fitlat Archive and Intent",
        viewerIndex: 4,
      },
    ],
  },

  tourModal: {
    badge: "Floor Tour Preview",
    facilityTag: "Fitlat Training Floor",
    mediaImage: {
      src: "/images/gallery/lifting-platforms.jpg",
      alt: "Fitlat main training floor and lifting platforms",
    },
    mediaTitle: "Main Lifting Platforms & Turf",
    mediaCaption: "A coached strength floor — assessed, guided, and built around your goals.",
    openStatusLabel: "Floor Open Now · 5:00 AM – 10:00 PM",
    closeLabel: "Close Preview",
    ctaLabel: "Join Fitlat",
  },

  coaches: {
    eyebrow: "Expert Pedigree",
    heading: "Coached, not just supervised",
    members: [
      {
        name: "Tanveer Hussain",
        role: "Founder / Co-Founder",
        bio: "30+ years in sports management and supervision; built Fitlat around one idea — equipment alone doesn't get results, guidance does.",
        image: "/images/coaches/tanveer-hussain.png",
      },
      {
        name: "Aqib Ashfaq",
        role: "Personal Trainer — Level 3 Certified",
        bio: "12 years coaching in Islamabad and 200+ client transformations, from fat loss to injury recovery.",
        image: "/images/coaches/aqib-ashfaq.png",
      },
      {
        name: "Laiba Shabbir",
        role: "Personal Trainer — Osteopathy & Corrective Exercise",
        bio: "Level 3 certified with a specialization in osteopathy; trains everyone from teenagers to seniors.",
        image: "/images/coaches/laiba-shabbir.png",
      },
    ],
  },

  // No verified member testimonials exist yet — these remain flagged
  // placeholders (see the disclosure line at the bottom of CONTENT.md)
  // until real quotes are supplied.
  testimonials: {
    eyebrow: "Member Proof",
    heading: "From the floor",
    items: [
      {
        quote:
          "I switched gyms four times before Fitlat. This is the first one where a coach actually watched my form without me asking.",
        name: "Priya Malhotra",
        detail: "Member since 2023",
        image: "/images/testimonials/priya-malhotra.jpg",
      },
      {
        quote:
          "Between clinicals I get maybe forty minutes. The coaches here plan around that instead of pretending I have two hours.",
        name: "James Okonkwo",
        detail: "Member since 2024",
        image: "/images/testimonials/james-okonkwo.jpg",
      },
      {
        quote:
          "I train for competition, not for a hobby, and Fitlat is the only gym nearby that didn't treat that as a weird request.",
        name: "Sofia Reyes",
        detail: "Member since 2022",
        image: "/images/testimonials/sofia-reyes.jpg",
      },
    ],
  },

  // No confirmed pricing exists yet — figures remain flagged placeholders
  // (see CONTENT.md) until the client supplies real tiers.
  pricing: {
    eyebrow: "Transparent Pricing",
    heading: "Membership",
    intro: "Come see the floor before you commit to anything.",
    tiers: [
      {
        tier: "Student",
        price: "$39",
        period: "mo",
        tag: "Valid ID Required",
        features: [
          "Full strength floor & turf access",
          "All standard group classes included",
          "Locker room & private shower access",
          "Month-to-month, no lock-in contract",
        ],
        ctaLabel: "Join as Student",
        featured: false,
      },
      {
        tier: "Casual",
        price: "$79",
        period: "mo",
        tag: "Most Flexible",
        features: [
          "Everything in Student membership",
          "Open coaching floor access",
          "2 guest passes per month",
          "Extended hours access (5am – 10pm)",
        ],
        ctaLabel: "Join Casual",
        featured: false,
      },
      {
        tier: "Professional Athlete",
        price: "$149",
        period: "mo",
        features: [
          "Everything in Casual membership",
          "Individualized block programming",
          "Priority recovery room booking",
          "Direct 1-on-1 coach access",
          "Full competition prep support",
        ],
        ctaLabel: "Apply for Athlete Tier",
        featured: true,
      },
    ] as PricingTier[],
  },

  footer: {
    headlineLines: ["Fitlat is the standard", "you’ve been training for."],
    columns: [
      {
        heading: "Useful",
        links: [
          { label: "Manifesto", href: "#about" },
          { label: "Careers", href: "#coaches" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms & Conditions", href: "#" },
        ],
      },
      {
        heading: "Updates",
        links: [
          { label: "Twitter", href: "https://twitter.com", external: true },
          { label: "Instagram", href: "https://instagram.com", external: true },
        ],
      },
    ] as FooterColumn[],
    contact: {
      hours: "Mon–Fri 5am–10pm · Sat–Sun 7am–8pm",
      phone: "(555) 019-4482",
      socials: [
        { label: "Instagram", handle: "@fitlat", href: "https://instagram.com" },
        { label: "X/Twitter", handle: "@fitlatgym", href: "https://twitter.com" },
      ],
    },
    legalLine: "FITLAT © — All rights reserved. Strength and conditioning gym.",
  },
} as const;

export type Content = typeof content;
