"use client";

/**
 * ELEVATE v3 — Complete rebuild
 *
 * UNIQUE PATTERNS:
 * - Navigation: Centered logo, split nav links left/right, glassmorphism
 * - Scroll: Section snap scrolling with progress dots on right edge
 * - Hover: Cards tilt on mouse position (3D perspective)
 * - Background: Animated gradient mesh blob + dot grid
 * - Typography: Staggered line reveal with mask
 * - CTA: Animated gradient border button
 *
 * Fonts: Inter (system-like, trustworthy)
 * Palette: White + Navy #0F172A + Blue #3B82F6
 * References: linear.app, stripe.com, vercel.com, ramp.com
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const E = {
  bg: "#FFFFFF", bgSoft: "#F8FAFC", bgDark: "#0F172A", text: "#0F172A",
  textMuted: "#64748B", textDim: "#94A3B8", accent: "#3B82F6",
  accentLight: "#DBEAFE", accentGlow: "rgba(59,130,246,0.15)",
  border: "#E2E8F0", gradient1: "#3B82F6", gradient2: "#8B5CF6",
};

const features = [
  { title: "Lightning Fast", desc: "Sub-100ms response times. Your team never waits.", icon: "⚡", stat: "< 100ms" },
  { title: "Enterprise Security", desc: "SOC 2 Type II. End-to-end encryption. Zero trust.", icon: "🔒", stat: "99.99%" },
  { title: "Real-time Collab", desc: "See cursors, edits, and comments live. No refresh.", icon: "👥", stat: "∞ users" },
  { title: "API-First", desc: "REST + GraphQL. Everything in the UI is in the API.", icon: "⚙️", stat: "v3.0" },
  { title: "Smart Analytics", desc: "Usage patterns and insights without the data degree.", icon: "📊", stat: "24/7" },
  { title: "Human Support", desc: "Real people. Not chatbots. Under 4 min response.", icon: "💬", stat: "< 4 min" },
];

const metrics = [
  { value: 99.99, suffix: "%", label: "Uptime SLA", prefix: "" },
  { value: 100, suffix: "ms", label: "Avg Response", prefix: "<" },
  { value: 10000, suffix: "+", label: "Teams", prefix: "" },
  { value: 4.9, suffix: "/5", label: "Rating", prefix: "" },
];

export default function ElevatePreview() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Gradient blob animation
      const blob = el.querySelector(".el-blob");
      if (blob) {
        gsap.to(blob, {
          x: 100, y: -50, scale: 1.2, rotation: 45,
          duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }

      // Hero stagger
      const heroEls = el.querySelectorAll(".el-hero-anim");
      gsap.set(heroEls, { y: 50, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2 });

      // Logo bar
      el.querySelectorAll(".el-logo").forEach((logo, i) => {
        gsap.fromTo(logo, { y: 20, opacity: 0 }, {
          y: 0, opacity: 0.4, duration: 0.5, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: logo.parentElement, start: "top 90%", once: true },
        });
      });

      // Feature cards — staggered with tilt-ready class
      el.querySelectorAll(".el-feature").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Metrics count up
      el.querySelectorAll(".el-metric").forEach((stat) => {
        const val = parseFloat((stat as HTMLElement).dataset.value || "0");
        const suffix = (stat as HTMLElement).dataset.suffix || "";
        const prefix = (stat as HTMLElement).dataset.prefix || "";
        const isDecimal = String(val).includes(".");

        gsap.fromTo({ v: 0 }, { v: 0 }, {
          v: val, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: stat, start: "top 85%", once: true },
          onUpdate: function () {
            const curr = isDecimal ? this.targets()[0].v.toFixed(1) : Math.round(this.targets()[0].v);
            (stat as HTMLElement).textContent = prefix + curr + suffix;
          },
        });
      });

      // Testimonials — alternate slide
      el.querySelectorAll(".el-test").forEach((t, i) => {
        gsap.fromTo(t, { x: i % 2 === 0 ? -50 : 50, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: t, start: "top 85%", once: true },
        });
      });

      // CTA
      const ctaSection = el.querySelector(".el-cta");
      if (ctaSection) {
        gsap.fromTo(ctaSection, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ctaSection, start: "top 80%", once: true },
        });
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  // 3D tilt handler for feature cards
  const handleCardMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0)";
  }, []);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, borderRadius: 8, animation: "el-spin 1.5s ease-in-out infinite" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 700, color: E.text }}>Elevate</span>
        </div>
        <div style={{ width: 120, height: 3, background: E.border, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(90deg, ${E.gradient1}, ${E.gradient2})`, animation: "el-load 1.2s ease-in-out both" }} />
        </div>
        <style>{`
          @keyframes el-spin { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); } }
          @keyframes el-load { from { transform: scaleX(0); transform-origin: left; } to { transform: scaleX(1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={mainRef} style={{ background: E.bg, color: E.text, minHeight: "100vh", overflowX: "hidden" }}>
      {/* NAV — centered logo, split links */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 48px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid ${E.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700 }}>E</div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 700 }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Product", "Pricing", "Docs", "Blog"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: E.textMuted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textMuted)}
            >{item}</a>
          ))}
        </div>
        <span style={{ padding: "8px 20px", background: E.text, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, borderRadius: 6, cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >Get Started</span>
      </nav>

      {/* HERO — with animated gradient blob */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "140px 48px 100px", position: "relative", overflow: "hidden" }}>
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${E.border} 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: 0.6 }} />

        {/* Animated gradient blob */}
        <div className="el-blob" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${E.accentGlow} 0%, transparent 70%)`, top: "10%", left: "20%", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="el-hero-anim" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: E.accentLight, borderRadius: 24, marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: E.accent, animation: "el-dot-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: E.accent }}>Now in public beta</span>
          </div>
          <style>{`@keyframes el-dot-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }`}</style>

          <h1 className="el-hero-anim" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(44px, 6.5vw, 76px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.035em", maxWidth: 820 }}>
            The platform your
            <br />team actually{" "}
            <span style={{ background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>wants to use.</span>
          </h1>

          <p className="el-hero-anim" style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: E.textMuted, marginTop: 24, maxWidth: 540, lineHeight: 1.7, marginLeft: "auto", marginRight: "auto" }}>
            Elevate brings your entire workflow into one place. Plan, build, ship, and measure — without the context switching.
          </p>

          <div className="el-hero-anim" style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40 }}>
            {/* Gradient border button */}
            <div style={{ padding: 2, background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, borderRadius: 10 }}>
              <span style={{ display: "block", padding: "13px 32px", background: E.text, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "transparent")}
                onMouseLeave={(e) => (e.currentTarget.style.background = E.text)}
              >Start for Free</span>
            </div>
            <span style={{ padding: "15px 32px", border: `1px solid ${E.border}`, fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500, borderRadius: 10, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = E.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = E.border)}
            >Watch Demo <span style={{ fontSize: 18 }}>▸</span></span>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div style={{ padding: "48px 48px", borderTop: `1px solid ${E.border}`, borderBottom: `1px solid ${E.border}`, textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textDim, marginBottom: 28, letterSpacing: 0.5 }}>Trusted by 10,000+ teams worldwide</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap" }}>
          {["Acme Corp", "TechFlow", "Pinnacle", "Meridian", "CloudBase", "Quantum"].map((logo) => (
            <span key={logo} className="el-logo" style={{ fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 700, color: E.textDim, opacity: 0 }}>{logo}</span>
          ))}
        </div>
      </div>

      {/* FEATURES — 3D tilt cards */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: E.accent, letterSpacing: 1.5, textTransform: "uppercase" }}>Features</span>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, marginTop: 14, letterSpacing: "-0.025em" }}>Everything you need.<br />Nothing you don&apos;t.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} className="el-feature"
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                style={{ padding: 32, background: E.bgSoft, border: `1px solid ${E.border}`, borderRadius: 14, transition: "transform 0.15s ease-out, box-shadow 0.3s", cursor: "default", willChange: "transform" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 32 }}>{f.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: E.accent, background: E.accentLight, padding: "4px 10px", borderRadius: 6 }}>{f.stat}</span>
                </div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: E.textMuted, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS — dark strip with count-up */}
      <section style={{ padding: "80px 48px", background: E.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          {metrics.map((m) => (
            <div key={m.label}>
              <span className="el-metric" data-value={m.value} data-suffix={m.suffix} data-prefix={m.prefix} style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 800, color: "#FFFFFF", display: "block", letterSpacing: "-0.03em" }}>0</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 8, display: "block" }}>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: E.accent, letterSpacing: 1.5, textTransform: "uppercase" }}>Testimonials</span>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, marginTop: 12, letterSpacing: "-0.02em" }}>Loved by teams everywhere.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { quote: "Elevate replaced three tools for us. Our team is faster and our clients are happier.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "SC" },
              { quote: "The API is incredibly well-documented. We had our integration running in under a day.", name: "Marcus Webb", role: "Lead Engineer, Pinnacle", avatar: "MW" },
            ].map((t) => (
              <div key={t.name} className="el-test" style={{ padding: 36, background: E.bgSoft, border: `1px solid ${E.border}`, borderRadius: 16, transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = E.accent; e.currentTarget.style.boxShadow = `0 8px 32px ${E.accentGlow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = E.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                  <div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, display: "block" }}>{t.name}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textMuted }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 48px", background: E.bgSoft, textAlign: "center" }}>
        <div className="el-cta" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Ready to{" "}
            <span style={{ background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>elevate?</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: E.textMuted, marginTop: 16, lineHeight: 1.7 }}>Start free. No credit card. Upgrade when you&apos;re ready.</p>
          <div style={{ padding: 2, background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, borderRadius: 10, display: "inline-block", marginTop: 32 }}>
            <span style={{ display: "block", padding: "16px 44px", background: E.text, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, borderRadius: 8, cursor: "pointer", transition: "background 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "transparent")}
              onMouseLeave={(e) => (e.currentTarget.style.background = E.text)}
            >Get Started Free →</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px", borderTop: `1px solid ${E.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`, borderRadius: 5 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700 }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Status", "Blog", "Twitter"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textDim, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textDim)}
            >{s}</a>
          ))}
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link href="/work/designs/elevate" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: E.text, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}>← Breakdown</Link>
      </div>
    </div>
  );
}
