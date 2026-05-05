"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ElevateLayout, E } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Real-time Collaboration",
    desc: "See every cursor, edit, and comment as it happens. No refresh needed. Built on CRDTs for conflict-free editing across distributed teams.",
    icon: "👥",
    size: "large",
  },
  {
    title: "Lightning Performance",
    desc: "Sub-100ms response times on every action. Edge-deployed globally for zero-lag experiences no matter where your team sits.",
    icon: "⚡",
    size: "small",
  },
  {
    title: "Smart Analytics",
    desc: "Track velocity, bottlenecks, and team health without manual reporting. Actionable insights, not vanity dashboards.",
    icon: "📊",
    size: "small",
  },
  {
    title: "Enterprise Security",
    desc: "SOC 2 Type II certified. End-to-end encryption at rest and in transit. SSO with SAML, SCIM provisioning, and audit logs that satisfy any compliance team.",
    icon: "🔒",
    size: "small",
  },
  {
    title: "API-First Architecture",
    desc: "Everything in the UI is available via our REST and GraphQL APIs. Build custom workflows, automate processes, and integrate with your existing stack.",
    icon: "⚙️",
    size: "small",
  },
  {
    title: "Workflow Automation",
    desc: "Build custom automations with our visual builder or code-based triggers. Automate status updates, assignments, notifications, and deployments — no Zapier needed.",
    icon: "🔄",
    size: "large",
  },
];

const integrations = [
  "GitHub",
  "GitLab",
  "Slack",
  "Figma",
  "Notion",
  "Vercel",
  "AWS",
  "Datadog",
  "PagerDuty",
  "Sentry",
  "Jira",
  "Confluence",
];

const comparison = [
  { feature: "Real-time collaboration", elevate: true, toolA: false, toolB: true },
  { feature: "Built-in analytics", elevate: true, toolA: true, toolB: false },
  { feature: "API-first design", elevate: true, toolA: false, toolB: false },
  { feature: "SOC 2 Type II", elevate: true, toolA: true, toolB: false },
  { feature: "Custom automations", elevate: true, toolA: false, toolB: true },
  { feature: "Sub-100ms latency", elevate: true, toolA: false, toolB: false },
  { feature: "Unlimited integrations", elevate: true, toolA: false, toolB: true },
  { feature: "Free tier available", elevate: true, toolA: true, toolB: true },
];

export default function FeaturesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero anim
      el.querySelectorAll(".ft-hero-anim").forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out" }
        );
      });

      // Bento cards
      el.querySelectorAll(".ft-bento").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Integration logos
      el.querySelectorAll(".ft-integ").forEach((logo, i) => {
        gsap.fromTo(
          logo,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: logo.parentElement, start: "top 85%", once: true },
          }
        );
      });

      // Table rows
      el.querySelectorAll(".ft-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ElevateLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section
          style={{
            padding: isMobile ? "100px 20px 60px" : "140px 48px 80px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${E.border} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              opacity: 0.5,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
            <span
              className="ft-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: E.accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Features
            </span>
            <h1
              className="ft-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 36 : "clamp(40px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginTop: 16,
              }}
            >
              Everything you need.{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Nothing you don&apos;t.
              </span>
            </h1>
            <p
              className="ft-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 16 : 19,
                color: E.textMuted,
                marginTop: 20,
                lineHeight: 1.7,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              One platform that replaces your entire tool stack. Purpose-built for teams who ship
              fast and don&apos;t compromise on quality.
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <section style={{ padding: isMobile ? "40px 20px 80px" : "40px 48px 120px" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="ft-bento"
                style={{
                  padding: isMobile ? 28 : 40,
                  background: E.bgSoft,
                  border: `1px solid ${E.border}`,
                  borderRadius: 16,
                  gridColumn:
                    !isMobile && f.size === "large" ? "span 2" : undefined,
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = E.accent;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${E.accentGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = E.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? 18 : 20,
                      fontWeight: 700,
                    }}
                  >
                    {f.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    color: E.textMuted,
                    lineHeight: 1.7,
                    maxWidth: f.size === "large" && !isMobile ? 640 : undefined,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "100px 48px",
            background: E.bgDark,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: E.accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Integrations
            </span>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 28 : 40,
                fontWeight: 800,
                color: "#FFFFFF",
                marginTop: 14,
                letterSpacing: "-0.025em",
              }}
            >
              Connects to everything.
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                marginTop: 12,
                lineHeight: 1.7,
              }}
            >
              50+ native integrations. Or build your own with our API.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(3, 1fr)"
                  : "repeat(6, 1fr)",
                gap: 16,
                marginTop: 48,
              }}
            >
              {integrations.map((name) => (
                <div
                  key={name}
                  className="ft-integ"
                  style={{
                    padding: "18px 12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = E.accent;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: E.accent,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Comparison
              </span>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? 28 : 40,
                  fontWeight: 800,
                  marginTop: 12,
                  letterSpacing: "-0.025em",
                }}
              >
                See how we stack up.
              </h2>
            </div>
            <div
              style={{
                borderRadius: 16,
                border: `1px solid ${E.border}`,
                overflow: "hidden",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr 1fr 1fr 1fr" : "2fr 1fr 1fr 1fr",
                  padding: "16px 24px",
                  background: E.bgSoft,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: E.textMuted,
                  borderBottom: `1px solid ${E.border}`,
                }}
              >
                <span>Feature</span>
                <span style={{ textAlign: "center", color: E.accent }}>Elevate</span>
                <span style={{ textAlign: "center" }}>Tool A</span>
                <span style={{ textAlign: "center" }}>Tool B</span>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.feature}
                  className="ft-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr 1fr 1fr 1fr" : "2fr 1fr 1fr 1fr",
                    padding: "14px 24px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    borderBottom:
                      i < comparison.length - 1 ? `1px solid ${E.border}` : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = E.bgSoft)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ color: E.text, fontWeight: 500 }}>{row.feature}</span>
                  <span style={{ textAlign: "center", color: row.elevate ? "#22C55E" : E.textDim }}>
                    {row.elevate ? "✓" : "—"}
                  </span>
                  <span style={{ textAlign: "center", color: row.toolA ? "#22C55E" : E.textDim }}>
                    {row.toolA ? "✓" : "—"}
                  </span>
                  <span style={{ textAlign: "center", color: row.toolB ? "#22C55E" : E.textDim }}>
                    {row.toolB ? "✓" : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "100px 48px",
            background: E.bgSoft,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 28 : "clamp(32px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Ready to see it{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                in action?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 17,
                color: E.textMuted,
                marginTop: 16,
                lineHeight: 1.7,
              }}
            >
              Start free. No credit card required. Explore every feature.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  padding: 2,
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    display: "block",
                    padding: "14px 36px",
                    background: E.text,
                    color: "#fff",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "transparent")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = E.text)}
                >
                  Start for Free
                </span>
              </div>
              <Link
                href="/work/designs/elevate/preview/pricing"
                style={{
                  padding: "16px 36px",
                  border: `1px solid ${E.border}`,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textDecoration: "none",
                  color: E.text,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = E.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = E.border)}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ElevateLayout>
  );
}
