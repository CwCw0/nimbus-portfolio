"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitalisLayout, V, FH, FB, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Physiotherapy",
    icon: "🦴",
    duration: "45 - 60 min",
    price: "RM 180 - RM 250",
    desc: "Evidence-based manual therapy and exercise prescription for musculoskeletal pain, post-surgical recovery, and chronic conditions. We assess movement patterns, identify root causes, and build a structured plan to restore function.",
    includes: ["Initial assessment & diagnosis", "Manual therapy & mobilisation", "Personalised exercise programme", "Progress tracking & follow-ups"],
  },
  {
    title: "Sports Rehabilitation",
    icon: "⚡",
    duration: "60 min",
    price: "RM 220 - RM 300",
    desc: "Return-to-play programmes designed around your sport, position, and goals. From ACL recovery to shoulder impingement, we combine clinical rehab with sports-specific conditioning to get you back on the field stronger.",
    includes: ["Sport-specific movement screening", "Progressive loading protocols", "Return-to-play criteria testing", "Injury prevention strategies"],
  },
  {
    title: "Posture Analysis",
    icon: "📐",
    duration: "30 - 45 min",
    price: "RM 120 - RM 160",
    desc: "Comprehensive postural assessment using visual analysis and functional movement screening. Ideal for desk workers, students, and anyone experiencing tension headaches, rounded shoulders, or lower back discomfort.",
    includes: ["Full-body postural screening", "Ergonomic workstation advice", "Corrective exercise plan", "Follow-up reassessment"],
  },
  {
    title: "Massage Therapy",
    icon: "🤲",
    duration: "60 - 90 min",
    price: "RM 160 - RM 280",
    desc: "Deep tissue, remedial, and myofascial release techniques to relieve muscle tension, improve circulation, and accelerate recovery. Tailored pressure and focus areas based on your needs.",
    includes: ["Pre-treatment consultation", "Targeted deep tissue work", "Myofascial release techniques", "Post-session stretching guidance"],
  },
  {
    title: "Acupuncture",
    icon: "🪡",
    duration: "45 - 60 min",
    price: "RM 150 - RM 220",
    desc: "Traditional and dry-needling acupuncture for pain management, muscle recovery, and stress relief. Administered by certified practitioners with clinical experience in both Western and Eastern approaches.",
    includes: ["Health history review", "Needle placement & stimulation", "Trigger point dry needling", "Combined therapy options"],
  },
  {
    title: "Nutrition Coaching",
    icon: "🥗",
    duration: "45 min",
    price: "RM 140 - RM 200",
    desc: "Personalised nutrition plans to support recovery, reduce inflammation, and optimise performance. Our certified nutritionists work alongside your treatment plan for holistic results.",
    includes: ["Dietary assessment & goals", "Personalised meal framework", "Supplement guidance", "Monthly check-ins & adjustments"],
  },
];

