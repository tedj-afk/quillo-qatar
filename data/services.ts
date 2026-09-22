export type Service = {
  eyebrow: string;
  title: string;
  price: string;
  priceNote: string;
  timeline: string;
  audience: string;
  includes: string[];
  cta: string;
  microcopy: string;
};

export const services: Service[] = [
  {
    eyebrow: "SERVICE 01",
    title: "Landing Page Sprint",
    price: "$3,000",
    priceNote: "FIXED",
    timeline: "~2 weeks",
    audience: "For launches, campaigns, demand tests, and products that need a sharper first impression.",
    includes: [
      "Positioning + messaging",
      "Page structure + conversion copy",
      "Custom responsive design",
      "Framer or Webflow build",
      "Forms, analytics, QA, and launch",
      "7 days post-launch support",
    ],
    cta: "Book a call",
    microcopy: "One page. One tight sprint. Strategy to shipped.",
  },
  {
    eyebrow: "SERVICE 02",
    title: "Website Refresh",
    price: "$5,000",
    priceNote: "STANDARD SCOPE",
    timeline: "~2 weeks for standard scope",
    audience:
      "For SaaS companies whose product changed while the website stayed behind.",
    includes: [
      "Existing website audit",
      "Positioning + information architecture",
      "Homepage plus up to 4 core pages",
      "Responsive design system",
      "Framer or Webflow, CMS where needed",
      "Forms, analytics, QA, and launch",
      "7 days post-launch support",
    ],
    cta: "Book a call",
    microcopy: "Bigger scope. Same bias toward shipping.",
  },
];
