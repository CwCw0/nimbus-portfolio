import { CaseStudy } from "./types";

export const voidframe: CaseStudy = {
  slug: "voidframe",
  status: "in-development",
  category: "Platform",
  tags: ["Next.js", "Real-time", "Gaming", "Community", "Glassmorphism"],
  title: "Voidframe — Gaming Community Platform",
  shortTitle: "Voidframe",
  desc: "A community platform designed the way gamers actually organise, communicate, and compete — not a corporate tool with a dark skin.",
  heroDesc:
    "Gaming has been part of my life for as long as I can remember. The communities, the competition, the friendships formed through shared obsession — that's what makes gaming special. But the tools we use to organise around it are a mess. Discord for chat, Google Sheets for events, a random bracket website for tournaments, Reddit for discovery. Nothing was built for how gamers actually operate. Voidframe is the platform I wish existed: one place where your community lives, your events are organised, your squads are ready, and the entire experience feels native to gaming culture.",
  heroImage: "/images/voidframe/hero.png",
  gallery: [
    "/images/voidframe/community.png",
    "/images/voidframe/events.png",
    "/images/voidframe/squads.png",
    "/images/voidframe/members.png",
    "/images/voidframe/chat.png",
  ],
  challenge:
    "Gamers are one of the most design-literate audiences on the internet. They'll reject anything that feels corporate, generic, or slow. The platform had to look and feel like it was built by gamers, for gamers — dark-first with neon accents, glassmorphism effects, and micro-animations that feel responsive and alive. Functionally, it needed to cover real-time chat with message editing and replies, event management with RSVP tracking, persistent squads with roles and recruiting, and instant search across communities, channels, and members. And all of this had to feel fast — any perceptible lag in a gaming platform is a death sentence for adoption.",
  solution:
    "I built Voidframe as a community-first platform around the things gamers actually need. Communities are the core unit — each one has Channels for real-time chat with message editing, inline replies, pinning, context menus, and multi-user typing indicators. Events with a full calendar view, RSVP tracking, and creation flows with form validation. Squads with persistent rosters, roles, and recruiting status toggles. A global command palette (Cmd+K) searches across communities, channels, and members instantly. User profiles feature a status picker (Online/Idle/DND/Invisible), XP progression bars, and role badges. The notification system supports mark-all-read and individual dismiss. The design language is dark-first with neon purple and cyan accents, heavy glassmorphism, frosted-glass modals, and micro-animations on every interaction — because a gaming platform should feel like the games its users play. Keyboard shortcuts overlay (Shift+?) ensures power users can navigate without touching the mouse. Built with Next.js, React Context for state management, date-fns for calendar logic, and Tailwind CSS.",
  liveUrl: "https://voidframe-three.vercel.app/",
  results: [
    { value: "6", label: "Core Modules", color: "text-white" },
    { value: "Real-time", label: "Chat System", color: "text-[var(--color-accent)]" },
    { value: "⌘K", label: "Global Search", color: "text-white" },
    { value: "Dark", label: "Native Design", color: "text-[var(--color-accent)]" },
  ],
};
