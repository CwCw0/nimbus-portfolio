export interface VaultProduct {
  slug: string;
  name: string;
  kind: string;
  status: string;
  statusColor: 'live' | 'beta' | 'alpha' | 'dev' | 'coming-soon';
  tone: 'violet' | 'deep' | 'ember';
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  image?: string;
}

export const vaultProducts: VaultProduct[] = [
  {
    slug: 'koji',
    name: 'Kōji',
    kind: 'Productivity OS',
    status: 'Live · v0.8',
    statusColor: 'live',
    tone: 'violet',
    tagline:
      'Fast capture, three views, 40+ shortcuts. No cloud, no bloat. The task manager I always wanted.',
    description:
      "Kōji is a productivity platform built around how I actually think. Not another Notion clone or a Trello board with a different skin — it's a system designed for fast capture, multiple views of the same data, and keyboard-first operation. Everything runs locally. Zero cloud dependency means your data is yours and it's fast.",
    features: [
      'Three view modes: list, board, and timeline',
      '40+ keyboard shortcuts for zero-mouse operation',
      'Instant capture with global hotkey',
      'Local-first architecture — no cloud dependency',
      'Custom filters and saved views',
      'Markdown-native notes and descriptions',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
    links: [
      { label: 'Try Kōji', href: 'https://koji-seven.vercel.app/', external: true },
    ],
    image: '/images/koji/homepage.png',
  },
  {
    slug: 'voidframe',
    name: 'Voidframe',
    kind: 'Community Platform',
    status: 'In Development',
    statusColor: 'dev',
    tone: 'ember',
    tagline:
      'How gamers actually organise, communicate, and compete. The opposite of a corporate tool with a dark skin.',
    description:
      "Voidframe is a community platform built for gamers who are tired of Discord servers held together with duct tape and bot commands. It's designed around how gaming communities actually work — scrimmages, ranked ladders, team rosters, match scheduling, and voice channels that don't drop. Built from the ground up, not adapted from a corporate messaging tool.",
    features: [
      'Server-based communities with custom roles',
      'Integrated match scheduling and ranked ladders',
      'Team roster management and recruitment',
      'Real-time voice and text channels',
      'Tournament bracket system',
      'Custom bot framework for automation',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'WebRTC'],
    links: [
      { label: 'Coming Q3 2026', href: '#' },
    ],
    image: '/images/voidframe/hero.jpg',
  },
  {
    slug: 'pulse',
    name: 'Pulse',
    kind: 'Healthtech Dashboard',
    status: 'Beta',
    statusColor: 'beta',
    tone: 'deep',
    tagline:
      'Wearable data from Apple Watch, Fitbit, Garmin — turning scattered metrics into calm, actionable clarity.',
    description:
      "Pulse pulls health data from the wearables you already own and presents it in a single, calm dashboard. No gamification, no social features, no nudging. Just your data — heart rate, sleep, activity, recovery — displayed with the clarity it deserves. Built for people who want to understand their health trends without the noise.",
    features: [
      'Unified dashboard for Apple Watch, Fitbit, and Garmin',
      'Sleep quality analysis with trend tracking',
      'Heart rate variability and recovery scores',
      'Activity tracking with weekly summaries',
      'Clean data visualization — no gamification',
      'Export your data anytime in standard formats',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    links: [
      { label: 'Join the beta', href: 'https://pulse-khaki-nine.vercel.app/', external: true },
    ],
    image: '/images/pulse/hero.png',
  },
  {
    slug: 'syp',
    name: 'SYP',
    kind: 'Party Game',
    status: 'Open Source',
    statusColor: 'live',
    tone: 'violet',
    tagline: 'Select Your Poison. A party card game that went digital.',
    description: 'A digital party game built as a portfolio piece. Open source, playable in the browser.',
    features: ['Browser-based multiplayer', 'Custom card decks', 'Room-based sessions', 'Mobile-friendly'],
    stack: ['Next.js', 'TypeScript', 'WebSocket'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/CwCw0', external: true }],
  },
  {
    slug: 'sumi',
    name: 'Sumi',
    kind: 'Mental Health Journal',
    status: 'Coming Soon',
    statusColor: 'coming-soon',
    tone: 'deep',
    tagline: 'A calm, focused journaling app for mental wellness.',
    description: 'Sumi is a mental health journaling app built with Flutter. Pastel aesthetics, guided prompts, mood tracking. Part of the Aurora HealthTech product line.',
    features: ['Guided journal prompts', 'Mood tracking over time', 'Pastel-calm UI', 'Offline-first', 'Privacy focused'],
    stack: ['Flutter', 'Dart', 'SQLite'],
    links: [{ label: 'Coming Q3 2026', href: '#' }],
  },
  {
    slug: 'calcifer',
    name: 'Calcifer',
    kind: 'Desktop Companion',
    status: 'Coming Soon',
    statusColor: 'coming-soon',
    tone: 'ember',
    tagline: 'A fire demon for your desktop. Inspired by Howl\'s Moving Castle.',
    description: 'A desktop companion app that lives on your screen. Animated fire demon with personality, reactions to your workflow, and ambient warmth.',
    features: ['Animated desktop companion', 'Workflow-aware reactions', 'Customizable personality', 'Minimal resource usage'],
    stack: ['Electron', 'TypeScript', 'Canvas'],
    links: [{ label: 'Coming Soon', href: '#' }],
  },
  {
    slug: 'invoker',
    name: 'Invoker',
    kind: 'AI CLI Engine',
    status: 'Concept',
    statusColor: 'coming-soon',
    tone: 'violet',
    tagline: 'An AI-powered CLI that builds products from natural language.',
    description: 'Invoker is an agentic coding engine. Describe what you want in plain English, and it architects, codes, tests, and deploys. The ultimate developer productivity tool.',
    features: ['Natural language to code', 'Multi-file project generation', 'Agentic architecture', 'Self-testing'],
    stack: ['Node.js', 'TypeScript', 'Claude API'],
    links: [{ label: 'In Research', href: '#' }],
  },
  {
    slug: 'forge',
    name: 'Forge',
    kind: 'Business OS',
    status: 'In Development',
    statusColor: 'dev',
    tone: 'violet',
    tagline: 'The operating system that runs Nimbus Forma Studio.',
    description: 'Forge is the internal operating system for Nimbus. It reads real files from disk, manages clients and projects, generates documents, runs AI conversations with tool calling, and surfaces what matters before being asked.',
    features: ['AI chat with tool calling', 'Client & project management', 'Document generation', 'Knowledge graph', 'File system reader', 'Pricing intelligence'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Gemini'],
    links: [{ label: 'Internal Tool', href: '#' }],
  },
];
