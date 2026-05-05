"use client";

/**
 * STUDIO NOIR — About Page
 *
 * Design language: Cinematic, editorial. Horizontal scroll story. Clip-path reveals.
 * Char-by-char heading. Parallax depth. Zero generic card grids.
 *
 * Layout: Full-bleed hero with parallax ghost text → Horizontal scroll timeline →
 * Full-height philosophy panels (split clip reveal) → Vertical team accordion → Stats ticker
 *
 * References: unseen.co, obys.agency, dennissnellenberg.com
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SNLayout, C, F_HEAD, F_BODY, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: "2018", title: "THE EXIT", body: "Left agency life. Two designers, one refusal to compromise. The industry rewarded volume. We wanted craft." },
  { year: "2020", title: "FIRST RECOGNITION", body: "Awwwards SOTD for Meridian. Proved that restraint sells. Three more projects followed that quarter." },
  { year: "2022", title: "THE PIVOT", body: "Stopped taking on more than four projects at once. Revenue dropped. Quality didn't. Clients noticed." },
  { year: "2024", title: "TODAY", body: "47 projects. 12 awards. Still three people. Still no account managers. Still no compromise." },
];

const philosophy = [
  { marker: "I", title: "RESTRAINT\nOVER EXCESS", body: "We remove until only the essential remains. Every element earns its place on the screen. Decoration is debt — clarity is currency." },
  { marker: "II", title: "CRAFT\nOVER SPEED", body: "We don't rush. Good work takes as long as it takes. The deadline is quality, not the calendar." },
  { marker: "III", title: "HONESTY\nOVER TRENDS", body: "We design for the brand, not for the portfolio. Trends expire. Craft endures. We build things that outlast their era." },
];

const team = [
  { name: "ALEX MERCER", role: "Creative Director", years: "15 years", brief: "Pushes pixels into places they've never been. Formerly at Pentagram." },
  { name: "SORA TANAKA", role: "Lead Developer", years: "12 years", brief: "Full-stack architect. Thinks in systems, not pages. Ex-Google." },
  { name: "MAYA CHEN", role: "Brand Strategist", years: "10 years", brief: "Turns business problems into visual solutions. Ex-Collins." },
];

export default function StudioNoirAbout() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalInnerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero: char-by-char reveal
      const heading = heroHeadingRef.current;
      if (heading) {
        const split = new SplitType(heading, { types: "chars" });
        gsap.set(split.chars || [], { y: "110%", opacity: 0 });
        gsap.to(split.chars || [], {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.02,
          ease: "power3.out",
          delay: 0.4,
        });
      }

      // Hero subtitle line-draw
      const subtitle = el.querySelector(".sn-subtitle");
      if (subtitle) {
        gsap.fromTo(subtitle, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.inOut", delay: 1.2,
        });
      }

      // Parallax ghost text
      const ghost = el.querySelector(".sn-ghost");
      if (ghost) {
        gsap.to(ghost, {
          y: -200,
          ease: "none",
          scrollTrigger: { trigger: ghost, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      }

      // Horizontal scroll section (desktop only)
      if (!isMobile) {
        const hSection = horizontalRef.current;
        const hInner = horizontalInnerRef.current;
        if (hSection && hInner) {
          const totalScroll = hInner.scrollWidth - window.innerWidth;
          gsap.to(hInner, {
            x: -totalScroll,
            ease: "none",
            scrollTrigger: {
              trigger: hSection,
              start: "top top",
              end: `+=${totalScroll}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          // Timeline items clip reveal as they enter view
          hInner.querySelectorAll(".sn-timeline-item").forEach((item) => {
            gsap.fromTo(item, { clipPath: "inset(0 0 0 100%)" }, {
              clipPath: "inset(0 0 0 0%)",
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: item,
                containerAnimation: gsap.getById?.("hScroll") || undefined,
                start: "left 80%",
                end: "left 40%",
                scrub: 1,
                horizontal: true,
              },
            });
          });
        }
      }

      // Philosophy panels: split clip reveal
      el.querySelectorAll(".sn-phil-panel").forEach((panel, i) => {
        const left = panel.querySelector(".sn-phil-left");
        const right = panel.querySelector(".sn-phil-right");

        if (left) {
          gsap.fromTo(left, { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: panel, start: "top 75%", once: true },
          });
        }
        if (right) {
          gsap.fromTo(right, { x: 60, opacity: 0 }, {
            x: 0, opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 75%", once: true },
          });
        }
      });

      // Team accordion: stagger line draws
      el.querySelectorAll(".sn-team-row").forEach((row, i) => {
        const line = row.querySelector(".sn-team-line");
        const content = row.querySelector(".sn-team-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
          tl.to(line, { scaleX: 1, duration: 0.6, ease: "power2.inOut" });
        }
        if (content) {
          gsap.set(content, { opacity: 0, x: -30 });
          tl.to(content, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");
        }
      });

      // Stats counter animation
      el.querySelectorAll(".sn-stat-num").forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: stat, start: "top 85%", once: true },
          onUpdate: () => {
            (stat as HTMLElement).textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <SNLayout current="About">
      <div ref={mainRef}>
        {/* ═══ HERO ═══ */}
        <section style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "120px 20px 80px" : "0 80px",
        }}>
          {/* Ghost watermark — parallax */}
          <span className="sn-ghost" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: F_HEAD,
            fontSize: "clamp(300px, 40vw, 600px)",
            color: C.text,
            opacity: 0.015,
            letterSpacing: "0.05em",
            userSelect: "none",
            pointerEvents: "none",
          }}>
            N
          </span>

          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{
              fontFamily: F_BODY,
              fontSize: 11,
              letterSpacing: 6,
              color: C.accent,
              fontWeight: 500,
              display: "block",
              marginBottom: 40,
            }}>
              THE STUDIO
            </span>

            <h1 ref={heroHeadingRef} style={{
              fontFamily: F_HEAD,
              fontSize: isMobile ? "56px" : "clamp(80px, 12vw, 180px)",
              lineHeight: 0.85,
              letterSpacing: "0.02em",
              overflow: "hidden",
              maxWidth: 1000,
              textWrap: "balance",
            }}>
              WE BELIEVE IN THE{"\u00A0"}POWER OF{"\u00A0"}RESTRAINT
            </h1>

            <div className="sn-subtitle" style={{
              marginTop: 48,
              maxWidth: 520,
              overflow: "hidden",
            }}>
              <p style={{
                fontFamily: F_BODY,
                fontSize: 17,
                color: C.dim,
                lineHeight: 1.85,
              }}>
                Studio Noir was founded on a single principle: good design is knowing what to remove, not what to add. We craft digital experiences for brands that demand craft over convention.
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ fontFamily: F_BODY, fontSize: 9, letterSpacing: 4, color: C.muted }}>SCROLL</span>
            <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.accent}, transparent)` }} />
          </div>
        </section>

        {/* ═══ HORIZONTAL SCROLL TIMELINE ═══ */}
        {isMobile ? (
          // Mobile: vertical timeline
          <section style={{ padding: "80px 20px", background: C.bgAlt }}>
            <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 48 }}>OUR JOURNEY</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, borderLeft: `1px solid ${C.border}`, paddingLeft: 32 }}>
              {timeline.map((item) => (
                <div key={item.year}>
                  <span style={{ fontFamily: F_HEAD, fontSize: 64, color: C.accent, opacity: 0.15, display: "block", lineHeight: 1 }}>{item.year}</span>
                  <h3 style={{ fontFamily: F_HEAD, fontSize: 28, letterSpacing: "0.06em", marginTop: 8 }}>{item.title}</h3>
                  <p style={{ fontFamily: F_BODY, fontSize: 15, color: C.dim, lineHeight: 1.75, marginTop: 12 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section ref={horizontalRef} style={{ overflow: "hidden", background: C.bgAlt }}>
            <div ref={horizontalInnerRef} style={{
              display: "flex",
              height: "100vh",
              alignItems: "center",
              width: "fit-content",
              paddingLeft: 80,
              paddingRight: 80,
              gap: 0,
            }}>
              {/* Intro panel */}
              <div style={{ minWidth: 400, paddingRight: 120, flexShrink: 0 }}>
                <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent }}>OUR JOURNEY</span>
                <h2 style={{ fontFamily: F_HEAD, fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.9, marginTop: 16, letterSpacing: "0.02em" }}>
                  FOUR MOMENTS THAT DEFINED US.
                </h2>
              </div>

              {/* Timeline panels */}
              {timeline.map((item, i) => (
                <div key={item.year} className="sn-timeline-item" style={{
                  minWidth: 500,
                  height: "60vh",
                  marginRight: i < timeline.length - 1 ? 2 : 0,
                  background: C.bgWarm,
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "48px 48px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Large year watermark */}
                  <span style={{
                    position: "absolute",
                    top: -20,
                    right: -10,
                    fontFamily: F_HEAD,
                    fontSize: 200,
                    color: C.accent,
                    opacity: 0.04,
                    lineHeight: 1,
                    userSelect: "none",
                  }}>
                    {item.year}
                  </span>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.accent, letterSpacing: 3 }}>{item.year}</span>
                    <h3 style={{ fontFamily: F_HEAD, fontSize: 44, letterSpacing: "0.05em", marginTop: 8, lineHeight: 1 }}>{item.title}</h3>
                  </div>

                  <p style={{ fontFamily: F_BODY, fontSize: 16, color: C.dim, lineHeight: 1.8, maxWidth: 380, position: "relative", zIndex: 1 }}>
                    {item.body}
                  </p>

                  {/* Progress indicator */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: C.border }}>
                    <div style={{ width: `${((i + 1) / timeline.length) * 100}%`, height: "100%", background: C.accent }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══ PHILOSOPHY — Split clip reveal panels ═══ */}
        <section style={{ padding: isMobile ? "80px 0" : "160px 0" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "0 20px" : "0 80px" }}>
            <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 80 }}>WHAT WE BELIEVE</span>

            {philosophy.map((item, i) => (
              <div key={item.marker} className="sn-phil-panel" style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                minHeight: isMobile ? "auto" : "50vh",
                alignItems: "center",
                marginBottom: i < philosophy.length - 1 ? (isMobile ? 60 : 120) : 0,
                gap: isMobile ? 24 : 0,
              }}>
                {/* Left: large typographic statement */}
                <div className="sn-phil-left" style={{
                  background: C.bgWarm,
                  padding: isMobile ? "40px 24px" : "80px 64px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: isMobile ? 200 : 360,
                }}>
                  {/* Roman numeral watermark */}
                  <span style={{
                    position: "absolute",
                    top: isMobile ? 16 : 24,
                    right: isMobile ? 16 : 32,
                    fontFamily: F_HEAD,
                    fontSize: isMobile ? 80 : 140,
                    color: C.accent,
                    opacity: 0.06,
                    lineHeight: 1,
                  }}>
                    {item.marker}
                  </span>
                  <h3 style={{
                    fontFamily: F_HEAD,
                    fontSize: isMobile ? "32px" : "clamp(40px, 5vw, 72px)",
                    letterSpacing: "0.04em",
                    lineHeight: 0.95,
                    whiteSpace: "pre-line",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {item.title}
                  </h3>
                </div>

                {/* Right: body text */}
                <div className="sn-phil-right" style={{
                  padding: isMobile ? "0" : "0 64px",
                }}>
                  <p style={{
                    fontFamily: F_BODY,
                    fontSize: isMobile ? 16 : 18,
                    color: C.dim,
                    lineHeight: 1.85,
                    maxWidth: 440,
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TEAM — Accordion row reveals (not cards) ═══ */}
        <section style={{ padding: isMobile ? "60px 20px 80px" : "120px 80px 160px", background: C.bgAlt }}>
          <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 64 }}>THE PEOPLE</span>

          {team.map((person, i) => (
            <div key={person.name} className="sn-team-row" style={{ marginBottom: i < team.length - 1 ? 0 : 0 }}>
              <div className="sn-team-line" style={{ height: 1, background: C.border, marginBottom: isMobile ? 24 : 36 }} />
              <div className="sn-team-content" style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr 1fr",
                gap: isMobile ? 16 : 48,
                alignItems: "baseline",
                paddingBottom: isMobile ? 32 : 56,
              }}>
                {/* Name */}
                <h3 style={{
                  fontFamily: F_HEAD,
                  fontSize: isMobile ? "32px" : "clamp(36px, 4vw, 56px)",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}>
                  {person.name}
                </h3>

                {/* Brief */}
                <p style={{
                  fontFamily: F_BODY,
                  fontSize: 16,
                  color: C.dim,
                  lineHeight: 1.75,
                  maxWidth: 400,
                }}>
                  {person.brief}
                </p>

                {/* Role + years */}
                <div style={{ textAlign: isMobile ? "left" : "right" }}>
                  <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.accent, letterSpacing: 2, display: "block" }}>{person.role.toUpperCase()}</span>
                  <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.muted, display: "block", marginTop: 4 }}>{person.years}</span>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: 1, background: C.border }} />
        </section>

        {/* ═══ STATS — Animated counter ticker ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "140px 80px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 32 : 0,
            maxWidth: 1200,
            margin: "0 auto",
            textAlign: "center",
          }}>
            {[
              { value: 47, suffix: "+", label: "PROJECTS DELIVERED" },
              { value: 12, suffix: "", label: "AWARDS WON" },
              { value: 8, suffix: "", label: "YEARS RUNNING" },
              { value: 3, suffix: "", label: "PEOPLE. THAT'S IT." },
            ].map((stat) => (
              <div key={stat.label} style={{
                borderRight: !isMobile ? `1px solid ${C.border}` : "none",
                padding: isMobile ? "0" : "0 40px",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                  <span className="sn-stat-num" data-value={stat.value} style={{
                    fontFamily: F_HEAD,
                    fontSize: isMobile ? "56px" : "clamp(64px, 8vw, 100px)",
                    color: C.accent,
                    lineHeight: 1,
                  }}>
                    0
                  </span>
                  {stat.suffix && (
                    <span style={{ fontFamily: F_HEAD, fontSize: isMobile ? "36px" : "clamp(40px, 5vw, 60px)", color: C.accent, lineHeight: 1 }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span style={{
                  fontFamily: F_BODY,
                  fontSize: 10,
                  letterSpacing: 3,
                  color: C.muted,
                  display: "block",
                  marginTop: 12,
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SNLayout>
  );
}
