"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElevateLayout, E } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Alex Rivera",
    role: "Co-Founder & CEO",
    initials: "AR",
    bio: "Former VP of Product at Stripe. 12 years building developer tools that teams actually enjoy using.",
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO",
    initials: "PS",
    bio: "Ex-Google Staff Engineer. Led infrastructure at scale for 200M+ users. Obsessed with latency.",
  },
  {
    name: "Jordan Lee",
    role: "Head of Design",
    initials: "JL",
    bio: "Previously Design Lead at Linear. Believes great software should feel invisible and intuitive.",
  },
];

const values = [
  {
    title: "Ship Fast, Ship Right",
    desc: "We deploy multiple times daily. Speed without quality is just noise. We do both.",
    icon: "🚀",
  },
  {
    title: "Default to Transparency",
    desc: "Our roadmap is public. Our incident reports are honest. Trust is earned in the open.",
    icon: "🔍",
  },
  {
    title: "Customer Obsession",
    desc: "Every feature starts with a real customer conversation, not a boardroom assumption.",
    icon: "💡",
  },
  {
    title: "Think in Systems",
    desc: "We solve classes of problems, not individual tickets. Architecture matters at every level.",
    icon: "🧩",
  },
];

const stats = [
  { value: "2021", label: "Founded" },
  { value: "86", label: "Team Members" },
  { value: "10K+", label: "Teams Served" },
  { value: "$42M", label: "Series B Raised" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero text animation
      el.querySelectorAll(".ab-hero-anim").forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out" }
        );
      });

      // Stats
      el.querySelectorAll(".ab-stat").forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
          }
        );
      });

      // Team cards
      el.querySelectorAll(".ab-team-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Values
      el.querySelectorAll(".ab-value").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
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
          {/* Dot grid */}
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
              className="ab-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: E.accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              About Us
            </span>
            <h1
              className="ab-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 36 : "clamp(40px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginTop: 16,
              }}
            >
              We&apos;re building the{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                future of work.
              </span>
            </h1>
            <p
              className="ab-hero-anim"
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
              Elevate started with a simple observation: teams spend more time managing tools than
              doing actual work. We set out to change that.
            </p>
          </div>
        </section>

        {/* Story */}
        <section style={{ padding: isMobile ? "60px 20px" : "80px 48px", background: E.bgSoft }}>
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                Our Story
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  color: E.textMuted,
                  marginTop: 16,
                  lineHeight: 1.75,
                }}
              >
                In 2021, Alex and Priya left their roles at Stripe and Google with a shared
                frustration: every team they&apos;d worked on juggled 8+ tools just to ship a
                feature. Context switching was killing productivity.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  color: E.textMuted,
                  marginTop: 12,
                  lineHeight: 1.75,
                }}
              >
                They built the first version of Elevate in a garage in San Francisco. Within six
                months, 200 beta teams were using it daily. Today, over 10,000 teams rely on Elevate
                to plan, build, and ship without the noise.
              </p>
            </div>
            <div
              style={{
                height: isMobile ? 220 : 320,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${E.gradient1}22, ${E.gradient2}22)`,
                border: `1px solid ${E.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: "#fff",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                }}
              >
                E
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: E.textMuted,
                  fontWeight: 600,
                }}
              >
                Founded 2021, San Francisco
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: isMobile ? "60px 20px" : "80px 48px" }}>
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="ab-stat"
                style={{
                  textAlign: "center",
                  padding: 28,
                  background: E.bgSoft,
                  borderRadius: 14,
                  border: `1px solid ${E.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? 32 : 40,
                    fontWeight: 800,
                    display: "block",
                    background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: E.textMuted,
                    marginTop: 8,
                    display: "block",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "80px 48px",
            background: E.bgDark,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
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
              Our Mission
            </span>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 28 : 40,
                fontWeight: 800,
                color: "#FFFFFF",
                marginTop: 16,
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Eliminate the friction between thinking and shipping.
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.55)",
                marginTop: 20,
                lineHeight: 1.75,
              }}
            >
              We believe great teams don&apos;t need more tools — they need fewer, better ones.
              Elevate consolidates planning, collaboration, and analytics into a single surface so
              your team can focus on what matters: building great products.
            </p>
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
                Leadership
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
                Meet the team.
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {team.map((m) => (
                <div
                  key={m.name}
                  className="ab-team-card"
                  style={{
                    padding: 36,
                    background: E.bgSoft,
                    border: `1px solid ${E.border}`,
                    borderRadius: 16,
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = E.accent;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${E.accentGlow}`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = E.border;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 auto 20px",
                    }}
                  >
                    {m.initials}
                  </div>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {m.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: E.accent,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    {m.role}
                  </span>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: E.textMuted,
                      lineHeight: 1.65,
                    }}
                  >
                    {m.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", background: E.bgSoft }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
                Our Values
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
                What drives us.
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: 20,
              }}
            >
              {values.map((v) => (
                <div
                  key={v.title}
                  className="ab-value"
                  style={{
                    padding: 32,
                    background: E.bg,
                    border: `1px solid ${E.border}`,
                    borderRadius: 14,
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = E.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = E.border;
                  }}
                >
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{v.icon}</span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: E.textMuted,
                        lineHeight: 1.65,
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ElevateLayout>
  );
}
