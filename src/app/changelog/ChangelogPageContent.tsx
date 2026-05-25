"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import RevealLine from "@/components/ui/RevealLine";
import FadeIn from "@/components/ui/FadeIn";
import {
  changelog,
  changelogProducts,
  type ChangelogEntry,
  type ChangeType,
} from "@/data/changelog";

const TYPE_META: Record<ChangeType, { label: string; color: string }> = {
  feature: { label: "NEW", color: "var(--accent)" },
  improvement: { label: "IMPROVED", color: "#4EC9B0" },
  fix: { label: "FIX", color: "#D4A054" },
  breaking: { label: "BREAKING", color: "#E05252" },
};

export default function ChangelogPageContent() {
  const [active, setActive] = useState("All");

  const filters = useMemo(() => ["All", ...changelogProducts], []);
  const filtered =
    active === "All"
      ? changelog
      : changelog.filter((e) => e.product === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="container pt-[clamp(140px,18vh,200px)] pb-(--sp-16)">
        <RevealLine>
          <h1 className="display-xl">Dev Log.</h1>
        </RevealLine>
        <FadeIn delay={100}>
          <p
            className="body-lg"
            style={{
              color: "var(--fg-dim)",
              maxWidth: 560,
              marginTop: "var(--sp-4)",
              lineHeight: 1.7,
            }}
          >
            Patch notes, feature drops, and bug fixes across every product we
            ship. Updated with every release.
          </p>
        </FadeIn>

        {/* Product filters */}
        <FadeIn delay={200}>
          <div className="mt-(--sp-10) flex flex-wrap gap-(--sp-2)">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="mono transition-all duration-300"
                style={{
                  padding: "8px 18px",
                  borderRadius: "var(--r-pill)",
                  border:
                    active === f
                      ? "1px solid var(--accent)"
                      : "1px solid var(--line-strong)",
                  background: active === f ? "var(--accent)" : "transparent",
                  color: active === f ? "var(--ink-0)" : "var(--fg-dim)",
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Timeline ── */}
      <section className="container pb-(--section-gap)">
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {filtered.map((entry, i) => (
            <ChangelogCard key={entry.slug} entry={entry} delay={i * 80} />
          ))}
        </div>

        {filtered.length === 0 && (
          <FadeIn>
            <p
              className="body"
              style={{
                color: "var(--fg-dim)",
                textAlign: "center",
                padding: "var(--sp-16) 0",
              }}
            >
              No updates yet for this product. Check back soon.
            </p>
          </FadeIn>
        )}
      </section>
    </>
  );
}

function ChangelogCard({
  entry,
  delay,
}: {
  entry: ChangelogEntry;
  delay: number;
}) {
  const features = entry.changes.filter((c) => c.type === "feature");
  const improvements = entry.changes.filter((c) => c.type === "improvement");
  const fixes = entry.changes.filter((c) => c.type === "fix");
  const breaking = entry.changes.filter((c) => c.type === "breaking");

  const groups = [
    { type: "feature" as ChangeType, items: features },
    { type: "improvement" as ChangeType, items: improvements },
    { type: "fix" as ChangeType, items: fixes },
    { type: "breaking" as ChangeType, items: breaking },
  ].filter((g) => g.items.length > 0);

  return (
    <FadeIn delay={delay}>
      <Link
        href={`/changelog/${entry.slug}`}
        className="changelog-card"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <article
          className="changelog-card-inner"
          style={{
            display: "grid",
            padding: "var(--sp-8) var(--sp-4)",
            borderBottom: "1px solid var(--line)",
            gap: "var(--sp-6)",
            transition: "background 0.3s var(--ease-out)",
          }}
        >
          {/* Left: meta */}
          <div className="changelog-meta">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--sp-3)",
                flexWrap: "wrap",
              }}
            >
              <span
                className="mono"
                style={{
                  padding: "3px 10px",
                  borderRadius: "var(--r-pill)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  fontSize: "var(--t-mono)",
                }}
              >
                {entry.product}
              </span>
              <span
                className="mono"
                style={{
                  padding: "3px 10px",
                  borderRadius: "var(--r-pill)",
                  border: "1px solid var(--line-strong)",
                  color: "var(--fg-dim)",
                  fontSize: "var(--t-mono)",
                }}
              >
                {entry.version}
              </span>
            </div>
            <span
              className="mono"
              style={{ color: "var(--fg-faint)", marginTop: "var(--sp-2)", display: "block" }}
            >
              {entry.date}
            </span>
          </div>

          {/* Right: content */}
          <div>
            <h2
              style={{
                fontFamily: "var(--f-display)",
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 600,
                marginBottom: "var(--sp-2)",
              }}
            >
              {entry.title}
            </h2>
            <p
              className="body-sm"
              style={{ color: "var(--fg-dim)", marginBottom: "var(--sp-4)" }}
            >
              {entry.summary}
            </p>

            {/* Change groups preview */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-3)" }}>
              {groups.map((g) => {
                const meta = TYPE_META[g.type];
                return (
                  <span
                    key={g.type}
                    className="mono"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      color: meta.color,
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--sp-1)",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: meta.color,
                        opacity: 0.7,
                      }}
                    />
                    {g.items.length} {meta.label}
                  </span>
                );
              })}
            </div>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
