"use client";

/**
 * VITALIS — About Page
 *
 * Design language: Organic, wellness, rounded. Pill-shaped containers.
 * Soft bloom/blur reveals. Breathing animations (scale pulse). Clip-path circles.
 * Warm + green tones. Flowing, unhurried pace.
 *
 * Layout: Asymmetric hero with organic blob shape → Breathing values pills →
 * Horizontal team scroll with circular clip reveal → Certification ribbon →
 * Full-width mission statement with blur-in
 *
 * NOT: grid cards. NOT: sharp corners. NOT: fast/aggressive animations.
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitalisLayout, V, FH, FB, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { num: "01", title: "Listen First", body: "Every treatment starts with understanding. We spend time learning your history, goals, and concerns.", icon: "👂" },
  { num: "02", title: "Treat the Root Cause", body: "We look beyond symptoms. Our approach addresses underlying dysfunction for lasting results.", icon: "🌱" },
  { num: "03", title: "Evidence-Based", body: "Every technique is backed by clinical research. We stay current with the latest rehabilitation science.", icon: "📋" },
  { num: "04", title: "Empower Independence", body: "Our goal is to give you tools to manage your own health. We teach, not just treat.", icon: "💪" },
];

const team = [
  { name: "Dr. Sarah Lim", role: "Founder & Lead Physiotherapist", credentials: "DPT, MSc Sports Medicine", years: "15 years", specialty: "Musculoskeletal & Sports" },
  { name: "Dr. James Tan", role: "Sports Rehabilitation", credentials: "DPT, CSCS, CES", years: "12 years", specialty: "ACL Recovery & Return-to-Play" },
  { name: "Maya Chen", role: "Massage & Myofascial", credentials: "RMT, Cert. Myofascial Release", years: "8 years", specialty: "Deep Tissue & Trigger Point" },
  { name: "Dr. Aisha Rahman", role: "Acupuncture & TCM", credentials: "MATCM, Licensed Acupuncturist", years: "10 years", specialty: "Holistic & Dry Needling" },
];

const stats = [
  { value: "2018", label: "Established" },
  { value: "15+", label: "Years Combined Experience" },
  { value: "4,200+", label: "Patients Treated" },
  { value: "98%", label: "Patient Satisfaction" },
];

export default function VitalisAboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero: soft blur-in with scale
      el.querySelectorAll(".vt-bloom").forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, filter: "blur(12px)", scale: 0.95 },
          { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power2.out", delay: 0.2 + i * 0.15 }
        );
      });

      // Organic blob: gentle breathing pulse
      const blob = el.querySelector(".vt-blob");
      if (blob) {
        gsap.to(blob, {
          scale: 1.05, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }

      // Values: stagger with rounded clip reveal (circle expanding)
      el.querySelectorAll(".vt-value-pill").forEach((pill, i) => {
        gsap.fromTo(pill,
          { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
          {
            clipPath: "circle(75% at 50% 50%)", opacity: 1,
            duration: 1, ease: "power2.out", delay: i * 0.15,
            scrollTrigger: { trigger: pill, start: "top 85%", once: true },
          }
        );
      });

      // Team cards: slide up with soft bounce
      el.querySelectorAll(".vt-team-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.9, ease: "power2.out", delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Stats: counter with blur-in
      el.querySelectorAll(".vt-stat").forEach((stat, i) => {
        gsap.fromTo(stat,
          { opacity: 0, filter: "blur(8px)", y: 20 },
          {
            opacity: 1, filter: "blur(0px)", y: 0,
            duration: 0.8, ease: "power2.out", delay: i * 0.1,
            scrollTrigger: { trigger: stat, start: "top 88%", once: true },
          }
        );
      });

      // Mission text: word-by-word blur in
      const missionWords = el.querySelectorAll(".vt-mission-word");
      if (missionWords.length) {
        gsap.fromTo(missionWords,
          { opacity: 0, filter: "blur(6px)" },
          {
            opacity: 1, filter: "blur(0px)",
            duration: 0.6, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: missionWords[0], start: "top 80%", once: true },
          }
        );
      }

      // Certifications: slide from right with stagger
      el.querySelectorAll(".vt-cert").forEach((cert, i) => {
        gsap.fromTo(cert,
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: i * 0.08,
            scrollTrigger: { trigger: cert, start: "top 90%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const missionText = "To restore movement, relieve pain, and empower every patient to live without limits.";
  const missionWords = missionText.split(" ");

  return (
    <VitalisLayout>
      <div ref={mainRef}>
        {/* ═══ HERO — Asymmetric with organic blob ═══ */}
        <section style={{
          padding: isMobile ? "40px 20px 60px" : "60px 48px 100px",
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          gap: isMobile ? 40 : 64,
          alignItems: "center",
        }}>
          <div>
            <span className="vt-bloom" style={{
              fontFamily: FB, fontSize: 13, fontWeight: 600,
              color: V.accent, letterSpacing: 2, display: "block", marginBottom: 16,
            }}>OUR STORY</span>

            <h1 className="vt-bloom" style={{
              fontFamily: FH, fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 400, lineHeight: 1.15, margin: 0,
            }}>
              Built on care,{" "}
              <em style={{ fontStyle: "italic", color: V.accent }}>not volume.</em>
            </h1>

            <p className="vt-bloom" style={{
              fontFamily: FB, fontSize: 16, color: V.muted,
              marginTop: 24, lineHeight: 1.85, maxWidth: 480,
            }}>
              Vitalis was founded in 2018 with a simple belief: healthcare should be personal. We saw too many clinics rushing patients through — 10-minute appointments, generic exercises, no follow-up. We built something different.
            </p>

            <p className="vt-bloom" style={{
              fontFamily: FB, fontSize: 16, color: V.muted,
              marginTop: 14, lineHeight: 1.85, maxWidth: 480,
            }}>
              Today, every session is unhurried. Every plan is tailored. Every patient matters.
            </p>
          </div>

          {/* Organic blob shape */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="vt-blob" style={{
              width: isMobile ? 240 : 340,
              height: isMobile ? 240 : 340,
              borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
              background: `linear-gradient(135deg, ${V.accentLight}, ${V.bgSoft})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                width: "60%", height: "60%",
                borderRadius: "50%",
                background: V.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 16px 48px rgba(61,139,112,0.08)",
              }}>
                <span style={{ fontSize: 48, opacity: 0.7 }}>🌿</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS — Soft blur-in counters ═══ */}
        <section style={{
          padding: isMobile ? "48px 20px" : "72px 48px",
          background: V.bgSoft,
          borderTop: `1px solid ${V.border}`,
          borderBottom: `1px solid ${V.border}`,
        }}>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 24 : 0,
          }}>
            {stats.map((s, i) => (
              <div key={s.label} className="vt-stat" style={{
                textAlign: "center",
                borderRight: !isMobile && i < stats.length - 1 ? `1px solid ${V.border}` : "none",
                padding: "0 20px",
              }}>
                <span style={{
                  fontFamily: FH, fontSize: isMobile ? 28 : 36,
                  fontWeight: 400, color: V.accent, display: "block",
                  fontStyle: "italic",
                }}>{s.value}</span>
                <span style={{
                  fontFamily: FB, fontSize: 12, color: V.muted,
                  display: "block", marginTop: 6, fontWeight: 600,
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ MISSION — Word-by-word blur reveal ═══ */}
        <section style={{
          padding: isMobile ? "72px 20px" : "120px 48px",
          textAlign: "center",
          background: V.bgDark,
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <span style={{
              fontFamily: FB, fontSize: 13, fontWeight: 600,
              color: V.warm, letterSpacing: 2, display: "block", marginBottom: 24,
            }}>OUR MISSION</span>

            <h2 style={{
              fontFamily: FH, fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 400, color: V.white, lineHeight: 1.3,
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 12px",
            }}>
              {missionWords.map((word, i) => (
                <span key={i} className="vt-mission-word" style={{
                  display: "inline-block",
                  fontStyle: (word === "without" || word === "limits.") ? "italic" : "normal",
                  color: (word === "without" || word === "limits.") ? V.warm : V.white,
                }}>{word}</span>
              ))}
            </h2>
          </div>
        </section>

        {/* ═══ VALUES — Pill-shaped containers with circle clip reveal ═══ */}
        <section style={{ padding: isMobile ? "72px 20px" : "120px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>OUR PHILOSOPHY</span>
              <h2 style={{ fontFamily: FH, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, marginTop: 10 }}>
                What guides our care.
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 20,
            }}>
              {values.map((val) => (
                <div key={val.num} className="vt-value-pill" style={{
                  padding: isMobile ? "28px 24px" : "36px 40px",
                  background: V.white,
                  border: `1px solid ${V.border}`,
                  borderRadius: 999,
                  display: "flex", alignItems: "center", gap: 20,
                  transition: "all 0.4s ease",
                  overflow: "hidden",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = V.accent;
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(61,139,112,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = V.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: V.accentLight, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0,
                  }}>{val.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: FB, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>{val.title}</h3>
                    <p style={{ fontFamily: FB, fontSize: 14, color: V.muted, lineHeight: 1.6, margin: 0 }}>{val.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TEAM — Rounded cards with circle avatars ═══ */}
        <section style={{ padding: isMobile ? "48px 20px 72px" : "80px 48px 120px", background: V.bgSoft }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>YOUR PRACTITIONERS</span>
              <h2 style={{ fontFamily: FH, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, marginTop: 10 }}>
                Hands you can trust.
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: 20,
            }}>
              {team.map((member) => (
                <div key={member.name} className="vt-team-card" style={{
                  padding: isMobile ? "24px 20px" : "32px 36px",
                  background: V.white,
                  border: `1px solid ${V.border}`,
                  borderRadius: 24,
                  display: "flex", gap: 20, alignItems: "center",
                  transition: "all 0.4s ease",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Circular avatar */}
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: V.accentLight, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: FH, fontSize: 24, color: V.accent, fontStyle: "italic" }}>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: FB, fontSize: 16, fontWeight: 700, margin: "0 0 2px" }}>{member.name}</h3>
                    <span style={{ fontFamily: FB, fontSize: 13, color: V.accent, fontWeight: 600, display: "block" }}>{member.role}</span>
                    <span style={{ fontFamily: FB, fontSize: 12, color: V.dim, display: "block", marginTop: 2 }}>{member.credentials}</span>
                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999,
                        background: V.accentLight, fontFamily: FB, fontSize: 11,
                        color: V.accent, fontWeight: 600,
                      }}>{member.years}</span>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999,
                        background: V.bgSoft, fontFamily: FB, fontSize: 11,
                        color: V.muted, fontWeight: 500, border: `1px solid ${V.border}`,
                      }}>{member.specialty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CERTIFICATIONS — Horizontal ribbon ═══ */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.accent, letterSpacing: 2 }}>ACCREDITATIONS</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 400, marginTop: 10, marginBottom: 36 }}>
              Trusted and <em style={{ fontStyle: "italic" }}>verified.</em>
            </h2>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center",
            }}>
              {[
                "MOH Registered", "Malaysian Physiotherapy Association",
                "World Confederation for Physical Therapy", "NSCA Certified",
                "ISO 9001:2015", "Allied Health Compliant",
              ].map((cert) => (
                <div key={cert} className="vt-cert" style={{
                  padding: "10px 20px", borderRadius: 999,
                  background: V.white, border: `1px solid ${V.border}`,
                  fontFamily: FB, fontSize: 13, fontWeight: 600, color: V.text,
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = V.accent; e.currentTarget.style.background = V.accentLight; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = V.border; e.currentTarget.style.background = V.white; }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: V.accentLight, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: V.accent,
                  }}>✓</span>
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </VitalisLayout>
  );
}
