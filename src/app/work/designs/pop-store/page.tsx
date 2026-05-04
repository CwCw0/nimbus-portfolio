import type { Metadata } from "next";
import PopStoreShowcase from "./PopStoreShowcase";

export const metadata: Metadata = {
  title: "Pop Store — Vibrant E-Commerce Template",
  description:
    "A bold, personality-driven e-commerce template for brands that refuse to be boring. Neo-brutalist, per-product color theming, chunky type. By Nimbus Forma Studio.",
  openGraph: {
    title: "Pop Store — Nimbus Design Lab",
    description: "Vibrant e-commerce template by Nimbus Forma Studio.",
  },
};

export default function PopStorePage() {
  return <PopStoreShowcase />;
}
