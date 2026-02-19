import { CaseStudy } from "./types";

export const voidframe: CaseStudy = {
  slug: "voidframe",
  status: "in-development",
  category: "Platform",
  tags: ["Next.js", "Real-time", "Gaming", "Community Platform"],
  title: "Voidframe — Gaming Community Platform",
  shortTitle: "Voidframe",
  desc: "Built from my love of gaming — a community platform designed the way gamers actually organize, communicate, and compete. Actively in progress.",
  heroDesc:
    "Gaming has been a huge part of my life for as long as I can remember. The communities, the competition, the friendships formed through shared passion — that's what makes gaming special. But the tools we use to organize around it? They're a mess. Voidframe is the platform I wish existed: one place where your community lives, your events are organized, your squads are ready, and the vibe actually feels like gaming.",
  heroImage: "/images/voidframe/hero.png",
  gallery: [
    "/images/voidframe/community.png",
    "/images/voidframe/events.png",
    "/images/voidframe/squads.png",
    "/images/voidframe/members.png",
  ],
  challenge:
    "As a gamer, I've lived the frustration. Your squad coordinates on Discord, events are tracked in a Google Sheet someone made at 3am, tournament brackets are on a random website, and finding new communities means scrolling through Reddit. Nothing was built for how gamers actually operate — fast-paced, always-on, and deeply community-driven. I wanted to build something that understands gaming culture from the ground up. Not a corporate collaboration tool with a dark skin slapped on — a platform that feels native to gaming, where the design language speaks the same language as the people using it.",
  solution:
    "I built Voidframe as a community-first platform organized around the things gamers actually need. Communities are the core — each one has Channels for real-time chat with message editing, inline replies, pinning, context menus, and multi-user typing indicators. Events with a full calendar view, RSVP tracking, and create flows. Squads with persistent rosters, roles, and recruiting status. A command palette search (⌘K) that searches across communities, channels, and members instantly. User profiles with status picker (Online/Idle/DND/Invisible), XP progression bars, and role badges. A working notification system with mark-all-read and individual dismiss. Create modals for squads, events, and channels with form validation. Keyboard shortcuts overlay (Shift+?). The entire design is dark-first with neon purple and cyan accents, heavy glassmorphism, and micro-animations — because a gaming platform should look and feel like a gaming platform. Built with Next.js, React Context for state management, date-fns for calendar logic, and Tailwind CSS for a responsive, polished UI.",
  liveUrl: "https://voidframe-three.vercel.app/",
  results: [
    { value: "6", label: "Core Modules", color: "text-white" },
    { value: "⌘K", label: "Command Palette", color: "text-[var(--color-accent)]" },
    { value: "<1s", label: "Load Time", color: "text-white" },
    { value: "3", label: "Create Flows", color: "text-[var(--color-accent)]" },
  ],
};
