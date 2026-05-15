"use client";

import ShowcaseLayout from "../ShowcaseLayout";

export default function PopStoreShowcase() {
  return (
    <ShowcaseLayout
      data={{
        slug: "pop-store",
        name: "Pop Store",
        category: "Fun E-Commerce",
        description:
          "A bold, personality-driven e-commerce template for brands that refuse to be boring. Neo-brutalist grid, per-product colour theming, chunky type, and attitude in every pixel.",
        techStack: ["Next.js", "GSAP", "Tailwind"],
        gumroadUrl: "",
        designChoices: [
          {
            num: "01",
            title: "Neo-Brutalist Language",
            body: "3px solid borders. Hard box shadows (4px offset, no blur). Zero border-radius. Raw, honest, impossible to ignore. In a sea of rounded corners and soft shadows, hard edges stop the scroll. Tony's Chocolonely pioneered this for e-commerce.",
          },
          {
            num: "02",
            title: "Per-Product Color Theming",
            body: "Each product card has its own background tint. Inspired by Simply Chocolate (Awwwards SOTD) where each product lives in its own visual world. Users identify products by colour before reading the name — that's faster browsing.",
          },
          {
            num: "03",
            title: "Space Grotesk — Chunky & Fun",
            body: "Bold, geometric, slightly playful heading font paired with Inter for body. Says 'we're serious about quality but we don't take ourselves seriously.' The typographic equivalent of showing up to a board meeting in a great t-shirt.",
          },
          {
            num: "04",
            title: "Warm Cream Base",
            body: "#FFF8F0 — not pure white. Makes the entire site warmer and more inviting. Pure white feels clinical (Elevate uses it intentionally). E-commerce wants approachable. The warm base makes the coral accent #FF6B35 sing instead of clash.",
          },
          {
            num: "05",
            title: "Personality in Every Pixel",
            body: "Feature strips, irreverent copy, emoji as visual system, floating decorative elements. Inspired by Liquid Death and Graza — brands where the design IS the brand. The template teaches clients what fun looks like.",
          },
        ],
        uxDecisions: [
          {
            title: "Visible Add-to-Cart",
            body: "Every product card shows the button by default — not hidden behind hover. On mobile, hover doesn't exist. Any template that hides purchase buttons behind hover is losing mobile conversions.",
          },
          {
            title: "Feature Strip",
            body: "Scrolling marquee communicates key selling points without taking page real estate. 'FREE SHIPPING · 100% NATURAL · NO WEIRD STUFF' — three value props absorbed in 2 seconds.",
          },
          {
            title: "Review Personality",
            body: "Testimonials with real personality, not corporate speak. 'Bought one. Then bought twelve more.' signals to clients what authentic reviews sound like.",
          },
        ],
        included: [
          "7 sections (Nav, Hero, Feature Strip, Products, Categories, Reviews, CTA, Footer)",
          "Per-product colour theming system",
          "Neo-brutalist component library (borders, shadows, offset elements)",
          "Product cards with integrated CTA — always visible, never hover-gated",
          "Category browsing section (most templates skip this entirely)",
          "Mobile-first: single column, full-width images, large tap targets",
          "Accessible focus states on all interactive elements",
          "Next.js + Tailwind source code",
        ],
        excluded: [
          "No infinite scroll — kills SEO, can't share specific pages",
          "No 'quick view' modals — break back button, confuse users",
          "No star ratings on listings — 3 reviews at 5 stars isn't social proof, it's noise",
          "No 'sale' red badges — they cheapen the brand. Discount with style instead",
          "No auto-playing product videos — respect user choice and battery",
        ],
        audience:
          "DTC brands, food & beverage, lifestyle products, streetwear, indie cosmetics, pet brands, craft goods — any brand with personality that wants their store to feel like their brand, not a Shopify default.",
        references: [
          "tonyschocolonely.com",
          "simplychocolate.com",
          "liquiddeath.com",
          "graza.co",
          "snif.co",
        ],
        ctaLine:
          "Source code for an e-commerce template with more personality than most brands.",
        hireSuffix: "for your brand",
      }}
    />
  );
}
