import { CaseStudy } from "./types";

export const pulse: CaseStudy = {
  slug: "pulse",
  category: "Web App",
  tags: ["Next.js", "Dashboard", "Healthtech", "UI/UX"],
  title: "Pulse — Health & Wellness Dashboard",
  shortTitle: "Pulse",
  desc: "A real-time health tracking dashboard that turns complex biometric data into clear, actionable insights.",
  heroDesc:
    "Pulse is a health and wellness dashboard designed for people who take their wellbeing seriously. It aggregates data from wearables, lab results, and daily habits into a single, beautiful interface — turning noise into clarity.",
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  ],
  challenge:
    "Health data is fragmented. Users have a fitness tracker on one app, sleep data on another, nutrition logs in a spreadsheet, and lab results in a PDF. The challenge was to design a unified dashboard that consolidates all of this into a single view — without overwhelming the user. The interface needed to feel calm and trustworthy, not clinical. Data visualization had to be instant-read: glanceable charts, clear trends, and smart alerts that surface what matters.",
  solution:
    "I designed and built a modular dashboard using Next.js and Tailwind CSS. The layout uses a card-based system where each health metric lives in its own widget — heart rate, sleep quality, hydration, activity, and custom metrics. A color-coded status system (green/amber/red) gives instant visual feedback without requiring the user to interpret numbers. The sidebar navigation collapses on mobile into a bottom tab bar. Data visualizations use lightweight, custom-built SVG charts optimized for performance. The entire app is server-rendered for fast initial load, with client-side updates for real-time data streaming.",
  results: [
    { value: "6", label: "Core Modules", color: "text-white" },
    { value: "98", label: "Lighthouse Score", color: "text-[var(--color-accent)]" },
    { value: "<1s", label: "Load Time", color: "text-white" },
    { value: "12", label: "Data Widgets", color: "text-[var(--color-accent)]" },
  ],
};
