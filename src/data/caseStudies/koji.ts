import { CaseStudy } from "./types";

export const koji: CaseStudy = {
  slug: "koji",
  status: "live",
  category: "SaaS",
  tags: ["Next.js", "TypeScript", "Local-first", "Productivity", "Editorial Design"],
  title: "Kōji — A Keyboard-First Second Brain",
  shortTitle: "Kōji",
  desc: "A productivity platform built around how I actually think — fast capture, three views, 40+ shortcuts, and zero cloud dependency. Actively evolving.",
  heroDesc:
    "Kōji started because nothing else worked the way my brain does. I think in bursts — a random idea at 2am, a task mid-conversation, a note that connects to something from three days ago. Every productivity tool either forced me into someone else's workflow or was so bloated that organising took longer than doing. So I built my own. Kōji is a local-first second brain with three views, a brain dump capture mode, a built-in focus timer, and over 40 keyboard shortcuts. No accounts, no cloud, no AI telling you what to do next. Open a tab, start working.",
  heroImage: "/images/koji/homepage.png",
  gallery: [
    "/images/koji/homepage.png",
    "/images/koji/board.png",
    "/images/koji/notes.png",
  ],
  challenge:
    "I tried everything — Notion, Todoist, Linear, Apple Notes, random text files. Nothing matched how I actually work. The core problem wasn't feature gaps — it was friction. Capturing a thought should take less than a second. Switching between task views should be a single keystroke. Writing long-form notes should feel like a writing tool, not a database with a text field. And none of it should require an internet connection or a login wall. I needed something that gets out of the way completely — captures thoughts instantly, lets me sort them later, and keeps me honest about deep work when it's time to focus.",
  solution:
    "I built Kōji around three views that mirror how I actually think. Today shows what needs to happen right now — a clean, focused task list with inline editing, drag-to-reorder, and priority markers. Board gives the bigger picture — tasks organised in lanes that you can drag between, with collapsible columns and batch actions. Notes is where longer thinking lives, with a full markdown editor, pinning, and search. Brain Dump mode is the secret weapon — press D anywhere for a full-screen, distraction-free overlay. Type a thought, hit Enter, repeat. Sort it into tasks later or just let it sit. The design follows an editorial philosophy — warm monochrome palette with a single gold accent (#C9A063), Cormorant Garamond headings, Inter body text, and careful typographic hierarchy. A custom SmoothCaretInput makes the text cursor glide between characters so capture feels physical, not digital. The built-in focus timer runs 25-minute Pomodoro sessions with a calm bell on completion and automatic break periods, with a persisted streak counter. Everything is keyboard-driven — Cmd+K command palette, number keys for view switching, N for new task, D for brain dump, F for focus. Platform-aware shortcuts detect Mac vs Windows/Linux automatically. All data lives in IndexedDB on the user's device — no accounts, no API calls, no cloud round-trips.",
  liveUrl: "https://koji-seven.vercel.app/",
  results: [
    { value: "3", label: "Core Views", color: "text-white" },
    { value: "40+", label: "Keyboard Shortcuts", color: "text-[var(--color-accent)]" },
    { value: "0ms", label: "Cloud Latency", color: "text-white" },
    { value: "100%", label: "Offline Capable", color: "text-[var(--color-accent)]" },
  ],
};
