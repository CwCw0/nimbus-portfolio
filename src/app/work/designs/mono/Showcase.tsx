"use client";

import ShowcaseLayout from "../ShowcaseLayout";

export default function Showcase() {
  return (
    <ShowcaseLayout
      data={{
        slug: "mono",
        name: "Mono",
        category: "Ultra-Minimal Portfolio",
        description:
          "Extreme minimalism. One font, zero decoration, black on white. Project titles ARE the navigation. For designers, developers, and creatives who let their work speak for itself.",
        techStack: ["Next.js", "GSAP", "Tailwind"],
        gumroadUrl: "",
        designChoices: [
          {
            num: "01",
            title: "One Font: Syne",
            body: "One typeface, five weights. Hierarchy through scale alone — 200px heading, 16px body. When you remove font variety, scale becomes the entire design system. Inspired by Steven Mengin (Awwwards SOTD).",
          },
          {
            num: "02",
            title: "Zero Decoration",
            body: "No icons. No illustrations. No background colours. No gradients. No borders except functional dividers. The negative space IS the design. Everything on screen either communicates or it's deleted.",
          },
          {
            num: "03",
            title: "Project Titles as Navigation",
            body: "The work section IS the portfolio. Project titles at 80px are both content and UI — click any title to view the project. No cards, no thumbnails, no grids. The names do the work.",
          },
          {
            num: "04",
            title: "Hover Accent (#FF3D00)",
            body: "The only colour on the entire page. It appears ONLY on hover — project titles, email, social links. This single interaction point makes the monochrome meaningful. Without it, the site is just boring. With it, it's a reveal.",
          },
          {
            num: "05",
            title: "The About Is One Paragraph",
            body: "No skills section. No timeline. No 'my journey' essay. One paragraph that says who you are, what you do, and where to reach you. Because a minimal portfolio should be as confident about its words as its design.",
          },
        ],
        uxDecisions: [
          {
            title: "Title-as-Link Pattern",
            body: "Project names at 80px ARE the clickable elements. No separate buttons, no 'view project' links. The content IS the interface. Reduces UI noise to absolute zero.",
          },
          {
            title: "No Page Transitions",
            body: "Instant page loads. No fade-ins, no loading screens. Minimal means fast. Every animation you add to a minimal site dilutes the minimalism.",
          },
          {
            title: "Single-Column Flow",
            body: "No grids. No sidebars. One column, top to bottom. The eye travels in one direction. Reading a Mono site should feel like reading a book.",
          },
        ],
        included: [
          "5 sections (Nav, Hero, Work, About, Contact, Footer)",
          "Single-font type system (Syne, 5 weights)",
          "Hover-only accent colour system",
          "Project title navigation pattern",
          "Mobile-responsive with preserved minimalism",
          "Accessible contrast ratios (WCAG AA)",
          "Next.js + Tailwind source code",
          "1-click Vercel deploy",
        ],
        excluded: [
          "No project thumbnails — the names speak for themselves",
          "No skills/tools section — your work demonstrates your skills",
          "No testimonials — minimal means only what's essential",
          "No blog — if you need a blog, this isn't the template for you",
        ],
        audience:
          "Designers, developers, photographers, architects, writers — anyone whose work is strong enough to stand without decoration.",
        references: [
          "stevenmengin.com",
          "dennissnellenberg.com",
          "mathieulehanneur.fr",
          "christianklassen.com",
          "samuelday.com",
        ],
        ctaLine:
          "The portfolio template that proves less is more. Source code for people who trust their work.",
        hireSuffix: "for you",
      }}
    />
  );
}
