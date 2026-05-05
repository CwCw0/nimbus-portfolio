"use client";

/**
 * TemplateNav — Prev/Next navigation between template showcases.
 * Shows at the bottom of each showcase page so users can browse without going back to the list.
 * Also includes a "Back to Design Lab" breadcrumb-style link.
 */

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const templates = [
  { slug: "studio-noir", name: "Studio Noir", tag: "Dark Creative" },
  { slug: "elevate", name: "Elevate", tag: "SaaS / Corporate" },
  { slug: "pop-store", name: "Pop Store", tag: "E-Commerce" },
  { slug: "vitalis", name: "Vitalis", tag: "Healthcare" },
  { slug: "roast", name: "Roast", tag: "Cafe / Editorial" },
  { slug: "mono", name: "Mono", tag: "Minimal Portfolio" },
];

export default function TemplateNav({ current }: { current: string }) {
  const currentIndex = templates.findIndex((t) => t.slug === current);
  const prev = currentIndex > 0 ? templates[currentIndex - 1] : templates[templates.length - 1];
  const next = currentIndex < templates.length - 1 ? templates[currentIndex + 1] : templates[0];

  return (
    <section className="w-full border-t border-(--color-border) bg-(--color-bg-primary)">
      {/* Back to Design Lab */}
      <div className="mx-auto max-w-250 px-16 pt-12 max-md:px-6 max-md:pt-8">
        <Link
          href="/work?view=lab"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[2px] text-(--color-text-muted) transition-colors hover:text-(--color-accent)"
        >
          ← VIEW ALL TEMPLATES
        </Link>
      </div>

      {/* Prev / Next */}
      <div className="mx-auto max-w-250 px-16 py-12 max-md:px-6 max-md:py-8">
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {/* Previous */}
          <Link
            href={`/work/designs/${prev.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-(--color-border) p-6 transition-all hover:border-(--color-accent-border) hover:bg-(--color-bg-surface) max-md:p-4"
          >
            <ArrowLeft className="h-5 w-5 text-(--color-text-muted) transition-transform group-hover:-translate-x-1" />
            <div>
              <span className="block font-body text-[11px] tracking-[1px] text-(--color-text-muted)">PREVIOUS</span>
              <span className="block font-display text-lg text-(--color-text-primary) max-md:text-base">{prev.name}</span>
              <span className="block font-body text-xs text-(--color-text-dim)">{prev.tag}</span>
            </div>
          </Link>

          {/* Next */}
          <Link
            href={`/work/designs/${next.slug}`}
            className="group flex items-center justify-end gap-4 rounded-xl border border-(--color-border) p-6 text-right transition-all hover:border-(--color-accent-border) hover:bg-(--color-bg-surface) max-md:p-4 max-md:justify-start max-md:text-left max-md:flex-row-reverse"
          >
            <div>
              <span className="block font-body text-[11px] tracking-[1px] text-(--color-text-muted)">NEXT</span>
              <span className="block font-display text-lg text-(--color-text-primary) max-md:text-base">{next.name}</span>
              <span className="block font-body text-xs text-(--color-text-dim)">{next.tag}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-(--color-text-muted) transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
