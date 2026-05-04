"use client";

/**
 * STUDIO NOIR — Full Production Preview v2
 * Completely distinct from Nimbus. Condensed type, horizontal scroll,
 * asymmetric layouts, image placeholders, warm dark palette.
 * References: unseen.co, obys.agency, aristidebenoist.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ── Fonts: loaded inline, NOT from Nimbus CSS vars ── */
const FONT_HEADING = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FONT_BODY = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";

const C = {
  bg: "#0D0B08",
  bgCard: "#151210",
  bgWarm: "#1A1612",
  text: "#EDE8DF",
  muted: "rgba(237,232,223,0.35)",
  dim: "rgba(237,232,223,0.55)",
  accent: "#C9A55A",
  accentGlow: "rgba(201,165,90,0.12)",
  border: "rgba(237,232,223,0.06)",
};

const projects = [
  { num: "01", title: "MERIDIAN", cat: "BRAND IDENTITY", img: "🏔️" },
  { num: "02", title: "ATLAS", cat: "WEB PLATFORM", img: "🌐" },
  { num: "03", title: "ONYX", cat: "E-COMMERCE", img: "💎" },
  { num: "04", title: "PRISM", cat: "CAMPAIGN", img: "🔮" },
  { num: "05", title: "ECHO", cat: "PRODUCT DESIGN", img: "📱" },
];

const stats = [
  { num: "47", suffix: "+", label: "PROJECTS DELIVERED" },
  { num: "12", suffix: "", label: "INDUSTRY AWARDS" },
  { num: "8", suffix: "", label: "YEARS ACTIVE" },
  { num: "100", suffix: "%", label: "INDEPENDENT" },
];

