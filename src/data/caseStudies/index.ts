export type { CaseStudy } from "./types";
export { omnifood } from "./omnifood";
export { pulse } from "./pulse";
export { koji } from "./koji";
export { voidframe } from "./voidframe";

import { omnifood } from "./omnifood";
import { pulse } from "./pulse";
import { koji } from "./koji";
import { voidframe } from "./voidframe";
import { CaseStudy } from "./types";

export const allCaseStudies: CaseStudy[] = [omnifood, pulse, koji, voidframe];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return allCaseStudies.find((s) => s.slug === slug);
}

export function getNextProject(currentSlug: string): { title: string; slug: string } {
  const idx = allCaseStudies.findIndex((s) => s.slug === currentSlug);
  const next = allCaseStudies[(idx + 1) % allCaseStudies.length];
  return { title: next.shortTitle, slug: next.slug };
}
