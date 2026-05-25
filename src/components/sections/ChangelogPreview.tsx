"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { changelog, type ChangeType } from "@/data/changelog";

const TYPE_COLOR: Record<ChangeType, string> = {
  feature: "var(--accent)",
  improvement: "#4EC9B0",
  fix: "#D4A054",
  breaking: "#E05252",
};

export default function ChangelogPreview() {
  const latest = changelog.slice(0, 3);

  return (
    <section
      id="devlog"
      style={{ padding: "var(--section-gap) 0", background: "transparent" }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">08 / Dev Log</span>
          <span className="section-label">What&apos;s shipping</span>
        </div>

        {/* Heading row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "var(--sp-12)",
            flexWrap: "wrap",
            gap: "var(--sp-4)",
          }}
        >
          <h2 className="display-lg">Latest updates.</h2>
          <Link
            href="/changelog"
            className="link-underline"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--f-body)",
              fontSize: "var(--t-body-sm)",
            }}
          >
            View full dev log →
          </Link>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "var(--sp-4)",
          }}
        >
          {latest.map((entry, i) => {
            const typeCounts = entry.changes.reduce(
              (acc, c) => {
                acc[c.type] = (acc[c.type] || 0) + 1;
                return acc;
              },
              {} as Record<string, number>
            );

            return (
              <FadeIn key={entry.slug} delay={i * 120}>
                <Link
                  href={`/changelog/${entry.slug}`}
                  className="changelog-preview-card"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-lg)",
                    padding: "var(--sp-6)",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    transition:
                      "border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out)",
                  }}
                >
                  {/* Product + version */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--sp-2)",
                      marginBottom: "var(--sp-3)",
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        padding: "2px 8px",
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
                        fontSize: 11,
                        color: "var(--fg-faint)",
                      }}
                    >
                      {entry.version} · {entry.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--f-display)",
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      fontWeight: 600,
                      marginBottom: "var(--sp-2)",
                      lineHeight: 1.3,
                    }}
                  >
                    {entry.title}
                  </h3>

                  {/* Summary */}
                  <p
                    className="body-sm"
                    style={{
                      color: "var(--fg-dim)",
                      marginBottom: "var(--sp-4)",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {entry.summary}
                  </p>

                  {/* Change type badges */}
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--sp-3)",
                      flexWrap: "wrap",
                    }}
                  >
                    {Object.entries(typeCounts).map(([type, count]) => (
                      <span
                        key={type}
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          color: TYPE_COLOR[type as ChangeType],
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: TYPE_COLOR[type as ChangeType],
                            opacity: 0.7,
                          }}
                        />
                        {count} {type === "feature" ? "new" : type === "fix" ? "fixed" : type}
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
