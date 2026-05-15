"use client";

/**
 * ELEVATE — Contact Page
 *
 * Design language: 3D perspective card form. Gradient focus rings. Glow states.
 * Floating glassmorphism info cards. NOT: generic 2-col form+sidebar.
 *
 * Layout: Centered hero → Floating 3D form card (tilts on mouse) →
 * Glassmorphism contact method pills → FAQ accordion with gradient expand
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElevateLayout, E } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "How quickly can we get started?", a: "Most teams are onboarded within 48 hours. Enterprise accounts with SSO requirements typically take 3-5 days." },
  { q: "Is there a free tier?", a: "Yes — Elevate is free for teams up to 5 members with full feature access. No credit card required." },
  { q: "Can we migrate from existing tools?", a: "We have one-click importers for Jira, Linear, Notion, Asana, and Monday. Your data transfers in minutes." },
  { q: "What about data security?", a: "SOC 2 Type II certified. End-to-end encryption. Data stored in your region of choice. We never train AI on your data." },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);

  // 3D tilt for form card
  const handleFormTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -4;
    const rotateY = ((x - rect.width / 2) / rect.width) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, [isMobile]);

  const resetFormTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero scale + blur entrance
      el.querySelectorAll(".ev-ct-hero").forEach((node, i) => {
        gsap.fromTo(node,
          { scale: 0.9, opacity: 0, filter: "blur(6px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, delay: 0.2 + i * 0.12, ease: "power3.out" }
        );
      });

      // Form card rise
      const formCard = formRef.current;
      if (formCard) {
        gsap.fromTo(formCard,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.5, ease: "power3.out" }
        );
      }

      // Contact pills
      el.querySelectorAll(".ev-pill").forEach((pill, i) => {
        gsap.fromTo(pill,
          { x: -20, opacity: 0, scale: 0.9 },
          {
            x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", delay: i * 0.1,
            scrollTrigger: { trigger: pill, start: "top 88%", once: true },
          }
        );
      });

      // FAQ items
      el.querySelectorAll(".ev-faq").forEach((item, i) => {
        gsap.fromTo(item,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, delay: i * 0.08, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "14px 18px",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    color: E.text,
    background: E.bg,
    border: `2px solid ${focusedField === field ? "transparent" : E.border}`,
    borderRadius: 12,
    outline: "none",
    transition: "all 0.3s",
    boxSizing: "border-box" as const,
    backgroundClip: "padding-box",
    boxShadow: focusedField === field ? `0 0 0 2px ${E.gradient1}, 0 4px 16px ${E.accentGlow}` : "none",
  });

  return (
    <ElevateLayout>
      <div ref={pageRef}>
        {/* ═══ HERO ═══ */}
        <section style={{
          padding: isMobile ? "60px 20px 40px" : "100px 48px 60px",
          textAlign: "center",
        }}>
          <span className="ev-ct-hero" style={{
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700,
            color: E.accent, letterSpacing: 1.5, display: "block",
          }}>CONTACT</span>
          <h1 className="ev-ct-hero" style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? 36 : "clamp(44px, 5vw, 60px)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginTop: 14, textWrap: "balance" as any,
          }}>
            Let&apos;s{" "}
            <span style={{
              background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>build something</span>{" "}together.
          </h1>
          <p className="ev-ct-hero" style={{
            fontFamily: "Inter, sans-serif", fontSize: 18, color: E.textMuted,
            marginTop: 16, lineHeight: 1.7, maxWidth: 480, marginLeft: "auto", marginRight: "auto",
          }}>
            Whether you have a question, want a demo, or are ready to get started — we&apos;re here.
          </p>
        </section>

        {/* ═══ 3D FORM CARD ═══ */}
        <section style={{ padding: isMobile ? "20px 20px 60px" : "20px 48px 100px" }}>
          <div
            ref={formRef}
            onMouseMove={handleFormTilt}
            onMouseLeave={resetFormTilt}
            style={{
              maxWidth: 600,
              margin: "0 auto",
              padding: isMobile ? 28 : 44,
              background: E.bgSoft,
              border: `1px solid ${E.border}`,
              borderRadius: 24,
              transition: "transform 0.1s ease-out",
              boxShadow: `0 24px 80px rgba(59,130,246,0.06), 0 0 0 1px ${E.border}`,
            }}
          >
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Name</label>
                    <input type="text" placeholder="Jane Smith" style={inputStyle("name")}
                      onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
                    <input type="email" placeholder="jane@company.com" style={inputStyle("email")}
                      onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Company</label>
                  <input type="text" placeholder="Acme Inc." style={inputStyle("company")}
                    onFocus={() => setFocusedField("company")} onBlur={() => setFocusedField(null)} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Team Size</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["1-5", "6-20", "21-100", "100+"].map((size) => (
                      <button key={size} type="button" style={{
                        padding: "8px 16px",
                        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
                        border: `1px solid ${E.border}`, borderRadius: 8,
                        background: E.bg, color: E.textMuted, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = E.accent; e.currentTarget.style.color = E.accent; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = E.border; e.currentTarget.style.color = E.textMuted; }}
                      >{size}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your team and needs..."
                    style={{ ...inputStyle("message"), resize: "none" as const, minHeight: 100 }}
                    onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} />
                </div>

                <button type="submit" style={{
                  width: "100%", padding: "16px 0",
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700,
                  border: "none", borderRadius: 12, cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: `0 4px 16px ${E.accentGlow}`,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${E.accentGlow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${E.accentGlow}`; }}
                >
                  Send Message →
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px", fontSize: 32, color: "#fff",
                  boxShadow: `0 8px 32px ${E.accentGlow}`,
                }}>✓</div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 24, fontWeight: 800 }}>Message sent!</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: E.textMuted, marginTop: 8, lineHeight: 1.6 }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ═══ CONTACT METHODS — Glassmorphism pills ═══ */}
        <section style={{ padding: isMobile ? "40px 20px 60px" : "40px 48px 80px" }}>
          <div style={{
            maxWidth: 800, margin: "0 auto",
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16,
          }}>
            {[
              { icon: "📧", label: "Email", value: "hello@elevate.app", sub: "24hr response" },
              { icon: "💬", label: "Live Chat", value: "9AM — 6PM PST", sub: "Avg < 4 min" },
              { icon: "📞", label: "Phone", value: "+1 (415) 555-0132", sub: "Enterprise only" },
            ].map((method) => (
              <div key={method.label} className="ev-pill" style={{
                padding: 24,
                background: "rgba(248,250,252,0.8)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${E.border}`,
                borderRadius: 16,
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "default",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = E.accent;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${E.accentGlow}`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = E.border;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{method.icon}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, display: "block" }}>{method.label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: E.accent, fontWeight: 600, display: "block", marginTop: 4 }}>{method.value}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: E.textDim, display: "block", marginTop: 4 }}>{method.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FAQ — Accordion with gradient expand ═══ */}
        <section style={{ padding: isMobile ? "40px 20px 80px" : "60px 48px 120px", background: E.bgSoft }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 800, marginBottom: 32, textAlign: "center", letterSpacing: "-0.02em" }}>
              Frequently asked questions.
            </h2>

            {faqs.map((faq, i) => (
              <div key={i} className="ev-faq" style={{
                marginBottom: 12,
                borderRadius: 14,
                border: `1px solid ${openFaq === i ? E.accent : E.border}`,
                overflow: "hidden",
                transition: "all 0.3s",
                background: openFaq === i ? `linear-gradient(135deg, ${E.gradient1}05, ${E.gradient2}05)` : E.bg,
                boxShadow: openFaq === i ? `0 4px 16px ${E.accentGlow}` : "none",
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 24px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600,
                    color: E.text, textAlign: "left",
                  }}
                >
                  {faq.q}
                  <span style={{
                    fontSize: 18, color: E.accent,
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 200 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}>
                  <p style={{
                    padding: "0 24px 18px",
                    fontFamily: "Inter, sans-serif", fontSize: 14, color: E.textMuted, lineHeight: 1.7, margin: 0,
                  }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ElevateLayout>
  );
}
