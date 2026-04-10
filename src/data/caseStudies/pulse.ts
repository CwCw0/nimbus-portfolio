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
    "Healthcare has always fascinated me — not just the science, but the design problem. How do you take something as complex and personal as someone's health and present it in a way that actually helps them? Every health app I've used gets it wrong the same way: they dump raw numbers at you and expect you to figure it out. Heart rate in one app, sleep in another, nutrition in a spreadsheet. Pulse is my answer — a single dashboard where your health data lives together, presented with clarity instead of clinical chaos.",
  heroImage: "/images/pulse/hero.png",
  gallery: [
    "/images/pulse/about.png",
    "/images/pulse/heart-rate.png",
    "/images/pulse/sleep.png",
    "/images/pulse/nutrition.png",
  ],
  challenge:
    "The core problem wasn't technical — it was trust. Health data is deeply personal. People need to feel safe with an interface that shows them their heart rate trends, sleep patterns, and calorie intake. That means no alarming red screens, no gamification that creates anxiety, and no overwhelming data dumps. The interface had to feel calm and trustworthy while still being genuinely useful — showing you exactly what you need to know without making you a hypochondriac. On the technical side, the challenge was unifying data from multiple wearable ecosystems (Apple Watch, Fitbit, Garmin, Google Fit) into a single coherent view with real-time sync indicators, drill-down timelines, and cloud-persisted user logs with proper security.",
  solution:
    "I designed Pulse as a modular dashboard with six health widgets — heart rate, sleep, activity, nutrition, hydration, and wellness. Each widget shows its data source with a small tag ('Apple Watch · 2 min ago') so you always know what's tracking what. A colour-coded status system replaces raw numbers with instant understanding: green means you're good, amber means pay attention, red means act now. Click any widget to drill into a full detail view with 24-hour timelines, weekly and monthly trend charts built with Recharts, and contextual insights. The Connected Devices panel manages integrations with battery status and last-sync indicators. Every widget features a Log button — a clean modal for manual health entry stored in Supabase with per-user row-level security. Logged values override baseline data while charts retain the full dataset. Real user accounts via Supabase Auth mean health history persists across sessions and devices. The visual language is deliberately soft — warm whites, sage greens, gentle gradients, rounded corners. Health data shouldn't feel stressful. Built with Next.js, Recharts for data visualisation, Supabase for auth and cloud persistence, and Tailwind CSS.",
  liveUrl: "https://pulse-khaki-nine.vercel.app/",
  results: [
    { value: "6", label: "Health Modules", color: "text-white" },
    { value: "5", label: "Wearable Integrations", color: "text-[var(--color-accent)]" },
    { value: "RLS", label: "Row-Level Security", color: "text-white" },
    { value: "3", label: "Trend Timelines", color: "text-[var(--color-accent)]" },
  ],
};
