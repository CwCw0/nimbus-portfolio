"use client";

/**
 * VITALIS — Healthcare/Wellness Clinic Template
 * Warm, calming, trustworthy. Rounded elements, soft greens.
 * Completely different from every other template.
 * Refs: possiblehealth.org, onemedical.com, parsley health, hims.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FONT_HEAD = "'Playfair Display', 'Georgia', serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif";

const V = {
  bg: "#FAFAF7",
  bgSoft: "#F3F1EC",
  bgDark: "#1B2E2A",
  bgAccent: "#E8F0ED",
  text: "#1B2E2A",
  muted: "#6B7C76",
  dim: "#8A9A94",
  accent: "#3D8B70",
  accentLight: "#D4E8E0",
  warm: "#C4956A",
  border: "#E2DDD5",
  borderDark: "rgba(255,255,255,0.1)",
  radius: "12px",
};

const services = [
  { title: "Physiotherapy", desc: "Evidence-based movement therapy for pain relief and recovery.", icon: "🦴", duration: "45-60 min" },
  { title: "Sports Rehab", desc: "Return-to-play programs designed around your goals.", icon: "⚡", duration: "60 min" },
  { title: "Posture Analysis", desc: "Comprehensive assessment with personalised correction plan.", icon: "📐", duration: "30 min" },
  { title: "Massage Therapy", desc: "Deep tissue and remedial massage for tension and recovery.", icon: "🤲", duration: "60-90 min" },
];

const testimonials = [
  { text: "After three sessions, my chronic back pain was genuinely better. Not managed — better.", name: "Sarah L.", role: "Marathon runner" },
  { text: "The team actually listens. First clinic where I didn't feel rushed through a 10-minute appointment.", name: "James K.", role: "Office professional" },
  { text: "My posture assessment changed how I sit, stand, and sleep. Should have done this years ago.", name: "Aisha M.", role: "Designer" },
];

export default function VitalisPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero elements — soft stagger
      const heroEls = el.querySelectorAll(".vt-hero-fade");
      gsap.set(heroEls, { y: 30, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out", delay: 0.2 });

      // Service cards — rotate in slightly
      el.querySelectorAll(".vt-service").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, rotation: i % 2 === 0 ? -1 : 1 },
          { y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Stats — count up
      el.querySelectorAll(".vt-count").forEach((stat) => {
        const target = parseInt((stat as HTMLElement).dataset.target || "0", 10);
        const suffix = (stat as HTMLElement).dataset.suffix || "";
        gsap.fromTo({ val: 0 }, { val: 0 }, {
          val: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: stat, start: "top 85%", once: true },
          onUpdate: function () { (stat as HTMLElement).textContent = Math.round(this.targets()[0].val) + suffix; },
        });
      });

      // Testimonials — fade up stagger
      el.querySelectorAll(".vt-testimonial").forEach((t, i) => {
        gsap.fromTo(t, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: t, start: "top 88%", once: true },
        });
      });

      // General reveals
      el.querySelectorAll(".vt-reveal").forEach((item) => {
        gsap.fromTo(item, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // Image placeholders — clip reveal
      el.querySelectorAll(".vt-clip").forEach((img) => {
        gsap.fromTo(img,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.inOut",
            scrollTrigger: { trigger: img, start: "top 80%", once: true },
          }
        );
      });

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: V.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: V.accentLight, display: "flex", alignItems: "center", justifyContent: "center", animation: "vt-pulse 1.2s ease-in-out infinite" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: V.accent }} />
        </div>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 24, color: V.text, fontWeight: 400, fontStyle: "italic" }}>Vitalis</span>
        <style>{`@keyframes vt-pulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.3); opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: V.bg, color: V.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* Nav — soft, rounded, warm */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 48px", background: "rgba(250,250,247,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${V.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: V.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 400, fontStyle: "italic", color: V.text }}>Vitalis</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Services", "About", "Team", "Contact"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: FONT_BODY, fontSize: 14, color: V.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = V.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = V.muted)}
            >{item}</a>
          ))}
          <span style={{ padding: "10px 28px", background: V.accent, color: "#fff", fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >Book Now</span>
        </div>
      </nav>

      {/* Hero — split layout, warm, inviting */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "100px 48px 0" }}>
        <div style={{ paddingRight: 64 }}>
          <span className="vt-hero-fade" style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 20 }}>WELLNESS CLINIC</span>
          <h1 className="vt-hero-fade" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 400, color: V.text, lineHeight: 1.15 }}>
            Your body deserves
            <br />
            <em style={{ fontStyle: "italic", color: V.accent }}>better care.</em>
          </h1>
          <p className="vt-hero-fade" style={{ fontFamily: FONT_BODY, fontSize: 17, color: V.muted, marginTop: 28, maxWidth: 440, lineHeight: 1.75 }}>
            Evidence-based physiotherapy and wellness services. We treat the root cause — not just the symptoms.
          </p>
          <div className="vt-hero-fade" style={{ display: "flex", gap: 16, marginTop: 36 }}>
            <span style={{ padding: "14px 36px", background: V.accent, color: "#fff", fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >Book an Appointment</span>
            <span style={{ padding: "14px 36px", border: `1px solid ${V.border}`, fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, borderRadius: 100, cursor: "pointer", color: V.text, transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = V.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = V.border)}
            >Our Services</span>
          </div>
          {/* Trust indicators */}
          <div className="vt-hero-fade" style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[{ num: "5,000+", label: "Patients treated" }, { num: "15+", label: "Years experience" }, { num: "4.9", label: "Google rating" }].map((s) => (
              <div key={s.label}>
                <span style={{ fontFamily: FONT_HEAD, fontSize: 28, color: V.text, display: "block" }}>{s.num}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: V.dim }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image placeholder with rounded treatment */}
        <div className="vt-hero-fade" style={{ position: "relative" }}>
          <div style={{ width: "100%", height: "70vh", background: V.bgSoft, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <span style={{ fontSize: 120, opacity: 0.15 }}>🧘</span>
            <span style={{ position: "absolute", bottom: 20, left: 20, fontFamily: FONT_BODY, fontSize: 11, color: V.dim, letterSpacing: 2 }}>HERO IMAGE</span>
          </div>
          {/* Floating badge */}
          <div style={{ position: "absolute", bottom: -16, left: -16, padding: "16px 24px", background: "#fff", borderRadius: 16, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: V.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✓</div>
            <div>
              <span style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: V.text, display: "block" }}>Verified Clinic</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: V.dim }}>Licensed practitioners</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="vt-reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2, textTransform: "uppercase" }}>Our Services</span>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, marginTop: 12, color: V.text }}>Comprehensive care, <em style={{ fontStyle: "italic" }}>personalised.</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {services.map((svc) => (
              <div key={svc.title} className="vt-service" style={{ padding: 32, background: "#fff", border: `1px solid ${V.border}`, borderRadius: 16, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = V.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = V.border; }}
              >
                <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>{svc.icon}</span>
                <h3 style={{ fontFamily: FONT_BODY, fontSize: 18, fontWeight: 700, color: V.text, marginBottom: 8 }}>{svc.title}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: V.muted, lineHeight: 1.65, marginBottom: 16 }}>{svc.desc}</p>
                <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: V.accent, fontWeight: 600 }}>{svc.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vitalis — dark section */}
      <section style={{ padding: "100px 48px", background: V.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <span className="vt-reveal" style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: V.warm, letterSpacing: 2 }}>WHY VITALIS</span>
            <h2 className="vt-reveal" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#fff", marginTop: 16, lineHeight: 1.15 }}>
              We treat people,
              <br /><em style={{ fontStyle: "italic", color: V.warm }}>not just conditions.</em>
            </h2>
            <p className="vt-reveal" style={{ fontFamily: FONT_BODY, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginTop: 24, maxWidth: 440 }}>
              Every treatment plan starts with listening. We take the time to understand your body, your goals, and your lifestyle before prescribing a single exercise.
            </p>
            <div className="vt-reveal" style={{ display: "flex", gap: 40, marginTop: 40 }}>
              {[{ target: "5000", suffix: "+", label: "Patients" }, { target: "98", suffix: "%", label: "Satisfaction" }, { target: "15", suffix: "+", label: "Years" }].map((s) => (
                <div key={s.label}>
                  <span className="vt-count" data-target={s.target} data-suffix={s.suffix} style={{ fontFamily: FONT_HEAD, fontSize: 40, color: "#fff", display: "block" }}>0</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="vt-clip" style={{ height: 400, background: "rgba(255,255,255,0.05)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 80, opacity: 0.3 }}>🏥</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="vt-reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>TESTIMONIALS</span>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, marginTop: 12 }}>What our patients say.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="vt-testimonial" style={{ padding: 36, background: "#fff", border: `1px solid ${V.border}`, borderRadius: 16 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (<span key={i} style={{ color: V.warm, fontSize: 16 }}>★</span>))}
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: V.text, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 700, color: V.text, display: "block" }}>{t.name}</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: V.dim }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — booking */}
      <section style={{ padding: "100px 48px", background: V.bgAccent, textAlign: "center", borderRadius: "0" }}>
        <div className="vt-reveal" style={{ maxWidth: 600, margin: "0 auto" }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>READY TO FEEL BETTER?</span>
          <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, marginTop: 16, color: V.text }}>Book your <em style={{ fontStyle: "italic" }}>first session.</em></h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: V.muted, marginTop: 16, lineHeight: 1.7 }}>New patient consultations include a full assessment and personalised treatment plan.</p>
          <span style={{ display: "inline-block", marginTop: 32, padding: "16px 48px", background: V.accent, color: "#fff", fontFamily: FONT_BODY, fontSize: 16, fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >Book Now — It&apos;s Easy</span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px", background: V.bgDark, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: V.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 18, color: "#fff", fontStyle: "italic" }}>Vitalis</span>
        </div>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>&copy; 2026 Vitalis Wellness. All rights reserved.</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/vitalis" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: V.accent, color: "#fff", fontFamily: FONT_BODY, fontSize: 12, fontWeight: 600, textDecoration: "none", borderRadius: 100 }}>← Breakdown</Link>
      </div>
    </div>
  );
}
