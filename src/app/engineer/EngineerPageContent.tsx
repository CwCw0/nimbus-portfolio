"use client";

import Link from "next/link";
import RevealLine from "@/components/ui/RevealLine";
import FadeIn from "@/components/ui/FadeIn";
import { projects } from "@/data/projects";
import { LINKEDIN_PROFILE_URL } from "@/data/site";

const EMAIL = "cwcw1056@gmail.com";
const RESUME_HREF = "/resume/darren-ng-resume.pdf";

const skillGroups = [
  {
    label: "AI & Automation",
    items: [
      "LLM Integration",
      "Agentic Workflows",
      "AI Assistants",
      "Prompt Engineering",
      "Claude API",
      "Gemini AI",
    ],
  },
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "C# / .NET", "SQL"],
  },
  {
    label: "Backend & Systems",
    items: [
      "Node.js",
      "Next.js",
      "REST APIs",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "SQL Server",
      "MySQL",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Vercel", "Git", "GitHub", "Postman"],
  },
  {
    label: "Product & Delivery",
    items: [
      "Technical Scoping",
      "PRDs",
      "System Architecture",
      "Stakeholder Management",
      "Product Ownership",
      "Agile / Scrum",
    ],
  },
];

const experience = [
  {
    range: "Oct 2025 — Present",
    title: "Forward Deployed Engineer / Full-Stack Developer & Product Owner",
    org: "AQREIGHT",
    body: "Own two client projects simultaneously as primary developer — discovery through architecture, implementation, QA, and production deployment. Lead technical scoping and write PRDs. Design and implement agentic AI workflows and LLM integrations. Product owner for internal applications; diagnose production issues and security vulnerabilities directly across live client deployments.",
  },
  {
    range: "Apr 2026 — Present",
    title: "Founder & Full-Stack Developer",
    org: "Nimbus Forma Studio",
    body: "Independent software studio — AI systems, business automation, custom internal software. Building Forge, an AI Business OS (knowledge base, AI assistant, CRM, documents, workflows, analytics). Shipped Koji (local-first productivity OS) and Pulse (public-beta health dashboard).",
  },
  {
    range: "May 2025 — Oct 2025",
    title: "Freelance Full-Stack Developer & AI Engineer",
    org: "Self-Employed",
    body: "Designed, built, and deployed full-stack apps with Vue.js, Tailwind, .NET, and REST APIs. Managed client engagements end to end. Built AI chatbots and LLM tools into client workflows. Delivered 88 Badminton House's e-commerce and stock-management platform, architecture through live deployment.",
  },
  {
    range: "Dec 2024 — Apr 2025",
    title: "Junior Digital Developer",
    org: "Trinergy Digital",
    body: "Contributed to an enterprise internal-operations platform for Pos Malaysia. Built a reusable Vue.js + Tailwind component library. Developed and secured .NET backend APIs against SQL Server.",
  },
  {
    range: "May 2023 — Oct 2024",
    title: "Junior Software Developer",
    org: "Nax Group Sdn Bhd",
    body: "Built Puppeteer-based automation for regression testing and QA pipelines. Delivered Node.js solutions, code review, and refactoring. Sustained 95%+ client satisfaction across multiple client products.",
  },
];

