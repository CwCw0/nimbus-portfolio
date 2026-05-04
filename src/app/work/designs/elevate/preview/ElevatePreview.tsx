"use client";

/**
 * ELEVATE — Full Production Preview
 * Clean white corporate SaaS. Real scroll animations.
 * References: linear.app, stripe.com, vercel.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const E = {
  bg: "#FFFFFF",
  bgSoft: "#F8FAFC",
  bgDark: "#0F172A",
  text: "#0F172A",
  textMuted: "#64748B",
  textDim: "#94A3B8",
  accent: "#3B82F6",
  accentLight: "#DBEAFE",
  border: "#E2E8F0",
};

const features = [
  { title: "Lightning Fast", desc: "Sub-100ms response times on every action. No loading spinners, no waiting.", icon: "⚡" },
  { title: "Enterprise Security", desc: "SOC 2 Type II compliant. End-to-end encryption. Your data stays yours.", icon: "🔒" },
  { title: "Team Collaboration", desc: "Real-time multiplayer editing. See your team's cursors, changes, and comments live.", icon: "👥" },
  { title: "API-First", desc: "Everything you see in the UI is available through our REST and GraphQL APIs.", icon: "⚙️" },
  { title: "Analytics Built In", desc: "Understand usage patterns, track engagement, and make data-driven decisions.", icon: "📊" },
  { title: "24/7 Support", desc: "Human support, not chatbots. Average response time under 4 minutes.", icon: "💬" },
];

const metrics = [
  { value: "99.99", suffix: "%", label: "Uptime SLA" },
  { value: "100", suffix: "ms", label: "Response Time", prefix: "<" },
  { value: "10000", suffix: "+", label: "Teams Using Us" },
  { value: "4.9", suffix: "/5", label: "Customer Rating" },
];

export default function ElevatePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero entrance — staggered
      const heroElements = container.querySelectorAll(".el-hero-animate");
      gsap.set(heroElements, { y: 40, opacity: 0 });
      gsap.to(heroElements, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 });

      // Logo bar — fade in from below
      const logos = container.querySelectorAll(".el-logo");
      gsap.set(logos, { y: 20, opacity: 0 });
      gsap.to(logos, { y: 0, opacity: 0.5, duration: 0.5, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: container.querySelector(".el-logo-bar"), start: "top 90%", once: true },
      });

      // Feature cards — staggered reveal with scale
      container.querySelectorAll(".el-feature-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Metric count-ups
      container.querySelectorAll(".el-metric").forEach((el) => {
        const target = parseFloat((el as HTMLElement).dataset.value || "0");
        const prefix = (el as HTMLElement).dataset.prefix || "";
        const suffix = (el as HTMLElement).dataset.suffix || "";
        const isDecimal = String(target).includes(".");

        gsap.fromTo(
          { val: 0 },
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: function () {
              const current = isDecimal ? this.targets()[0].val.toFixed(1) : Math.round(this.targets()[0].val);
              (el as HTMLElement).textContent = prefix + current + suffix;
            },
          }
        );
      });

      // Testimonials — slide in from sides
      const testimonials = container.querySelectorAll(".el-testimonial");
      testimonials.forEach((t, i) => {
        gsap.fromTo(t,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: t, start: "top 85%", once: true },
          }
        );
      });

      // CTA section
      const ctaEl = container.querySelector(".el-cta-section");
      if (ctaEl) {
        gsap.fromTo(ctaEl, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ctaEl, start: "top 80%", once: true },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
        <div style={{ width: 28, height: 28, background: E.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, animation: "el-pulse 1s ease-in-out infinite" }}>E</div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: E.textDim }}>Loading...</span>
        <style>{`@keyframes el-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }`}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: E.bg, color: E.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      {/* Nav — glassmorphism */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 64px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${E.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: E.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700 }}>E</div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700 }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Product", "Pricing", "Docs", "Blog"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: E.textMuted, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textMuted)}
            >{item}</a>
          ))}
          <span style={{ padding: "10px 24px", background: E.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >Get Started</span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "140px 64px 100px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${E.border} 1px, transparent 1px)`, backgroundSize: "32px 32px", opacity: 0.5 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="el-hero-animate" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: E.accentLight, borderRadius: 20, marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: E.accent, animation: "el-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: E.accent }}>Now in public beta</span>
          </div>
          <h1 className="el-hero-animate" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: 800 }}>
            The platform your
            <br />team actually wants to use.
          </h1>
          <p className="el-hero-animate" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: E.textMuted, marginTop: 24, maxWidth: 560, lineHeight: 1.7, marginLeft: "auto", marginRight: "auto" }}>
            Elevate brings your entire workflow into one place. Plan, build, ship, and measure — without the context switching.
          </p>
          <div className="el-hero-animate" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
            <span style={{ padding: "14px 32px", background: E.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, borderRadius: 8, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >Start for Free</span>
            <span style={{ padding: "14px 32px", border: `1px solid ${E.border}`, fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500, borderRadius: 8, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = E.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = E.border)}
            >Watch Demo</span>
          </div>
        </div>
      </section>

      {/* Logo bar */}
      <div className="el-logo-bar" style={{ padding: "48px 64px", borderTop: `1px solid ${E.border}`, borderBottom: `1px solid ${E.border}`, textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textDim, marginBottom: 32, letterSpacing: 0.5 }}>Trusted by 10,000+ teams worldwide</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {["Acme Corp", "TechFlow", "Pinnacle", "Meridian", "CloudBase", "Quantum"].map((logo) => (
            <span key={logo} className="el-logo" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: E.textDim, opacity: 0 }}>{logo}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ padding: "120px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: E.accent, letterSpacing: 1, textTransform: "uppercase" }}>Features</span>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, marginTop: 16, letterSpacing: "-0.02em" }}>Everything you need. Nothing you don&apos;t.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} className="el-feature-card" style={{ padding: 32, background: E.bgSoft, border: `1px solid ${E.border}`, borderRadius: 12, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ fontSize: 28, display: "block", marginBottom: 16 }}>{f.icon}</span>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: E.textMuted, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ padding: "80px 64px", background: E.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          {metrics.map((m) => (
            <div key={m.label}>
              <span className="el-metric" data-value={m.value} data-suffix={m.suffix} data-prefix={m.prefix || ""} style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#FFFFFF", display: "block", letterSpacing: "-0.02em" }}>0</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8, display: "block" }}>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "120px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            { quote: "Elevate replaced three tools for us. Our team is faster and our clients are happier.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "SC" },
            { quote: "The API is incredibly well-documented. We had our integration running in under a day.", name: "Marcus Webb", role: "Lead Engineer, Pinnacle", avatar: "MW" },
          ].map((t) => (
            <div key={t.name} className="el-testimonial" style={{ padding: 40, background: E.bgSoft, border: `1px solid ${E.border}`, borderRadius: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: E.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: E.accent }}>{t.avatar}</div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, display: "block" }}>{t.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textMuted }}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 64px", background: E.bgSoft, textAlign: "center" }}>
        <div className="el-cta-section">
          <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Ready to elevate your workflow?</h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: E.textMuted, marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>Start free. No credit card required.</p>
          <span style={{ display: "inline-block", marginTop: 32, padding: "16px 40px", background: E.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, borderRadius: 8, cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >Get Started Free</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px 64px", borderTop: `1px solid ${E.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textDim }}>&copy; 2026 Elevate. All rights reserved.</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Privacy", "Terms", "Status", "Blog"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: E.textDim, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = E.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = E.textDim)}
            >{s}</a>
          ))}
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/elevate" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: E.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}>← Breakdown</Link>
      </div>
    </div>
  );
}
