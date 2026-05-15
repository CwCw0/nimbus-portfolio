"use client";

/**
 * VITALIS — Contact Page
 *
 * Design language: Warm, organic, rounded. Pill-shaped inputs.
 * Breathing animations. Organic blob background. Soft focus glow.
 *
 * Layout: Split — booking info with organic blob + pill-input form →
 * Location card with rounded map placeholder → Opening hours ribbon
 *
 * NOT: generic 2-col form+sidebar. NOT: sharp corners.
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitalisLayout, V, FH, FB, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

export default function VitalisContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".vt-bloom").forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, filter: "blur(10px)", y: 20 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power2.out", delay: 0.2 + i * 0.12 }
        );
      });

      el.querySelectorAll(".vt-form-field").forEach((field, i) => {
        gsap.fromTo(field,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.1,
            scrollTrigger: { trigger: field, start: "top 90%", once: true } }
        );
      });

      el.querySelectorAll(".vt-info-card").forEach((card, i) => {
        gsap.fromTo(card,
          { clipPath: "circle(0% at 0% 50%)", opacity: 0 },
          { clipPath: "circle(100% at 50% 50%)", opacity: 1,
            duration: 1, ease: "power2.out", delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%", once: true } }
        );
      });

      const blob = el.querySelector(".vt-contact-blob");
      if (blob) {
        gsap.to(blob, { scale: 1.06, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const pillInput = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "14px 24px",
    fontFamily: FB,
    fontSize: 15,
    color: V.text,
    background: V.white,
    border: `1.5px solid ${focusedField === field ? V.accent : V.border}`,
    borderRadius: 999,
    outline: "none",
    transition: "all 0.3s",
    boxShadow: focusedField === field ? "0 4px 16px rgba(61,139,112,0.08)" : "none",
    boxSizing: "border-box" as const,
  });

  return (
    <VitalisLayout>
      <div ref={mainRef}>
        {/* ═══ HERO ═══ */}
        <section style={{
          padding: isMobile ? "40px 20px 48px" : "60px 48px 80px",
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 64,
          alignItems: "center",
        }}>
          <div>
            <span className="vt-bloom" style={{
              fontFamily: FB, fontSize: 13, fontWeight: 600,
              color: V.accent, letterSpacing: 2, display: "block", marginBottom: 14,
            }}>BOOK A SESSION</span>

            <h1 className="vt-bloom" style={{
              fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400, lineHeight: 1.15, margin: 0,
            }}>
              Your healing journey{" "}
              <em style={{ fontStyle: "italic", color: V.accent }}>starts here.</em>
            </h1>

            <p className="vt-bloom" style={{
              fontFamily: FB, fontSize: 16, color: V.muted,
              marginTop: 20, lineHeight: 1.8, maxWidth: 420,
            }}>
              Whether you&apos;re managing chronic pain, recovering from injury, or seeking preventive care — we&apos;re here to help. No referral needed.
            </p>

            <div className="vt-bloom" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
              {["No Referral Needed", "Same-Week Appointments", "Insurance Accepted"].map((info) => (
                <span key={info} style={{
                  padding: "8px 18px", borderRadius: 999,
                  background: V.accentLight, fontFamily: FB,
                  fontSize: 12, fontWeight: 600, color: V.accent,
                }}>{info}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="vt-contact-blob" style={{
              width: isMobile ? 240 : 300,
              height: isMobile ? 240 : 300,
              borderRadius: "50% 40% 60% 40% / 40% 50% 40% 60%",
              background: V.accentLight,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 12, padding: 40, textAlign: "center",
            }}>
              <span style={{ fontSize: 32 }}>📞</span>
              <span style={{ fontFamily: FB, fontSize: 18, fontWeight: 700, color: V.text }}>+60 3-7890 1234</span>
              <span style={{ fontFamily: FB, fontSize: 14, color: V.muted }}>vitalis.clinic@gmail.com</span>
            </div>
          </div>
        </section>

        {/* ═══ FORM ═══ */}
        <section style={{ padding: isMobile ? "48px 20px" : "72px 48px", background: V.bgSoft }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: FH, fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 400, marginBottom: 32, textAlign: "center",
            }}>Send us a message.</h2>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="vt-form-field" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                <input type="text" placeholder="Full name" style={pillInput("name")}
                  onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} />
                <input type="tel" placeholder="Phone number" style={pillInput("phone")}
                  onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} />
              </div>
              <div className="vt-form-field">
                <input type="email" placeholder="Email address" style={pillInput("email")}
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
              </div>
              <div className="vt-form-field">
                <select style={{ ...pillInput("service"), appearance: "none" as const, cursor: "pointer" }}
                  onFocus={() => setFocusedField("service")} onBlur={() => setFocusedField(null)}>
                  <option value="">Select a service...</option>
                  <option>Physiotherapy</option>
                  <option>Sports Rehabilitation</option>
                  <option>Massage Therapy</option>
                  <option>Acupuncture / Dry Needling</option>
                  <option>General Consultation</option>
                </select>
              </div>
              <div className="vt-form-field">
                <textarea placeholder="Briefly describe your concern..." rows={3}
                  style={{ ...pillInput("message"), borderRadius: 24, resize: "none" as const, lineHeight: 1.7 }}
                  onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} />
              </div>
              <div className="vt-form-field">
                <button type="submit" style={{
                  width: "100%", padding: "16px 0",
                  background: V.accent, color: V.white,
                  fontFamily: FB, fontSize: 15, fontWeight: 700,
                  border: "none", borderRadius: 999, cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 16px rgba(61,139,112,0.15)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,139,112,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(61,139,112,0.15)"; }}
                >Book Appointment →</button>
              </div>
            </form>
          </div>
        </section>

        {/* ═══ INFO CARDS ═══ */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 48px" }}>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20,
          }}>
            {[
              { icon: "📍", title: "Location", detail: "Level 3, Wisma Health\nJalan Wellness 42\n50450 Kuala Lumpur" },
              { icon: "🕐", title: "Hours", detail: "Mon–Fri: 8AM–7PM\nSat: 9AM–2PM\nSun: Closed" },
              { icon: "🚗", title: "Getting Here", detail: "Free parking available\nLRT: Bangsar Station\n5-min walk from exit B" },
            ].map((info) => (
              <div key={info.title} className="vt-info-card" style={{
                padding: 28, background: V.white, border: `1px solid ${V.border}`,
                borderRadius: 24, textAlign: "center", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = V.accent; e.currentTarget.style.boxShadow = "0 8px 32px rgba(61,139,112,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = V.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: V.accentLight, margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                }}>{info.icon}</div>
                <h3 style={{ fontFamily: FB, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{info.title}</h3>
                <p style={{ fontFamily: FB, fontSize: 14, color: V.muted, lineHeight: 1.7, whiteSpace: "pre-line", margin: 0 }}>{info.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ MAP ═══ */}
        <section style={{ padding: isMobile ? "0 20px 60px" : "0 48px 100px" }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            height: isMobile ? 200 : 300,
            borderRadius: 32, background: V.bgSoft, border: `1px solid ${V.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 40, opacity: 0.3, display: "block" }}>📍</span>
              <span style={{ fontFamily: FB, fontSize: 13, color: V.dim, marginTop: 8, display: "block" }}>
                Map Integration — Jalan Wellness 42, KL
              </span>
            </div>
          </div>
        </section>
      </div>
    </VitalisLayout>
  );
}
