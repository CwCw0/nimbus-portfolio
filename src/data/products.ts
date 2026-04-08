export type ProductStatus = "live" | "in-development" | "beta" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  price: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  // Accent color owned by the product. Used to tint the card so each one
  // feels like its own poster instead of a templated tile.
  accent: {
    hex: string;       // solid color
    soft: string;      // 8–12% alpha tint for backgrounds
    border: string;    // 25–35% alpha tint for borders
    glow: string;      // 12–20% alpha tint for hover shadow
  };
  // Short description used on the curated wall card.
  cardDescription: string;
  // Long description used on the product detail page. Plain text, can be
  // rewritten into multiple paragraphs by splitting on double newlines.
  longDescription: string;
  // The handful of bullet points shown on the detail page under "what it is".
  features: string[];
  // What category this product fits into. Used for filtering / SEO,
  // not displayed as a chip on the wall.
  category: string;
  // Optional release info for the detail page.
  releaseDate?: string;
  heroImage?: string;
  // Optional internal ordering — lower numbers appear first.
  order?: number;
};

// ---------------------------------------------------------------------------
// The catalogue.
//
// Order matters. The first product in the list is the "featured" card on
// the products wall (it spans 2 columns and gets the larger visual treatment).
// Everything else tiles in a 2-col grid underneath.
// ---------------------------------------------------------------------------

