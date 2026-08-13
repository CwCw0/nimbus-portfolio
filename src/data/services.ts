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
    title: 'Internal Ops Dashboard',
    kicker: 'Next.js · Supabase · Role-based',
    body: "I build the internal dashboard that replaces the spreadsheets and WhatsApp threads running your operation: orders, inventory, jobs, and staff roles in one custom-coded system with a real database behind it. Built around how your team actually works, then handed over with documentation you own. From $2,000.",
    chips: ['Next.js', 'Supabase', 'Role-based access'],
    deliverables: [
      'Custom dashboard built in Next.js',
      'Database schema with row-level security',
      'Authentication and role-based access',
      'Screens matched to your real workflows',
      'Deployment with monitoring and backups',
      'Handoff documentation you own',
    ],
  },
  {
    id: '02',
    title: 'AI Knowledge Assistant',
    kicker: 'RAG · Claude · Your data',
    body: "I build assistants trained on your own documents, so your team stops re-answering the same questions. Retrieval over your real data with citations back to the source, not a generic chatbot widget. From $1,500.",
    chips: ['RAG', 'Claude', 'pgvector'],
    deliverables: [
      'Document ingestion pipeline for your files',
      'Retrieval-augmented answers with source citations',
      'Chat interface or API integration',
      'Access controls for sensitive content',
      'Accuracy testing before handover',
      'Usage monitoring and analytics',
    ],
  },
  {
    id: '03',
    title: 'AI Workflow Automation',
    kicker: 'Automation · Integrations · Agents',
    body: "I automate the repetitive work between your tools: lead intake, follow-ups, reporting, data entry. Custom-coded workflows with AI where it earns its place, wired into the systems you already use. From $1,500.",
    chips: ['Automation', 'Integrations', 'AI agents'],
    deliverables: [
      'Automation workflows for repetitive tasks',
      'Custom AI agents with tool calling',
      'Integration with your existing systems',
      'Error handling and failure alerts',
      'Logs and monitoring for every run',
      'Documentation for every workflow',
    ],
  },
];

export const faqItems = [
  {
    q: 'How much does a project cost?',
    a: 'It depends on what you need. Dashboards start from $2,000, AI assistants and workflow automation from $1,500 — matching my published Upwork catalog. Multi-module systems are quoted individually, from $12,000. In Malaysia? See /malaysia for RM pricing. Message me with what is slowing your business down and I will send a written build plan within 48 hours. No call required.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. Based in KL, available worldwide. I communicate in English and adapt to your timezone. International clients pay in USD; Malaysian clients pay in RM (see /malaysia).',
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
    a: 'I offer ongoing care plans from $300/month, matching my Upwork catalog add-ons (Malaysian clients: see /malaysia). Security updates, performance monitoring, content changes, priority support. Your system doesn\'t get abandoned after launch.',
  },
  {
    q: 'Can you help with my existing website?',
    a: 'If it\'s built on a modern stack, yes. If it\'s an old WordPress site that needs replacing, I\'ll build you something new. Either way, message me what you\'re trying to run and I\'ll send back a build plan.',
  },
];
