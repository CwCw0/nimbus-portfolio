"use client";

/**
 * ELEVATE — About Page
 *
 * Design language: 3D perspective tilt. Gradient border trails. Scale-in with glow.
 * Glassmorphism overlays. Metric counters with gradient text.
 *
 * Layout: Split hero (text + 3D tilting logo block) → Orbital timeline
 * → Full-width mission statement with gradient underline →
 * 3D tilt team cards → Investor logos marquee → Values bento with gradient borders
 *
 * NOT: generic sections with fade-up. NOT card grids with hover lift.
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElevateLayout, E } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2021", event: "Founded in San Francisco", detail: "Alex & Priya leave Stripe and Google." },
  { year: "2022", event: "First 200 beta teams", detail: "Built in a garage. Product-market fit in 6 months." },
  { year: "2023", event: "Series A — $12M", detail: "Led by Sequoia. Hired to 40 people." },
  { year: "2024", event: "10,000 teams", detail: "Launched enterprise tier. SOC 2 certified." },
  { year: "2025", event: "Series B — $42M", detail: "86 people. Global expansion." },
];

const team = [
  { name: "Alex Rivera", role: "Co-Founder & CEO", initials: "AR", bio: "Former VP of Product at Stripe. 12 years building developer tools that teams actually enjoy using.", gradient: `linear-gradient(135deg, #3B82F6, #06B6D4)` },
  { name: "Priya Sharma", role: "Co-Founder & CTO", initials: "PS", bio: "Ex-Google Staff Engineer. Led infrastructure at scale for 200M+ users. Obsessed with latency.", gradient: `linear-gradient(135deg, #8B5CF6, #EC4899)` },
  { name: "Jordan Lee", role: "Head of Design", initials: "JL", bio: "Previously Design Lead at Linear. Believes great software should feel invisible and intuitive.", gradient: `linear-gradient(135deg, #F59E0B, #EF4444)` },
  { name: "Sam Torres", role: "Head of Engineering", initials: "ST", bio: "Staff Engineer background at Vercel. Makes infrastructure decisions that scale to millions.", gradient: `linear-gradient(135deg, #10B981, #3B82F6)` },
];

const values = [
  { title: "Ship Fast, Ship Right", desc: "We deploy multiple times daily. Speed without quality is just noise.", icon: "⚡", size: "wide" },
  { title: "Default to Transparency", desc: "Our roadmap is public. Our incident reports are honest. Trust is earned in the open.", icon: "🔍", size: "normal" },
  { title: "Customer Obsession", desc: "Every feature starts with a real customer conversation, not a boardroom assumption.", icon: "💡", size: "normal" },
  { title: "Think in Systems", desc: "We solve classes of problems, not individual tickets. Architecture matters at every level.", icon: "🧩", size: "wide" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);

  // 3D tilt handler
  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, []);

  const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero entrance: scale + blur
      el.querySelectorAll(".ev-hero-el").forEach((node, i) => {
        gsap.fromTo(node,
          { scale: 0.92, opacity: 0, filter: "blur(8px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, delay: 0.2 + i * 0.12, ease: "power3.out" }
        );
      });

      // 3D logo block rotation on scroll
      const logoBlock = el.querySelector(".ev-logo-3d");
      if (logoBlock) {
        gsap.to(logoBlock, {
          rotateY: 15, rotateX: -5,
          ease: "none",
          scrollTrigger: { trigger: logoBlock, start: "top bottom", end: "bottom top", scrub: 2 },
        });
      }

      // Timeline: horizontal line draw + node pop
      const timeline = el.querySelector(".ev-timeline-line");
      if (timeline) {
        gsap.fromTo(timeline, { scaleX: 0 }, {
          scaleX: 1, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: timeline, start: "top 80%", once: true },
        });
      }

      el.querySelectorAll(".ev-timeline-node").forEach((node, i) => {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)", delay: 0.8 + i * 0.15,
            scrollTrigger: { trigger: node.parentElement, start: "top 80%", once: true },
          }
        );
      });

      // Mission text gradient underline expand
      const underline = el.querySelector(".ev-mission-underline");
      if (underline) {
        gsap.fromTo(underline, { scaleX: 0 }, {
          scaleX: 1, duration: 1, ease: "power3.inOut",
          scrollTrigger: { trigger: underline, start: "top 85%", once: true },
        });
      }

      // Team cards: stagger scale-in with glow
      el.querySelectorAll(".ev-team-card").forEach((card, i) => {
        gsap.fromTo(card,
          { scale: 0.85, opacity: 0, boxShadow: "0 0 0 rgba(59,130,246,0)" },
          {
            scale: 1, opacity: 1, boxShadow: `0 8px 32px ${E.accentGlow}`,
            duration: 0.7, delay: i * 0.12, ease: "back.out(1.5)",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Values bento: rotate in from different angles
      el.querySelectorAll(".ev-value-card").forEach((card, i) => {
        const rotations = [-3, 2, -2, 3];
        gsap.fromTo(card,
          { rotation: rotations[i] || 0, scale: 0.9, opacity: 0 },
          {
            rotation: 0, scale: 1, opacity: 1,
            duration: 0.7, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Stats counter
      el.querySelectorAll(".ev-counter").forEach((counter) => {
        const target = counter.getAttribute("data-target") || "0";
        const isYear = target.length === 4 && parseInt(target) > 2000;
        const numTarget = parseInt(target);
        const obj = { val: isYear ? 2000 : 0 };

        gsap.to(obj, {
          val: numTarget,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 85%", once: true },
          onUpdate: () => {
            (counter as HTMLElement).textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <ElevateLayout>
      <div ref={pageRef}>
        {/* ═══ HERO — Split: text + 3D floating logo ═══ */}
        <section style={{
          padding: isMobile ? "60px 20px 80px" : "100px 48px 120px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
          gap: isMobile ? 48 : 64,
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <div>
            <span className="ev-hero-el" style={{
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
              color: E.accent, letterSpacing: 1.5, textTransform: "uppercase" as const,
              display: "block", marginBottom: 16,
            }}>
              Our Story
            </span>
            <h1 className="ev-hero-el" style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? 36 : "clamp(44px, 5vw, 64px)",
              fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", textWrap: "balance" as any,
            }}>
              We&apos;re building the workspace teams{" "}
              <span style={{
                background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>deserve.</span>
            </h1>
            <p className="ev-hero-el" style={{
              fontFamily: "Inter, sans-serif", fontSize: 18, color: E.textMuted,
              marginTop: 20, lineHeight: 1.7, maxWidth: 480,
            }}>
              Elevate started with frustration: teams juggling 8+ tools just to ship a feature. We consolidated everything into one surface — so you can focus on what matters.
            </p>

            {/* Stats row */}
            <div className="ev-hero-el" style={{
              display: "flex", gap: isMobile ? 24 : 40, marginTop: 40,
            }}>
              {[
                { value: "2021", label: "Founded" },
                { value: "86", label: "Team" },
                { value: "10000", label: "Teams", suffix: "+" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span className="ev-counter" data-target={s.value} style={{
                      fontFamily: "Inter, sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 800,
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>0</span>
                    {s.suffix && <span style={{
                      fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 700, color: E.accent,
                    }}>{s.suffix}</span>}
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textDim, marginTop: 4, display: "block" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D rotating logo block */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="ev-logo-3d" style={{
              width: isMobile ? 200 : 280,
              height: isMobile ? 200 : 280,
              background: `linear-gradient(135deg, ${E.gradient1}11, ${E.gradient2}11)`,
              border: `1px solid ${E.border}`,
              borderRadius: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "perspective(800px) rotateY(-10deg) rotateX(5deg)",
              transition: "transform 0.1s",
              boxShadow: `0 24px 80px ${E.accentGlow}, 0 0 0 1px ${E.border}`,
            }}>
              <div style={{
                width: 80, height: 80,
                background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                borderRadius: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 800,
                boxShadow: `0 12px 40px ${E.accentGlow}`,
              }}>
                E
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TIMELINE — Horizontal with line draw + node pop ═══ */}
        <section style={{
          padding: isMobile ? "60px 20px" : "100px 48px",
          background: E.bgSoft,
          overflow: "hidden",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: E.accent, letterSpacing: 1.5 }}>MILESTONES</span>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 800, marginTop: 10, letterSpacing: "-0.025em" }}>
                From garage to global.
              </h2>
            </div>

            {/* Timeline track */}
            <div style={{ position: "relative", padding: isMobile ? "0" : "40px 0" }}>
              {/* Horizontal line */}
              {!isMobile && (
                <div className="ev-timeline-line" style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${E.gradient1}, ${E.gradient2})`,
                  transformOrigin: "left center",
                  opacity: 0.3,
                }} />
              )}

              <div style={{
                display: isMobile ? "flex" : "grid",
                gridTemplateColumns: `repeat(${milestones.length}, 1fr)`,
                flexDirection: "column",
                gap: isMobile ? 24 : 0,
              }}>
                {milestones.map((m, i) => (
                  <div key={m.year} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMobile ? "flex-start" : "center",
                    textAlign: isMobile ? "left" : "center",
                    position: "relative",
                    paddingLeft: isMobile ? 32 : 0,
                  }}>
                    {/* Node dot */}
                    <div className="ev-timeline-node" style={{
                      width: 16, height: 16,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      boxShadow: `0 0 12px ${E.accentGlow}`,
                      marginBottom: isMobile ? 12 : 16,
                      position: isMobile ? "absolute" : "relative",
                      left: isMobile ? 0 : "auto",
                      top: isMobile ? 4 : "auto",
                    }} />

                    <span style={{
                      fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 800,
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>{m.year}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, marginTop: 6, color: E.text }}>{m.event}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textMuted, marginTop: 4, lineHeight: 1.5 }}>{m.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ MISSION — Full-width statement with gradient underline ═══ */}
        <section style={{
          padding: isMobile ? "80px 20px" : "140px 48px",
          background: E.bgDark,
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? 28 : "clamp(36px, 4.5vw, 56px)",
              fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, letterSpacing: "-0.02em",
            }}>
              Eliminate the friction between{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                thinking and shipping.
                <span className="ev-mission-underline" style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${E.gradient1}, ${E.gradient2})`,
                  borderRadius: 2,
                  transformOrigin: "left center",
                }} />
              </span>
            </h2>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)",
              marginTop: 24, lineHeight: 1.75,
            }}>
              Great teams don&apos;t need more tools — they need fewer, better ones. Elevate consolidates planning, collaboration, and analytics into a single surface so your team can focus on building great products.
            </p>
          </div>
        </section>

        {/* ═══ TEAM — 3D Tilt cards ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: E.accent, letterSpacing: 1.5 }}>LEADERSHIP</span>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 800, marginTop: 10, letterSpacing: "-0.025em" }}>
                The people behind the product.
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: 24,
            }}>
              {team.map((m) => (
                <div
                  key={m.name}
                  className="ev-team-card"
                  onMouseMove={!isMobile ? handleTilt : undefined}
                  onMouseLeave={!isMobile ? resetTilt : undefined}
                  style={{
                    padding: 36,
                    background: E.bg,
                    border: `1px solid ${E.border}`,
                    borderRadius: 20,
                    transition: "transform 0.1s ease-out, box-shadow 0.3s",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Gradient border glow on top */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: m.gradient, borderRadius: "20px 20px 0 0",
                  }} />

                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 14,
                      background: m.gradient,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff",
                      boxShadow: `0 8px 24px ${E.accentGlow}`,
                    }}>
                      {m.initials}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 700 }}>{m.name}</h3>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.accent, fontWeight: 600 }}>{m.role}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: E.textMuted, lineHeight: 1.7 }}>{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ VALUES — Bento grid with gradient borders ═══ */}
        <section style={{ padding: isMobile ? "60px 20px 80px" : "80px 48px 120px", background: E.bgSoft }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: E.accent, letterSpacing: 1.5 }}>VALUES</span>
              <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 800, marginTop: 10, letterSpacing: "-0.025em" }}>
                What drives us forward.
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: 20,
            }}>
              {values.map((v, i) => (
                <div key={v.title} className="ev-value-card" style={{
                  gridColumn: !isMobile && v.size === "wide" ? "span 2" : undefined,
                  padding: 2,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, ${E.gradient1}33, ${E.gradient2}33)`,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`;
                    e.currentTarget.style.boxShadow = `0 12px 40px ${E.accentGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${E.gradient1}33, ${E.gradient2}33)`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    background: E.bg,
                    borderRadius: 16,
                    padding: isMobile ? 28 : 36,
                    height: "100%",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                      <span style={{ fontSize: 28 }}>{v.icon}</span>
                      <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 700 }}>{v.title}</h3>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: E.textMuted, lineHeight: 1.7, maxWidth: v.size === "wide" && !isMobile ? 600 : undefined }}>{v.desc}</p>
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