export const products: Product[] = [
  {
    slug: "koji",
    name: "Koji",
    tagline:
      "A keyboard-first second brain. Local, fast, with no AI crutch in the way.",
    status: "live",
    price: "Free · paid tier coming",
    cta: {
      label: "Open Koji",
      href: "https://koji-seven.vercel.app/",
      external: true,
    },
    accent: {
      hex: "#F5F5F0",
      soft: "#F5F5F014",
      border: "#F5F5F040",
      glow: "#F5F5F022",
    },
    cardDescription:
      "Three views, forty shortcuts, one place to think. Built because every other tool tried to organise me.",
    longDescription:
      "Koji is the productivity tool I built because no other one fit how my brain actually works. I think in bursts — a thought at 2am, a task mid-conversation, a half-formed idea I need to dump before it disappears. Koji is built around that. Brain Dump captures raw thoughts in a full-screen overlay. Today turns them into things to do. Board shows the bigger picture. Notes hold the longer-form thinking in markdown.\n\nEverything is keyboard-driven. Cmd+K opens the command palette. 40+ shortcuts let you live in the app without ever touching the trackpad. The visual design is intentionally monochrome — no color, no decoration, no AI assistant trying to summarise your life. Just a tool that gets out of the way.",
    features: [
      "Brain Dump — full-screen capture overlay",
      "Three core views: Today, Board, Notes",
      "40+ keyboard shortcuts and a Cmd+K palette",
      "Pomodoro focus timer with persisted stats",
      "Cloud sync via Supabase with row-level security",
      "Editorial monochrome design — dark mode by default",
    ],
    category: "Productivity",
    releaseDate: "Live now",
    order: 1,
  },
  {
    slug: "syp",
    name: "SYP",
    tagline:
      "A drinking game for 4–8 friends who already know each other too well.",
    status: "in-development",
    price: "Free",
    cta: {
      label: "Join the launch list",
      href: "/contact?product=syp",
    },
    accent: {
      hex: "#A8FF60",
      soft: "#A8FF6014",
      border: "#A8FF6040",
      glow: "#A8FF6020",
    },
    cardDescription:
      "Pass the phone. Read the prompt. Find out who actually voted for who. The game gets rougher the longer the night runs.",
    longDescription:
      "SYP is the simplest possible party game. Open it on one phone. Pass it around the circle. Each round throws up a prompt that the group has to answer about each other — the kind of question you'd never ask sober but everyone wants the answer to.\n\nNo accounts. No setup. No download. It's a web app you load in 3 seconds and start playing in 5. The vibe is closer to a pack of cards than to a typical app — small, sharp, and built to disappear back into the night the moment the game ends.",
    features: [
      "No login, no install — open in any browser",
      "Local-only game state (your group, your phone)",
      "Difficulty escalates as the round count grows",
      "Built for 4–8 players in a single room",
      "Fully free, no ads, no upsell",
    ],
    category: "Game",
    releaseDate: "Q2 2026",
    order: 2,
  },
  {
    slug: "daftar",
    name: "Daftar",
    tagline:
      "Quotes, invoices, and clients for Malaysian freelancers who hate spreadsheets.",
    status: "in-development",
    price: "Free tier · RM 19/mo Pro",
    cta: {
      label: "Join the waitlist",
      href: "/contact?product=daftar",
    },
    accent: {
      hex: "#C9986A",
      soft: "#C9986A14",
      border: "#C9986A40",
      glow: "#C9986A22",
    },
    cardDescription:
      "The CRM I'm building for myself first. Quote → invoice → paid → tracked, with Malaysian freelancers in mind from line one.",
    longDescription:
      "Daftar is the freelance toolbox I needed and couldn't find. Most freelancer CRMs are built in the US for a US tax system, US payment rails, and US clients. Malaysian solo operators end up gluing together Notion, Google Sheets, free PDF templates, and a bank app to get paid. Daftar collapses all of that into one tool.\n\nAt v1: a quote builder with reusable line items, an invoice generator that matches Malaysian formatting expectations, a client list with status (lead → quoted → in-build → paid), and a simple cashflow view. At v2: Billplz integration, MyKad-friendly invoice fields, and a public quote sharing link so you can send a quote without forcing your client to download a PDF.",
    features: [
      "Quote builder with reusable templates and line items",
      "Invoice generator with Malaysian formatting (SST, ringgit, sequential numbering)",
      "Client list with stages: lead → quoted → in-build → paid",
      "Public quote sharing links",
      "Billplz payment link integration (v2)",
      "Free tier covers up to 3 active clients",
    ],
    category: "Freelance Tools",
    releaseDate: "Q3 2026",
    order: 3,
  },
  {
    slug: "sumi",
    name: "Sumi",
    tagline:
      "A focus and journal app shaped like an ink wash. Quiet, calm, mobile-first.",
    status: "in-development",
    price: "RM 149 / year · RM 299 lifetime",
    cta: {
      label: "Join the beta",
      href: "/contact?product=sumi",
    },
    accent: {
      hex: "#94A3B8",
      soft: "#94A3B814",
      border: "#94A3B840",
      glow: "#94A3B822",
    },
    cardDescription:
      "Three themes, one job — make space for your own thoughts. Built in Flutter, designed to be the calmest app on your phone.",
    longDescription:
      "Sumi is a small phone app for the part of your day that isn't being optimised. It's a focus timer and a journal in one — but the focus timer doesn't gamify, and the journal doesn't prompt you. There's no streak counter, no shame, no social feed.\n\nThree themes — Calm, Focus, Night — each with its own typography, color, and ambient texture. Pick the one that matches the part of the day you're in. Write something. Or don't. Sumi is a tool for slowing down, not a tool for being productive about slowing down.",
    features: [
      "Focus timer with no gamification — just time",
      "Markdown journal with day-by-day grouping",
      "Three themes: Calm (pastel), Focus (warm), Night (deep)",
      "100% local-first, your writing never leaves your phone",
      "Built in Flutter — iOS and Android from one codebase",
      "No streaks, no notifications, no social",
    ],
    category: "Wellbeing",
    releaseDate: "Q3 2026",
    order: 4,
  },
  {
    slug: "calcifer",
    name: "Calcifer",
    tagline:
      "A desktop fire demon powered by Claude. Lives in the corner of your screen and judges your code.",
    status: "in-development",
    price: "Free · RM 49 Pro lifetime",
    cta: {
      label: "Join the alpha",
      href: "/contact?product=calcifer",
    },
    accent: {
      hex: "#FF7A1A",
      soft: "#FF7A1A14",
      border: "#FF7A1A40",
      glow: "#FF7A1A26",
    },
    cardDescription:
      "Hotkey, ask, get answered. A small floating flame with seven moods, powered by the Claude CLI under the hood.",
    longDescription:
      "Calcifer is the macOS desktop companion I always wanted but never built. Press Cmd+Shift+Space anywhere on your machine and a small floating flame appears at the corner of your screen. Talk to it. It talks back, in character. It's powered by Claude under the hood, but it doesn't feel like ChatGPT. It feels like the fire demon from Howl's Moving Castle moved into your dock.\n\nSeven flame states reflect mood — calm, working, thinking, surprised, annoyed, sleepy, mad. The whole thing is transparent, always-on-top, and disappears when you don't need it. Free tier: chat and basic agent tools. Pro: persistent memory, custom personality, voice mode.",
    features: [
      "Cmd+Shift+Space hotkey from anywhere on macOS",
      "Seven animated flame states",
      "Powered by the Claude CLI subprocess — no API key juggling",
      "Always-on-top, transparent, click-through when idle",
      "Pro tier: memory + voice + custom personality",
    ],
    category: "Desktop",
    releaseDate: "Q3 2026",
    order: 5,
  },
  {
    slug: "nimbus-display",
    name: "Nimbus Display",
    tagline:
      "A display typeface for builders who want their headlines to feel made, not assembled.",
    status: "coming-soon",
    price: "RM 45 personal · RM 225 commercial",
    cta: {
      label: "Get notified at launch",
      href: "/contact?product=nimbus-display",
    },
    accent: {
      hex: "#F5E6C8",
      soft: "#F5E6C814",
      border: "#F5E6C840",
      glow: "#F5E6C822",
    },
    cardDescription:
      "One weight, full Latin set, opentype features for editorial work. The first font in the Nimbus type catalogue.",
    longDescription:
      "Nimbus Display is the first typeface released under the Nimbus name. It's a single-weight display serif made for headlines, hero sections, and editorial layouts. The aim is the opposite of the geometric grotesks everyone reaches for first — Nimbus Display has personality, slightly varied stroke widths, and a few opentype quirks that reward people who go looking for them.\n\nReleased as a single OTF + WOFF2 bundle with both personal and commercial licensing. The personal license covers freelance and indie projects up to a small revenue cap. The commercial license is per-company, perpetual, no subscription.",
    features: [
      "Single weight (Regular) — wide-ranging OpenType features",
      "Full Latin character set + extended punctuation",
      "OTF + WOFF2 bundle, no subscription",
      "Personal license: indie + freelance up to RM 100K/yr revenue",
      "Commercial license: perpetual, per-company",
    ],
    category: "Typography",
    releaseDate: "Q2 2026",
    order: 6,
  },
  {
    slug: "invoker",
    name: "Invoker",
    tagline:
      "An AI CLI engine. Eleven themed agents that build full MVPs from a single brief.",
    status: "coming-soon",
    price: "Open source",
    cta: {
      label: "Star on GitHub",
      href: "https://github.com/CwCw0",
      external: true,
    },
    accent: {
      hex: "#5EEAD4",
      soft: "#5EEAD414",
      border: "#5EEAD440",
      glow: "#5EEAD422",
    },
    cardDescription:
      "npx invoker → write a brief → eleven agents (Architect, Forger, Sentinel, Scribe…) build your MVP in front of you.",
    longDescription:
      "Invoker is an open-source CLI that orchestrates a group of themed agents to take a short product brief and turn it into a working MVP. Each agent has a specific role and a specific personality. The Summoner reads your brief. The Oracle researches the domain. The Architect lays out the file structure. The Forger writes the code. The Sentinel reviews it. The Scribe documents it. The whole party works in parallel, then hands you back a buildable repo.\n\nInvoker is alpha-quality and shipping as open source for one reason: it's content. Every run produces a video. Every video is a Kaiiro post. The tool itself is the proof.",
    features: [
      "Eleven specialised agents with named roles",
      "Single command: `npx invoker`",
      "Outputs a buildable Next.js or full-stack project",
      "Open source under permissive license",
      "Designed to be filmed as much as used",
    ],
    category: "Developer Tools",
    releaseDate: "Q4 2026",
    order: 7,
  },
  {
    slug: "aurora",
    name: "Aurora",
    tagline: "Coming soon. We're not telling you what it is yet.",
    status: "coming-soon",
    price: "TBD",
    cta: {
      label: "Get the reveal",
      href: "/contact?product=aurora",
    },
    accent: {
      hex: "#A78BFA",
      soft: "#A78BFA14",
      border: "#A78BFA40",
      glow: "#A78BFA22",
    },
    cardDescription:
      "Something we're not ready to talk about yet. Sign up to be first when it lands.",
    longDescription:
      "Aurora is the project we're holding close until it's ready. We don't believe in announcing things just to have something to announce. When Aurora is ready to be talked about, you'll hear about it — and the people on the notify list will hear about it first.\n\nIf you want a hint: it's the kind of thing that doesn't fit any of the other categories on this page.",
    features: [
      "We'll tell you when it's time",
    ],
    category: "Unannounced",
    releaseDate: "When it's ready",
    order: 8,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getNextProduct(currentSlug: string): { name: string; slug: string } {
  const idx = products.findIndex((p) => p.slug === currentSlug);
  const next = products[(idx + 1) % products.length];
  return { name: next.name, slug: next.slug };
}

export function statusLabel(status: ProductStatus): string {
  switch (status) {
    case "live":
      return "LIVE";
    case "in-development":
      return "IN BUILD";
    case "beta":
      return "BETA";
    case "coming-soon":
      return "COMING SOON";
  }
}
