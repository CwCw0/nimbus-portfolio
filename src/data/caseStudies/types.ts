export type ProjectStatus = "live" | "in-development" | "coming-soon";

export type CaseStudy = {
  slug: string;
  category: string;
  tags: string[];
  title: string;
  shortTitle: string;
  desc: string;
  heroDesc: string;
  heroImage?: string;
  gallery?: string[];
  /** Main challenge narrative — use \n\n to separate into paragraphs */
  challenge: string;
  /** Key challenge bullet points shown below the narrative */
  challengePoints?: string[];
  /** Main solution narrative — use \n\n to separate into paragraphs */
  solution: string;
  /** Key solution highlights shown as bullet points below the narrative */
  solutionHighlights?: string[];
  liveUrl?: string;
  status?: ProjectStatus;
  results: { value: string; label: string; color: string }[];
};
