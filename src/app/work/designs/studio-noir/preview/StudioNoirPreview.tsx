"use client";

/**
 * STUDIO NOIR — Full Production Preview
 * Gold accent on pitch black. Magazine editorial energy.
 * Real GSAP ScrollTrigger + SplitType + smooth scroll.
 * References: unseen.co, locomotive.ca, obys.agency
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ── PALETTE — Gold on black, NOT violet ── */
const C = {
  bg: "#060606",
  bgAlt: "#0C0B09",
  text: "#E8E4DC",
  muted: "rgba(232,228,220,0.4)",
  dim: "rgba(232,228,220,0.6)",
  accent: "#C9A55A",
  accentDim: "rgba(201,165,90,0.15)",
  border: "rgba(232,228,220,0.07)",
};

const projects = [
  { num: "01", title: "Meridian", cat: "Brand Identity", year: "2026" },
  { num: "02", title: "Voidframe", cat: "Web Platform", year: "2025" },
  { num: "03", title: "Obsidian", cat: "E-Commerce", year: "2026" },
  { num: "04", title: "Parallax", cat: "Campaign Site", year: "2025" },
  { num: "05", title: "Zenith", cat: "Product Design", year: "2026" },
];

const services = [
  { num: "01", title: "Web Design & Development", desc: "Websites that move. Editorial layouts, cinematic scroll, modern engineering." },
  { num: "02", title: "Brand Identity", desc: "Visual systems that communicate before a word is read. Logo, colour, type, guidelines." },
  { num: "03", title: "Creative Direction", desc: "Strategic thinking behind the pixels. Positioning, art direction, creative oversight." },
];

