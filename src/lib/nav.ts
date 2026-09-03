/** Source of truth: CONTENT.md `## Header` + `## Footer`. Shared by the
 * desktop bar and the mobile full-screen menu so the link list never drifts
 * between the two. */
export const NAV_ITEMS = [
  { label: "Facilities", href: "#facilities" },
  { label: "Coaches", href: "#coaches" },
  { label: "Membership", href: "#membership" },
  { label: "Visit", href: "#visit" },
] as const;

export const FOOTER_CONTACT = {
  hours: "Mon–Fri 5am–10pm · Sat–Sun 7am–8pm",
  phone: "(555) 019-4482",
  socials: [
    { label: "Instagram", handle: "@fitlat" },
    { label: "X/Twitter", handle: "@fitlatgym" },
  ],
} as const;
