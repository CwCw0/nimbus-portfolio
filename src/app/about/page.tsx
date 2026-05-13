import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Founder & Builder | Kuala Lumpur, Malaysia",
  description: "Founder of Nimbus Forma Studio in KL, Malaysia. I build websites, branding, and AI tools for clients — and ship my own products. Code, design, systems, business.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nimbus — Developer, Designer & Studio Founder",
    description: "Founder of Nimbus. Building real software across healthtech, productivity, and gaming — for clients and for myself.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