export default function VitalisServicesPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header: bloom/blur entrance
      el.querySelectorAll(".vt-hero-anim").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, filter: "blur(10px)", scale: 0.95 },
          { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power2.out", delay: 0.2 + i * 0.12 }
        );
      });

      // Service cards: circle clip-path reveal (expands from icon position)
      el.querySelectorAll(".vt-svc-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "circle(0% at 10% 20%)", opacity: 0 },
          {
            clipPath: "circle(100% at 50% 50%)",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      });

      // Bottom CTA: blur bloom
      el.querySelectorAll(".vt-cta-reveal").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, filter: "blur(8px)", y: 15 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <VitalisLayout>
      <div ref={mainRef}>
        {/* Hero header */}
        <section style={{ padding: isMobile ? "40px 20px 32px" : "60px 48px 40px", textAlign: "center" }}>
          <span
            className="vt-hero-anim"
            style={{
              fontFamily: FB,
              fontSize: 13,
              fontWeight: 600,
              color: V.accent,
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 14,
            }}
          >
            OUR SERVICES
          </span>
          <h1
            className="vt-hero-anim"
            style={{
              fontFamily: FH,
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.15,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            Comprehensive care, <em style={{ fontStyle: "italic", color: V.accent }}>personalised.</em>
          </h1>
          <p
            className="vt-hero-anim"
            style={{
              fontFamily: FB,
              fontSize: 17,
              color: V.muted,
              marginTop: 18,
              maxWidth: 520,
              margin: "18px auto 0",
              lineHeight: 1.7,
            }}
          >
            Every treatment starts with listening. We understand your body, your goals, and your
            lifestyle before prescribing anything.
          </p>

          {/* Trust badges */}
          <div
            className="vt-hero-anim"
            style={{
              display: "flex",
              gap: isMobile ? 16 : 32,
              justifyContent: "center",
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "✓", label: "Licensed Practitioners" },
              { icon: "★", label: "4.9 Google Rating" },
              { icon: "🛡", label: "MOH Registered" },
            ].map((badge) => (
              <div
                key={badge.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  background: V.white,
                  border: `1px solid ${V.border}`,
                  borderRadius: 100,
                }}
              >
                <span style={{ fontSize: 14 }}>{badge.icon}</span>
                <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: V.text }}>
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Service cards */}
        <section style={{ padding: isMobile ? "20px 20px 60px" : "20px 48px 100px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {services.map((svc, idx) => (
                <div
                  key={svc.title}
                  className="vt-svc-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? 20 : 48,
                    padding: isMobile ? 24 : 40,
                    background: V.white,
                    border: `1px solid ${V.border}`,
                    borderRadius: 20,
                    transition: "all 0.35s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = V.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = V.border;
                  }}
                >
                  {/* Left — info */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <span style={{ fontSize: 28 }}>{svc.icon}</span>
                      <h2
                        style={{
                          fontFamily: FH,
                          fontSize: isMobile ? 24 : 28,
                          fontWeight: 400,
                          margin: 0,
                        }}
                      >
                        {svc.title}
                      </h2>
                    </div>
                    <p
                      style={{
                        fontFamily: FB,
                        fontSize: 15,
                        color: V.muted,
                        lineHeight: 1.75,
                        marginBottom: 20,
                      }}
                    >
                      {svc.desc}
                    </p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                      <span
                        style={{
                          padding: "6px 16px",
                          background: V.accentLight,
                          borderRadius: 100,
                          fontFamily: FB,
                          fontSize: 13,
                          fontWeight: 600,
                          color: V.accent,
                        }}
                      >
                        {svc.duration}
                      </span>
                      <span
                        style={{
                          padding: "6px 16px",
                          background: V.bgSoft,
                          borderRadius: 100,
                          fontFamily: FB,
                          fontSize: 13,
                          fontWeight: 600,
                          color: V.text,
                        }}
                      >
                        {svc.price}
                      </span>
                    </div>
                  </div>

                  {/* Right — includes + CTA */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: FB,
                          fontSize: 12,
                          fontWeight: 600,
                          color: V.dim,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: 12,
                        }}
                      >
                        INCLUDES
                      </span>
                      {svc.includes.map((item) => (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: V.accentLight,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 11,
                              color: V.accent,
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </div>
                          <span style={{ fontFamily: FB, fontSize: 14, color: V.text }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#"
                      style={{
                        display: "inline-block",
                        marginTop: 20,
                        padding: "12px 28px",
                        background: V.accent,
                        color: V.white,
                        fontFamily: FB,
                        fontSize: 14,
                        fontWeight: 600,
                        borderRadius: 100,
                        textDecoration: "none",
                        textAlign: "center",
                        transition: "all 0.25s ease",
                        alignSelf: isMobile ? "stretch" : "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,139,112,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Book {svc.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ mini section */}
        <section style={{ padding: isMobile ? "40px 20px" : "60px 48px", background: V.bgAccent }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <span
              className="vt-cta-reveal"
              style={{
                fontFamily: FB,
                fontSize: 13,
                fontWeight: 600,
                color: V.accent,
                letterSpacing: 2,
                display: "block",
                marginBottom: 12,
              }}
            >
              NOT SURE WHICH SERVICE?
            </span>
            <h2
              className="vt-cta-reveal"
              style={{
                fontFamily: FH,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                marginTop: 0,
              }}
            >
              Let us <em style={{ fontStyle: "italic" }}>recommend.</em>
            </h2>
            <p
              className="vt-cta-reveal"
              style={{
                fontFamily: FB,
                fontSize: 16,
                color: V.muted,
                marginTop: 14,
                lineHeight: 1.7,
              }}
            >
              Book a free 10-minute consultation call. Our team will listen to your concerns and
              recommend the right treatment path — no commitment required.
            </p>
            <a
              href="#"
              className="vt-cta-reveal"
              style={{
                display: "inline-block",
                marginTop: 28,
                padding: "16px 44px",
                background: V.accent,
                color: V.white,
                fontFamily: FB,
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 100,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,139,112,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Free Consultation
            </a>
          </div>
        </section>
      </div>
    </VitalisLayout>
  );
}
