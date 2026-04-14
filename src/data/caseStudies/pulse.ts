import { CaseStudy } from "./types";

export const pulse: CaseStudy = {
  slug: "pulse",
  status: "live",
  category: "Web App",
  tags: ["Next.js", "Supabase", "Healthtech", "Dashboard", "Data Visualisation"],
  title: "Pulse — Health & Wellness Dashboard",
  shortTitle: "Pulse",
  desc: "A healthtech dashboard that pulls wearable data from Apple Watch, Fitbit, and Garmin — turning scattered health metrics into calm, actionable clarity.",
  heroDesc:
    "Healthcare has always fascinated me — not just the science, but the design problem. How do you take something as complex and personal as someone's health and present it in a way that actually helps them? Every health app I've used dumps raw numbers at you and expects you to figure it out. Pulse is my answer.",

  heroImage: "/images/pulse/hero.png",
  gallery: [
    "/images/pulse/about.png",
    "/images/pulse/heart-rate.png",
    "/images/pulse/sleep.png",
    "/images/pulse/nutrition.png",
  ],

  challenge:
    "The core problem wasn't technical — it was trust. Health data is deeply personal. People need to feel safe with an interface that shows them their heart rate trends, sleep patterns, and calorie intake.\n\nThat means no alarming red screens, no gamification that creates anxiety, and no overwhelming data dumps. The interface had to feel calm and trustworthy while still being genuinely useful — showing you exactly what you need to know without making you a hypochondriac.\n\nOn the technical side, the challenge was unifying data from multiple wearable ecosystems into a single coherent view with real-time sync, drill-down timelines, and cloud-persisted logs with proper per-user security.",

  challengePoints: [
    "Design a calm, trustworthy UI for sensitive personal health data",
    "Useful without causing health anxiety — no alarming screens",
    "Unify data from Apple Watch, Fitbit, Garmin, and Google Fit",
    "Cloud persistence with per-user row-level data security",
  ],

  solution:
    "I designed Pulse as a modular dashboard with six health widgets — heart rate, sleep, activity, nutrition, hydration, and wellness. Each widget shows its data source with a small tag ('Apple Watch · 2 min ago') so you always know what's tracking what.\n\nA colour-coded status system replaces raw numbers with instant understanding: green means you're good, amber means pay attention, red means act now. Click any widget to drill into a full detail view with 24-hour timelines, weekly and monthly Recharts trend visualisations, and contextual insights.\n\nEvery widget features a Log button — a clean modal for manual health entry stored in Supabase with per-user row-level security. The visual language is deliberately soft — warm whites, sage greens, gentle gradients, rounded corners. Health data shouldn't feel stressful.",

  solutionHighlights: [
    "6 health widgets — heart rate, sleep, activity, nutrition, hydration, wellness",
    "Colour-coded status system — instant clarity without raw numbers",
    "24h timelines + weekly/monthly trend charts via Recharts",
    "Manual log modal with Supabase RLS for per-user data security",
    "Soft visual language — warm, calm, deliberately not clinical",
  ],

  liveUrl: "https://pulse-khaki-nine.vercel.app/",

  results: [
    { value: "6", label: "Health Modules", color: "text-white" },
    { value: "5", label: "Wearable Integrations", color: "text-[var(--color-accent)]" },
    { value: "RLS", label: "Row-Level Security", color: "text-white" },
    { value: "3", label: "Trend Timelines", color: "text-[var(--color-accent)]" },
  ],
};
