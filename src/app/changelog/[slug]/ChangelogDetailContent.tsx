"use client";

import Link from "next/link";
import RevealLine from "@/components/ui/RevealLine";
import FadeIn from "@/components/ui/FadeIn";
import { type ChangelogEntry, type ChangeType, changelog } from "@/data/changelog";

const TYPE_META: Record<
  ChangeType,
  { label: string; icon: string; color: string }
> = {
  feature: { label: "New Features", icon: "✦", color: "var(--accent)" },
  improvement: { label: "Improvements", icon: "↑", color: "#4EC9B0" },
  fix: { label: "Bug Fixes", icon: "⚑", color: "#D4A054" },
  breaking: { label: "Breaking Changes", icon: "⚠", color: "#E05252" },
};

export default function ChangelogDetailContent({
  entry,
}: {
  entry: ChangelogEntry;
}) {
  const groups = (
    ["feature", "improvement", "fix", "breaking"] as ChangeType[]
  )
    .map((type) => ({
      type,
      items: entry.changes.filter((c) => c.type === type),
    }))
    .filter((g) => g.items.length > 0);

  /* Prev / next navigation */
  const productEntries = changelog.filter(
    (e) => e.productSlug === entry.productSlug
  );
  const idx = productEntries.findIndex((e) => e.slug === entry.slug);
  const prev = productEntries[idx + 1] ?? null;
  const next = productEntries[idx - 1] ?? null;

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "clamp(120px, 16vw, 240px) 0 var(--sp-12)",
          background: "transparent",
        }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          <FadeIn>
            <Link
              href="/changelog"
              className="link-underline mono"
              style={{ color: "var(--fg-dim)", fontSize: "var(--t-mono)" }}
            >
              ← All updates
            </Link>
          </FadeIn>

          <div style={{ marginTop: "var(--sp-8)" }}>
            <FadeIn delay={80}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--sp-3)",
                  marginBottom: "var(--sp-4)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="mono"
                  style={{
                    padding: "4px 12px",
                    borderRadius: "var(--r-pill)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  {entry.product}
                </span>
                <span
                  className="mono"
                  style={{
                    padding: "4px 12px",
                    borderRadius: "var(--r-pill)",
                    border: "1px solid var(--line-strong)",
                    color: "var(--fg-dim)",
                  }}
                >
                  {entry.version}
                </span>
                <span className="mono" style={{ color: "var(--fg-faint)" }}>
                  {entry.date}
                </span>
              </div>
            </FadeIn>

            <RevealLine>
              <h1
                className="display-lg"
                style={{ maxWidth: 600, lineHeight: 1.15 }}
              >
                {entry.title}
              </h1>
            </RevealLine>

            <FadeIn delay={160}>
              <p
                style={{
                  fontFamily: "var(--f-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 2vw, 20px)",
                  color: "var(--fg-dim)",
                  lineHeight: 1.7,
                  marginTop: "var(--sp-6)",
                  maxWidth: 560,
                }}
              >
                {entry.summary}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Change groups ── */}
      <section
        style={{
          paddingBottom: "clamp(80px, 12vw, 160px)",
          background: "transparent",
        }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          {groups.map((group, gi) => {
            const meta = TYPE_META[group.type];
            return (
              <FadeIn key={group.type} delay={gi * 80}>
                <div
                  style={{
                    marginBottom: "var(--sp-10)",
                    scrollMarginTop: 100,
                  }}
                >
                  {/* Group header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--sp-3)",
                      marginBottom: "var(--sp-5)",
                      paddingBottom: "var(--sp-3)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <span style={{ color: meta.color, fontSize: 18 }}>
                      {meta.icon}
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--f-display)",
                        fontSize: "clamp(16px, 1.8vw, 20px)",
                        fontWeight: 600,
                        color: "var(--fg)",
                      }}
                    >
                      {meta.label}
                    </h2>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--fg-faint)",
                        marginLeft: "auto",
                      }}
                    >
                      {group.items.length}{" "}
                      {group.items.length === 1 ? "change" : "changes"}
                    </span>
                  </div>

                  {/* Items */}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {group.items.map((change, ci) => (
                      <li
                        key={ci}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "var(--sp-3)",
                          padding: "var(--sp-3) 0",
                          borderBottom:
                            ci < group.items.length - 1
                              ? "1px solid var(--line)"
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: meta.color,
                            opacity: 0.6,
                            marginTop: 8,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            color: "var(--fg-dim)",
                            lineHeight: 1.7,
                          }}
                        >
                          {change.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}

          {/* ── Prev / Next ── */}
          <FadeIn>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid var(--line)",
                paddingTop: "var(--sp-8)",
                marginTop: "var(--sp-8)",
                gap: "var(--sp-4)",
                flexWrap: "wrap",
              }}
            >
              {prev ? (
                <Link
                  href={`/changelog/${prev.slug}`}
                  className="link-underline"
                  style={{ color: "var(--fg-dim)" }}
                >
                  ← {prev.product} {prev.version}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/changelog/${next.slug}`}
                  className="link-underline"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {next.product} {next.version} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
