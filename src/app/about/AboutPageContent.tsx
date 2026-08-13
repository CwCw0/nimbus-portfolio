"use client";

import Link from "next/link";
import RevealLine from "@/components/ui/RevealLine";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/Magnetic";

const stack = [
  { name: "Next.js", role: "Every site and system ships on it" },
  { name: "React", role: "The component model under it all" },
  { name: "TypeScript", role: "Strict mode, always" },
  { name: "Tailwind CSS", role: "v4, tokens in CSS" },
  { name: "Supabase", role: "Postgres, auth, RLS on every table" },
  { name: "GSAP", role: "Scroll, reveal, and motion work" },
  { name: "Node.js", role: "APIs, scripts, tooling" },
  { name: "Python", role: "Automation and data work" },
  { name: "Claude", role: "Pair-builder on every project" },
  { name: "Gemini", role: "Runs Forge's assistant" },
  { name: "Vercel", role: "Deploys, edge, previews" },
  { name: "Git", role: "Small commits, honest history" },
];

const journey = [
  {
    year: "2023",
    title: "In-house dev house",
    body: "First production environment. Built internal tools, learned how real teams ship code, understood the gap between tutorials and production.",
  },
  {
    year: "2024",
    title: "Agency work",
    body: "Client-facing development at scale. Worked on POS integrations for national logistics, fintech platforms, and e-commerce systems. Learned to scope, estimate, and deliver under pressure.",
  },
  {
    year: "2025",
    title: "AI startup (current)",
    body: "FDE and Product Owner. Architecting systems, running PRD pipelines, managing QA, overseeing client projects end to end. Leading a junior developer. Making the decisions that shape what ships.",
  },
  {
    year: "2026",
    title: "Nimbus Forma Studio",
    body: "Registered. First client signed and in build. Now applying everything from agency, in-house, and startup to build independently for businesses that need the full picture.",
  },
];

