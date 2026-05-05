"use client";

/**
 * STUDIO NOIR — Contact Page
 *
 * Design language: Email as cinematic hero. Line-draw form reveals.
 * Staggered info blocks. No generic 2-col form+sidebar.
 *
 * Layout: Full-viewport email reveal → Availability status bar →
 * Sequential form fields (one at a time feel) → Process steps (horizontal) → Footer info
 *
 * References: obys.agency/contact, dennissnellenberg.com/contact
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SNLayout, C, F_HEAD, F_BODY, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { num: "01", title: "DISCOVERY", body: "A 30-minute call. We listen. You talk about your brand, your audience, your goals. No pitch deck required." },
  { num: "02", title: "PROPOSAL", body: "Within 5 days, you'll receive a scope document with timeline, investment, and our creative approach." },
  { num: "03", title: "CREATION", body: "We work in focused 2-week sprints. You see progress weekly. Feedback is immediate and iterative." },
  { num: "04", title: "DELIVERY", body: "Final handoff with documentation, assets, and a 30-day support window for any refinements." },
];

export default function StudioNoirContact() {
  const mainRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const [emailHovered, setEmailHovered] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Email char-by-char reveal
      const email = emailRef.current;
      if (email) {
        const split = new SplitType(email, { types: "chars" });
        gsap.set(split.chars || [], { y: "100%", opacity: 0 });
        gsap.to(split.chars || [], {
          y: "0%", opacity: 1, duration: 0.9, stagger: 0.025, ease: "power3.out", delay: 0.5,
        });
      }

      // Availability bar slide-in
      const avail = el.querySelector(".sn-avail");
      if (avail) {
        gsap.fromTo(avail, { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.4,
        });
      }

      // Form fields: sequential line-draw entrance
      el.querySelectorAll(".sn-form-field").forEach((field, i) => {
        const line = field.querySelector(".sn-field-line");
        const content = field.querySelector(".sn-field-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: field, start: "top 85%", once: true },
        });

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left" });
          tl.to(line, { scaleX: 1, duration: 0.6, ease: "power2.inOut", delay: i * 0.1 });
        }
        if (content) {
          gsap.set(content, { y: 20, opacity: 0 });
          tl.to(content, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
        }
      });

      // Process steps: clip reveal from bottom
      el.querySelectorAll(".sn-process-step").forEach((step, i) => {
        gsap.fromTo(step, { clipPath: "inset(100% 0 0 0)", opacity: 0 }, {
          clipPath: "inset(0% 0 0 0)", opacity: 1,
          duration: 0.8, ease: "power3.inOut", delay: i * 0.12,
          scrollTrigger: { trigger: step, start: "top 88%", once: true },
        });
      });

      // Info blocks slide from right
      el.querySelectorAll(".sn-info-block").forEach((block, i) => {
        gsap.fromTo(block, { x: 40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: block, start: "top 88%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const fieldLineColor = (field: string) => activeField === field ? C.accent : C.border;

  return (
    <SNLayout current="Contact">
      <div ref={mainRef}>
        {/* ══�� HERO — Email as massive typographic statement ═══ */}
        <section style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: isMobile ? "120px 20px 60px" : "0 48px",
          position: "relative",
        }}>
          <span style={{
            fontFamily: F_BODY,
            fontSize: 11,
            letterSpacing: 6,
            color: C.accent,
            fontWeight: 500,
            display: "block",
            marginBottom: 48,
          }}>
            LET&apos;S TALK
          </span>

          <div style={{ overflow: "hidden" }}>
            <h1
              ref={emailRef}
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              style={{
                fontFamily: F_HEAD,
                fontSize: isMobile ? "36px" : "clamp(56px, 8vw, 120px)",
                lineHeight: 1,
                letterSpacing: "0.02em",
                cursor: "pointer",
                color: emailHovered ? C.accent : C.text,
                transition: "color 0.3s",
              }}
            >
              HELLO@STUDIONOIR.COM
            </h1>
          </div>

          <p style={{
            fontFamily: F_BODY,
            fontSize: 17,
            color: C.dim,
            marginTop: 32,
            maxWidth: 440,
            lineHeight: 1.85,
          }}>
            Have a project that needs restraint? We&apos;d love to hear about it.
          </p>

          {/* Availability status */}
          <div className="sn-avail" style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 28px",
            border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4ADE80",
              boxShadow: "0 0 8px #4ADE8066",
            }} />
            <span style={{
              fontFamily: F_BODY,
              fontSize: 11,
              letterSpacing: 3,
              color: C.dim,
            }}>
              ACCEPTING NEW PROJECTS — Q2 2026
            </span>
          </div>
        </section>

        {/* ═══ FORM — Sequential field reveals ═══ */}
        <section style={{ padding: isMobile ? "60px 20px 80px" : "80px 80px 140px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <span style={{
              fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 56,
            }}>
              TELL US ABOUT YOUR PROJECT
            </span>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { id: "name", label: "YOUR NAME", placeholder: "Alex Mercer" },
                { id: "email", label: "EMAIL", placeholder: "alex@company.com" },
                { id: "company", label: "COMPANY", placeholder: "Acme Inc. (optional)" },
                { id: "budget", label: "BUDGET RANGE", placeholder: "$10K — $25K / $25K — $50K / $50K+" },
              ].map((field) => (
                <div key={field.id} className="sn-form-field" style={{ paddingBottom: 40 }}>
                  <div className="sn-field-content">
                    <label style={{
                      fontFamily: F_BODY, fontSize: 10, letterSpacing: 4, color: C.muted, display: "block", marginBottom: 12,
                    }}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      onFocus={() => setActiveField(field.id)}
                      onBlur={() => setActiveField(null)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        padding: "0 0 16px 0",
                        fontFamily: F_BODY,
                        fontSize: isMobile ? 18 : 22,
                        color: C.text,
                        outline: "none",
                      }}
                    />
                  </div>
                  <div className="sn-field-line" style={{
                    height: 1,
                    background: fieldLineColor(field.id),
                    transition: "background 0.3s",
                  }} />
                </div>
              ))}

              {/* Message field */}
              <div className="sn-form-field" style={{ paddingBottom: 40 }}>
                <div className="sn-field-content">
                  <label style={{
                    fontFamily: F_BODY, fontSize: 10, letterSpacing: 4, color: C.muted, display: "block", marginBottom: 12,
                  }}>
                    PROJECT DETAILS
                  </label>
                  <textarea
                    placeholder="Tell us about your vision, timeline, and what success looks like..."
                    rows={4}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: "0 0 16px 0",
                      fontFamily: F_BODY,
                      fontSize: isMobile ? 16 : 18,
                      color: C.text,
                      outline: "none",
                      resize: "none",
                      lineHeight: 1.7,
                    }}
                  />
                </div>
                <div className="sn-field-line" style={{
                  height: 1,
                  background: fieldLineColor("message"),
                  transition: "background 0.3s",
                }} />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: F_HEAD,
                  fontSize: 16,
                  letterSpacing: 5,
                  padding: "20px 52px",
                  background: C.accent,
                  color: C.bg,
                  border: "none",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "all 0.3s",
                  marginTop: 16,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.accent; }}
              >
                SEND BRIEF ↗
              </button>
            </form>
          </div>
        </section>

        {/* ═══ PROCESS — Horizontal step cards with clip reveal ═══ */}
        <section style={{ padding: isMobile ? "60px 20px 80px" : "100px 80px 140px", background: C.bgAlt }}>
          <span style={{
            fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, display: "block", marginBottom: 56,
          }}>
            HOW WE WORK
          </span>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 24 : 2,
          }}>
            {processSteps.map((step) => (
              <div key={step.num} className="sn-process-step" style={{
                background: C.bgWarm,
                padding: isMobile ? "28px 24px" : "40px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: isMobile ? "auto" : 280,
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Number watermark */}
                <span style={{
                  position: "absolute",
                  bottom: -10,
                  right: 12,
                  fontFamily: F_HEAD,
                  fontSize: 120,
                  color: C.accent,
                  opacity: 0.04,
                  lineHeight: 1,
                }}>
                  {step.num}
                </span>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.accent, letterSpacing: 3, display: "block", marginBottom: 16 }}>{step.num}</span>
                  <h3 style={{ fontFamily: F_HEAD, fontSize: isMobile ? "24px" : "28px", letterSpacing: "0.05em", lineHeight: 1 }}>{step.title}</h3>
                </div>

                <p style={{
                  fontFamily: F_BODY, fontSize: 14, color: C.dim, lineHeight: 1.7, marginTop: 20, position: "relative", zIndex: 1,
                }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ INFO — Slide-in blocks ═══ */}
        <section style={{ padding: isMobile ? "60px 20px 80px" : "120px 80px 160px" }}>
          <div style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 32 : 64,
          }}>
            {[
              { label: "EMAIL", value: "hello@studionoir.com", sub: "We respond within 24 hours." },
              { label: "LOCATION", value: "Remote — Worldwide", sub: "We work across timezones." },
              { label: "SOCIAL", value: "Dribbble / Behance / IG", sub: "@studionoir everywhere." },
            ].map((info) => (
              <div key={info.label} className="sn-info-block" style={{
                borderLeft: `1px solid ${C.border}`,
                paddingLeft: isMobile ? 20 : 28,
              }}>
                <span style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted, display: "block", marginBottom: 12 }}>
                  {info.label}
                </span>
                <span style={{ fontFamily: F_HEAD, fontSize: isMobile ? "20px" : "24px", letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>
                  {info.value}
                </span>
                <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.dim }}>
                  {info.sub}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SNLayout>
  );
}
