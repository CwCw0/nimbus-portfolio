"use client";

import ShowcaseLayout from "../ShowcaseLayout";

export default function Showcase() {
  return (
    <ShowcaseLayout
      data={{
        slug: "roast",
        name: "Roast",
        category: "Coffee Shop & Cafe",
        description:
          "An artisan, editorial coffee shop template. Earthy tones, Cormorant Garamond serif, parallax hero, origin-focused product cards. For specialty roasters, cafes, and artisan food brands.",
        techStack: ["Next.js", "GSAP", "Tailwind"],
        gumroadUrl: "",
        designChoices: [
          {
            num: "01",
            title: "Earthy Warm Palette",
            body: "Cream #F5F0E8 base, coffee brown #8B4513 accent, warm amber highlights. The palette IS the brand — it smells like a roastery. Not a single blue pixel.",
          },
          {
            num: "02",
            title: "Cormorant Garamond + Karla",
            body: "Elegant editorial serif for headings, friendly geometric sans for body. This pairing says 'artisan quality' — it's the type system of a high-end wine label applied to coffee.",
          },
          {
            num: "03",
            title: "Full-Bleed Hero with Parallax",
            body: "The hero IS the atmosphere. Dark overlay on a full-viewport image placeholder with parallax scroll. You feel the roastery before reading a word. Inspired by Ceremony Coffee (Awwwards SOTD).",
          },
          {
            num: "04",
            title: "Origin-Focused Product Cards",
            body: "Every coffee card shows: name, origin, altitude, process, tasting notes, price. Like a wine list — not a product grid. Inspired by Sey Coffee's data-rich minimal approach.",
          },
          {
            num: "05",
            title: "Story Over Sales",
            body: "The 'Our Story' section is as prominent as the product section. Coffee brands sell a narrative — the farm, the producer, the journey. The template structures this storytelling naturally.",
          },
        ],
        uxDecisions: [
          {
            title: "Parallax Depth",
            body: "Hero image scrolls at 60% speed. Creates depth without performance cost. The user feels immersed in the roastery atmosphere before they read a single word.",
          },
          {
            title: "Origin Data Cards",
            body: "Every product card shows altitude, process, tasting notes. Specialty coffee buyers make decisions on data, not photos. This is a wine list, not a product grid.",
          },
          {
            title: "Warm Scroll Rhythm",
            body: "Alternating cream and deep brown sections create a reading rhythm. Each section feels like turning a page in a coffee table book.",
          },
        ],
        included: [
          "7 sections (Nav, Hero, Origin Story, Products, Process, Testimonials, CTA, Footer)",
          "Parallax hero with dark overlay system",
          "Origin-focused product cards with tasting notes",
          "Editorial story section with full-bleed images",
          "Mobile-responsive with proper tap targets",
          "Accessible contrast ratios (WCAG AA)",
          "Next.js + Tailwind source code",
          "1-click Vercel deploy",
        ],
        excluded: [
          "No shopping cart — this is a showcase template, not a full e-commerce system",
          "No menu/ordering system — integrate with Square, Toast, or your POS",
          "No reservation system — connect Resy, OpenTable, or Calendly",
          "No stock food photography — use your own roastery and product shots",
        ],
        audience:
          "Specialty coffee roasters, artisan cafes, tea houses, bakeries, craft food brands — any food and beverage business that sells a story, not just a product.",
        references: [
          "ceremonycoffee.com",
          "seycoffee.com",
          "bluebottlecoffee.com",
          "stumptown.coffee",
          "counterculture.com",
        ],
        ctaLine:
          "Source code for a coffee template that smells like a roastery. Built for brands that tell stories.",
        hireSuffix: "for your brand",
      }}
    />
  );
}
