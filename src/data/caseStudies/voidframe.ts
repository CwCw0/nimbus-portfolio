import { CaseStudy } from "./types";

export const voidframe: CaseStudy = {
  slug: "voidframe",
  status: "in-development",
  category: "Platform",
  tags: ["Next.js", "Real-time", "Gaming", "Full-Stack"],
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
    "I built Voidframe as a community-first platform organized around the things gamers actually need. Communities are the core — each one has Channels for real-time chat with threading, reactions, and typing indicators. Events let you schedule tournaments, casual sessions, and scrims with RSVP tracking and a calendar view. Squads are persistent teams you can manage with rosters and roles. A Discover page helps you find new communities to join. The entire design is dark-first with neon purple and cyan accents, heavy glassmorphism, and micro-animations that make the interface feel alive — because a gaming platform should look and feel like a gaming platform. Built with Next.js, date-fns for calendar logic, and a notification system that surfaces what matters without interrupting your session.",
  liveUrl: "https://voidframe-three.vercel.app/",
  results: [
    { value: "<100ms", label: "Message Latency", color: "text-white" },
    { value: "4", label: "Core Modules", color: "text-[var(--color-accent)]" },
    { value: "∞", label: "Communities", color: "text-white" },
    { value: "Dark", label: "Native Theme", color: "text-[var(--color-accent)]" },
  ],
};
