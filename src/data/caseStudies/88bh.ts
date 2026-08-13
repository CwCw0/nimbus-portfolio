import { CaseStudy } from "./types";

export const bh88: CaseStudy = {
  slug: "88bh",
  status: "in-development",
  statusLabel: "IN FINAL LAUNCH PREP",
  clientLogo: {
    src: "/images/88bh/client-logo.png",
    alt: "88 Badminton House",
    width: 600,
    height: 243,
  },
  category: "Retail System",
  tags: ["Next.js 16", "Prisma 7", "Supabase Postgres", "Revenue Monster", "Resend"],
  title: "88 Badminton House — Retail Operating System",
  shortTitle: "88 Badminton House",
  desc: "A full retail operating system for a badminton specialty shop — live inventory with a stock ledger, a unified stringing queue, and an admin dashboard built around how the shop actually runs. In final launch prep.",
  heroDesc:
    "A retail operating system for a badminton specialty shop — live inventory, a unified stringing queue, and an owner's dashboard, built around exactly how the shop runs.",

  meta: {
    type: "Retail · Inventory · Service Queue",
    stack: "Next.js 16 · Prisma 7 · Supabase Postgres · Revenue Monster · Resend",
    year: "2026",
  },

  heroImage: "/images/88bh/dashboard-low-stock.jpg",
  heroCaption:
    "The owner's view: live stock, pending orders, and low-stock alerts that fire before a shelf actually runs out. Demo data — 88BH is in final launch prep, not yet public.",

  story:
    "88 Badminton House sells rackets, strings, shoes — and stringing, the service that's the actual reason regulars keep coming back. The system goes past a storefront: real-time inventory with a full stock ledger, a stringing queue that unifies walk-in and online jobs by priority and due date, server-side price recomputation so a customer can't tamper with a total by editing a request, and an admin dashboard built around the one thing an owner actually needs on login — what needs attention right now, not a wall of numbers.",

  proofGrid: [
    {
      src: "/images/88bh/stringing-queue.jpg",
      alt: "Stringing queue with priority, due dates, and overdue flags",
      caption:
        "One queue for walk-in and online stringing jobs — priority, due date, overdue flag. Not a whiteboard. Demo jobs shown.",
    },
    {
      src: "/images/88bh/inventory-ledger.jpg",
      alt: "Inventory list backed by a full stock ledger",
      caption:
        "Every stock change — sale, restock, correction — writes to a ledger. Nothing moves without a trace.",
    },
    {
      src: "/images/88bh/reports.jpg",
      alt: "Reports page computing revenue aggregates from order data",
      caption:
        "Real aggregates computed from order data, not a stubbed chart. Demo orders shown — 88BH hasn't gone live yet.",
    },
    {
      src: "/images/88bh/orders.jpg",
      alt: "Orders table with guarded status transitions",
      caption:
        "Order status tracked end to end, pending through shipped, with guarded transitions — a double-click or a retry can't apply the same change twice.",
    },
  ],

  underIt: [
    "41 API routes — admin and public, including CSV product import/export and a scheduled job that expires abandoned pending orders",
    "Every stock change writes to a stock ledger, and every admin action writes an audit log — who did what, when",
    "The server recomputes every order total from the database at checkout — a customer can't change what they're charged by editing a request",
    "Compare-and-swap status transitions inside database transactions — a double-click or a retry can't apply the same change twice",
    "Revenue Monster payment integration is built and cryptographically verified (RSA-SHA256 signing, 9/9 signing tests passing) — dormant until sandbox credentials land, not yet processing real transactions",
    "CSP, HSTS, and X-Frame-Options set at the framework level",
    "Passed an 8-dimension adversarial multi-agent code audit — 7 criticals plus every residual independently re-verified",
  ],

  closing: {
    body: "88 Badminton House is in final launch prep. The build is done and audited — what's left is on the client's side: payment gateway credentials and a domain. No live URL yet, and nothing above is live traffic or revenue.",
    ctaLabel: "Send a project brief",
    ctaHref: "/contact",
  },
};