export default function AboutPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "clamp(120px, 16vw, 240px) 0 var(--section-gap)",
          background: "transparent",
        }}
      >
        <div className="container">
          <RevealLine>
            <h1 className="display-xl">Not just a dev.</h1>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-xl serif">A builder from end to end.</span>
          </RevealLine>
        </div>
      </section>

      {/* ── Bio ── */}
      <section
        style={{
          paddingBottom: "var(--section-gap)",
          background: "transparent",
        }}
      >
        <div className="container">
          <div
            className="about-bio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "var(--sp-16)",
              alignItems: "start",
            }}
          >
            {/* Lead text */}
            <FadeIn>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-8)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--f-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    lineHeight: 1.6,
                    color: "var(--accent)",
                  }}
                >
                  3+ years in production. Agency, in-house, AI startup.
                  Full-stack engineering, product ownership, systems
                  architecture. Now I build independently for businesses that
                  need the whole picture.
                </p>

                <p style={{ color: "var(--fg-dim)", lineHeight: 1.8 }}>
                  I&apos;ve shipped fintech platforms, e-commerce systems, POS
                  integrations for national logistics, and internal tools for
                  complex operations. Currently an FDE and Product Owner at an
                  AI startup, where I architect systems, manage PRD pipelines,
                  run QA, and make the decisions that shape what gets built.
                </p>

                <p style={{ color: "var(--fg-dim)", lineHeight: 1.8 }}>
                  Before tech: retail floors, property sales, F&amp;B kitchens,
                  competitive Badminton and MMA, music teaching. I&apos;ve
                  worked inside the businesses I now build for. When I design a
                  stock system, it&apos;s because I&apos;ve counted inventory at
                  closing. When I build a lead pipeline, it&apos;s because
                  I&apos;ve cold-called prospects. That context isn&apos;t
                  something you learn from a tutorial.
                </p>

                <p style={{ color: "var(--fg-dim)", lineHeight: 1.8 }}>
                  I design in code. What you see in the browser is the final
                  product. No Figma handoff, no translation gap. What you review
                  is what ships. One project at a time, full attention, no
                  compromises.
                </p>
              </div>
            </FadeIn>

            {/* Identity card */}
            <FadeIn delay={250}>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-lg)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  background: "var(--glass-bg)",
                  overflow: "hidden",
                }}
              >
                {/* Name header */}
                <div
                  style={{
                    padding: "var(--sp-6)",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--sp-4)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--f-body)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--ink-0)",
                    }}
                  >
                    D
                  </div>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontWeight: 600,
                        fontSize: "var(--t-body-sm)",
                      }}
                    >
                      Dee
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: "var(--fg-dim)",
                        fontSize: "var(--t-body-sm)",
                      }}
                    >
                      Founder, Nimbus Forma Studio
                    </span>
                  </div>
                </div>

                {/* Data rows */}
                {[
                  ["Role", "Full-Stack Engineer · Product Owner"],
                  ["Background", "Agency · In-House · AI Startup"],
                  ["Location", "Kuala Lumpur, Malaysia"],
                  ["Status", "Accepting projects"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "var(--sp-4) var(--sp-6)",
                      borderBottom: "1px solid var(--line)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className="mono" style={{ color: "var(--fg-faint)" }}>
                      {label}
                    </span>
                    <span
                      style={{
                        color: "var(--fg-dim)",
                        fontSize: "var(--t-body-sm)",
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .about-bio-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── Tools & Stack ── */}
      <section
        style={{ padding: "var(--section-gap) 0", background: "transparent" }}
      >
        <div className="container">
          <div className="section-head">
            <span className="section-index">01 / Stack</span>
            <span className="section-label">Tools &amp; technologies</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: "var(--sp-12)" }}>
              What I work with.
            </h2>
          </RevealLine>

          <div className="stack-grid">
            {stack.map((tech, i) => (
              <FadeIn key={tech.name} delay={i * 50}>
                <div className={`stack-cell ${i % 2 === 0 ? "acc-block" : "acc-serif"}`}>
                  <span className="stack-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="stack-name">{tech.name}</span>
                  <span className="stack-role">{tech.role}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <style jsx>{`
          .stack-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1px;
            background: var(--line);
            border: 1px solid var(--line);
          }
          .stack-grid :global(> *) {
            background: var(--bg, #0a0a0f);
          }
          .stack-cell {
            background: transparent;
            padding: var(--sp-8) var(--sp-6);
            display: flex;
            flex-direction: column;
            gap: var(--sp-2);
            min-height: 128px;
            cursor: default;
            transition: background 0.4s var(--ease-out);
          }
          .stack-index {
            font-family: var(--f-mono);
            font-size: var(--t-mono);
            letter-spacing: 0.14em;
            color: var(--fg-faint);
            transition: color 0.3s var(--ease-out);
          }
          .stack-name {
            font-family: var(--f-display);
            font-weight: 700;
            font-size: clamp(18px, 1.8vw, 24px);
            letter-spacing: -0.01em;
            color: var(--fg-dim);
            transition: color 0.3s var(--ease-out);
            width: fit-content;
            padding: 0 2px;
          }
          .stack-role {
            font-family: var(--f-serif);
            font-style: italic;
            font-size: 14px;
            line-height: 1.5;
            color: var(--fg-dim);
            opacity: 0;
            transform: translateY(5px);
            transition:
              opacity 0.35s var(--ease-out),
              transform 0.35s var(--ease-out);
            margin-top: auto;
          }
          .stack-cell:hover {
            background: var(--accent-soft);
          }
          .stack-cell:hover .stack-index {
            color: var(--accent);
          }
          .stack-cell:hover .stack-role {
            opacity: 1;
            transform: translateY(0);
          }
          /* Two accent treatments, alternating — same system as the slides */
          .acc-block:hover .stack-name {
            color: var(--fg);
            background: var(--accent);
            box-shadow: 0 0 0 3px var(--accent);
          }
          .acc-serif:hover .stack-name {
            font-family: var(--f-serif);
            font-style: italic;
            font-weight: 400;
            color: var(--accent-2);
          }
          @media (max-width: 1000px) {
            .stack-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (max-width: 640px) {
            .stack-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .stack-cell {
              min-height: 104px;
              padding: var(--sp-6) var(--sp-5);
            }
            .stack-role {
              opacity: 1;
              transform: none;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .stack-cell,
            .stack-index,
            .stack-name,
            .stack-role {
              transition: none;
            }
            .stack-role {
              opacity: 1;
              transform: none;
            }
          }
        `}</style>
      </section>

      {/* ── Journey ── */}
      <section
        style={{ padding: "var(--section-gap) 0", background: "transparent" }}
      >
        <div className="container">
          <div className="section-head">
            <span className="section-index">02 / Journey</span>
            <span className="section-label">2023 &ndash; Present</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: "var(--sp-12)" }}>
              The path so far.
            </h2>
          </RevealLine>

          <div style={{ borderTop: "1px solid var(--line)" }}>
            {journey.map((step, i) => (
              <FadeIn key={step.year} delay={i * 150}>
                <div
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: "var(--sp-12) 0",
                    display: "grid",
                    gridTemplateColumns: "clamp(80px, 12vw, 160px) 1fr",
                    gap: "var(--sp-10)",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--f-display)",
                      fontSize: "clamp(36px, 5vw, 56px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      color: "var(--accent)",
                      opacity: 0.4,
                    }}
                  >
                    {step.year}
                  </span>
                  <div>
                    <h3
                      className="display-sm"
                      style={{ marginBottom: "var(--sp-4)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        color: "var(--fg-dim)",
                        lineHeight: 1.8,
                        maxWidth: 640,
                        fontSize: "var(--t-body)",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
