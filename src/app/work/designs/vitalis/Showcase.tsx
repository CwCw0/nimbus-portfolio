"use client";

import ShowcaseLayout from "../ShowcaseLayout";

export default function Showcase() {
  return (
    <ShowcaseLayout
      data={{
        slug: "vitalis",
        name: "Vitalis",
        category: "Healthcare & Wellness",
        description:
          "A warm, calming healthcare template that breaks free from clinical sterility. Soft greens, rounded elements, booking CTAs, trust indicators. For physio clinics, wellness centres, and medical practices.",
        techStack: ["Next.js", "GSAP", "Tailwind"],
        gumroadUrl: "",
        designChoices: [
          {
            num: "01",
            title: "Soft Green Palette",
            body: "Sage #3D8B70 on warm cream #FAFAF7 — communicates health, trust, calm. NOT the clinical blue/white that screams 'hospital.' Inspired by Parsley Health and Hims.",
          },
          {
            num: "02",
            title: "Playfair Display + Plus Jakarta Sans",
            body: "Serif for headings (warmth, editorial weight), geometric sans for body (modern, readable). This pairing says 'premium wellness' — not 'WebMD.'",
          },
          {
            num: "03",
            title: "Rounded Everything",
            body: "12px+ border radius on all cards and buttons. Rounded corners feel approachable and safe — critical for healthcare where patients are anxious. Sharp edges feel corporate.",
          },
          {
            num: "04",
            title: "Trust Indicators Everywhere",
            body: "Stats in the hero, 'Verified Clinic' floating badge, Google rating, years of experience. Healthcare visitors need trust signals immediately — they're making decisions about their body.",
          },
          {
            num: "05",
            title: "Booking-First CTA",
            body: "Primary button is always 'Book Now' — not 'Learn More.' A healthcare site's #1 job is converting visitors to appointments. Every section pushes toward booking.",
          },
        ],
        uxDecisions: [
          {
            title: "Pill Navigation",
            body: "Rounded pill-shaped nav items with soft backgrounds. Feels approachable and modern — not clinical. Patients are already anxious, the UI should feel safe.",
          },
          {
            title: "Trust-First Hero",
            body: "Stats, verified badge, and Google rating visible without scrolling. Healthcare visitors decide in 3 seconds whether to trust you. Front-load every signal.",
          },
          {
            title: "Service Cards with Icons",
            body: "Each service gets a rounded card with a clear icon, short description, and direct booking CTA. One click from browsing to booking.",
          },
        ],
        included: [
          "7 sections (Nav, Hero, Services, Why Us, Testimonials, Booking CTA, Footer)",
          "Rounded component library (cards, buttons, badges)",
          "Booking-first CTA hierarchy",
          "Trust indicators (stats, verified badge, ratings)",
          "Mobile-responsive with proper tap targets",
          "Accessible contrast ratios (WCAG AA)",
          "Next.js + Tailwind source code",
          "1-click Vercel deploy",
        ],
        excluded: [
          "No patient portal — separate product, not a template feature",
          "No HIPAA/PDPA compliance built-in — consult your legal team",
          "No appointment system backend — integrate with Calendly, Acuity, etc.",
          "No stock medical photos — use your own practitioners and clinic",
        ],
        audience:
          "Physiotherapy clinics, wellness centres, dental practices, mental health professionals, chiropractors — any healthcare provider that wants to feel human, not clinical.",
        references: [
          "parsleyhealth.com",
          "forhims.com",
          "onemedical.com",
          "tiahealth.com",
          "noom.com",
        ],
        ctaLine:
          "A healthcare template that feels warm, not sterile. Built for clinics that care about how they make patients feel.",
        hireSuffix: "for your clinic",
      }}
    />
  );
}
