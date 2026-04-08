export type ProductStatus = "live" | "in-development" | "beta" | "coming-soon";

// ---------------------------------------------------------------------------
// Pricing
// -------
// Every product carries a structured price. Only Sumi is currently locked in
// (numbers come from `Build/product-launch-gameplan.md §04`). The rest are
// either Free, Open source, or TBD until we lock the actual storefront, the
// payments rails, and the launch offer.
//
// The website renders prices through `formatPrice(price, currency)` so we can
// show MYR for visitors in Malaysia and USD everywhere else, while keeping
// the source of truth in one place.
// ---------------------------------------------------------------------------
export type ProductPrice =
  | { kind: "tbd" }
  | { kind: "free" }
  | { kind: "open-source" }
  | {
      kind: "paid";
      // Display strings — already formatted with the right symbols.
      // We keep parallel strings (not raw numbers) so we can express
      // "early bird", "lifetime", "one-time", etc. naturally.
      usd: string;
      myr: string;
      // Optional shorter label, used when the card is tight on space.
      shortUsd?: string;
      shortMyr?: string;
    };

export type Currency = "USD" | "MYR";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  price: ProductPrice;
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
  // How the big product mark on the card is rendered. "italic" uses the
  // Instrument Serif display face (default for editorial products), "sans"
  // uses the Nimbus body font for products whose own brand is closer to
  // the Nimbus website itself.
  markStyle?: "italic" | "sans";
  // Optional wordmark that renders as the "logo" over the product preview.
  // When set, the mockup shows this wordmark by default and crossfades to
  // the real screenshot on card hover. Perfect for products whose own
  // display font IS their brand (Kōji, Sumi, etc).
  wordmark?: {
    label: string;
    style: "italic" | "sans";
  };
  // Visual treatment of the card preview. Either a real screenshot of the
  // shipped product, or an honest "in build" placeholder.
  mockup: {
    // "screenshot" — show a real PNG of the live product (must provide image)
    // "concept"    — show an honest "in build" treatment with the accent +
    //                product mark, no fake UI
    type: "screenshot" | "concept";
    // Path under /public — required when type === "screenshot"
    image?: string;
    // Hint to the renderer about how to frame the screenshot.
    device?: "laptop" | "phone" | "desktop" | "terminal" | "poster";
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
    name: "kōji",
    tagline:
      "A keyboard-first second brain. Local, fast, with no AI crutch in the way.",
    status: "live",
    price: { kind: "free" },
    cta: {
      label: "Open Kōji",
      href: "https://koji-seven.vercel.app/",
      external: true,
    },
    // Kōji's identity is monochrome editorial — paper + ink. The accent
    // is a subtle cool off-white that reads almost-black on the card.
    accent: {
      hex: "#F3F3F5",
      soft: "#F3F3F510",
      border: "#F3F3F533",
      glow: "#F3F3F51C",
    },
    // Kōji's "logo" IS its wordmark — the same Instrument Serif italic face
    // used for every heading inside the app. The mockup renders the wordmark
    // by default and crossfades to a real screenshot on card hover.
    wordmark: {
      label: "kōji",
      style: "italic",
    },
    mockup: {
      type: "screenshot",
      image: "/products/koji-screenshot.png",
      device: "laptop",
    },
    cardDescription:
      "Three views, forty shortcuts, one place to think. Built because every other tool tried to organise me.",
    longDescription:
      "Kōji is the productivity tool I built because no other one fit how my brain actually works. I think in bursts — a thought at 2am, a task mid-conversation, a half-formed idea I need to dump before it disappears. Kōji is built around that. Brain Dump captures raw thoughts in a full-screen overlay. Today turns them into things to do. Board shows the bigger picture. Notes hold the longer-form thinking in markdown.\n\nEverything is keyboard-driven. Cmd+K opens the command palette. 40+ shortcuts let you live in the app without ever touching the trackpad. The visual design is intentionally monochrome — no color, no decoration, no AI assistant trying to summarise your life. Just a tool that gets out of the way.\n\nKōji is local-first. Your tasks, notes, brain dumps, and focus stats live on your device — nothing is sent to a server, no account is required, no login wall. Open the tab and keep going.",
    features: [
      "Brain Dump — full-screen capture overlay with a gliding typing caret",
      "Three core views: Today, Board, Notes",
      "40+ keyboard shortcuts and a Cmd+K palette",
      "Pomodoro focus timer with a calm bell and persisted streak",
      "Local-first — no account, no cloud, your data stays on your device",
      "Editorial monochrome design with a light/dark theme swap",
    ],
    category: "Productivity",
    releaseDate: "Live now",
    order: 1,
  },
  {
    slug: "syp",
    name: "Select Your Poison",
    tagline:
      "A drinking game for 4–8 friends who already know each other too well.",
    status: "in-development",
    price: { kind: "free" },
    cta: {
      label: "Join the waitlist",
      href: "#waitlist",
    },
    // Red is SYP's own color — chosen to match the bold, no-nonsense
    // energy of the game itself. A warmer red, not fire-engine red, so it
    // still sits cleanly in the Nimbus palette without shouting.
    accent: {
      hex: "#E63946",
      soft: "#E6394614",
      border: "#E6394640",
      glow: "#E6394626",
    },
    mockup: {
      type: "concept",
      device: "phone",
    },
    cardDescription:
      "Pass the phone. Read the prompt. Find out who actually voted for who. The game gets rougher the longer the night runs.",
    longDescription:
      "Select Your Poison is the simplest possible party game. Open it on one phone. Pass it around the circle. Each round throws up a prompt that the group has to answer about each other — the kind of question you'd never ask sober but everyone wants the answer to.\n\nNo accounts. No setup. No download. It's a web app you load in 3 seconds and start playing in 5. The vibe is closer to a pack of cards than to a typical app — small, sharp, and built to disappear back into the night the moment the game ends.",
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
    slug: "sumi",
    name: "Sumi",
    tagline:
      "A focus and journal app shaped like an ink wash. Quiet, calm, mobile-first.",
    status: "in-development",
    // ⚠ LOCKED — confirmed in Build/product-launch-gameplan.md §04
    // Free tier: 1 entry/day, 1 focus theme.
    // Plus: RM 19/month or RM 149/year (~$33/year).
    // Lifetime: RM 299 (~$65), first 100 buyers only as launch offer.
    price: {
      kind: "paid",
      usd: "$33 / year · $65 lifetime",
      myr: "RM 149 / year · RM 299 lifetime",
      shortUsd: "from $33/yr",
      shortMyr: "from RM 149/yr",
    },
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
    mockup: {
      type: "concept",
      device: "phone",
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
    price: { kind: "tbd" },
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
    mockup: {
      type: "concept",
      device: "desktop",
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
    price: { kind: "tbd" },
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
    mockup: {
      type: "concept",
      device: "poster",
    },
    cardDescription:
      "One weight, full Latin set, opentype features for editorial work. The first font in the Nimbus type catalogue.",
    longDescription:
      "Nimbus Display is the first typeface released under the Nimbus name. It's a single-weight display serif made for headlines, hero sections, and editorial layouts. The aim is the opposite of the geometric grotesks everyone reaches for first — Nimbus Display has personality, slightly varied stroke widths, and a few opentype quirks that reward people who go looking for them.\n\nReleased as a single OTF + WOFF2 bundle with both personal and commercial licensing. The personal license covers freelance and indie projects up to a small revenue cap. The commercial license is per-company, perpetual, no subscription.",
    features: [
      "Single weight (Regular) — wide-ranging OpenType features",
      "Full Latin character set + extended punctuation",
      "OTF + WOFF2 bundle, no subscription",
      "Personal license: indie + freelance — small revenue cap",
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
    price: { kind: "open-source" },
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
    mockup: {
      type: "concept",
      device: "terminal",
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
    price: { kind: "tbd" },
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
    mockup: {
      type: "concept",
      device: "poster",
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

// ---------------------------------------------------------------------------
// formatPrice
// -----------
// Returns the user-facing price string for a product, respecting the
// visitor's currency. We always show the *user's* currency as the primary
// label and never auto-convert numbers — every product carries hand-tuned
// USD and MYR labels so launch offers stay coherent in both regions.
//
// `compact` returns the short form when the card is space-constrained
// (used on small grid tiles).
// ---------------------------------------------------------------------------
export function formatPrice(
  price: ProductPrice,
  currency: Currency,
  compact = false
): string {
  switch (price.kind) {
    case "tbd":
      return "Pricing TBD";
    case "free":
      return "Free";
    case "open-source":
      return "Open source";
    case "paid":
      if (currency === "MYR") {
        return compact && price.shortMyr ? price.shortMyr : price.myr;
      }
      return compact && price.shortUsd ? price.shortUsd : price.usd;
  }
}

// Returns the *secondary* (non-primary) currency string for a paid product,
// or null if there isn't one (free, tbd, open-source). Used to show
// "$33/yr · ~RM 149/yr" style dual labels.
export function formatSecondaryPrice(
  price: ProductPrice,
  currency: Currency
): string | null {
  if (price.kind !== "paid") return null;
  return currency === "MYR" ? price.usd : price.myr;
}
