"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import PackageSection from "./PackageSection";
import TemplateNav from "./TemplateNav";

interface DesignChoice {
  num: string;
  title: string;
  body: string;
}

interface UxDecision {
  title: string;
  body: string;
}

interface ShowcaseData {
  slug: string;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  gumroadUrl: string;
  designChoices: DesignChoice[];
  uxDecisions: UxDecision[];
  included: string[];
  excluded: string[];
  audience: string;
  references: string[];
  ctaLine: string;
  hireSuffix?: string;
}

export default function ShowcaseLayout({ data }: { data: ShowcaseData }) {
  const {
    slug,
    name,
    category,
    description,
    techStack,
    gumroadUrl,
    designChoices,
    uxDecisions,
    included,
    excluded,
    audience,
    references,
    ctaLine,
    hireSuffix = "for your brand",
  } = data;

  return (
    <div className="flex w-full flex-col overflow-x-hidden bg-(--ink-0)">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto w-full max-w-250 px-16 pt-28 max-md:px-6 max-md:pt-24">
        <Link
          href="/work?view=lab"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-(--fg-faint) transition-colors hover:text-(--fg)"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Design Lab
        </Link>
        <span className="mx-2 font-mono text-[10px] text-(--fg-faint)">/</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-(--fg-dim)">{name}</span>
      </div>

      {/* ── Hero ── */}
      <section style={{ padding: "var(--sp-12) 0 var(--sp-20)" }}>
        <div className="mx-auto max-w-250 px-16 max-md:px-6">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-(--accent)">
              Template
            </span>
            <span className="h-px w-6 bg-(--line)" />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-(--fg-faint)">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display tracking-[-3px] text-(--fg)"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1 }}
          >
            {name}
          </h1>

          {/* Description */}
          <p
            className="mt-8 max-w-150 font-body text-[17px] leading-[1.75] text-(--fg-dim) max-md:text-[15px]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {description}
          </p>

          {/* Tech pills */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {techStack.map((t) => (
              <span
                key={t}
                className="border border-(--line) px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-(--fg-faint)"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex items-center gap-4 max-md:flex-col max-md:items-start">
            {gumroadUrl ? (
              <a
                href={gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Get This Template <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 border border-(--accent)/30 bg-(--accent)/10 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.1em] text-(--accent)">
                Coming Soon
              </span>
            )}
            <Link
              href={`/work/designs/${slug}/preview`}
              className="btn ghost"
            >
              Live Preview <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Screenshot Gallery ── */}
      <section className="mx-auto w-full max-w-250 px-16 pb-20 max-md:px-6">
        <div className="flex flex-col gap-4">
          {/* Hero screenshot */}
          <div className="overflow-hidden rounded-lg border border-(--line)">
            <Image
              src={`/images/templates/${slug}/hero.png`}
              alt={`${name} homepage`}
              width={2880}
              height={1800}
              className="w-full object-cover"
            />
          </div>
          {/* Inner + Mobile row */}
          <div className="grid grid-cols-[2fr_1fr] gap-4 max-md:grid-cols-1">
            <div
              className="relative overflow-hidden rounded-lg border border-(--line)"
              style={{ height: "clamp(280px, 28vw, 480px)" }}
            >
              <Image
                src={`/images/templates/${slug}/inner.png`}
                alt={`${name} inner page`}
                fill
                className="object-cover object-top"
              />
            </div>
            <div
              className="relative overflow-hidden rounded-lg border border-(--line) max-md:hidden"
              style={{ height: "clamp(280px, 28vw, 480px)" }}
            >
              <Image
                src={`/images/templates/${slug}/mobile.png`}
                alt={`${name} mobile view`}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto h-px w-full max-w-250 bg-(--line)" />

      {/* ── 01 / Design Choices ── */}
      <section style={{ padding: "var(--section-gap) 0" }}>
        <div className="mx-auto max-w-250 px-16 max-md:px-6">
          <div className="section-head">
            <span className="section-index">01 / Design</span>
            <span className="section-label">Why it looks this way</span>
          </div>

          <div className="flex flex-col" style={{ borderTop: "1px solid var(--line)" }}>
            {designChoices.map((choice) => (
              <div
                key={choice.num}
                className="flex gap-12 max-md:flex-col max-md:gap-3"
                style={{ borderBottom: "1px solid var(--line)", padding: "var(--sp-10) 0" }}
              >
                <span
                  className="font-display shrink-0 text-(--accent)"
                  style={{ fontSize: 48, lineHeight: 1, opacity: 0.12 }}
                >
                  {choice.num}
                </span>
                <div className="flex-1">
                  <h3 className="display-sm mb-3" style={{ fontSize: "clamp(18px, 2vw, 22px)" }}>
                    {choice.title}
                  </h3>
                  <p className="max-w-150 font-body text-[15px] leading-[1.75] text-(--fg-dim)">
                    {choice.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 / UX Decisions ── */}
      <section
        style={{ padding: "var(--section-gap) 0", background: "var(--ink-1)" }}
      >
        <div className="mx-auto max-w-250 px-16 max-md:px-6">
          <div className="section-head">
            <span className="section-index">02 / UX</span>
            <span className="section-label">Decisions that drive conversion</span>
          </div>

          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {uxDecisions.map((ux) => (
              <div
                key={ux.title}
                className="flex flex-col gap-4 border border-(--line) p-8 transition-colors hover:border-(--accent)/30"
              >
                <h3 className="font-display text-lg tracking-[-0.5px] text-(--fg)">
                  {ux.title}
                </h3>
                <p className="font-body text-[14px] leading-[1.7] text-(--fg-dim)">
                  {ux.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 / What's Included & Excluded ── */}
      <section style={{ padding: "var(--section-gap) 0" }}>
        <div className="mx-auto max-w-250 px-16 max-md:px-6">
          <div className="grid grid-cols-2 gap-20 max-md:grid-cols-1 max-md:gap-16">
            {/* Included */}
            <div>
              <div className="section-head">
                <span className="section-index">03 / Includes</span>
                <span className="section-label">What ships</span>
              </div>
              <div className="flex flex-col gap-5">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-(--accent)" />
                    </div>
                    <span className="font-body text-[14px] leading-[1.65] text-(--fg-dim)">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Excluded */}
            <div>
              <div className="section-head">
                <span className="section-index">—</span>
                <span className="section-label">Deliberately excluded</span>
              </div>
              <div className="flex flex-col gap-5">
                {excluded.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <X className="h-3.5 w-3.5 text-(--fg-faint)" />
                    </div>
                    <span className="font-body text-[14px] leading-[1.65] text-(--fg-dim)">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audience ── */}
      <section
        style={{ padding: "var(--sp-20) 0", background: "var(--ink-1)" }}
      >
        <div className="mx-auto max-w-250 px-16 text-center max-md:px-6">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.12em] text-(--accent)">
            04 / Audience
          </span>
          <p
            className="mx-auto max-w-150 font-body text-[17px] leading-[1.75] text-(--fg-dim)"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {audience}
          </p>
        </div>
      </section>

      {/* ── References ── */}
      <section style={{ padding: "var(--sp-16) 0" }}>
        <div className="mx-auto max-w-250 px-16 max-md:px-6">
          <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.12em] text-(--fg-faint)">
            Design References
          </span>
          <div className="flex flex-wrap gap-3">
            {references.map((ref) => (
              <span
                key={ref}
                className="border border-(--line) px-4 py-2 font-mono text-[11px] tracking-[0.04em] text-(--fg-faint) transition-colors hover:border-(--accent)/30 hover:text-(--fg-dim)"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{ padding: "var(--section-gap) 0", background: "var(--ink-1)" }}
      >
        <div className="mx-auto flex max-w-200 flex-col items-center gap-8 px-16 text-center max-md:px-6">
          <h2
            className="font-display tracking-[-2px] text-(--fg)"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Get {name}.
          </h2>
          <p
            className="max-w-125 font-body text-[15px] leading-[1.75] text-(--fg-dim)"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {ctaLine}
          </p>
          {gumroadUrl ? (
            <a
              href={gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Get This Template <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 border border-(--accent)/30 bg-(--accent)/10 px-10 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-(--accent)">
              Coming Soon
            </span>
          )}
          <p className="font-body text-[12px] text-(--fg-faint)">
            Or{" "}
            <Link href="/contact" className="text-(--accent) underline">
              hire me to customise it
            </Link>{" "}
            {hireSuffix}.
          </p>
        </div>
      </section>

      <PackageSection />
      <TemplateNav current={slug} />
    </div>
  );
}
