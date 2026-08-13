import { CaseStudy } from "./types";

export const forge: CaseStudy = {
  slug: "forge",
  status: "live",
  statusLabel: "INTERNAL — ACTIVE DAILY",
  category: "Internal Tool",
  tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Supabase Postgres", "Gemini API"],
  title: "Forge — The System I Built to Run My Own Studio",
  shortTitle: "Forge",
  desc: "The AI-powered operations platform I built to run my own studio — 60 tools, a knowledge graph, and a client pipeline, used daily. Not a demo.",
  heroDesc:
    "Not a demo, not a template — the actual dashboard, pipeline, and AI assistant I run Nimbus Forma Studio on every day. Client pipeline, documents, memory, 60 tools deep.",

  meta: {
    type: "Internal tool",
    stack: "Next.js 16 · TypeScript · Tailwind v4 · Supabase Postgres · Gemini API",
    year: "2026",
  },

  heroImage: "/images/forge/dashboard.jpg",
  heroCaption:
    "The daily command centre — today's three highest-priority sends, ranked and ready to act on. Client names and figures are anonymized for privacy; the interface and every number here are real, live output.",

  story:
    "Forge exists because running a solo studio means the ball drops between client work, outreach, documents, and remembering what was promised to whom — and no off-the-shelf project tool talks to the others or knows the business. So Forge does both: one assistant with 60 tools across the whole operation, a knowledge graph that links every client, project, and decision, and a system prompt that refuses to invent a number it can't source from a tool call. It's not a product for sale — it's the system Nimbus runs on, and the same discipline goes into every client build.",

  proofDisclosure:
    "Client and project names below are anonymized for privacy — the interface, the data structure, and the functionality are real.",

  proofGrid: [
    {
      src: "/images/forge/chat-tool-calls.jpg",
      alt: "Forge chat answering with visible tool calls",
      caption:
        "Ask a real question and it goes and checks — client lookup, then a drafted follow-up, saved to the right folder. A visible tool call, not a canned response.",
    },
    {
      src: "/images/forge/knowledge-graph.jpg",
      alt: "Interactive knowledge graph of the whole business",
      caption:
        "56 nodes, 106 connections — every client, project, document, and decision linked, so \"what's blocked?\" has a real answer instead of a guess.",
    },
    {
      src: "/images/forge/clients-pipeline.jpg",
      alt: "Clients pipeline table with stage, value, and next action",
      caption:
        "One table for every client relationship — stage, value, next action, what's paid and what's due. The same pattern a client's own dashboard gets.",
    },
    {
      src: "/images/forge/projects-bmad.jpg",
      alt: "Projects tracked through five BMAD stages",
      caption:
        "Every build tracked through the same five stages — Analyst, PM, Architect, Dev, QA — whether it's a client system or Forge itself.",
    },
  ],

  underIt: [
    "60 tools across query, database writes, filesystem, documents, memory/retrieval, analysis, and workflow — one assistant, not a chatbot bolted onto a static site",
    "A system prompt that refuses to guess: never cites a number, stage, amount, or count without a tool result behind it",
    "27 API routes; a knowledge graph built from the same underlying business data",
    "Event ingestion with an offline queue — if the app is down, events queue to a file and drain automatically on next boot",
    "8 custom subagents with distinct roles, behind a router",
    "Built and extended using BMAD (PM → Architect → UX → Dev → QA) — the same process every client project runs on",
  ],

  closing: {
    body: "Forge isn't for sale — it's proof of how I build. If your business runs on spreadsheets and group chats and you want the same discipline in your own system:",
    ctaLabel: "Start with a build plan",
    ctaHref: "/contact",
  },
};
