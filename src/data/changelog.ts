export type ChangeType = "feature" | "fix" | "improvement" | "breaking";

export interface Change {
  type: ChangeType;
  text: string;
}

export interface ChangelogEntry {
  slug: string;
  product: string;
  productSlug: string;
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: Change[];
}

export const changelog: ChangelogEntry[] = [
  /* ── Forge ────────────────────────────────────────── */
  {
    slug: "forge-v0.4.0",
    product: "Forge",
    productSlug: "forge",
    version: "v0.4.0",
    date: "May 25, 2026",
    title: "Client pipeline & document engine",
    summary:
      "Forge now tracks clients from lead to paid with a full pipeline view, and generates quotes and invoices from templates in seconds.",
    changes: [
      { type: "feature", text: "Client pipeline — leads, active, completed stages with drag-and-drop" },
      { type: "feature", text: "Document engine — generate quotes, invoices, and contracts from 27 HTML templates" },
      { type: "feature", text: "Project tracker integration — line items, milestones, payment status" },
      { type: "improvement", text: "Dashboard now shows real-time business snapshot: revenue, active projects, pending payments" },
      { type: "improvement", text: "Webhook system for live UI updates across sessions" },
      { type: "fix", text: "Fixed timezone offset in payment date tracking" },
      { type: "fix", text: "Resolved duplicate entries when updating client status rapidly" },
    ],
  },
  {
    slug: "forge-v0.3.0",
    product: "Forge",
    productSlug: "forge",
    version: "v0.3.0",
    date: "May 10, 2026",
    title: "AI chat & project intelligence",
    summary:
      "Added Gemini-powered AI chat that can answer questions about your own business data — clients, projects, revenue, timelines.",
    changes: [
      { type: "feature", text: "AI chat panel — ask natural language questions about your business data" },
      { type: "feature", text: "Project status cards with real-time progress percentages" },
      { type: "feature", text: "React Flow visual workspace for project dependencies" },
      { type: "improvement", text: "Supabase row-level security on all client data tables" },
      { type: "improvement", text: "Responsive layout for mobile dashboard access" },
      { type: "fix", text: "Fixed session persistence issue on page refresh" },
    ],
  },

  /* ── Koji ─────────────────────────────────────────── */
  {
    slug: "koji-v0.8.0",
    product: "Koji",
    productSlug: "koji",
    version: "v0.8.0",
    date: "May 20, 2026",
    title: "Workspace overhaul & keyboard navigation",
    summary:
      "Major UI refresh with new workspace layout, full keyboard navigation, and improved task management.",
    changes: [
      { type: "feature", text: "Redesigned workspace with collapsible sidebar and focus mode" },
      { type: "feature", text: "Full keyboard navigation — create, move, and complete tasks without touching the mouse" },
      { type: "feature", text: "Quick capture — global shortcut to add tasks from anywhere in the app" },
      { type: "improvement", text: "Dark theme refined — better contrast ratios, reduced eye strain" },
      { type: "improvement", text: "Task rendering performance improved by 40% on large lists" },
      { type: "fix", text: "Fixed drag-and-drop ghost element flickering on Safari" },
      { type: "fix", text: "Resolved note editor losing cursor position on auto-save" },
    ],
  },
  {
    slug: "koji-v0.7.0",
    product: "Koji",
    productSlug: "koji",
    version: "v0.7.0",
    date: "Apr 28, 2026",
    title: "Notes, goals & project views",
    summary:
      "Koji now supports rich notes linked to tasks, goal tracking with progress bars, and multiple project views.",
    changes: [
      { type: "feature", text: "Rich notes editor — markdown support, linked to tasks and projects" },
      { type: "feature", text: "Goal tracking with visual progress bars and milestone markers" },
      { type: "feature", text: "Multiple project views — list, board, and timeline" },
      { type: "improvement", text: "Search now indexes notes, tasks, and project titles" },
      { type: "improvement", text: "Reduced initial load time by 60% with code splitting" },
      { type: "fix", text: "Fixed date picker not respecting timezone in recurring tasks" },
    ],
  },
];

/** Get all unique products from changelog */
export const changelogProducts = Array.from(
  new Set(changelog.map((e) => e.product))
);

/** Get latest entry per product */
export function getLatestByProduct(productSlug: string) {
  return changelog.find((e) => e.productSlug === productSlug);
}
