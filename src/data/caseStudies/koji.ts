import { CaseStudy } from "./types";

export const koji: CaseStudy = {
  slug: "koji",
  status: "in-development",
  category: "SaaS",
  tags: ["React", "TypeScript", "SaaS", "Productivity"],
  title: "Kōji — Minimal Productivity Platform",
  shortTitle: "Kōji",
  desc: "A stripped-back, keyboard-first productivity tool built for developers and makers who hate bloat. Actively in progress.",
  heroDesc:
    "Kōji is a productivity platform designed for people who build things. No feature bloat, no unnecessary complexity. Just tasks, notes, and focus — organized the way your brain actually works.",
  heroImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=80",
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&q=80",
  ],
  challenge:
    "Every productivity tool tries to do everything — and ends up doing nothing well. Notion is powerful but slow. Todoist is fast but shallow. Linear is great but engineering-only. The challenge was to build something that sits in the sweet spot: fast, minimal, flexible, and designed specifically for solo builders and small teams who need to ship, not organize. The interface had to feel like a tool, not an app. Keyboard-first. Zero friction between thought and capture.",
  solution:
    "I designed and developed Kōji as a React + TypeScript SaaS application with a command-palette-driven interface. Everything is accessible via keyboard shortcuts — create tasks, switch views, search, and navigate without ever touching the mouse. The architecture uses an offline-first approach with Supabase for sync, so the app feels instant even on slow connections. The UI is intentionally stark: monochrome with a single accent color, generous whitespace, and typography that gets out of the way. Three views — Today, Board, and Timeline — cover 95% of use cases without settings bloat. I implemented drag-and-drop reordering, markdown notes attached to any task, and a focus mode that hides everything except the current task.",
  liveUrl: "https://koji-seven.vercel.app/",
  results: [
    { value: "3", label: "Core Views", color: "text-white" },
    { value: "40+", label: "Keyboard Shortcuts", color: "text-[var(--color-accent)]" },
    { value: "<200ms", label: "Interaction Speed", color: "text-white" },
    { value: "0", label: "Feature Bloat", color: "text-[var(--color-accent)]" },
  ],
};
