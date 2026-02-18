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
  challenge: string;
  solution: string;
  liveUrl?: string;
  status?: ProjectStatus;
  results: { value: string; label: string; color: string }[];
};
