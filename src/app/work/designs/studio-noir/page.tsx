import type { Metadata } from "next";
import StudioNoirShowcase from "./StudioNoirShowcase";

export const metadata: Metadata = {
  title: "Studio Noir — Dark Creative Studio Template",
  description:
    "A cinematic, animation-heavy dark template for creative studios. Pitch black + violet accent, editorial serif typography, GSAP-ready scroll animations. By Nimbus Forma Studio.",
  openGraph: {
    title: "Studio Noir — Nimbus Design Lab",
    description: "Cinematic dark creative studio template by Nimbus Forma Studio.",
  },
};

export default function StudioNoirPage() {
  return <StudioNoirShowcase />;
}
