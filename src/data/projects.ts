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
