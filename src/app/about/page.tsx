import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Self-taught developer. Founder of Nimbus. I study the full picture — code, design, systems, product, and business — because I want to build things that matter.",
};

export default function AboutPage() {
  return <AboutContent />;
}
