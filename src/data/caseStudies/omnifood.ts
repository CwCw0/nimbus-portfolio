import { CaseStudy } from "./types";

export const omnifood: CaseStudy = {
  slug: "omnifood",
  status: "live",
  category: "Website",
  tags: ["HTML/CSS", "Landing Page", "Responsive"],
  title: "Omnifood — Meal Subscription Landing Page",
  shortTitle: "Omnifood",
  desc: "A modern landing page for a premium meal subscription service, featuring responsive design and clean UI.",
  heroDesc:
    "A clean, modern landing page for a premium meal delivery subscription service. Designed to convert visitors into subscribers with clear messaging, social proof, and a seamless user flow.",
  heroImage: "/images/omnifood/hero.png",
  gallery: [
    "/images/omnifood/meals.png",
    "/images/omnifood/how-it-works.png",
    "/images/omnifood/testimonials.png",
    "/images/omnifood/pricing.png",
    "/images/omnifood/cta.png",
  ],
  challenge:
    "Design and build a high-converting landing page for a meal subscription service. The page needed to clearly communicate the value proposition, showcase meal quality, and guide users toward signing up — all while being fully responsive across every device.",
  solution:
    "Built a polished, responsive landing page with semantic HTML and modern CSS. The design features clear visual hierarchy, customer testimonials for social proof, transparent pricing tiers, a meal gallery, and a smooth user flow from hero to CTA.",
  liveUrl: "https://omnifood-cw.netlify.app/",
  results: [
    { value: "100%", label: "Responsive", color: "text-white" },
    { value: "5", label: "Page Sections", color: "text-[var(--color-accent)]" },
    { value: "2", label: "Pricing Tiers", color: "text-white" },
    { value: "4", label: "Testimonials", color: "text-[var(--color-accent)]" },
  ],
};
