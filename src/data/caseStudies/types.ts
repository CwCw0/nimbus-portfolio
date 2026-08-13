export type ProjectStatus = "live" | "in-development" | "coming-soon";

export type ProofTile = {
  src: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  category: string;
  tags: string[];
  title: string;
  shortTitle: string;
  desc: string;
  heroDesc: string;
  heroImage?: string;
  /** Small caption rendered directly under the hero image (proof-format pages) */
  heroCaption?: string;
  gallery?: string[];
  /** Main challenge narrative — use \n\n to separate into paragraphs */
  challenge?: string;
  /** Key challenge bullet points shown below the narrative */
  challengePoints?: string[];
  /** Main solution narrative — use \n\n to separate into paragraphs */
  solution?: string;
  /** Key solution highlights shown as bullet points below the narrative */
  solutionHighlights?: string[];
  liveUrl?: string;
  status?: ProjectStatus;
  /** Overrides the status chip text when present (e.g. "IN FINAL LAUNCH PREP") */
  statusLabel?: string;
  /** Hero meta row — when present the template reads these instead of projects.ts */
  meta?: { type: string; stack: string; year: string };
  /** Single-paragraph story. Presence switches the page to the proof-format layout. */
  story?: string;
  /** One disclosure line rendered once above the proof grid */
  proofDisclosure?: string;
  /** Screenshot proof grid — 2×2 with a one-line caption under each tile */
  proofGrid?: ProofTile[];
  /** "What's actually under it" — one-line factual bullets */
  underIt?: string[];
  /** Closing block: status/honesty line, optional price anchor, CTA */
  closing?: {
    body: string;
    priceLine?: string;
    ctaLabel: string;
    ctaHref: string;
  };
  results?: { value: string; label: string; color: string }[];
};
