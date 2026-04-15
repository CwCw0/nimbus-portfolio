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
    "Gaming has been part of my life for as long as I can remember. But the tools we use to organise around it are a mess — Discord for chat, Google Sheets for events, a random bracket site for tournaments. Voidframe is the platform I wish existed: one place where your community lives, events are organised, squads are ready, and the experience feels native to gaming culture.",

  heroImage: "/images/voidframe/hero.jpg",
  gallery: [
    "/images/voidframe/community.jpg",
    "/images/voidframe/events.jpg",
    "/images/voidframe/squads.jpg",
    "/images/voidframe/members.jpg",
    "/images/voidframe/chat.jpg",
  ],

  challenge:
    "Gamers are one of the most design-literate audiences on the internet. They'll reject anything that feels corporate, generic, or slow. The platform had to look and feel like it was built by gamers, for gamers — dark-first with neon accents, glassmorphism, and micro-animations that feel responsive and alive.\n\nFunctionally, it needed to cover real-time chat with editing and replies, event management with RSVP tracking, persistent squads with roles and recruiting, and instant global search — all under one roof.\n\nAnd all of this had to feel fast. Any perceptible lag in a gaming platform is a death sentence for adoption.",

  challengePoints: [
    "Design that passes the gamer's \"is this corporate?\" test",
    "Real-time chat with editing, replies, pinning, and typing indicators",
    "Events, squad rosters, and global search — all in one place",
    "Zero perceived lag — performance is a core feature",
  ],

  solution:
    "I built Voidframe as a community-first platform around the things gamers actually need. Each community has Channels for real-time chat with message editing, inline replies, pinning, context menus, and multi-user typing indicators.\n\nA full Events calendar with RSVP tracking, Squads with persistent rosters and recruiting status, and a global Cmd+K command palette that searches across communities, channels, and members instantly. User profiles feature a status picker, XP progression bars, and role badges.\n\nThe design language is dark-first with neon purple and cyan accents, heavy glassmorphism, frosted-glass modals, and micro-animations on every interaction — because a gaming platform should feel like the games its users play. A Shift+? keyboard shortcuts overlay means power users never need to touch the mouse.",

  solutionHighlights: [
    "Real-time channels — editing, replies, pinning, typing indicators",
    "Events calendar with RSVP + Squads with roles and recruiting",
    "⌘K global search across communities, channels, and members",
    "Dark-first design with neon accents, glassmorphism, micro-animations",
    "Keyboard-first — Shift+? overlay, navigation without a mouse",
  ],

  liveUrl: "https://voidframe-three.vercel.app/",

  results: [
    { value: "6", label: "Core Modules", color: "text-white" },
    { value: "Real-time", label: "Chat System", color: "text-[var(--color-accent)]" },
    { value: "⌘K", label: "Global Search", color: "text-white" },
    { value: "Dark", label: "Native Design", color: "text-[var(--color-accent)]" },
  ],
};
