export type { CaseStudy, ProofTile } from "./types";
export { bh88 } from "./88bh";
export { forge } from "./forge";
export { omnifood } from "./omnifood";
export { pulse } from "./pulse";
export { koji } from "./koji";
export { voidframe } from "./voidframe";

import { bh88 } from "./88bh";
import { forge } from "./forge";
import { omnifood } from "./omnifood";
import { pulse } from "./pulse";
import { koji } from "./koji";
import { voidframe } from "./voidframe";
import { CaseStudy } from "./types";

export const allCaseStudies: CaseStudy[] = [bh88, forge, omnifood, pulse, koji, voidframe];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return allCaseStudies.find((s) => s.slug === slug);
}

/** The two proof-format pages cycle only between each other. */
const proofSlugs = ["88bh", "forge"];

function chainFor(slug: string): CaseStudy[] {
  return proofSlugs.includes(slug)
    ? allCaseStudies.filter((s) => proofSlugs.includes(s.slug))
    : allCaseStudies.filter((s) => !proofSlugs.includes(s.slug));
}

export function getNextProject(currentSlug: string): { title: string; slug: string } {
  const chain = chainFor(currentSlug);
  const idx = chain.findIndex((s) => s.slug === currentSlug);
  const next = chain[(idx + 1) % chain.length];
  return { title: next.shortTitle, slug: next.slug };
}

export function getPrevProject(currentSlug: string): { title: string; slug: string } | null {
  const chain = chainFor(currentSlug);
  const idx = chain.findIndex((s) => s.slug === currentSlug);
  if (idx <= 0) return null;
  const prev = chain[idx - 1];
  return { title: prev.shortTitle, slug: prev.slug };
}