export default function StudioNoirPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Loader
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero heading — char stagger
      const heading = heroHeadingRef.current;
      if (heading) {
        const split = new SplitType(heading, { types: "chars" });
        gsap.set(split.chars || [], { y: "110%", opacity: 0 });
        gsap.to(split.chars || [], {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // Hero sub elements
      const heroFades = container.querySelectorAll(".sn-hero-fade");
      gsap.set(heroFades, { opacity: 0, y: 30 });
      gsap.to(heroFades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.6 });

      // Scroll indicator pulse
      const scrollLine = container.querySelector(".sn-scroll-line");
      if (scrollLine) {
        gsap.to(scrollLine, { scaleY: 0.5, opacity: 0.2, duration: 1.2, repeat: -1, yoyo: true, ease: "power1.inOut" });
      }

      // Marquee — continuous scroll
      const marqueeTrack = container.querySelector(".sn-marquee-track");
      if (marqueeTrack) {
        gsap.to(marqueeTrack, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      }

      // Section headers — slide in from left
      container.querySelectorAll(".sn-section-label").forEach((el) => {
        gsap.fromTo(el, { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Project rows — staggered line draw + text reveal
      container.querySelectorAll(".sn-project-row").forEach((row) => {
        const line = row.querySelector(".sn-row-line");
        const title = row.querySelector(".sn-row-title");
        const meta = row.querySelector(".sn-row-meta");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left" });
          tl.to(line, { scaleX: 1, duration: 0.6, ease: "power3.inOut" });
        }
        if (title) {
          gsap.set(title, { y: 40, opacity: 0 });
          tl.to(title, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
        }
        if (meta) {
          gsap.set(meta, { opacity: 0 });
          tl.to(meta, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
        }
      });

      // About section — split reveal
      const aboutHeading = container.querySelector(".sn-about-heading");
      if (aboutHeading) {
        const split = new SplitType(aboutHeading as HTMLElement, { types: "words" });
        gsap.set(split.words || [], { y: 50, opacity: 0 });
        gsap.to(split.words || [], {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out",
          scrollTrigger: { trigger: aboutHeading, start: "top 80%", once: true },
        });
      }

      // About paragraphs
      container.querySelectorAll(".sn-about-para").forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Stats — count up
      container.querySelectorAll(".sn-stat-num").forEach((el) => {
        const target = (el as HTMLElement).dataset.target || "0";
        const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
        const suffix = target.replace(/[0-9]/g, "");
        gsap.fromTo(
          { val: 0 },
          { val: 0 },
          {
            val: num,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: function () {
              (el as HTMLElement).textContent = Math.round(this.targets()[0].val) + suffix;
            },
          }
        );
      });

      // Services — staggered reveal
      container.querySelectorAll(".sn-service").forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Contact heading — char reveal
      const ctaHeading = container.querySelector(".sn-cta-heading");
      if (ctaHeading) {
        const split = new SplitType(ctaHeading as HTMLElement, { types: "chars" });
        gsap.set(split.chars || [], { y: "100%", opacity: 0 });
        gsap.to(split.chars || [], {
          y: "0%", opacity: 1, duration: 0.5, stagger: 0.015, ease: "power3.out",
          scrollTrigger: { trigger: ctaHeading, start: "top 80%", once: true },
        });
      }

    }, container);

    return () => ctx.revert();
  }, [loaded]);

  // ── LOADER ──
  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ width: 40, height: 1, background: C.accent, animation: "sn-loader-draw 1.5s ease-in-out forwards" }} />
        <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 10, letterSpacing: 6, color: C.muted }}>STUDIO NOIR</span>
        <style>{`
          @keyframes sn-loader-draw {
            0% { transform: scaleX(0); opacity: 0; }
            40% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: C.bg, color: C.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 64px", background: "rgba(6,6,6,0.8)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontFamily: "var(--font-display, serif)", fontSize: 18, color: C.text, letterSpacing: "0.12em", fontWeight: 400 }}>
          STUDIO<span style={{ color: C.accent }}>.</span>NOIR
        </span>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Work", "About", "Services", "Contact"].map((item) => (
            <a key={item} href={`#sn-${item.toLowerCase()}`} style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: C.muted, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", position: "relative", overflow: "hidden" }}>
        {/* Ghost number */}
        <span style={{ position: "absolute", right: 64, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-display, serif)", fontSize: "clamp(300px, 40vw, 600px)", color: C.accent, opacity: 0.03, lineHeight: 0.8, userSelect: "none", pointerEvents: "none" }}>N</span>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <span className="sn-hero-fade" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 5, color: C.accent, fontWeight: 500, display: "block", marginBottom: 40 }}>CREATIVE STUDIO</span>

          <h1 ref={heroHeadingRef} style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(52px, 8vw, 130px)", color: C.text, lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 400, overflow: "hidden" }}>
            We design what
            <br />
            others <em style={{ fontStyle: "italic", color: C.accent }}>overlook</em>
          </h1>

          <p className="sn-hero-fade" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 17, color: C.dim, marginTop: 40, maxWidth: 480, lineHeight: 1.8 }}>
            A design studio for brands that demand craft over convention. We build digital experiences with restraint, intention, and obsessive attention to detail.
          </p>

          <div className="sn-hero-fade" style={{ marginTop: 48, display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 36px", border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.4s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.accentDim; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, fontWeight: 500, letterSpacing: 2 }}>VIEW WORK</span>
            <span style={{ fontSize: 16 }}>&#8599;</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 48, left: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 9, letterSpacing: 4, color: C.muted, writingMode: "vertical-rl" }}>SCROLL</span>
          <div className="sn-scroll-line" style={{ width: 1, height: 60, background: C.accent, transformOrigin: "top" }} />
        </div>
      </section>

      {/* Marquee */}
      <div style={{ padding: "36px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div className="sn-marquee-track" style={{ display: "flex", gap: 80, whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(3)].flatMap(() => ["DESIGN", "DEVELOP", "BRAND", "ANIMATE", "LAUNCH"]).map((w, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(28px, 4vw, 52px)", color: C.muted, display: "flex", alignItems: "center", gap: 80, fontStyle: "italic" }}>
              {w}
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, opacity: 0.4 }} />
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <section id="sn-work" style={{ padding: "160px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sn-section-label" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 100 }}>
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 5, color: C.accent, fontWeight: 500 }}>SELECTED WORK</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, color: C.muted }}>05 PROJECTS</span>
          </div>

          {projects.map((proj) => (
            <div key={proj.num} className="sn-project-row" style={{ position: "relative", cursor: "pointer", paddingBottom: 0, marginBottom: 0 }}
              onMouseEnter={(e) => {
                const title = e.currentTarget.querySelector(".sn-row-title") as HTMLElement;
                if (title) title.style.color = C.accent;
                const arrow = e.currentTarget.querySelector(".sn-row-arrow") as HTMLElement;
                if (arrow) arrow.style.transform = "translate(4px, -4px)";
              }}
              onMouseLeave={(e) => {
                const title = e.currentTarget.querySelector(".sn-row-title") as HTMLElement;
                if (title) title.style.color = C.text;
                const arrow = e.currentTarget.querySelector(".sn-row-arrow") as HTMLElement;
                if (arrow) arrow.style.transform = "translate(0, 0)";
              }}
            >
              <div className="sn-row-line" style={{ height: 1, background: C.border, marginBottom: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "44px 0" }}>
                <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, color: C.muted, width: 48, letterSpacing: 3 }}>{proj.num}</span>
                <h3 className="sn-row-title" style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 5vw, 72px)", color: C.text, flex: 1, letterSpacing: "-0.02em", lineHeight: 1.05, transition: "color 0.4s", fontWeight: 400 }}>
                  {proj.title}
                </h3>
                <div className="sn-row-meta" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: C.muted, letterSpacing: 1.5 }}>{proj.cat}</span>
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: C.muted }}>{proj.year}</span>
                  <span className="sn-row-arrow" style={{ fontSize: 18, color: C.muted, transition: "transform 0.3s" }}>&#8599;</span>
                </div>
              </div>
            </div>
          ))}
          {/* Final line */}
          <div style={{ height: 1, background: C.border }} />
        </div>
      </section>

      {/* About */}
      <section id="sn-about" style={{ padding: "160px 64px", background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sn-section-label" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 80 }}>
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 5, color: C.accent, fontWeight: 500 }}>ABOUT THE STUDIO</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div style={{ display: "flex", gap: 100 }}>
            <div style={{ flex: 1 }}>
              <h2 className="sn-about-heading" style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(40px, 5vw, 76px)", color: C.text, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 400 }}>
                Restraint is a
                <br />
                <em style={{ fontStyle: "italic", color: C.accent }}>discipline.</em>
              </h2>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
              <p className="sn-about-para" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 16, color: C.dim, lineHeight: 1.85 }}>
                We don&apos;t add — we remove. Every element on screen must earn its place. This philosophy produces work that feels inevitable, not decorated.
              </p>
              <p className="sn-about-para" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 16, color: C.dim, lineHeight: 1.85 }}>
                Founded by designers who believe craft scales. We work with brands across fashion, architecture, technology, and culture — always with the same obsessive attention to the invisible details.
              </p>
              <div className="sn-about-para" style={{ display: "flex", gap: 56, marginTop: 24 }}>
                {[{ target: "47+", label: "Projects" }, { target: "12", label: "Awards" }, { target: "8", label: "Years" }].map((stat) => (
                  <div key={stat.label}>
                    <span className="sn-stat-num" data-target={stat.target} style={{ fontFamily: "var(--font-display, serif)", fontSize: 48, color: C.text, display: "block", letterSpacing: "-0.02em" }}>0</span>
                    <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="sn-services" style={{ padding: "160px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sn-section-label" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 100 }}>
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 5, color: C.accent, fontWeight: 500 }}>SERVICES</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          {services.map((svc) => (
            <div key={svc.num} className="sn-service" style={{ borderBottom: `1px solid ${C.border}`, padding: "56px 0", display: "flex", gap: 56, alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-display, serif)", fontSize: 72, color: C.accent, opacity: 0.12, lineHeight: 1, minWidth: 90, fontWeight: 400 }}>{svc.num}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(26px, 3vw, 44px)", color: C.text, letterSpacing: "-0.5px", marginBottom: 16, fontWeight: 400 }}>{svc.title}</h3>
                <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 15, color: C.dim, lineHeight: 1.75, maxWidth: 520 }}>{svc.desc}</p>
              </div>
              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: C.muted, letterSpacing: 2, alignSelf: "center" }}>EXPLORE &#8599;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="sn-contact" style={{ padding: "200px 64px", background: C.bgAlt, textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative accent line */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.accent}40, transparent)` }} />

        <span className="sn-section-label" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 5, color: C.accent, fontWeight: 500, display: "block", marginBottom: 40 }}>GET IN TOUCH</span>
        <h2 className="sn-cta-heading" style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(44px, 7vw, 110px)", color: C.text, lineHeight: 1.0, letterSpacing: "-0.03em", fontWeight: 400, position: "relative", zIndex: 1 }}>
          Let&apos;s build something
          <br />
          <em style={{ fontStyle: "italic", color: C.accent }}>remarkable.</em>
        </h2>
        <div style={{ marginTop: 56, display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 44px", border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.4s", position: "relative", zIndex: 1 }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.accentDim; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, fontWeight: 500, letterSpacing: 2, color: C.text }}>START A PROJECT</span>
          <span style={{ fontSize: 16, color: C.text }}>&#8599;</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 64px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, color: C.muted }}>&copy; 2026 Studio Noir. All rights reserved.</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Twitter", "Dribbble", "Instagram", "Behance"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, color: C.muted, textDecoration: "none", letterSpacing: 1, transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >{s}</a>
          ))}
        </div>
      </footer>

      {/* Back button */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/studio-noir" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: C.accent, color: C.bg, fontFamily: "var(--font-body, sans-serif)", fontSize: 11, fontWeight: 600, textDecoration: "none", letterSpacing: 1 }}>
          ← BREAKDOWN
        </Link>
      </div>
    </div>
  );
}
