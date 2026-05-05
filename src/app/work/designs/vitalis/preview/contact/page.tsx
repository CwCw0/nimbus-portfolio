"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VitalisLayout, V, FH, FB, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  "Physiotherapy",
  "Sports Rehabilitation",
  "Posture Analysis",
  "Massage Therapy",
  "Acupuncture",
  "Nutrition Coaching",
  "Not sure — need guidance",
];

const clinicInfo = [
  {
    icon: "📍",
    label: "Address",
    value: "Level 3, Wellness Tower\n88 Jalan Ampang, 50450\nKuala Lumpur, Malaysia",
  },
  {
    icon: "🕐",
    label: "Hours",
    value: "Mon — Fri: 8:00 AM — 7:00 PM\nSaturday: 9:00 AM — 3:00 PM\nSunday: Closed",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+60 3-2456 7890",
  },
  {
    icon: "✉",
    label: "Email",
    value: "hello@vitaliswellness.com",
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 15,
  color: "#1B2E2A",
  background: "#FFFFFF",
  border: "1px solid #E2DDD5",
  borderRadius: 12,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: "#1B2E2A",
  display: "block",
  marginBottom: 6,
};

export default function VitalisContactPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = V.accent;
    e.currentTarget.style.boxShadow = `0 0 0 3px ${V.accentLight}`;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = V.border;
    e.currentTarget.style.boxShadow = "none";
  };

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

      // Form card
      const form = el.querySelector(".vt-form");
      if (form) {
        gsap.fromTo(
          form,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
        );
      }

      // Sidebar
      const sidebar = el.querySelector(".vt-sidebar");
      if (sidebar) {
        gsap.fromTo(
          sidebar,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.45 }
        );
      }

      // Map
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <VitalisLayout>
      <div ref={mainRef}>
        {/* Header */}
        <section
          style={{
            padding: isMobile ? "40px 20px 24px" : "60px 48px 32px",
            textAlign: "center",
          }}
        >
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
            CONTACT & BOOKING
          </span>
          <h1
            className="vt-h-anim"
            style={{
              fontFamily: FH,
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: "0 auto",
              maxWidth: 600,
            }}
          >
            Book your <em style={{ fontStyle: "italic", color: V.accent }}>first session.</em>
          </h1>
          <p
            className="vt-h-anim"
            style={{
              fontFamily: FB,
              fontSize: 17,
              color: V.muted,
              marginTop: 16,
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "16px auto 0",
            }}
          >
            New patients welcome. Fill in the form below and we&apos;ll confirm your appointment
            within 24 hours.
          </p>
        </section>

        {/* Form + Sidebar */}
        <section
          style={{
            padding: isMobile ? "20px 20px 60px" : "20px 48px 100px",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 380px",
              gap: isMobile ? 32 : 40,
              alignItems: "start",
            }}
          >
            {/* Form */}
            <div
              className="vt-form"
              style={{
                padding: isMobile ? 24 : 40,
                background: V.white,
                border: `1px solid ${V.border}`,
                borderRadius: 20,
              }}
            >
              <h2
                style={{
                  fontFamily: FH,
                  fontSize: 26,
                  fontWeight: 400,
                  margin: "0 0 28px",
                }}
              >
                Request an Appointment
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 20,
                }}
              >
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="e.g. Sarah Lim"
                    style={inputStyle}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="sarah@email.com"
                    style={inputStyle}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="+60 12-345 6789"
                    style={inputStyle}
                  />
                </div>

                {/* Service */}
                <div>
                  <label style={labelStyle}>Service *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={handleFocus as any}
                    onBlur={handleBlur as any}
                    style={{
                      ...inputStyle,
                      appearance: "none" as const,
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7C76' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      paddingRight: 40,
                    }}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((svc) => (
                      <option key={svc} value={svc}>
                        {svc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div style={{ gridColumn: isMobile ? undefined : "1 / -1" }}>
                  <label style={labelStyle}>Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                </div>

                {/* Message */}
                <div style={{ gridColumn: isMobile ? undefined : "1 / -1" }}>
                  <label style={labelStyle}>Additional Notes</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus as any}
                    onBlur={handleBlur as any}
                    placeholder="Tell us about your condition, previous treatments, or anything we should know..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical" as const,
                      minHeight: 100,
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "16px 32px",
                  marginTop: 24,
                  background: V.accent,
                  color: V.white,
                  fontFamily: FB,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(61,139,112,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Request Appointment
              </button>

              <p
                style={{
                  fontFamily: FB,
                  fontSize: 12,
                  color: V.dim,
                  textAlign: "center",
                  marginTop: 14,
                  marginBottom: 0,
                }}
              >
                We&apos;ll confirm your appointment via email within 24 hours.
              </p>
            </div>

            {/* Sidebar */}
            <div className="vt-sidebar" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Clinic info cards */}
              {clinicInfo.map((info) => (
                <div
                  key={info.label}
                  style={{
                    padding: 24,
                    background: V.white,
                    border: `1px solid ${V.border}`,
                    borderRadius: 20,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = V.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = V.border;
                  }}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: V.accentLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: FB,
                          fontSize: 12,
                          fontWeight: 600,
                          color: V.dim,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {info.label}
                      </span>
                      <span
                        style={{
                          fontFamily: FB,
                          fontSize: 14,
                          color: V.text,
                          lineHeight: 1.7,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {info.value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Trust badge */}
              <div
                style={{
                  padding: 24,
                  background: V.bgAccent,
                  borderRadius: 20,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: V.accentLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    fontSize: 20,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontFamily: FB,
                    fontSize: 15,
                    fontWeight: 700,
                    color: V.text,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Verified & Licensed
                </span>
                <span
                  style={{
                    fontFamily: FB,
                    fontSize: 13,
                    color: V.muted,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  4.9★ Google Rating &middot; 200+ Reviews
                </span>
                <span style={{ fontFamily: FB, fontSize: 12, color: V.dim }}>
                  MOH Registered Clinic
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section
          style={{
            padding: isMobile ? "0 20px 60px" : "0 48px 100px",
          }}
        >
          <div
            className="vt-rev"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              height: isMobile ? 240 : 360,
              background: V.bgSoft,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${V.border}`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Grid pattern for map feel */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(${V.border} 1px, transparent 1px), linear-gradient(90deg, ${V.border} 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                opacity: 0.4,
              }}
            />
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: V.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                <span style={{ fontSize: 24, color: V.white }}>📍</span>
              </div>
              <span
                style={{
                  fontFamily: FB,
                  fontSize: 15,
                  fontWeight: 600,
                  color: V.text,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Vitalis Wellness Clinic
              </span>
              <span
                style={{
                  fontFamily: FB,
                  fontSize: 13,
                  color: V.muted,
                  display: "block",
                }}
              >
                Level 3, Wellness Tower, 88 Jalan Ampang, Kuala Lumpur
              </span>
              <a
                href="#"
                style={{
                  display: "inline-block",
                  marginTop: 16,
                  padding: "10px 24px",
                  background: V.white,
                  border: `1px solid ${V.border}`,
                  borderRadius: 100,
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 600,
                  color: V.accent,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = V.accent;
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = V.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>
      </div>
    </VitalisLayout>
  );
}
