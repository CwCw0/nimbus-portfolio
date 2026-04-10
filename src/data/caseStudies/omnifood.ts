import { CaseStudy } from "./types";

export const omnifood: CaseStudy = {
  slug: "omnifood",
  status: "live",
  category: "Website",
  tags: ["HTML/CSS", "Responsive Design", "Landing Page", "Conversion"],
  title: "Omnifood — Where It All Started",
  shortTitle: "Omnifood",
  desc: "My first real project. A high-converting landing page for a meal subscription service — and the project that taught me more than any tutorial ever could.",
  heroDesc:
    "Omnifood holds a special place in everything I've built since. It was the first time I closed the tutorials, opened a blank editor, and made every decision myself. No hand-holding, no step-by-step guide — just a brief and a blank screen. The result is a fully responsive landing page for a premium meal delivery service, designed from scratch to convert visitors into subscribers.",
  heroImage: "/images/omnifood/hero.png",
  gallery: [
    "/images/omnifood/meals.png",
    "/images/omnifood/how-it-works.png",
    "/images/omnifood/testimonials.png",
    "/images/omnifood/pricing.png",
    "/images/omnifood/cta.png",
  ],
  challenge:
    "Build a complete, production-quality landing page from scratch with zero guidance. The brief was simple: a meal subscription service needs a page that explains the product, builds trust, and drives sign-ups. But the real challenge wasn't the brief — it was making every decision myself for the first time. Where does the navigation go? What font sizes actually look good? How do you structure sections so the user naturally flows toward the CTA? How do you make it work on a phone when you designed it on a 27-inch monitor? These are questions tutorials answer for you. On your own, you have to earn every answer.",
  solution:
    "I built Omnifood with semantic HTML5 and modern CSS — no frameworks, no component libraries, no shortcuts. The architecture follows a deliberate conversion funnel: a hero section with a clear value proposition and social proof indicators, a visual \"how it works\" flow that reduces friction, a meal gallery showcasing product quality, authentic customer testimonials for trust, transparent pricing tiers that eliminate objections, and a final CTA that brings it all together. Every section was designed mobile-first and tested across breakpoints manually. The typography uses a clear hierarchy — large display headings to anchor each section, body text sized for comfortable reading, and consistent spacing that creates rhythm. The colour palette was chosen for warmth and appetite appeal, with a single accent colour driving the eye toward conversion points. Subtle CSS transitions on hover states and scroll reveals make the experience feel polished without relying on JavaScript animation libraries.",
  liveUrl: "https://omnifood-cw.netlify.app/",
  results: [
    { value: "100%", label: "Responsive", color: "text-white" },
    { value: "0", label: "JS Dependencies", color: "text-[var(--color-accent)]" },
    { value: "7", label: "Conversion Sections", color: "text-white" },
    { value: "<1s", label: "Load Time", color: "text-[var(--color-accent)]" },
  ],
};
