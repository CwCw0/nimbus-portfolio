import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Developer, Designer & Studio Founder",
  description: "Founder of Nimbus. I build websites, branding, and AI tools for clients — and ship my own products when I spot gaps worth solving. Code, design, systems, business.",
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
