"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitalisLayout, V, FH, FB, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Dr. Sarah Lim",
    role: "Founder & Lead Physiotherapist",
    credentials: "DPT, MSc Sports Medicine",
    bio: "15 years of clinical experience in musculoskeletal and sports physiotherapy. Former physio for national athletics.",
  },
  {
    name: "Dr. James Tan",
    role: "Sports Rehabilitation Specialist",
    credentials: "DPT, CSCS, CES",
    bio: "Specialises in ACL recovery, rotator cuff rehab, and return-to-play protocols for competitive athletes.",
  },
  {
    name: "Maya Chen",
    role: "Massage & Myofascial Therapist",
    credentials: "RMT, Cert. Myofascial Release",
    bio: "Expert in deep tissue and trigger point therapy. Trained in both Western remedial and traditional Eastern techniques.",
  },
  {
    name: "Dr. Aisha Rahman",
    role: "Acupuncture & TCM Practitioner",
    credentials: "MATCM, Licensed Acupuncturist",
    bio: "Certified in both traditional Chinese medicine and Western dry-needling. Integrates holistic approaches with clinical evidence.",
  },
];

const values = [
  {
    num: "01",
    title: "Listen First",
    body: "Every treatment starts with understanding. We spend time learning your history, goals, and concerns before prescribing anything.",
  },
  {
    num: "02",
    title: "Treat the Root Cause",
    body: "We look beyond symptoms. Our approach addresses the underlying dysfunction so results last, not just temporary relief.",
  },
  {
    num: "03",
    title: "Evidence-Based Care",
    body: "Every technique we use is backed by clinical research. We stay current with the latest rehabilitation science and best practices.",
  },
  {
    num: "04",
    title: "Empower Independence",
    body: "Our goal is to give you the tools to manage your own health. We teach, not just treat, so you stay well beyond the clinic.",
  },
];

const certifications = [
  "Ministry of Health (MOH) Registered",
  "Malaysian Physiotherapy Association",
  "World Confederation for Physical Therapy",
  "NSCA Certified Strength & Conditioning",
  "ISO 9001:2015 Certified Clinic",
  "Allied Health Professions Act Compliant",
];

