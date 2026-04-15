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
    "Omnifood holds a special place in everything I've built since. It was the first time I closed the tutorials, opened a blank editor, and made every decision myself. No hand-holding, no step-by-step guide — just a brief and a blank screen.",

  heroImage: "/images/omnifood/hero.jpg",
  gallery: [
    "/images/omnifood/meals.png",
    "/images/omnifood/how-it-works.png",
    "/images/omnifood/testimonials.jpg",
    "/images/omnifood/pricing.jpg",
    "/images/omnifood/cta.png",
  ],

  challenge:
    "Build a complete, production-quality landing page from scratch with zero guidance. The brief was simple: a meal subscription service needs a page that explains the product, builds trust, and drives sign-ups.\n\nBut the real challenge wasn't the brief — it was making every decision myself for the first time. Where does the navigation go? What font sizes actually look good? How do you structure sections so the user naturally flows toward the CTA?\n\nThese are questions tutorials answer for you. On your own, you have to earn every answer.",

  challengePoints: [
    "Every layout, spacing, and typography decision made from scratch",
    "Responsive design without a framework to lean on",
    "Building a natural conversion funnel with zero prior experience",
    "Making it feel polished without JavaScript animation libraries",
  ],

  solution:
    "I built Omnifood with semantic HTML5 and modern CSS — no frameworks, no component libraries, no shortcuts. The architecture follows a deliberate conversion funnel: hero with clear value proposition, a visual \"how it works\" flow, a meal gallery, customer testimonials, transparent pricing, and a final CTA.\n\nEvery section was designed mobile-first and tested across breakpoints manually. Typography uses clear hierarchy — large display headings to anchor sections, body text sized for comfortable reading, and consistent spacing that creates rhythm.\n\nThe colour palette was chosen for warmth and appetite appeal, with a single accent colour driving the eye toward conversion points. Subtle CSS transitions on hover and scroll make the experience feel polished without relying on JavaScript.",

  solutionHighlights: [
    "Pure HTML5 + CSS — zero JS dependencies",
    "7-section conversion funnel designed from first principles",
    "Mobile-first, manually tested across all breakpoints",
    "CSS-only transitions and scroll reveals",
    "Warm colour palette with a single accent driving conversion",
  ],

  liveUrl: "https://omnifood-cw.netlify.app/",

  results: [
    { value: "100%", label: "Responsive", color: "text-white" },
    { value: "0", label: "JS Dependencies", color: "text-[var(--color-accent)]" },
    { value: "7", label: "Conversion Sections", color: "text-white" },
    { value: "<1s", label: "Load Time", color: "text-[var(--color-accent)]" },
  ],
};
