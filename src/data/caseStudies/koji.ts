import { CaseStudy } from "./types";

export const koji: CaseStudy = {
  slug: "koji",
  status: "live",
  category: "SaaS",
  tags: ["Next.js", "TypeScript", "Local-first", "SaaS", "Productivity"],
  title: "Kōji — Minimal Productivity Platform",
  shortTitle: "Kōji",
  desc: "My second brain — a keyboard-first tool built around how I actually think, plan, and ship. Actively in progress.",
  heroDesc:
    "Kōji started as a personal problem. My brain doesn't work in neat categories — thoughts come fast, tasks pile up, and I need to capture everything before it disappears. I built Kōji as my second brain: a place to dump raw thoughts, turn them into tasks, and stay focused without the friction of switching between five different apps. If my thought process can help other builders too, even better.",
  heroImage: "/images/koji/homepage.png",
  gallery: [
    "/images/koji/homepage.png",
    "/images/koji/board.png",
    "/images/koji/notes.png",
  ],
  challenge:
    "I tried everything — Notion, Todoist, Linear, Apple Notes, random text files. Nothing matched how my brain actually works. I think in bursts. A random idea at 2am, a task I need to remember mid-conversation, a note that connects to something I wrote three days ago. Every tool either forced me into someone else's workflow or was so bloated I spent more time organizing than doing. I needed something that gets out of the way — captures thoughts instantly, lets me sort them later, and keeps me focused when it's time to actually work.",
  solution:
    "I built Kōji around my own thought process. Brain Dump mode lets me capture raw thoughts in a full-screen, distraction-free overlay — just type and hit Enter, sort it later. Those thoughts live on the Today page where I can convert them into real tasks when I'm ready. Three views cover how I actually work: Today for what needs to happen now, Board for seeing the bigger picture, and Notes for longer-form thinking in markdown. Everything is keyboard-driven — Cmd+K command palette, 40+ shortcuts, view switching with number keys. A custom-built SmoothCaretInput glides the text cursor between characters as you type so the capture feel is physical rather than snappy. The design is intentionally monochrome and stark because color is a distraction when you're trying to think. A built-in focus timer with Pomodoro sessions keeps me honest about deep work, with a calm bell and a persisted streak counter. Kōji is fully local-first — no accounts, no cloud, no login wall. Every task, note, brain dump item, and focus stat lives on your device in IndexedDB. Open a tab and keep going.",
  liveUrl: "https://koji-seven.vercel.app/",
  results: [
    { value: "3", label: "Core Views", color: "text-white" },
    { value: "40+", label: "Keyboard Shortcuts", color: "text-[var(--color-accent)]" },
    { value: "Local", label: "Data Storage", color: "text-white" },
    { value: "0ms", label: "Cloud Round-trip", color: "text-[var(--color-accent)]" },
  ],
};
