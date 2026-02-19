import { CaseStudy } from "./types";

export const pulse: CaseStudy = {
  slug: "pulse",
  status: "in-development",
  category: "Web App",
  tags: ["Next.js", "Dashboard", "Healthtech", "Device Integration"],
  title: "Pulse — Health & Wellness Dashboard",
  shortTitle: "Pulse",
  desc: "Born from a genuine passion for healthtech — a dashboard that pulls data from wearables like Apple Watch and Fitbit, making health data feel calm, clear, and actionable. Actively in progress.",
  heroDesc:
    "Healthcare has always fascinated me. Not just the science, but the design problem — how do you take something as complex and personal as someone's health and present it in a way that actually helps them? Pulse is my answer. A dashboard that doesn't overwhelm you with numbers, but gives you the clarity to understand your own body at a glance.",
  heroImage: "/images/pulse/hero.png",
  gallery: [
    "/images/pulse/about.png",
  ],
  challenge:
    "I've always been drawn to healthtech because of how personal and impactful it is. But every health app I've used gets it wrong in the same way — they dump raw data at you and expect you to figure it out. Heart rate is on one app, sleep on another, nutrition in a spreadsheet. Nothing talks to each other. The real challenge isn't collecting data — it's designing an experience that turns noise into understanding. I wanted to build something that feels calm and trustworthy, not clinical and intimidating. Something where you open it up and immediately know how you're doing.",
  solution:
    "I designed Pulse as a modular dashboard with six health modules — heart rate, sleep, activity, nutrition, hydration, and wellness. Each widget shows exactly where its data comes from — a small tag reading 'Apple Watch · 2 min ago' or 'Fitbit · 12 min ago' — so you always know what's tracking what. The Connected Devices panel lets you manage integrations with Apple Watch, Fitbit, Garmin, Apple Health, and Google Fit, with battery status and sync indicators. Click any widget to drill into a full detail view with 24-hour timelines, weekly and monthly trends, and AI-generated insights. The color-coded status system — green means you're good, amber means pay attention, red means act now — eliminates the need to interpret raw numbers. The visual language is deliberately soft — warm whites, sage greens, gentle gradients — because health data shouldn't feel stressful. Built with Next.js, Recharts for data visualization, and Tailwind CSS for a responsive, polished UI that loads instantly.",
  liveUrl: "https://pulse-khaki-nine.vercel.app/",
  results: [
    { value: "6", label: "Core Modules", color: "text-white" },
    { value: "5", label: "Device Integrations", color: "text-[var(--color-accent)]" },
    { value: "<1s", label: "Load Time", color: "text-white" },
    { value: "12", label: "Data Widgets", color: "text-[var(--color-accent)]" },
  ],
};