const featuredSlugs = ["forge", "88bh", "koji", "pulse"];
const featuredWork = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export default function EngineerPageContent() {
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
            <h1 className="display-xl">Darren Ng Chi Weng.</h1>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-xl serif">
              Forward Deployed Engineer, AI systems.
            </span>
          </RevealLine>
        </div>
      </section>

      {/* ── Summary ── */}
      <section
        style={{ paddingBottom: "var(--section-gap)", background: "transparent" }}
      >
        <div className="container">
          <div
            className="eng-bio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "var(--sp-16)",
              alignItems: "start",
            }}
          >
            <FadeIn>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-8)" }}>
                <p
                  style={{
                    fontFamily: "var(--f-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    lineHeight: 1.6,
                    color: "var(--accent)",
                  }}
                >
                  3+ years building and deploying production software, AI
                  workflows, integrations, and internal business systems.
                </p>
                <p style={{ color: "var(--fg-dim)", lineHeight: 1.8 }}>
                  Experienced across customer discovery, technical scoping,
                  PRDs, system architecture, development, QA, stakeholder
                  management, and live deployment. Comfortable taking
                  ambiguous business problems from requirements through to
                  practical, working technical solutions.
                </p>
                <p style={{ color: "var(--fg-dim)", lineHeight: 1.8 }}>
                  Currently a Forward Deployed Engineer at an AI startup,
                  owning client projects end to end. In parallel, I run{" "}
                  <Link href="/" style={{ color: "var(--accent)" }}>
                    Nimbus Forma Studio
                  </Link>{" "}
                  — an independent practice where I ship and operate my own
                  products, including Forge, an AI business OS I use daily.
                </p>
              </div>
            </FadeIn>

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
                    <span style={{ display: "block", fontWeight: 600, fontSize: "var(--t-body-sm)" }}>
                      Darren
                    </span>
                    <span style={{ display: "block", color: "var(--fg-dim)", fontSize: "var(--t-body-sm)" }}>
                      Forward Deployed Engineer
                    </span>
                  </div>
                </div>

                {[
                  ["Experience", "3+ years"],
                  ["Focus", "Full-stack · AI/LLM systems"],
                  ["Location", "Kuala Lumpur, Malaysia (remote)"],
                  ["Timezone", "GMT+8"],
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
                    <span className="mono" style={{ color: "var(--fg-faint)" }}>{label}</span>
                    <span style={{ color: "var(--fg-dim)", fontSize: "var(--t-body-sm)", textAlign: "right" }}>
                      {value}
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    padding: "var(--sp-6)",
                    display: "flex",
                    gap: "var(--sp-3)",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    href={RESUME_HREF}
                    target="_blank"
                    className="mono"
                    style={{
                      padding: "var(--sp-3) var(--sp-5)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-md)",
                      color: "var(--fg)",
                    }}
                  >
                    Download résumé →
                  </Link>
                  <Link
                    href={LINKEDIN_PROFILE_URL}
                    target="_blank"
                    className="mono"
                    style={{
                      padding: "var(--sp-3) var(--sp-5)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--r-md)",
                      color: "var(--fg-dim)",
                    }}
                  >
                    LinkedIn ↗
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .eng-bio-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── Stack ── */}
      <section style={{ padding: "var(--section-gap) 0", background: "transparent" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">01 / Stack</span>
            <span className="section-label">Tools &amp; technologies</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: "var(--sp-12)" }}>
              What I build with.
            </h2>
          </RevealLine>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--sp-10)",
            }}
          >
            {skillGroups.map((group, i) => (
              <FadeIn key={group.label} delay={i * 60}>
                <div>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      color: "var(--fg-faint)",
                      marginBottom: "var(--sp-3)",
                    }}
                  >
                    {group.label}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
                    {group.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          padding: "var(--sp-2) var(--sp-4)",
                          border: "1px solid var(--line)",
                          borderRadius: "999px",
                          fontSize: "var(--t-body-sm)",
                          color: "var(--fg-dim)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section style={{ padding: "var(--section-gap) 0", background: "transparent" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">02 / Experience</span>
            <span className="section-label">2023 &ndash; Present</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: "var(--sp-12)" }}>
              Where I&apos;ve shipped.
            </h2>
          </RevealLine>

          <div style={{ borderTop: "1px solid var(--line)" }}>
            {experience.map((role, i) => (
              <FadeIn key={role.title + role.org} delay={i * 100}>
                <div
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: "var(--sp-10) 0",
                    display: "grid",
                    gridTemplateColumns: "clamp(140px, 16vw, 220px) 1fr",
                    gap: "var(--sp-10)",
                    alignItems: "start",
                  }}
                >
                  <span
                    className="mono"
                    style={{ color: "var(--fg-faint)", fontSize: "var(--t-body-sm)" }}
                  >
                    {role.range}
                  </span>
                  <div>
                    <h3 className="display-sm" style={{ marginBottom: "var(--sp-1)" }}>
                      {role.title}
                    </h3>
                    <span
                      style={{
                        display: "block",
                        color: "var(--accent)",
                        fontSize: "var(--t-body-sm)",
                        marginBottom: "var(--sp-4)",
                      }}
                    >
                      {role.org}
                    </span>
                    <p style={{ color: "var(--fg-dim)", lineHeight: 1.8, maxWidth: 680, fontSize: "var(--t-body)" }}>
                      {role.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section style={{ padding: "var(--section-gap) 0", background: "transparent" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-index">03 / Work</span>
            <span className="section-label">Shipped &amp; live</span>
          </div>

          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: "var(--sp-12)" }}>
              Selected work.
            </h2>
          </RevealLine>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1px",
              background: "var(--line)",
              border: "1px solid var(--line)",
            }}
          >
            {featuredWork.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 80}>
                <Link
                  href={`/work/${project.slug}`}
                  style={{
                    display: "block",
                    background: "var(--bg, #0a0a0f)",
                    padding: "var(--sp-8) var(--sp-6)",
                    height: "100%",
                  }}
                >
                  <span className="mono" style={{ color: "var(--fg-faint)" }}>
                    {project.id} · {project.type}
                  </span>
                  <h3 className="display-sm" style={{ margin: "var(--sp-3) 0" }}>
                    {project.title}
                  </h3>
                  <p style={{ color: "var(--fg-dim)", lineHeight: 1.7, fontSize: "var(--t-body-sm)" }}>
                    {project.tagline}
                  </p>
                  <span
                    className="mono"
                    style={{
                      display: "block",
                      marginTop: "var(--sp-4)",
                      color: "var(--fg-faint)",
                      fontSize: "var(--t-mono)",
                    }}
                  >
                    {project.stack}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section style={{ padding: "var(--section-gap) 0 calc(var(--section-gap) * 1.4)", background: "transparent" }}>
        <div className="container">
          <RevealLine>
            <h2 className="display-lg" style={{ marginBottom: "var(--sp-6)" }}>
              Let&apos;s talk.
            </h2>
          </RevealLine>
          <FadeIn delay={100}>
            <div style={{ display: "flex", gap: "var(--sp-4)", flexWrap: "wrap" }}>
              <Link
                href={`mailto:${EMAIL}`}
                className="mono"
                style={{
                  padding: "var(--sp-4) var(--sp-6)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  color: "var(--fg)",
                }}
              >
                {EMAIL} →
              </Link>
              <Link
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                className="mono"
                style={{
                  padding: "var(--sp-4) var(--sp-6)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  color: "var(--fg-dim)",
                }}
              >
                LinkedIn ↗
              </Link>
              <Link
                href={RESUME_HREF}
                target="_blank"
                className="mono"
                style={{
                  padding: "var(--sp-4) var(--sp-6)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  color: "var(--fg-dim)",
                }}
              >
                Résumé (PDF) ↗
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
