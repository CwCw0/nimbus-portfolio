"use client";

/**
 * VITALIS v3 — Complete rebuild
 *
 * UNIQUE PATTERNS:
 * - Navigation: Pill-shaped floating nav with rounded everything
 * - Scroll: Gentle fade reveals with slight scale (calming, not dramatic)
 * - Hover: Cards float up with soft shadow bloom (not hard shadow)
 * - Background: Soft gradient washes between sections
 * - Typography: Playfair Display italic for warmth + Plus Jakarta for clarity
 * - Special: Floating "Verified Clinic" badge, circular image crops, booking-first CTAs
 *
 * Fonts: Playfair Display + Plus Jakarta Sans
 * Palette: Warm cream #FAFAF7 + Sage green #3D8B70
 * References: parsleyhealth.com, hims.com, hevahealth.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FH = "'Playfair Display', Georgia, serif";
const FB = "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif";

const V = {
  bg: "#FAFAF7", bgSoft: "#F3F1EC", bgDark: "#1B2E2A", bgAccent: "#E8F0ED",
  text: "#1B2E2A", muted: "#6B7C76", dim: "#8A9A94", accent: "#3D8B70",
  accentLight: "#D4E8E0", warm: "#C4956A", border: "#E2DDD5", white: "#FFFFFF",
};

const services = [
  { title: "Physiotherapy", desc: "Evidence-based movement therapy for pain relief and recovery.", icon: "🦴", time: "45-60 min" },
  { title: "Sports Rehab", desc: "Return-to-play programs designed around your goals.", icon: "⚡", time: "60 min" },
  { title: "Posture Analysis", desc: "Comprehensive assessment with personalised correction plan.", icon: "📐", time: "30 min" },
  { title: "Massage Therapy", desc: "Deep tissue and remedial massage for tension and recovery.", icon: "🤲", time: "60-90 min" },
];

const testimonials = [
  { text: "After three sessions, my chronic back pain was genuinely better. Not managed — better.", name: "Sarah L.", role: "Marathon runner" },
  { text: "The team actually listens. First clinic where I didn't feel rushed.", name: "James K.", role: "Office professional" },
  { text: "My posture assessment changed how I sit, stand, and sleep.", name: "Aisha M.", role: "Designer" },
];

export default function VitalisPreview() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero — gentle stagger
      const heroEls = el.querySelectorAll(".vt-anim");
      gsap.set(heroEls, { y: 30, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out", delay: 0.2 });

      // Floating badge
      const badge = el.querySelector(".vt-badge");
      if (badge) {
        gsap.set(badge, { y: 20, opacity: 0, scale: 0.9 });
        gsap.to(badge, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.8 });
        // Gentle float
        gsap.to(badge, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6 });
      }

      // Service cards — gentle stagger with slight scale
      el.querySelectorAll(".vt-svc").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Stats count up
      el.querySelectorAll(".vt-count").forEach((stat) => {
        const target = parseInt((stat as HTMLElement).dataset.target || "0", 10);
        const suffix = (stat as HTMLElement).dataset.suffix || "";
        gsap.fromTo({ v: 0 }, { v: 0 }, {
          v: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: stat, start: "top 85%", once: true },
          onUpdate: function () { (stat as HTMLElement).textContent = Math.round(this.targets()[0].v) + suffix; },
        });
      });

      // Testimonials
      el.querySelectorAll(".vt-test").forEach((t, i) => {
        gsap.fromTo(t, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.12,
          scrollTrigger: { trigger: t, start: "top 88%", once: true },
        });
      });

      // General reveals
      el.querySelectorAll(".vt-rev").forEach((item) => {
        gsap.fromTo(item, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // Image clip reveals
      el.querySelectorAll(".vt-clip").forEach((img) => {
        gsap.fromTo(img, { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: img, start: "top 80%", once: true },
        });
      });

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: V.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: V.accentLight, display: "flex", alignItems: "center", justifyContent: "center", animation: "vt-breathe 1.5s ease-in-out infinite" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: V.accent }} />
        </div>
        <span style={{ fontFamily: FH, fontSize: 28, color: V.text, fontWeight: 400, fontStyle: "italic" }}>Vitalis</span>
        <style>{`@keyframes vt-breathe { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.25); opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <div ref={mainRef} style={{ background: V.bg, color: V.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* NAV — pill-shaped floating on desktop, simple bar on mobile */}
      <nav style={{ position: "fixed", top: isMobile ? 0 : 16, left: isMobile ? 0 : "50%", right: isMobile ? 0 : "auto", transform: isMobile ? "none" : "translateX(-50%)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", gap: isMobile ? 0 : 32, padding: isMobile ? "12px 20px" : "12px 32px", background: "rgba(250,250,247,0.9)", backdropFilter: "blur(20px)", borderRadius: isMobile ? 0 : 100, border: isMobile ? "none" : `1px solid ${V.border}`, borderBottom: isMobile ? `1px solid ${V.border}` : undefined, boxShadow: isMobile ? "none" : "0 4px 24px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: V.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: V.white }} />
          </div>
          <span style={{ fontFamily: FH, fontSize: 20, fontWeight: 400, fontStyle: "italic" }}>Vitalis</span>
        </div>
        {!isMobile && ["Services", "About", "Contact"].map((item) => (
          <a key={item} href="#" style={{ fontFamily: FB, fontSize: 13, color: V.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = V.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = V.muted)}
          >{item}</a>
        ))}
        <span style={{ padding: "8px 24px", background: V.accent, color: V.white, fontFamily: FB, fontSize: 13, fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >Book Now</span>
      </nav>

      {/* HERO — split, warm, with floating badge */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", alignItems: "center", padding: "100px 48px 60px", gap: 48 }}>
        <div>
          <span className="vt-anim" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 20 }}>WELLNESS CLINIC</span>
          <h1 className="vt-anim" style={{ fontFamily: FH, fontSize: "clamp(42px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 1.12 }}>
            Your body deserves
            <br /><em style={{ fontStyle: "italic", color: V.accent }}>better care.</em>
          </h1>
          <p className="vt-anim" style={{ fontFamily: FB, fontSize: 17, color: V.muted, marginTop: 24, maxWidth: 420, lineHeight: 1.75 }}>
            Evidence-based physiotherapy and wellness. We treat the root cause — not just the symptoms.
          </p>
          <div className="vt-anim" style={{ display: "flex", gap: 14, marginTop: 32 }}>
            <span style={{ padding: "14px 36px", background: V.accent, color: V.white, fontFamily: FB, fontSize: 15, fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,139,112,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >Book Appointment</span>
            <span style={{ padding: "14px 32px", border: `1px solid ${V.border}`, fontFamily: FB, fontSize: 15, fontWeight: 500, borderRadius: 100, cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = V.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = V.border)}
            >Our Services</span>
          </div>
          <div className="vt-anim" style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[{ num: "5,000+", label: "Patients" }, { num: "15+", label: "Years" }, { num: "4.9★", label: "Rating" }].map((s) => (
              <div key={s.label}>
                <span style={{ fontFamily: FH, fontSize: 26, color: V.text }}>{s.num}</span>
                <span style={{ fontFamily: FB, fontSize: 12, color: V.dim, display: "block" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="vt-anim" style={{ width: "100%", height: "70vh", background: V.bgSoft, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <span style={{ fontSize: 120, opacity: 0.12 }}>🧘</span>
          </div>
          {/* Floating badge */}
          <div className="vt-badge" style={{ position: "absolute", bottom: -12, left: -12, padding: "14px 20px", background: V.white, borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: V.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</div>
            <div>
              <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 700, color: V.text, display: "block" }}>Verified Clinic</span>
              <span style={{ fontFamily: FB, fontSize: 11, color: V.dim }}>Licensed practitioners</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — rounded cards */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="vt-rev" style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2, textTransform: "uppercase" }}>Our Services</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 400, marginTop: 10 }}>Comprehensive care, <em style={{ fontStyle: "italic" }}>personalised.</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 18 }}>
            {services.map((svc) => (
              <div key={svc.title} className="vt-svc" style={{ padding: 28, background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = V.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = V.border; }}
              >
                <span style={{ fontSize: 32, display: "block", marginBottom: 14 }}>{svc.icon}</span>
                <h3 style={{ fontFamily: FB, fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{svc.title}</h3>
                <p style={{ fontFamily: FB, fontSize: 14, color: V.muted, lineHeight: 1.6, marginBottom: 12 }}>{svc.desc}</p>
                <span style={{ fontFamily: FB, fontSize: 12, color: V.accent, fontWeight: 600 }}>{svc.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VITALIS — dark section */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", background: V.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <span className="vt-rev" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.warm, letterSpacing: 2 }}>WHY VITALIS</span>
            <h2 className="vt-rev" style={{ fontFamily: FH, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: V.white, marginTop: 14, lineHeight: 1.15 }}>
              We treat people,<br /><em style={{ fontStyle: "italic", color: V.warm }}>not conditions.</em>
            </h2>
            <p className="vt-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginTop: 20, maxWidth: 420 }}>
              Every plan starts with listening. We understand your body, goals, and lifestyle before prescribing anything.
            </p>
            <div className="vt-rev" style={{ display: "flex", gap: 36, marginTop: 36 }}>
              {[{ target: "5000", suffix: "+", label: "Patients" }, { target: "98", suffix: "%", label: "Satisfaction" }].map((s) => (
                <div key={s.label}>
                  <span className="vt-count" data-target={s.target} data-suffix={s.suffix} style={{ fontFamily: FH, fontSize: 40, color: V.white, display: "block" }}>0</span>
                  <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="vt-clip" style={{ height: 380, background: "rgba(255,255,255,0.04)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 80, opacity: 0.25 }}>🏥</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="vt-rev" style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>TESTIMONIALS</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, marginTop: 10 }}>What patients say.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="vt-test" style={{ padding: 32, background: V.white, border: `1px solid ${V.border}`, borderRadius: 20, transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => (<span key={j} style={{ color: V.warm, fontSize: 15 }}>★</span>))}
                </div>
                <p style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>&ldquo;{t.text}&rdquo;</p>
                <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 700, display: "block" }}>{t.name}</span>
                <span style={{ fontFamily: FB, fontSize: 12, color: V.dim }}>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "60px 20px" : "80px 48px", background: V.bgAccent, textAlign: "center", borderRadius: 0 }}>
        <div className="vt-rev" style={{ maxWidth: 560, margin: "0 auto" }}>
          <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>READY?</span>
          <h2 style={{ fontFamily: FH, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, marginTop: 12 }}>Book your <em style={{ fontStyle: "italic" }}>first session.</em></h2>
          <p style={{ fontFamily: FB, fontSize: 16, color: V.muted, marginTop: 14, lineHeight: 1.7 }}>Full assessment + personalised plan. New patients welcome.</p>
          <span style={{ display: "inline-block", marginTop: 28, padding: "16px 44px", background: V.accent, color: V.white, fontFamily: FB, fontSize: 16, fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,139,112,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >Book Now — It&apos;s Easy</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 48px", background: V.bgDark, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: V.accent }} />
          <span style={{ fontFamily: FH, fontSize: 18, color: V.white, fontStyle: "italic" }}>Vitalis</span>
        </div>
        <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>&copy; 2026 Vitalis Wellness</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link href="/work/designs/vitalis" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: V.accent, color: V.white, fontFamily: FB, fontSize: 12, fontWeight: 600, textDecoration: "none", borderRadius: 100 }}>← Breakdown</Link>
      </div>
    </div>
  );
}
