"use client";

import ShowcaseLayout from "../ShowcaseLayout";

export default function ElevateShowcase() {
  return (
    <ShowcaseLayout
      data={{
        slug: "elevate",
        name: "Elevate",
        category: "Corporate & SaaS",
        description:
          "A premium, light-mode corporate website template for SaaS companies, startups, and professional services. Structured grid, bento cards, trust signals woven throughout.",
        techStack: ["Next.js", "Tailwind", "Framer Motion"],
        gumroadUrl: "",
        designChoices: [
          {
            num: "01",
            title: "White + One Accent",
            body: "Pure white #FFFFFF background, near-black text, single blue #3B82F6 accent. The 'Linear look' — works because white creates perceived space and cleanliness. One accent colour gives every CTA instant visual priority. Zero confusion about what to click.",
          },
          {
            num: "02",
            title: "Inter — One Font, Three Weights",
            body: "400, 600, 700. Corporate sites need consistency, not personality. Inter is the most readable sans-serif on screens — used by GitHub, Figma, and Linear. Three weights create sufficient hierarchy without noise.",
          },
          {
            num: "03",
            title: "Dot Grid Background",
            body: "Subtle radial dot grid at low opacity in the hero. Pattern pioneered by Vercel — adds visual texture without competing. Says 'technical, precise, engineered' without showing code. CSS-only — zero performance cost.",
          },
          {
            num: "04",
            title: "Bento Feature Cards",
            body: "3-column grid with equal cards. Named after Japanese lunch boxes. Linear, Notion, and Arc all use it. Scannable, modular, mobile-friendly. Users compare features quickly, easy to add/remove cards.",
          },
          {
            num: "05",
            title: "Trust Above the Fold",
            body: "Logo bar immediately after hero. Metric callouts in a dark strip. Testimonials with real names. Pages with trust signals above the fold convert 37% better (Baymard Institute). This isn't decoration — it's conversion optimization.",
          },
        ],
        uxDecisions: [
          {
            title: "Glassmorphism Nav",
            body: "Backdrop-filter blur creates frosted glass. Content scrolls behind but stays readable. Both aesthetic and functional — user always knows where they are.",
          },
          {
            title: "Beta Badge Pattern",
            body: "Creates urgency (be early) and sets expectations (product evolving). Every successful SaaS launch page uses some version of this.",
          },
          {
            title: "Dark Metrics Strip",
            body: "Contrast break signals importance. Creates visual rhythm — without it, the page is a white wall.",
          },
        ],
        included: [
          "7 sections (Nav, Hero, Logos, Features, Metrics, Testimonials, CTA, Footer)",
          "Light mode with proper accessible contrast ratios (WCAG AA)",
          "Bento grid that degrades gracefully: 3-col → 2-col → 1-col",
          "Testimonial avatars with fallback initials (no broken images)",
          "Single clear CTA per section — not four competing buttons",
          "Semantic HTML with proper heading hierarchy",
          "Next.js + Tailwind source code",
          "1-click Vercel deploy",
        ],
        excluded: [
          "No carousel for testimonials — carousels have <1% interaction rate (NNG)",
          "No mega-menu — overkill for most SaaS sites",
          "No animations that delay content — everything visible immediately",
          "No dark mode toggle — corporate clients show this to their boss, boss uses light mode",
        ],
        audience:
          "SaaS companies, startups, fintech, professional services, consulting firms — any business that needs to project trust, clarity, and modern competence.",
        references: [
          "linear.app",
          "stripe.com",
          "vercel.com",
          "ramp.com",
          "resend.com",
        ],
        ctaLine:
          "Source code and documentation for a corporate site that looks like it cost six figures.",
        hireSuffix: "for your brand",
      }}
    />
  );
}
