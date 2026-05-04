"use client";

/**
 * MONO — Ultra-Minimal Portfolio Template
 * ONE font. Zero decoration. Type-only. Extreme whitespace.
 * Project titles ARE the navigation. Hover reveals images.
 * Refs: stevenmengin.com, olhalazarieva.com, minimalwim.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FONT = "'Syne', 'Helvetica Neue', sans-serif";

const M = {
  bg: "#FAFAFA",
  text: "#111111",
  muted: "#999999",
  dim: "#CCCCCC",
  accent: "#111111",
  border: "#EEEEEE",
  hover: "#FF3D00",
};

const projects = [
  { title: "Meridian", cat: "Brand Identity", year: "2026", emoji: "◆" },
  { title: "Atlas", cat: "Web Platform", year: "2025", emoji: "○" },
  { title: "Onyx", cat: "Mobile App", year: "2026", emoji: "□" },
  { title: "Prism", cat: "Editorial", year: "2025", emoji: "△" },
  { title: "Echo", cat: "E-Commerce", year: "2024", emoji: "◇" },
];

export default function MonoPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero name — dramatic entrance
      const heroName = el.querySelector(".mn-hero-name");
      if (heroName) {
        gsap.set(heroName, { y: "100%", opacity: 0 });
        gsap.to(heroName, { y: "0%", opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 });
      }

      // Hero subtitle
      const heroSub = el.querySelector(".mn-hero-sub");
      if (heroSub) {
        gsap.set(heroSub, { opacity: 0 });
        gsap.to(heroSub, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.8 });
      }

      // Project rows — stagger
      el.querySelectorAll(".mn-project-row").forEach((row, i) => {
        const line = row.querySelector(".mn-line");
        const content = row.querySelector(".mn-row-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left" });
          tl.to(line, { scaleX: 1, duration: 0.5, ease: "power2.inOut" });
        }
        if (content) {
          gsap.set(content, { y: 20, opacity: 0 });
          tl.to(content, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");
        }
      });

      // About text
      el.querySelectorAll(".mn-reveal").forEach((item) => {
        gsap.fromTo(item, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // Contact — title scale in
      const ctaTitle = el.querySelector(".mn-cta-title");
      if (ctaTitle) {
        gsap.fromTo(ctaTitle,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ctaTitle, start: "top 80%", once: true },
          }
        );
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: M.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');`}</style>
        <div style={{ overflow: "hidden" }}>
          <span style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, letterSpacing: 8, color: M.text, display: "block", animation: "mn-up 0.8s ease-out 0.3s both" }}>MONO</span>
        </div>
        <style>{`@keyframes mn-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: M.bg, color: M.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Nav — as minimal as possible */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", background: "rgba(250,250,250,0.9)", backdropFilter: "blur(8px)" }}>
        <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, letterSpacing: 6, color: M.text }}>MONO</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Work", "About", "Contact"].map((item) => (
            <a key={item} href={`#mn-${item.toLowerCase()}`} style={{ fontFamily: FONT, fontSize: 13, color: M.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = M.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = M.muted)}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero — just a name. Nothing else. */}
      <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px" }}>
        <div style={{ overflow: "hidden" }}>
          <h1 className="mn-hero-name" style={{ fontFamily: FONT, fontSize: "clamp(72px, 12vw, 200px)", fontWeight: 800, color: M.text, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
            John
            <br />
            Doe.
          </h1>
        </div>
        <p className="mn-hero-sub" style={{ fontFamily: FONT, fontSize: 16, color: M.muted, marginTop: 32, fontWeight: 400 }}>
          Designer & Developer — Available for work
        </p>
      </section>

      {/* Projects — THE ENTIRE SITE. Titles as navigation. */}
      <section id="mn-work" style={{ padding: "80px 48px 160px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, letterSpacing: 4, color: M.muted, display: "block", marginBottom: 60 }}>SELECTED WORK</span>

          {projects.map((proj, i) => (
            <div key={proj.title} className="mn-project-row" style={{ position: "relative" }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="mn-line" style={{ height: 1, background: M.border }} />
              <div className="mn-row-content" style={{ display: "flex", alignItems: "center", padding: "48px 0", cursor: "pointer", transition: "padding-left 0.4s" }}
                style-={{ paddingLeft: hoveredProject === i ? 20 : 0 }}
              >
                <span style={{ fontFamily: FONT, fontSize: 14, color: M.muted, width: 48, fontWeight: 500 }}>{proj.emoji}</span>
                <h3 style={{ fontFamily: FONT, fontSize: "clamp(36px, 5vw, 80px)", fontWeight: 800, flex: 1, letterSpacing: "-0.03em", lineHeight: 1, transition: "color 0.3s", color: hoveredProject === i ? M.hover : M.text }}>
                  {proj.title}
                </h3>
                <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                  <span style={{ fontFamily: FONT, fontSize: 13, color: M.muted, fontWeight: 400 }}>{proj.cat}</span>
                  <span style={{ fontFamily: FONT, fontSize: 13, color: M.dim }}>{proj.year}</span>
                  <span style={{ fontSize: 20, color: hoveredProject === i ? M.hover : M.muted, transition: "all 0.3s", transform: hoveredProject === i ? "translate(4px, -4px)" : "translate(0, 0)" }}>↗</span>
                </div>
              </div>
            </div>
          ))}
          {/* Final line */}
          <div style={{ height: 1, background: M.border }} />
        </div>
      </section>

      {/* About — minimal, just text */}
      <section id="mn-about" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="mn-reveal" style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, letterSpacing: 4, color: M.muted, display: "block", marginBottom: 40 }}>ABOUT</span>
          <p className="mn-reveal" style={{ fontFamily: FONT, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 500, color: M.text, lineHeight: 1.5, letterSpacing: "-0.01em" }}>
            I design and build digital products with a focus on clarity, restraint, and craft. Every project starts with understanding the problem — not jumping to the solution.
          </p>
          <p className="mn-reveal" style={{ fontFamily: FONT, fontSize: 16, color: M.muted, lineHeight: 1.8, marginTop: 32 }}>
            Currently based in [City]. Previously at [Studio]. Open to freelance, full-time, and collaboration.
          </p>
          <div className="mn-reveal" style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {["LinkedIn", "Dribbble", "GitHub", "Twitter"].map((s) => (
              <a key={s} href="#" style={{ fontFamily: FONT, fontSize: 13, color: M.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = M.hover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = M.muted)}
              >{s}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact — just an email, massive */}
      <section id="mn-contact" style={{ padding: "160px 48px", textAlign: "center" }}>
        <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, letterSpacing: 4, color: M.muted, display: "block", marginBottom: 40 }}>GET IN TOUCH</span>
        <h2 className="mn-cta-title" style={{ fontFamily: FONT, fontSize: "clamp(40px, 7vw, 100px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, transition: "color 0.3s", cursor: "pointer", color: M.text }}
          onMouseEnter={(e) => (e.currentTarget.style.color = M.hover)}
          onMouseLeave={(e) => (e.currentTarget.style.color = M.text)}
        >
          hello@mono.studio
        </h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: M.muted, marginTop: 24 }}>or just say hi — I respond to everything.</p>
      </section>

      {/* Footer — barely there */}
      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${M.border}` }}>
        <span style={{ fontFamily: FONT, fontSize: 12, color: M.dim }}>&copy; 2026</span>
        <span style={{ fontFamily: FONT, fontSize: 12, color: M.dim }}>Built with intention.</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/mono" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: M.text, color: M.bg, fontFamily: FONT, fontSize: 11, fontWeight: 600, textDecoration: "none", letterSpacing: 1 }}>← BREAKDOWN</Link>
      </div>
    </div>
  );
}
