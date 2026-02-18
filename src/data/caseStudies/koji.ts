import { CaseStudy } from "./types";

export const koji: CaseStudy = {
  slug: "koji",
  status: "in-development",
  category: "SaaS",
  tags: ["React", "TypeScript", "SaaS", "Productivity"],
  title: "Kōji — Minimal Productivity Platform",
  shortTitle: "Kōji",
  desc: "My second brain — a keyboard-first tool built around how I actually think, plan, and ship. Actively in progress.",
  heroDesc:
    "Kōji started as a personal problem. My brain doesn't work in neat categories — thoughts come fast, tasks pile up, and I need to capture everything before it disappears. I built Kōji as my second brain: a place to dump raw thoughts, turn them into tasks, and stay focused without the friction of switching between five different apps. If my thought process can help other builders too, even better.",
  heroImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=80",
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&q=80",
  ],
  challenge:
    "I tried everything — Notion, Todoist, Linear, Apple Notes, random text files. Nothing matched how my brain actually works. I think in bursts. A random idea at 2am, a task I need to remember mid-conversation, a note that connects to something I wrote three days ago. Every tool either forced me into someone else's workflow or was so bloated I spent more time organizing than doing. I needed something that gets out of the way — captures thoughts instantly, lets me sort them later, and keeps me focused when it's time to actually work.",
  solution:
    "I built Kōji around my own thought process. Brain Dump mode lets me capture raw thoughts in a full-screen, distraction-free overlay — just type and hit Enter, sort it later. Those thoughts live on the Today page where I can convert them into real tasks when I'm ready. Three views cover how I actually work: Today for what needs to happen now, Board for seeing the bigger picture, and Notes for longer-form thinking in markdown. Everything is keyboard-driven — Cmd+K command palette, 40+ shortcuts, view switching with number keys. The design is intentionally monochrome and stark because color is a distraction when you're trying to think. A built-in focus timer with Pomodoro sessions keeps me honest about deep work. Dark mode because I code at night. No accounts, no servers — everything runs locally in your browser.",
  liveUrl: "https://koji-seven.vercel.app/",
  results: [
    { value: "3", label: "Core Views", color: "text-white" },
    { value: "40+", label: "Keyboard Shortcuts", color: "text-[var(--color-accent)]" },
    { value: "<200ms", label: "Interaction Speed", color: "text-white" },
    { value: "0", label: "Feature Bloat", color: "text-[var(--color-accent)]" },
  ],
};
