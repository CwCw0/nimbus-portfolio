import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nimbusformastudio.com";

export const metadata: Metadata = {
  title: "Services — Web Design, Branding & AI Tools in Malaysia",
  description: "Custom websites, brand identity, and AI-powered tools built by a solo developer in KL, Malaysia. No agency overhead. Transparent pricing. Built with intention.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Nimbus Services — Web Design, Branding & AI Tools",
    description: "Custom websites, brand identity, and AI tools. No agency overhead, transparent pricing. Based in Kuala Lumpur.",
    url: "/services",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a custom website cost in Malaysia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Custom websites from Nimbus Forma Studio start from $2,500 USD (approximately RM 10,000+). Pricing depends on complexity — a landing page costs less than a full web application with AI integration. Every project includes custom design, mobile responsiveness, SEO optimization, and performance tuning.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with clients outside Malaysia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Nimbus Forma Studio works with clients worldwide. Based in Kuala Lumpur, Malaysia, but all work is delivered remotely. International clients are invoiced in USD.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nimbus builds with Next.js, React, TypeScript, Tailwind CSS, and Supabase. For animations: GSAP and Framer Motion. For AI: Claude, Gemini, and custom LLM agent pipelines. Every project is custom-coded — no templates, no WordPress.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide Figma designs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Nimbus designs directly in code. What you see in the browser is the final product — no Figma handoff, no design-to-dev translation gap. This means faster delivery and pixel-perfect results.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a website project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical website project takes 4-8 weeks from kickoff to launch. This includes design, development, revisions, and deployment. Complex projects with AI integration or custom tools may take longer.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesContent />
    </>
  );
}
