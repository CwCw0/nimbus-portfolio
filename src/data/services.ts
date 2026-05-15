export interface Service {
  id: string;
  title: string;
  kicker: string;
  body: string;
  chips: string[];
  deliverables?: string[];
}

export const services: Service[] = [
  {
    id: '01',
    title: 'Website Creation',
    kicker: 'Next.js · React · Vercel',
    body: "Your current site doesn't convert. Visitors land, scroll, and leave without doing anything. I build sites where every page has a job — and does it. Fast load times, clear CTAs, mobile-first. The kind of site that makes people reach out.",
    chips: ['Next.js', 'React', 'Vercel'],
    deliverables: [
      'Custom Next.js website with responsive design',
      'SEO-optimized structure and meta tags',
      'Performance-tuned for 90+ Lighthouse score',
      'Vercel deployment with CI/CD pipeline',
      'Content management system (if needed)',
      '30-day post-launch support',
    ],
  },
  {
    id: '02',
    title: 'Visual Design',
    kicker: 'Design systems · In-code · Brand',
    body: "Most brands look like everyone else in their space — same fonts, same colours, same forgettable layouts. I build design systems directly in code: colour, type, and components that are genuinely yours. The result is a product people recognise before they read a word.",
    chips: ['Design Systems', 'In-Code Design', 'Brand'],
    deliverables: [
      'Complete color system and typography scale',
      'Component library with variants and states',
      'Brand guidelines document',
      'Design tokens for development handoff',
      'Icon set and visual assets',
    ],
  },
  {
    id: '03',
    title: 'UI / UX Design',
    kicker: 'Prototyping · Research · Wireframes',
    body: "If users need a tutorial, the interface failed. I research how your customers actually think, map every step of their journey, and design screens that feel obvious on first touch. No handoff to a separate developer — I build the prototype and the product.",
    chips: ['Prototyping', 'User Research', 'Wireframes'],
    deliverables: [
      'User research and persona development',
      'Information architecture and user flows',
      'Wireframes for all key screens',
      'High-fidelity prototypes in code',
      'Usability testing and iteration',
      'Design system documentation',
    ],
  },
  {
    id: '04',
    title: 'SEO Optimization',
    kicker: 'Technical · Analytics · Content',
    body: "You're invisible on Google and paying for ads just to stay alive. I fix the technical gaps that keep you off the first page — audits, on-page structure, schema, and a content strategy built around what your customers are actually searching for. Organic traffic you don't have to pay for every month.",
    chips: ['Technical SEO', 'Analytics', 'Content'],
    deliverables: [
      'Technical SEO audit and fixes',
      'Keyword research and content strategy',
      'On-page optimization across all pages',
      'Structured data and schema markup',
      'Analytics setup and tracking',
      'Monthly rank tracking dashboard',
    ],
  },
  {
    id: '05',
    title: 'AI, LLMs & Agents',
    kicker: 'GPT · Claude · Automation',
    body: "You're spending hours on tasks that shouldn't need a human. I build custom AI agents, LLM-powered tools, and automation workflows that handle the repetitive work — lead qualification, customer replies, internal reporting. Not a chatbot widget. A system that runs your operations while you focus on growth.",
    chips: ['GPT', 'Claude', 'Automation'],
    deliverables: [
      'Custom AI agent with tool calling',
      'LLM integration with your existing systems',
      'Automation workflows for repetitive tasks',
      'Knowledge base and RAG pipeline',
      'Conversational UI or API integration',
      'Monitoring and usage analytics',
    ],
  },
];

export const faqItems = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on what you need. A website starts around RM 6,000. A full business system with admin dashboard and AI can go up to RM 60,000. Book a free 30-minute call, tell me what you need, and I\'ll send a detailed quote within 48 hours. No pressure, no obligation.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. Based in KL, available worldwide. I communicate in English, adapt to your timezone, and price in your local currency. Malaysian clients pay in RM, international clients in USD.',
  },
  {
    q: 'What tech stack do you use?',
    a: 'Next.js for the frontend. Supabase for databases and authentication. GSAP for animations. Vercel for hosting. AI integrations use Claude or Gemini depending on what fits. The stack is modern, fast, and built to scale with your business.',
  },
  {
    q: 'Do you provide Figma designs?',
    a: 'No. I design directly in code. You see real, working pages from the first week. What you review in the browser is exactly what ships. No "the developer couldn\'t match the design" problem. What you see is what you get.',
  },
  {
    q: 'What is the typical project timeline?',
    a: 'A landing page ships in 2 weeks. A full website takes 4–8 weeks. Complex systems with dashboards and AI take 8–12 weeks. You get weekly progress updates every Friday so you always know where things stand.',
  },
  {
    q: 'What happens after launch?',
    a: 'I offer ongoing maintenance starting from RM 500/month. Security updates, performance monitoring, content changes, priority support. Your site doesn\'t get abandoned after launch.',
  },
  {
    q: 'Can you help with my existing website?',
    a: 'If it\'s built on a modern stack, yes. If it\'s an old WordPress site that needs replacing, I\'ll build you something new. Either way, book a call and I\'ll tell you what makes sense.',
  },
];
