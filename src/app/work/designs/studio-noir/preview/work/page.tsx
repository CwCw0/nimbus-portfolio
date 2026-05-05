"use client";

/**
 * STUDIO NOIR — Work Page
 *
 * Design language: Cinematic editorial. Hover-driven reveals.
 * Full-bleed project panels with clip-path mask on scroll.
 * Each project expands into a horizontal case study strip on hover.
 *
 * Layout: Hero with char reveal → Full-height project panels (alternating clip directions)
 * → Horizontal scrolling category strip → CTA
 *
 * NOT: vertical list with fade-up (that's what every other template does)
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SNLayout, C, F_HEAD, F_BODY, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { num: "01", title: "MERIDIAN", cat: "BRAND IDENTITY", year: "2026", desc: "Complete visual identity system for a luxury real estate developer. Logo, typography, colour system, and full brand guidelines.", color: "#C9A55A", scope: ["Strategy", "Identity", "Guidelines"] },
  { num: "02", title: "ATLAS", cat: "WEB PLATFORM", year: "2025", desc: "SaaS platform redesign for a mapping analytics company. 40+ pages, design system, and component library.", color: "#7B9EA8", scope: ["UX/UI", "Design System", "Development"] },
  { num: "03", title: "ONYX", cat: "E-COMMERCE", year: "2026", desc: "Luxury jewellery e-commerce with 3D product viewers, custom checkout flow, and editorial content pages.", color: "#A87B7B", scope: ["Art Direction", "E-Commerce", "3D"] },
  { num: "04", title: "PRISM", cat: "CAMPAIGN", year: "2025", desc: "Award-winning campaign microsite for a fashion label's seasonal launch. WebGL, scroll-driven storytelling.", color: "#8BA87B", scope: ["WebGL", "Animation", "Storytelling"] },
  { num: "05", title: "ECHO", cat: "PRODUCT DESIGN", year: "2026", desc: "Mobile app design for a meditation and journalling platform. iOS + Android, 60+ screens, full design system.", color: "#9B7BC8", scope: ["Mobile", "UX Research", "Prototyping"] },
  { num: "06", title: "VERTEX", cat: "ARCHITECTURE", year: "2024", desc: "Portfolio website for an architecture firm. Full-bleed photography, horizontal scroll case studies, parallax.", color: "#8BA8A0", scope: ["Photography", "Animation", "Parallax"] },
];

const categories = ["ALL", "BRAND", "WEB", "E-COMMERCE", "CAMPAIGN", "PRODUCT", "ARCHITECTURE"];

export default function StudioNoirWork() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero char reveal
      const heading = headingRef.current;
      if (heading) {
        const split = new SplitType(heading, { types: "chars" });
        gsap.set(split.chars || [], { y: "110%", opacity: 0 });
        gsap.to(split.chars || [], {
          y: "0%", opacity: 1, duration: 0.8, stagger: 0.018, ease: "power3.out", delay: 0.3,
        });
      }

      // Project panels — alternating clip reveal directions
      el.querySelectorAll(".sn-project-panel").forEach((panel, i) => {
        const direction = i % 2 === 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
        const revealed = "inset(0 0 0 0)";

        gsap.fromTo(panel, { clipPath: direction }, {
          clipPath: revealed,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: panel, start: "top 80%", once: true },
        });
      });

      // Project number counters
      el.querySelectorAll(".sn-proj-num").forEach((num, i) => {
        gsap.fromTo(num, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, delay: 0.3 + i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: num, start: "top 88%", once: true },
        });
      });

      // Scope tags stagger
      el.querySelectorAll(".sn-scope-group").forEach((group) => {
        const tags = group.querySelectorAll(".sn-scope-tag");
        gsap.fromTo(tags, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <SNLayout current="Work">
      <div ref={mainRef}>
        {/* ═══ HERO ═══ */}
        <section style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "120px 20px 60px" : "0 80px 80px",
          position: "relative",
        }}>
          {/* Category strip - horizontal scroll */}
          <div style={{
            position: "absolute",
            top: isMobile ? 100 : 140,
            left: isMobile ? 20 : 80,
            display: "flex",
            gap: 24,
            overflow: "hidden",
          }}>
            {categories.map((cat, i) => (
              <span key={cat} style={{
                fontFamily: F_BODY,
                fontSize: 10,
                letterSpacing: 3,
                color: i === 0 ? C.accent : C.muted,
                cursor: "pointer",
                transition: "color 0.3s",
                whiteSpace: "nowrap",
              }}>
                {cat}
              </span>
            ))}
          </div>

          <div>
            <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, fontWeight: 500, display: "block", marginBottom: 32 }}>
              SELECTED WORK
            </span>
            <h1 ref={headingRef} style={{
              fontFamily: F_HEAD,
              fontSize: isMobile ? "52px" : "clamp(72px, 10vw, 160px)",
              lineHeight: 0.85,
              letterSpacing: "0.02em",
              overflow: "hidden",
              maxWidth: 900,
            }}>
              SIX PROJECTS. ZERO FILLER.
            </h1>
            <p style={{
              fontFamily: F_BODY,
              fontSize: 16,
              color: C.dim,
              marginTop: 28,
              maxWidth: 440,
              lineHeight: 1.8,
            }}>
              Each one chosen because it pushed our craft forward. Hover to explore.
            </p>
          </div>
        </section>

        {/* ═══ PROJECT PANELS — Full-width, alternating clip reveals ═══ */}
        <section style={{ padding: isMobile ? "40px 0" : "80px 0" }}>
          {projects.map((proj, i) => (
            <div
              key={proj.num}
              className="sn-project-panel"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : i % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr",
                minHeight: isMobile ? "auto" : "45vh",
                background: hoveredProject === proj.num ? C.bgWarm : C.bgAlt,
                borderTop: `1px solid ${C.border}`,
                transition: "background 0.5s",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredProject(proj.num)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image / color block side */}
              <div style={{
                background: proj.color + "08",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isMobile ? "48px 24px" : "64px",
                order: isMobile ? 0 : (i % 2 === 0 ? 0 : 1),
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Large project number */}
                <span className="sn-proj-num" style={{
                  fontFamily: F_HEAD,
                  fontSize: isMobile ? "100px" : "clamp(120px, 15vw, 220px)",
                  color: proj.color,
                  opacity: hoveredProject === proj.num ? 0.2 : 0.06,
                  transition: "opacity 0.5s",
                  lineHeight: 1,
                  userSelect: "none",
                }}>
                  {proj.num}
                </span>

                {/* Hover reveal: scope tags */}
                <div className="sn-scope-group" style={{
                  position: "absolute",
                  bottom: isMobile ? 20 : 32,
                  left: isMobile ? 24 : 48,
                  display: "flex",
                  gap: 8,
                  opacity: hoveredProject === proj.num ? 1 : 0,
                  transition: "opacity 0.4s",
                }}>
                  {proj.scope.map((tag) => (
                    <span key={tag} className="sn-scope-tag" style={{
                      padding: "6px 14px",
                      border: `1px solid ${proj.color}44`,
                      fontFamily: F_BODY,
                      fontSize: 10,
                      letterSpacing: 2,
                      color: proj.color,
                    }}>
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content side */}
              <div style={{
                padding: isMobile ? "32px 24px 48px" : "64px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                order: isMobile ? 1 : (i % 2 === 0 ? 1 : 0),
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted, letterSpacing: 3 }}>{proj.cat}</span>
                  <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted }}>—</span>
                  <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted }}>{proj.year}</span>
                </div>

                <h2 style={{
                  fontFamily: F_HEAD,
                  fontSize: isMobile ? "40px" : "clamp(48px, 6vw, 80px)",
                  letterSpacing: "0.04em",
                  lineHeight: 0.95,
                  color: hoveredProject === proj.num ? proj.color : C.text,
                  transition: "color 0.4s",
                }}>
                  {proj.title}
                </h2>

                <p style={{
                  fontFamily: F_BODY,
                  fontSize: 15,
                  color: C.dim,
                  lineHeight: 1.75,
                  marginTop: 20,
                  maxWidth: 400,
                }}>
                  {proj.desc}
                </p>

                {/* View arrow */}
                <div style={{
                  marginTop: 32,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: hoveredProject === proj.num ? 1 : 0,
                  transform: hoveredProject === proj.num ? "translateX(0)" : "translateX(-10px)",
                  transition: "all 0.4s",
                }}>
                  <span style={{ fontFamily: F_BODY, fontSize: 12, letterSpacing: 3, color: C.accent }}>VIEW PROJECT</span>
                  <span style={{ fontSize: 16, color: C.accent }}>↗</span>
                </div>
              </div>
            </div>
          ))}
          {/* Final border */}
          <div style={{ height: 1, background: C.border }} />
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{
          padding: isMobile ? "100px 20px" : "180px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Ghost text */}
          <span style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: F_HEAD,
            fontSize: "clamp(200px, 30vw, 500px)",
            color: C.accent,
            opacity: 0.03,
            letterSpacing: "0.05em",
            userSelect: "none",
          }}>
            ?
          </span>

          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 32 }}>
              READY?
            </span>
            <h2 style={{
              fontFamily: F_HEAD,
              fontSize: isMobile ? "48px" : "clamp(64px, 9vw, 140px)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
            }}>
              YOUR PROJECT COULD BE<br /><span style={{ color: C.accent }}>NUMBER SEVEN.</span>
            </h2>
            <a href="/work/designs/studio-noir/preview/contact" style={{
              display: "inline-block",
              marginTop: 48,
              fontFamily: F_HEAD,
              fontSize: 16,
              letterSpacing: 5,
              padding: "20px 52px",
              border: `1px solid ${C.accent}`,
              color: C.accent,
              textDecoration: "none",
              transition: "all 0.3s",
              position: "relative",
              overflow: "hidden",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
            >
              START A CONVERSATION ↗
            </a>
          </div>
        </section>
      </div>
    </SNLayout>
  );
}
