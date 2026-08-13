export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  stack: string;
  year: string;
  status: string;
  tagline: string;
  stats: [string, string][];
  tone: 'violet' | 'deep' | 'ember' | 'ink';
  image?: string;
}

export const projects: Project[] = [
  {
    id: '00',
    slug: '88bh',
    title: '88 Badminton House',
    type: 'Retail System',
    stack: 'Next.js 16 · Prisma 7 · Supabase',
    year: '2026',
    status: 'Final launch prep',
    tagline:
      'A full retail operating system for a badminton specialty shop — live inventory with a stock ledger, a unified stringing queue, and an admin dashboard built around how the shop actually runs.',
    stats: [
      ['API routes', '41'],
      ['Stock moves', 'Ledgered'],
      ['Audit', '7 criticals closed'],
    ],
    tone: 'violet',
    image: '/images/88bh/dashboard-low-stock.jpg',
  },
  {
    id: '0F',
    slug: 'forge',
    title: 'Forge',
    type: 'Internal Tool',
    stack: 'Next.js 16 · Supabase · Gemini',
    year: '2026',
    status: 'Internal · active daily',
    tagline:
      'The AI-powered operations platform I built to run my own studio — 60 tools, a knowledge graph, and a client pipeline, used daily. Not a demo.',
    stats: [
      ['AI tools', '60'],
      ['API routes', '27'],
      ['In use', 'Daily'],
    ],
    tone: 'deep',
    image: '/images/forge/dashboard.jpg',
  },
  {
    id: '01',
    slug: 'omnifood',
    title: 'Omnifood',
    type: 'Website',
    stack: 'HTML/CSS',
    year: '2024',
    status: 'Live',
    tagline:
      'My first real project. A high-converting landing page for a meal subscription service — and the project that taught me more than any tutorial ever could.',
    stats: [
      ['Performance', '98 / 100'],
      ['Built in', '3 weeks'],
      ['Discipline', 'Self-taught'],
    ],
    tone: 'violet',
    image: '/images/omnifood/hero.jpg',
  },
  {
    id: '02',
    slug: 'pulse',
    title: 'Pulse',
    type: 'Web App',
    stack: 'Next.js',
    year: '2025',
    status: 'Beta',
    tagline:
      'A healthtech dashboard that pulls wearable data from Apple Watch, Fitbit, and Garmin — turning scattered health metrics into calm, actionable clarity.',
    stats: [
      ['Integrations', '3 devices'],
      ['Stack', 'Next.js · Prisma'],
      ['Phase', 'Beta'],
    ],
    tone: 'deep',
    image: '/images/pulse/hero.png',
  },
  {
    id: '03',
    slug: 'koji',
    title: 'Kōji',
    type: 'SaaS',
    stack: 'Next.js',
    year: '2025',
    status: 'Live · v0.8',
    tagline:
      'A productivity platform built around how I actually think — fast capture, three views, 40+ shortcuts, and zero cloud dependency. Actively evolving.',
    stats: [
      ['Shortcuts', '40+'],
      ['Views', '3 modes'],
      ['Cloud deps', '0'],
    ],
    tone: 'violet',
    image: '/images/koji/hero.png',
  },
  {
    id: '04',
    slug: 'voidframe',
    title: 'Voidframe',
    type: 'Platform',
    stack: 'Next.js',
    year: '2026',
    status: 'IN DEV',
    tagline:
      'A community platform designed the way gamers actually organise, communicate, and compete — not a corporate tool with a dark skin.',
    stats: [
      ['Status', 'In dev'],
      ['Launch', "Q3 '26"],
      ['Servers', 'Alpha'],
    ],
    tone: 'ember',
    image: '/images/voidframe/hero.jpg',
  },
];
