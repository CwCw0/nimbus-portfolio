import { CaseStudy } from "./types";

export const voidframe: CaseStudy = {
  slug: "voidframe",
  category: "Platform",
  tags: ["Next.js", "Real-time", "Gaming", "Full-Stack"],
  title: "Voidframe — Gaming Community Platform",
  shortTitle: "Voidframe",
  desc: "A unified hub for gaming communities — combining event scheduling, real-time chat, and squad management.",
  heroDesc:
    "Voidframe is a community platform built for competitive and casual gamers alike. It replaces the scattered mess of Discord servers, Reddit threads, and spreadsheets with one cohesive space for organizing, communicating, and competing.",
  heroImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=1200&q=80",
  ],
  challenge:
    "Gaming communities are fragmented across platforms. Event scheduling lives in Google Calendar, team comms are on Discord, strategy docs are on Notion, and recruiting happens on Reddit. There was no single platform that understood the gaming use case from end to end. The challenge was to design a unified platform that handles real-time communication, event management, team rosters, and community discovery — all with the performance expectations gamers have (instant load, zero lag, dark-mode native).",
  solution:
    "I designed and developed Voidframe using Next.js for the frontend with a Node.js/Socket.io backend for real-time features. The platform is organized around Communities (think servers), each containing Channels (text/voice), Events (tournaments, scrims, casual sessions), and Squads (persistent teams). The chat system supports threading, reactions, and media embeds with sub-100ms message delivery. Events integrate a bracket system for tournaments and RSVP tracking for casual play. The design language is dark-first with neon accent colors, heavy use of glassmorphism, and micro-animations that make the interface feel alive. I built a custom notification system that respects gaming hours — no alerts during active sessions unless it's marked urgent.",
  results: [
    { value: "<100ms", label: "Message Latency", color: "text-white" },
    { value: "4", label: "Core Modules", color: "text-[var(--color-accent)]" },
    { value: "∞", label: "Communities", color: "text-white" },
    { value: "Dark", label: "Native Theme", color: "text-[var(--color-accent)]" },
  ],
};
