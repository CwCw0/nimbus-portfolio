import { CaseStudy } from "./types";

export const pulse: CaseStudy = {
  slug: "pulse",
  status: "in-development",
  category: "Web App",
  tags: ["Next.js", "Dashboard", "Healthtech", "UI/UX"],
  title: "Pulse — Health & Wellness Dashboard",
  shortTitle: "Pulse",
  desc: "Born from a genuine passion for healthtech — a dashboard that makes health data feel calm, clear, and actionable. Actively in progress.",
  heroDesc:
    "Healthcare has always fascinated me. Not just the science, but the design problem — how do you take something as complex and personal as someone's health and present it in a way that actually helps them? Pulse is my answer. A dashboard that doesn't overwhelm you with numbers, but gives you the clarity to understand your own body at a glance.",
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  ],
  challenge:
    "I've always been drawn to healthtech because of how personal and impactful it is. But every health app I've used gets it wrong in the same way — they dump raw data at you and expect you to figure it out. Heart rate is on one app, sleep on another, nutrition in a spreadsheet. Nothing talks to each other. The real challenge isn't collecting data — it's designing an experience that turns noise into understanding. I wanted to build something that feels calm and trustworthy, not clinical and intimidating. Something where you open it up and immediately know how you're doing.",
  solution:
    "I designed Pulse as a modular dashboard with six health modules — heart rate, sleep, activity, nutrition, hydration, and wellness. Each metric lives in its own widget with real charts and a color-coded status system: green means you're good, amber means pay attention, red means act now. No interpreting numbers — the interface does that for you. The sidebar lets you drill into any module for deeper insights, and it collapses into a clean bottom tab bar on mobile. The visual language is deliberately soft — warm whites, sage greens, gentle gradients — because health data shouldn't feel stressful. Built with Next.js, Recharts for data visualization, and Tailwind CSS for a responsive, polished UI that loads instantly.",
  liveUrl: "https://pulse-khaki-nine.vercel.app/",
  results: [
    { value: "6", label: "Core Modules", color: "text-white" },
    { value: "98", label: "Lighthouse Score", color: "text-[var(--color-accent)]" },
    { value: "<1s", label: "Load Time", color: "text-white" },
    { value: "12", label: "Data Widgets", color: "text-[var(--color-accent)]" },
  ],
};
