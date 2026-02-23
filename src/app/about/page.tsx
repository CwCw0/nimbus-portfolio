import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Self-Taught Developer & Studio Founder",
  description: "Self-taught developer and founder of Nimbus. I study the full picture — code, design, systems, product, and business — because I want to build things that matter.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nimbus — Self-Taught Developer & Studio Founder",
    description: "Self-taught developer and founder of Nimbus. Building real software across healthtech, productivity, and gaming.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