export default function VitalisAboutPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero
      el.querySelectorAll(".vt-h-anim").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15 + i * 0.1 }
        );
      });

      // Values
      el.querySelectorAll(".vt-val").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });

      // Team
      el.querySelectorAll(".vt-team").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // General reveals
      el.querySelectorAll(".vt-rev").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
      });

      // Clinic photo clip
      el.querySelectorAll(".vt-clip").forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: img, start: "top 80%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <VitalisLayout>
      <div ref={mainRef}>
        {/* Hero — Story */}
        <section
          style={{
            padding: isMobile ? "40px 20px 48px" : "60px 48px 80px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 32 : 64,
              alignItems: "center",
            }}
          >
            {/* Text */}
            <div>
              <span
                className="vt-h-anim"
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
                OUR STORY
              </span>
              <h1
                className="vt-h-anim"
                style={{
                  fontFamily: FH,
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Built on care, <em style={{ fontStyle: "italic", color: V.accent }}>not volume.</em>
              </h1>
              <p
                className="vt-h-anim"
                style={{
                  fontFamily: FB,
                  fontSize: 16,
                  color: V.muted,
                  marginTop: 22,
                  lineHeight: 1.8,
                }}
              >
                Vitalis was founded in 2018 with a simple belief: healthcare should be personal. We
                saw too many clinics rushing patients through — 10-minute appointments, generic
                exercises, no follow-up. We built something different.
              </p>
              <p
                className="vt-h-anim"
                style={{
                  fontFamily: FB,
                  fontSize: 16,
                  color: V.muted,
                  marginTop: 14,
                  lineHeight: 1.8,
                }}
              >
                Today, Vitalis is a team of dedicated practitioners who believe in treating people,
                not conditions. Every session is unhurried. Every plan is tailored. Every patient
                matters.
              </p>
            </div>

            {/* Clinic photo placeholder */}
            <div
              className="vt-clip"
              style={{
                height: isMobile ? 280 : 400,
                background: V.bgSoft,
                borderRadius: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 72, opacity: 0.15, display: "block" }}>🏥</span>
                <span
                  style={{
                    fontFamily: FB,
                    fontSize: 13,
                    color: V.dim,
                    display: "block",
                    marginTop: 8,
                  }}
                >
                  Clinic Interior
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section
          style={{
            padding: isMobile ? "48px 20px" : "80px 48px",
            background: V.bgDark,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <span
              className="vt-rev"
              style={{
                fontFamily: FB,
                fontSize: 13,
                fontWeight: 600,
                color: V.warm,
                letterSpacing: 2,
                display: "block",
                marginBottom: 14,
              }}
            >
              OUR MISSION
            </span>
            <h2
              className="vt-rev"
              style={{
                fontFamily: FH,
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 400,
                color: V.white,
                lineHeight: 1.2,
                marginTop: 0,
              }}
            >
              To restore movement, relieve pain, and empower every patient to live{" "}
              <em style={{ fontStyle: "italic", color: V.warm }}>without limits.</em>
            </h2>
            <p
              className="vt-rev"
              style={{
                fontFamily: FB,
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                marginTop: 20,
                lineHeight: 1.8,
              }}
            >
              We combine clinical expertise with genuine compassion. Our practitioners don&apos;t
              just treat — they listen, educate, and guide you toward long-term wellness.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: isMobile ? "60px 20px" : "100px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="vt-rev" style={{ textAlign: "center", marginBottom: 48 }}>
              <span
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 600,
                  color: V.accent,
                  letterSpacing: 2,
                }}
              >
                OUR VALUES
              </span>
              <h2
                style={{
                  fontFamily: FH,
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  marginTop: 10,
                }}
              >
                What we believe.
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: 20,
              }}
            >
              {values.map((val) => (
                <div
                  key={val.num}
                  className="vt-val"
                  style={{
                    padding: isMobile ? 24 : 36,
                    background: V.white,
                    border: `1px solid ${V.border}`,
                    borderRadius: 20,
                    transition: "all 0.35s ease",
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
                  <span
                    style={{
                      fontFamily: FH,
                      fontSize: 32,
                      color: V.accentLight,
                      fontStyle: "italic",
                      display: "block",
                      marginBottom: 12,
                    }}
                  >
                    {val.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: FB,
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 8,
                      margin: 0,
                    }}
                  >
                    {val.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FB,
                      fontSize: 15,
                      color: V.muted,
                      lineHeight: 1.7,
                      marginTop: 8,
                      marginBottom: 0,
                    }}
                  >
                    {val.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          style={{ padding: isMobile ? "40px 20px 60px" : "60px 48px 100px", background: V.bgSoft }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="vt-rev" style={{ textAlign: "center", marginBottom: 48 }}>
              <span
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 600,
                  color: V.accent,
                  letterSpacing: 2,
                }}
              >
                MEET THE TEAM
              </span>
              <h2
                style={{
                  fontFamily: FH,
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  marginTop: 10,
                }}
              >
                Your practitioners.
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {team.map((member) => (
                <div
                  key={member.name}
                  className="vt-team"
                  style={{
                    padding: isMobile ? 20 : 28,
                    background: V.white,
                    border: `1px solid ${V.border}`,
                    borderRadius: 20,
                    textAlign: "center",
                    transition: "all 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Avatar placeholder */}
                  <div
                    style={{
                      width: isMobile ? 72 : 90,
                      height: isMobile ? 72 : 90,
                      borderRadius: "50%",
                      background: V.accentLight,
                      margin: "0 auto 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: isMobile ? 28 : 36, opacity: 0.5 }}>👤</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: FB,
                      fontSize: isMobile ? 14 : 16,
                      fontWeight: 700,
                      margin: "0 0 4px",
                    }}
                  >
                    {member.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: FB,
                      fontSize: 12,
                      color: V.accent,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {member.role}
                  </span>
                  <span
                    style={{
                      fontFamily: FB,
                      fontSize: 11,
                      color: V.dim,
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    {member.credentials}
                  </span>
                  <p
                    style={{
                      fontFamily: FB,
                      fontSize: 13,
                      color: V.muted,
                      lineHeight: 1.6,
                      margin: 0,
                      display: isMobile ? "none" : "block",
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div className="vt-rev">
              <span
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 600,
                  color: V.accent,
                  letterSpacing: 2,
                }}
              >
                CERTIFICATIONS & ACCREDITATIONS
              </span>
              <h2
                style={{
                  fontFamily: FH,
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 400,
                  marginTop: 10,
                  marginBottom: 36,
                }}
              >
                Trusted and <em style={{ fontStyle: "italic" }}>verified.</em>
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="vt-rev"
                  style={{
                    padding: isMobile ? "16px 12px" : "20px 24px",
                    background: V.white,
                    border: `1px solid ${V.border}`,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = V.accent;
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = V.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: V.accentLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      color: V.accent,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      fontFamily: FB,
                      fontSize: isMobile ? 12 : 14,
                      fontWeight: 600,
                      color: V.text,
                    }}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinic photo banner */}
        <section style={{ padding: isMobile ? "0 20px 60px" : "0 48px 100px" }}>
          <div
            className="vt-clip"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              height: isMobile ? 220 : 360,
              background: V.bgSoft,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 64, opacity: 0.12, display: "block" }}>🌿</span>
              <span style={{ fontFamily: FB, fontSize: 14, color: V.dim }}>
                Clinic Reception & Waiting Area
              </span>
            </div>
          </div>
        </section>
      </div>
    </VitalisLayout>
  );
}
