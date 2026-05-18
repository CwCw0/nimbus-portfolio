"use client";

import Link from "next/link";
import RevealLine from "@/components/ui/RevealLine";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/Magnetic";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "GSAP",
  "Node.js",
  "Python",
  "Claude",
  "Gemini",
  "Vercel",
  "Git",
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

          <FadeIn>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--sp-3)",
              }}
            >
              {stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: "var(--t-mono)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "8px 20px",
                    borderRadius: "var(--r-pill)",
                    border: "1px solid var(--line-strong)",
                    color: "var(--fg-dim)",
                    transition:
                      "border-color 0.3s var(--ease-out), color 0.3s var(--ease-out)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
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

      {/* ── CTA ── */}
      <section
        style={{ padding: "var(--section-gap) 0", background: "transparent" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <FadeIn>
            <RevealLine>
              <h2 className="display-lg">
                Let&apos;s build something together.
              </h2>
            </RevealLine>
            <p
              style={{
                color: "var(--fg-dim)",
                marginTop: "var(--sp-6)",
                marginBottom: "var(--sp-10)",
                maxWidth: 500,
                marginInline: "auto",
                lineHeight: 1.7,
              }}
            >
              Always open to collaborating on interesting projects and new
              opportunities.
            </p>
            <Magnetic>
              <Link href="/contact" className="btn">
                Start a conversation &rarr;
              </Link>
            </Magnetic>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
