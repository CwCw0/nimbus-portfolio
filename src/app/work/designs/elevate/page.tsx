import type { Metadata } from "next";
import ElevateShowcase from "./ElevateShowcase";

export const metadata: Metadata = {
  title: "Elevate — Clean Corporate & SaaS Template",
  description:
    "A premium, light-mode corporate website template for SaaS companies and professional services. Structured grid, bento cards, trust-forward. By Nimbus Forma Studio.",
  openGraph: {
    title: "Elevate — Nimbus Design Lab",
    description: "Premium corporate SaaS template by Nimbus Forma Studio.",
  },
};

export default function ElevatePage() {
  return <ElevateShowcase />;
}