export default function StudioNoirPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero — dramatic stagger
      const heroTitle = el.querySelector(".sn-hero-title");
      if (heroTitle) {
        const lines = heroTitle.querySelectorAll(".sn-title-line");
        gsap.set(lines, { y: "100%", opacity: 0 });
        gsap.to(lines, { y: "0%", opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.3 });
      }

      const heroFades = el.querySelectorAll(".sn-fade");
      gsap.set(heroFades, { opacity: 0, y: 20 });
      gsap.to(heroFades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.8 });

      // Horizontal project gallery — scroll driven
      const gallery = galleryRef.current;
      if (gallery && window.innerWidth > 768) {
        const track = gallery.querySelector(".sn-gallery-track") as HTMLElement;
        if (track) {
          const totalWidth = track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: gallery,
              start: "top top",
              end: () => `+=${totalWidth}`,
              scrub: 1,
              pin: true,
            },
          });
        }
      }

      // Stats — count up
      el.querySelectorAll(".sn-count").forEach((stat) => {
        const target = parseInt((stat as HTMLElement).dataset.target || "0", 10);
        const suffix = (stat as HTMLElement).dataset.suffix || "";
        gsap.fromTo(
          { val: 0 }, { val: 0 },
          {
            val: target, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: stat, start: "top 85%", once: true },
            onUpdate: function () {
              (stat as HTMLElement).textContent = Math.round(this.targets()[0].val) + suffix;
            },
          }
        );
      });

      // About — clip reveal
      const aboutImg = el.querySelector(".sn-about-img");
      if (aboutImg) {
        gsap.fromTo(aboutImg,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.inOut",
            scrollTrigger: { trigger: aboutImg, start: "top 80%", once: true },
          }
        );
      }

      // About text
      el.querySelectorAll(".sn-reveal").forEach((item) => {
        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
      });

      // Services — stagger from below
      el.querySelectorAll(".sn-service-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // CTA — dramatic scale
      const ctaTitle = el.querySelector(".sn-cta-title");
      if (ctaTitle) {
        gsap.fromTo(ctaTitle,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ctaTitle, start: "top 80%", once: true },
          }
        );
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  // ── LOADER — cinematic curtain ──
  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        {/* Google Fonts load */}
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');`}</style>
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontFamily: FONT_HEADING, fontSize: "clamp(48px, 8vw, 100px)", color: C.text, letterSpacing: "0.08em", animation: "sn-title-up 1s ease-out 0.5s both" }}>
            STUDIO NOIR
          </div>
        </div>
        <div style={{ width: 80, height: 1, background: C.accent, animation: "sn-line-draw 1s ease-in-out 0.8s both" }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 4, color: C.muted, animation: "sn-fade-in 0.8s ease-out 1.2s both" }}>CREATIVE STUDIO</span>
        <style>{`
          @keyframes sn-title-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes sn-line-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes sn-fade-in { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: C.bg, color: C.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');`}</style>

      {/* Nav — minimal, condensed type */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", background: "rgba(13,11,8,0.9)", backdropFilter: "blur(12px)" }}>
        <span style={{ fontFamily: FONT_HEADING, fontSize: 22, color: C.text, letterSpacing: "0.15em" }}>
          STUDIO NOIR
        </span>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["WORK", "ABOUT", "SERVICES", "CONTACT"].map((item) => (
            <a key={item} href={`#sn-${item.toLowerCase()}`} style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, textDecoration: "none", letterSpacing: 3, fontWeight: 500, transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero — asymmetric, condensed display type, NOT like Nimbus */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "0 48px", position: "relative" }}>
        <div style={{ position: "relative", zIndex: 1, paddingRight: 48 }}>
          <span className="sn-fade" style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 5, color: C.accent, fontWeight: 500, display: "block", marginBottom: 32 }}>CREATIVE STUDIO — EST. 2024</span>

          <div className="sn-hero-title" style={{ overflow: "hidden" }}>
            <div className="sn-title-line" style={{ fontFamily: FONT_HEADING, fontSize: "clamp(60px, 9vw, 140px)", color: C.text, lineHeight: 0.9, letterSpacing: "0.04em" }}>
              WE DESIGN
            </div>
            <div className="sn-title-line" style={{ fontFamily: FONT_HEADING, fontSize: "clamp(60px, 9vw, 140px)", color: C.accent, lineHeight: 0.9, letterSpacing: "0.04em" }}>
              WHAT OTHERS
            </div>
            <div className="sn-title-line" style={{ fontFamily: FONT_HEADING, fontSize: "clamp(60px, 9vw, 140px)", color: C.text, lineHeight: 0.9, letterSpacing: "0.04em" }}>
              OVERLOOK.
            </div>
          </div>

          <p className="sn-fade" style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.dim, marginTop: 40, maxWidth: 400, lineHeight: 1.8 }}>
            A design studio for brands that demand craft over convention. We build digital experiences with restraint and obsessive attention to detail.
          </p>

          <div className="sn-fade" style={{ display: "flex", gap: 24, marginTop: 48 }}>
            <span style={{ fontFamily: FONT_HEADING, fontSize: 16, letterSpacing: 4, padding: "16px 36px", border: `1px solid ${C.accent}`, color: C.accent, cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
            >VIEW WORK</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 13, letterSpacing: 2, padding: "16px 36px", color: C.dim, cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.dim)}
            >ABOUT US →</span>
          </div>
        </div>

        {/* Right — image placeholder with gold border treatment */}
        <div style={{ position: "relative", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "85%", height: "85%", background: C.bgCard, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_HEADING, fontSize: 120, color: C.accent, opacity: 0.06 }}>✦</div>
            <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 3, color: C.muted }}>HERO IMAGE</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 3, color: C.muted }}>1920 × 1080</span>
            </div>
          </div>
          {/* Gold accent corner */}
          <div style={{ position: "absolute", top: "7%", right: "5%", width: 60, height: 60, borderTop: `2px solid ${C.accent}`, borderRight: `2px solid ${C.accent}` }} />
          <div style={{ position: "absolute", bottom: "7%", left: "5%", width: 60, height: 60, borderBottom: `2px solid ${C.accent}`, borderLeft: `2px solid ${C.accent}` }} />
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ padding: "64px 48px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <span className="sn-count" data-target={s.num} data-suffix={s.suffix} style={{ fontFamily: FONT_HEADING, fontSize: "clamp(48px, 6vw, 80px)", color: C.text, display: "block", letterSpacing: "0.02em" }}>0</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 4, color: C.muted, fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal scroll project gallery */}
      <section id="sn-work" ref={galleryRef} style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ padding: "40px 48px 20px", position: "relative", zIndex: 2 }}>
          <span style={{ fontFamily: FONT_HEADING, fontSize: 16, letterSpacing: 6, color: C.accent }}>SELECTED WORK</span>
        </div>
        <div className="sn-gallery-track" style={{ display: "flex", gap: 32, height: "calc(100vh - 100px)", padding: "0 48px", alignItems: "center" }}>
          {projects.map((proj) => (
            <div key={proj.num} style={{ minWidth: "clamp(350px, 30vw, 500px)", height: "70%", background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", cursor: "pointer", transition: "all 0.4s", position: "relative", overflow: "hidden", flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; (e.currentTarget.querySelector(".sn-proj-overlay") as HTMLElement)!.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; (e.currentTarget.querySelector(".sn-proj-overlay") as HTMLElement)!.style.opacity = "0"; }}
            >
              {/* Image placeholder */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, background: C.bgWarm }}>
                {proj.img}
              </div>
              {/* Info */}
              <div style={{ padding: "20px 24px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontFamily: FONT_HEADING, fontSize: 28, letterSpacing: "0.06em", color: C.text, display: "block" }}>{proj.title}</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 3, color: C.muted }}>{proj.cat}</span>
                </div>
                <span style={{ fontFamily: FONT_HEADING, fontSize: 48, color: C.accent, opacity: 0.15 }}>{proj.num}</span>
              </div>
              {/* Hover overlay */}
              <div className="sn-proj-overlay" style={{ position: "absolute", inset: 0, background: "rgba(201,165,90,0.08)", opacity: 0, transition: "opacity 0.4s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: FONT_HEADING, fontSize: 20, letterSpacing: 6, color: C.accent }}>VIEW PROJECT ↗</span>
              </div>
            </div>
          ))}
          {/* End spacer */}
          <div style={{ minWidth: 200, flexShrink: 0 }} />
        </div>
      </section>

      {/* About — asymmetric with clip reveal */}
      <section id="sn-about" style={{ padding: "160px 48px", background: C.bgWarm }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          {/* Image placeholder with clip reveal */}
          <div className="sn-about-img" style={{ height: 500, background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span style={{ fontFamily: FONT_HEADING, fontSize: 160, color: C.accent, opacity: 0.05 }}>✦</span>
            <span style={{ position: "absolute", bottom: 20, left: 20, fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 3, color: C.muted }}>STUDIO PORTRAIT</span>
          </div>

          <div>
            <span className="sn-reveal" style={{ fontFamily: FONT_HEADING, fontSize: 14, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 32 }}>ABOUT THE STUDIO</span>
            <h2 className="sn-reveal" style={{ fontFamily: FONT_HEADING, fontSize: "clamp(48px, 6vw, 88px)", color: C.text, lineHeight: 0.95, letterSpacing: "0.03em" }}>
              RESTRAINT IS A<br />DISCIPLINE.
            </h2>
            <p className="sn-reveal" style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.dim, lineHeight: 1.85, marginTop: 32, maxWidth: 480 }}>
              We don&apos;t add — we remove. Every element on screen must earn its place. This philosophy produces work that feels inevitable, not decorated.
            </p>
            <p className="sn-reveal" style={{ fontFamily: FONT_BODY, fontSize: 16, color: C.dim, lineHeight: 1.85, marginTop: 20, maxWidth: 480 }}>
              Founded by designers who believe craft scales. We work with brands across fashion, architecture, technology, and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Services — card grid, NOT Nimbus layout */}
      <section id="sn-services" style={{ padding: "160px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="sn-reveal" style={{ fontFamily: FONT_HEADING, fontSize: 14, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 60 }}>WHAT WE DO</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { num: "01", title: "WEB DESIGN", desc: "Websites that move. Editorial layouts, cinematic scroll, modern engineering." },
              { num: "02", title: "BRAND IDENTITY", desc: "Visual systems that communicate before a word is read." },
              { num: "03", title: "CREATIVE DIRECTION", desc: "Strategic thinking behind the pixels. Art direction and creative oversight." },
            ].map((svc) => (
              <div key={svc.num} className="sn-service-card" style={{ padding: 40, background: C.bgCard, border: `1px solid ${C.border}`, transition: "all 0.4s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = C.bgWarm; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgCard; }}
              >
                <span style={{ fontFamily: FONT_HEADING, fontSize: 56, color: C.accent, opacity: 0.12, display: "block", marginBottom: 24 }}>{svc.num}</span>
                <h3 style={{ fontFamily: FONT_HEADING, fontSize: 28, color: C.text, letterSpacing: "0.06em", marginBottom: 16 }}>{svc.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: C.dim, lineHeight: 1.75 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="sn-contact" style={{ padding: "200px 48px", background: C.bgWarm, textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.accent}30, transparent)` }} />
        <span style={{ fontFamily: FONT_HEADING, fontSize: 14, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 40, position: "relative", zIndex: 1 }}>GET IN TOUCH</span>
        <h2 className="sn-cta-title" style={{ fontFamily: FONT_HEADING, fontSize: "clamp(56px, 9vw, 140px)", color: C.text, lineHeight: 0.9, letterSpacing: "0.04em", position: "relative", zIndex: 1 }}>
          LET&apos;S BUILD<br />
          <span style={{ color: C.accent }}>SOMETHING</span><br />
          REMARKABLE.
        </h2>
        <div style={{ marginTop: 56, display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 44px", border: `1px solid ${C.accent}`, cursor: "pointer", transition: "all 0.3s", position: "relative", zIndex: 1 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.text; }}
        >
          <span style={{ fontFamily: FONT_HEADING, fontSize: 16, letterSpacing: 4 }}>START A PROJECT</span>
          <span style={{ fontSize: 16 }}>↗</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 48px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted }}>&copy; 2026 Studio Noir. All rights reserved.</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Twitter", "Dribbble", "Instagram", "Behance"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.muted, textDecoration: "none", letterSpacing: 1, transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >{s}</a>
          ))}
        </div>
      </footer>

      {/* Back */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/studio-noir" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: C.accent, color: C.bg, fontFamily: FONT_HEADING, fontSize: 12, letterSpacing: 3, textDecoration: "none" }}>
          ← BREAKDOWN
        </Link>
      </div>
    </div>
  );
}
