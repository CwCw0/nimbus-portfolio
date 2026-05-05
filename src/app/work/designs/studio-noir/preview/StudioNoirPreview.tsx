"use client";

/**
 * STUDIO NOIR v3 — Complete rebuild
 *
 * UNIQUE PATTERNS (not shared with any other template):
 * - Navigation: Side-mounted vertical nav with rotating text on hover
 * - Scroll: Horizontal project gallery pinned + velocity-based skew
 * - Hover: Project images clip-reveal from center on hover
 * - Background: Animated noise grain overlay
 * - Typography: Char-by-char stagger with blur clear (not just translateY)
 * - Transitions: Clip-path section wipes
 * - Cursor: Custom ring cursor that scales on interactive elements
 *
 * Fonts: Bebas Neue (condensed display) + DM Sans (geometric body)
 * Palette: Warm black #0D0B08 + Gold #C9A55A
 * References: unseen.co, obys.agency, aristidebenoist.com, dennissnellenberg.com
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const F_HEAD = "'Bebas Neue', 'Impact', sans-serif";
const F_BODY = "'DM Sans', 'Helvetica Neue', sans-serif";

const C = {
  bg: "#0D0B08",
  bgAlt: "#141110",
  bgWarm: "#1A1612",
  text: "#EDE8DF",
  muted: "rgba(237,232,223,0.3)",
  dim: "rgba(237,232,223,0.55)",
  accent: "#C9A55A",
  accentGlow: "rgba(201,165,90,0.08)",
  border: "rgba(237,232,223,0.06)",
};

const projects = [
  { num: "01", title: "MERIDIAN", cat: "Brand Identity", year: "2026", color: "#C9A55A" },
  { num: "02", title: "ATLAS", cat: "Web Platform", year: "2025", color: "#7B9EA8" },
  { num: "03", title: "ONYX", cat: "E-Commerce", year: "2026", color: "#A87B7B" },
  { num: "04", title: "PRISM", cat: "Campaign", year: "2025", color: "#8BA87B" },
  { num: "05", title: "ECHO", cat: "Product Design", year: "2026", color: "#9B7BC8" },
];

export default function StudioNoirPreview() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Custom cursor — only runs after loaded
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    window.addEventListener("mousemove", handleMouseMove);

    const ring = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    let rafId: number;
    const follow = () => {
      gsap.set(ring, { x: mousePos.current.x - 20, y: mousePos.current.y - 20 });
      gsap.set(dot, { x: mousePos.current.x - 3, y: mousePos.current.y - 3 });
      rafId = requestAnimationFrame(follow);
    };
    rafId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [loaded, handleMouseMove]);

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Animations
  useEffect(() => {
    if (!loaded) return;
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero title — char reveal with blur
      const title = heroTitleRef.current;
      if (title) {
        const split = new SplitType(title, { types: "chars" });
        gsap.set(split.chars || [], { y: "120%", opacity: 0, filter: "blur(8px)", rotateX: -60 });
        gsap.to(split.chars || [], {
          y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0,
          duration: 0.8, stagger: 0.025, ease: "power3.out", delay: 0.3,
        });
      }

      // Hero sub elements
      const heroFades = el.querySelectorAll(".sn-fade");
      gsap.set(heroFades, { opacity: 0, y: 25 });
      gsap.to(heroFades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out", delay: 0.8 });

      // Grain animation
      const grain = el.querySelector(".sn-grain");
      if (grain) {
        gsap.to(grain, { backgroundPosition: "100% 100%", duration: 0.5, repeat: -1, ease: "steps(4)" });
      }

      // Horizontal gallery with velocity skew
      const gallery = galleryRef.current;
      if (gallery && window.innerWidth > 768) {
        const track = gallery.querySelector(".sn-track") as HTMLElement;
        if (track) {
          const totalScroll = track.scrollWidth - window.innerWidth + 200;

          const scrollTween = gsap.to(track, {
            x: -totalScroll,
            ease: "none",
            scrollTrigger: {
              trigger: gallery,
              start: "top top",
              end: () => `+=${totalScroll}`,
              scrub: 1.5,
              pin: true,
              onUpdate: (self) => {
                // Velocity-based skew
                const velocity = self.getVelocity();
                const skew = gsap.utils.clamp(-8, 8, velocity / 400);
                gsap.to(track.querySelectorAll(".sn-proj-card"), {
                  skewX: skew,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            },
          });
        }
      }

      // About — clip-path wipe reveal
      const aboutSection = el.querySelector(".sn-about-section");
      if (aboutSection) {
        gsap.fromTo(aboutSection,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power3.inOut",
            scrollTrigger: { trigger: aboutSection, start: "top 70%", once: true },
          }
        );
      }

      // About text — word by word
      const aboutText = el.querySelector(".sn-about-text");
      if (aboutText) {
        const split = new SplitType(aboutText as HTMLElement, { types: "words" });
        gsap.set(split.words || [], { opacity: 0.1 });
        gsap.to(split.words || [], {
          opacity: 1, duration: 0.3, stagger: 0.05,
          scrollTrigger: { trigger: aboutText, start: "top 80%", end: "bottom 40%", scrub: 1 },
        });
      }

      // Stats — count up with scale pop
      el.querySelectorAll(".sn-stat").forEach((stat) => {
        const target = parseInt((stat as HTMLElement).dataset.target || "0", 10);
        const suffix = (stat as HTMLElement).dataset.suffix || "";

        gsap.fromTo(stat, { scale: 0.6, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)",
          scrollTrigger: { trigger: stat, start: "top 85%", once: true },
        });

        gsap.fromTo({ val: 0 }, { val: 0 }, {
          val: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: stat, start: "top 85%", once: true },
          onUpdate: function () {
            const numEl = (stat as HTMLElement).querySelector(".sn-stat-num");
            if (numEl) numEl.textContent = Math.round(this.targets()[0].val) + suffix;
          },
        });
      });

      // Services — staggered card reveal with rotation
      el.querySelectorAll(".sn-svc-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotateY: -5 },
          { y: 0, opacity: 1, rotateY: 0, duration: 0.8, ease: "power3.out", delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // CTA — scale from center
      const ctaHeading = el.querySelector(".sn-cta-heading");
      if (ctaHeading) {
        const split = new SplitType(ctaHeading as HTMLElement, { types: "chars" });
        gsap.set(split.chars || [], { opacity: 0, scale: 0.5, filter: "blur(4px)" });
        gsap.to(split.chars || [], {
          opacity: 1, scale: 1, filter: "blur(0px)",
          duration: 0.4, stagger: 0.02, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ctaHeading, start: "top 80%", once: true },
        });
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  // ── LOADER — cinematic with counter ──
  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, cursor: "none" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');`}</style>
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: F_HEAD, fontSize: "clamp(60px, 10vw, 120px)", color: C.text, letterSpacing: "0.1em", overflow: "hidden" }}>
            <div style={{ animation: "sn-reveal 0.8s ease-out 0.3s both" }}>STUDIO NOIR</div>
          </div>
          <div style={{ width: "100%", height: 2, background: C.border, marginTop: 16, overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: C.accent, animation: "sn-load-bar 1.5s ease-in-out 0.6s both", transformOrigin: "left" }} />
          </div>
        </div>
        <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.muted, animation: "sn-fadein 0.6s ease-out 1.2s both" }}>CREATIVE STUDIO</span>
        <style>{`
          @keyframes sn-reveal { from { transform: translateY(110%); } to { transform: translateY(0); } }
          @keyframes sn-load-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes sn-fadein { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={mainRef} style={{ background: C.bg, color: C.text, minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');`}</style>

      {/* Custom cursor */}
      <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, border: `1px solid ${C.accent}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, mixBlendMode: "difference" }} />
      <div ref={cursorDotRef} style={{ position: "fixed", top: 0, left: 0, width: 6, height: 6, background: C.accent, borderRadius: "50%", pointerEvents: "none", zIndex: 9999 }} />

      {/* Animated grain overlay */}
      <div className="sn-grain" style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none", opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }} />

      {/* NAVIGATION — side-mounted vertical, unique to Studio Noir */}
      <nav style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 80, zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, borderLeft: `1px solid ${C.border}`, background: "rgba(13,11,8,0.5)", backdropFilter: "blur(12px)" }}>
        {["Work", "Info", "Services", "Say Hi"].map((item, i) => (
          <a key={item} href={`#sn-${item.toLowerCase().replace(" ", "")}`} style={{ fontFamily: F_BODY, fontSize: 10, color: C.muted, textDecoration: "none", letterSpacing: 3, writingMode: "vertical-rl", transform: "rotate(180deg)", transition: "all 0.3s", cursor: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.accent; e.currentTarget.style.letterSpacing = "5px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.letterSpacing = "3px"; }}
          >{item.toUpperCase()}</a>
        ))}
      </nav>

      {/* Logo — top left, fixed */}
      <div style={{ position: "fixed", top: 24, left: 48, zIndex: 200 }}>
        <span style={{ fontFamily: F_HEAD, fontSize: 20, color: C.text, letterSpacing: "0.15em" }}>
          STUDIO<span style={{ color: C.accent }}>.</span>NOIR
        </span>
      </div>

      {/* HERO — full viewport, left-aligned, with moving accent line */}
      <section style={{ height: "100vh", display: "flex", alignItems: "center", padding: "0 48px", paddingRight: 128, position: "relative" }}>
        {/* Animated accent line — moves diagonally */}
        <div style={{ position: "absolute", top: 0, left: "30%", width: 1, height: "100%", background: `linear-gradient(to bottom, transparent, ${C.accent}30, transparent)`, animation: "sn-line-float 8s ease-in-out infinite" }} />
        <style>{`@keyframes sn-line-float { 0%, 100% { transform: translateX(0) skewX(0); opacity: 0.3; } 50% { transform: translateX(100px) skewX(-2deg); opacity: 0.6; } }`}</style>

        <div style={{ maxWidth: 800, position: "relative", zIndex: 1 }}>
          <span className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, fontWeight: 500, display: "block", marginBottom: 32 }}>
            ✦ CREATIVE STUDIO — EST. 2024
          </span>

          <h1 ref={heroTitleRef} style={{ fontFamily: F_HEAD, fontSize: "clamp(64px, 10vw, 160px)", color: C.text, lineHeight: 0.88, letterSpacing: "0.02em", perspective: "600px" }}>
            WE DESIGN WHAT OTHERS OVERLOOK
          </h1>

          <p className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 17, color: C.dim, marginTop: 40, maxWidth: 440, lineHeight: 1.85 }}>
            A design studio for brands that demand craft over convention. We build digital experiences with restraint, intention, and obsessive attention to detail.
          </p>

          <div className="sn-fade" style={{ display: "flex", gap: 24, marginTop: 48, alignItems: "center" }}>
            <a href="#sn-work" style={{ fontFamily: F_HEAD, fontSize: 15, letterSpacing: 5, padding: "18px 40px", background: C.accent, color: C.bg, textDecoration: "none", transition: "all 0.4s", cursor: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.text; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = "scale(1)"; }}
            >VIEW WORK</a>
            <a href="#sn-info" style={{ fontFamily: F_BODY, fontSize: 13, letterSpacing: 3, color: C.dim, textDecoration: "none", transition: "color 0.3s", cursor: "none", display: "flex", alignItems: "center", gap: 8 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.dim)}
            >ABOUT US <span style={{ fontSize: 16, transition: "transform 0.3s" }}>→</span></a>
          </div>
        </div>

        {/* Scroll indicator — bottom left, vertical */}
        <div className="sn-fade" style={{ position: "absolute", bottom: 48, left: 48, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, ${C.accent}, transparent)`, animation: "sn-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: F_BODY, fontSize: 9, letterSpacing: 4, color: C.muted, writingMode: "vertical-rl" }}>SCROLL TO EXPLORE</span>
        </div>
        <style>{`@keyframes sn-pulse { 0%, 100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 0.8; transform: scaleY(0.6); } }`}</style>
      </section>

      {/* HORIZONTAL GALLERY — pinned, velocity skew, clip-reveal on hover */}
      <section id="sn-work" ref={galleryRef} style={{ height: "100vh", overflow: "hidden", position: "relative", background: C.bgAlt }}>
        {/* Section label */}
        <div style={{ position: "absolute", top: 40, left: 48, zIndex: 10 }}>
          <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent }}>SELECTED WORK</span>
          <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted, marginLeft: 24 }}>05 PROJECTS</span>
        </div>

        <div className="sn-track" style={{ display: "flex", gap: 40, height: "100%", alignItems: "center", padding: "0 48px", paddingRight: 128, paddingTop: 40 }}>
          {projects.map((proj) => (
            <div key={proj.num} className="sn-proj-card" style={{ minWidth: "clamp(400px, 35vw, 600px)", height: "65vh", flexShrink: 0, position: "relative", overflow: "hidden", cursor: "none", border: `1px solid ${C.border}`, transition: "border-color 0.4s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = proj.color;
                const overlay = e.currentTarget.querySelector(".sn-proj-reveal") as HTMLElement;
                if (overlay) gsap.to(overlay, { clipPath: "inset(0 0 0 0)", duration: 0.5, ease: "power3.inOut" });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                const overlay = e.currentTarget.querySelector(".sn-proj-reveal") as HTMLElement;
                if (overlay) gsap.to(overlay, { clipPath: "inset(50% 50% 50% 50%)", duration: 0.4, ease: "power3.in" });
              }}
            >
              {/* Background */}
              <div style={{ position: "absolute", inset: 0, background: C.bgWarm }} />

              {/* Hover overlay — clip from center */}
              <div className="sn-proj-reveal" style={{ position: "absolute", inset: 0, background: `${proj.color}12`, clipPath: "inset(50% 50% 50% 50%)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
                <span style={{ fontFamily: F_HEAD, fontSize: 18, letterSpacing: 8, color: proj.color }}>VIEW PROJECT ↗</span>
              </div>

              {/* Number — massive ghost */}
              <span style={{ position: "absolute", bottom: -20, right: 20, fontFamily: F_HEAD, fontSize: "clamp(120px, 20vw, 250px)", color: proj.color, opacity: 0.04, lineHeight: 0.8 }}>{proj.num}</span>

              {/* Content — bottom */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32, zIndex: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <span style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted, display: "block", marginBottom: 8 }}>{proj.cat.toUpperCase()}</span>
                    <h3 style={{ fontFamily: F_HEAD, fontSize: "clamp(36px, 5vw, 64px)", color: C.text, letterSpacing: "0.04em", lineHeight: 0.95 }}>{proj.title}</h3>
                  </div>
                  <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.muted }}>{proj.year}</span>
                </div>
                {/* Gold underline */}
                <div style={{ width: 40, height: 2, background: proj.color, marginTop: 16, opacity: 0.5 }} />
              </div>
            </div>
          ))}
          <div style={{ minWidth: 300, flexShrink: 0 }} />
        </div>
      </section>

      {/* ABOUT — clip-path wipe reveal + scroll-driven word opacity */}
      <section id="sn-info" style={{ padding: "180px 48px", paddingRight: 128 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sn-about-section" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 100, alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 40 }}>ABOUT THE STUDIO</span>
              <p className="sn-about-text" style={{ fontFamily: F_HEAD, fontSize: "clamp(32px, 4vw, 56px)", color: C.text, lineHeight: 1.15, letterSpacing: "0.02em" }}>
                WE DON&apos;T ADD — WE REMOVE. EVERY ELEMENT ON SCREEN MUST EARN ITS PLACE.
              </p>
              <p style={{ fontFamily: F_BODY, fontSize: 16, color: C.dim, lineHeight: 1.85, marginTop: 32, maxWidth: 480 }}>
                Founded by designers who believe craft scales. We work with brands across fashion, architecture, technology, and culture — always with the same obsessive attention to the invisible details.
              </p>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {[
                { target: "47", suffix: "+", label: "PROJECTS" },
                { target: "12", suffix: "", label: "AWARDS" },
                { target: "8", suffix: "", label: "YEARS" },
                { target: "100", suffix: "%", label: "INDEPENDENT" },
              ].map((s) => (
                <div key={s.label} className="sn-stat" data-target={s.target} data-suffix={s.suffix} style={{ padding: 32, background: C.bgAlt, border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <span className="sn-stat-num" style={{ fontFamily: F_HEAD, fontSize: 56, color: C.accent, display: "block", letterSpacing: "0.02em" }}>0</span>
                  <span style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 4, color: C.muted, marginTop: 8, display: "block" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — angled cards with 3D rotation reveal */}
      <section id="sn-services" style={{ padding: "140px 48px", paddingRight: 128, background: C.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 60 }}>WHAT WE DO</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { num: "01", title: "WEB DESIGN", desc: "Websites that move. Editorial layouts, cinematic scroll, modern engineering.", icon: "◆" },
              { num: "02", title: "BRAND IDENTITY", desc: "Visual systems that communicate before a word is read.", icon: "○" },
              { num: "03", title: "CREATIVE DIRECTION", desc: "Strategic thinking behind the pixels. Positioning and art direction.", icon: "△" },
            ].map((svc) => (
              <div key={svc.num} className="sn-svc-card" style={{ padding: 40, background: C.bg, border: `1px solid ${C.border}`, transition: "all 0.4s", cursor: "none", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-8px)"; (e.currentTarget.querySelector(".sn-svc-glow") as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; (e.currentTarget.querySelector(".sn-svc-glow") as HTMLElement).style.opacity = "0"; }}
              >
                {/* Hover glow */}
                <div className="sn-svc-glow" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, opacity: 0, transition: "opacity 0.4s" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontFamily: F_HEAD, fontSize: 56, color: C.accent, opacity: 0.1 }}>{svc.num}</span>
                  <span style={{ fontSize: 24, color: C.accent, opacity: 0.4 }}>{svc.icon}</span>
                </div>
                <h3 style={{ fontFamily: F_HEAD, fontSize: 32, color: C.text, letterSpacing: "0.04em", marginBottom: 16 }}>{svc.title}</h3>
                <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.dim, lineHeight: 1.75 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — dramatic char-by-char reveal */}
      <section id="sn-sayhi" style={{ padding: "200px 48px", paddingRight: 128, textAlign: "center", position: "relative" }}>
        {/* Decorative cross */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <div style={{ width: 200, height: 1, background: C.border }} />
          <div style={{ width: 1, height: 200, background: C.border, position: "absolute", top: -100, left: "50%" }} />
        </div>

        <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 40, position: "relative", zIndex: 1 }}>GET IN TOUCH</span>
        <h2 className="sn-cta-heading" style={{ fontFamily: F_HEAD, fontSize: "clamp(44px, 7vw, 110px)", color: C.text, lineHeight: 0.92, letterSpacing: "0.02em", position: "relative", zIndex: 1, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          LET&apos;S BUILD
          <br />SOMETHING
          <br /><span style={{ color: C.accent }}>REMARKABLE</span>
        </h2>
        <div style={{ marginTop: 56, position: "relative", zIndex: 1 }}>
          <a href="mailto:hello@studionoir.com" style={{ fontFamily: F_HEAD, fontSize: 18, letterSpacing: 6, padding: "20px 48px", border: `1px solid ${C.accent}`, color: C.accent, textDecoration: "none", transition: "all 0.4s", cursor: "none", display: "inline-block" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
          >START A PROJECT ↗</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 48px", paddingRight: 128, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted }}>&copy; 2026 Studio Noir</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Dribbble", "Behance", "Instagram", "Twitter"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: F_BODY, fontSize: 11, color: C.muted, textDecoration: "none", transition: "color 0.3s", cursor: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >{s}</a>
          ))}
        </div>
      </footer>

      {/* Back button */}
      <div style={{ position: "fixed", bottom: 24, left: 24, zIndex: 300 }}>
        <Link href="/work/designs/studio-noir" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: C.accent, color: C.bg, fontFamily: F_HEAD, fontSize: 11, letterSpacing: 3, textDecoration: "none", cursor: "none" }}>
          ← BREAKDOWN
        </Link>
      </div>
    </div>
  );
}
