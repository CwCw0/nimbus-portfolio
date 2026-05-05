"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElevateLayout, E } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: "📧",
    title: "Email Us",
    detail: "hello@elevate.app",
    sub: "We respond within 24 hours.",
  },
  {
    icon: "💬",
    title: "Live Chat",
    detail: "Available 9AM — 6PM PST",
    sub: "Real people, not bots. Avg response < 4 min.",
  },
  {
    icon: "📞",
    title: "Phone",
    detail: "+1 (415) 555-0132",
    sub: "Enterprise customers only.",
  },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero
      el.querySelectorAll(".ct-hero-anim").forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out" }
        );
      });

      // Form + sidebar
      el.querySelectorAll(".ct-content-anim").forEach((node, i) => {
        gsap.fromTo(
          node,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
          }
        );
      });

      // Contact info cards
      el.querySelectorAll(".ct-info").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    color: E.text,
    background: E.bgSoft,
    border: `1px solid ${E.border}`,
    borderRadius: 10,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: E.text,
    marginBottom: 6,
    display: "block",
  };

  return (
    <ElevateLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section
          style={{
            padding: isMobile ? "100px 20px 40px" : "140px 48px 60px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${E.border} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              opacity: 0.5,
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 660, margin: "0 auto" }}>
            <span
              className="ct-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: E.accent,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Contact
            </span>
            <h1
              className="ct-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 36 : "clamp(40px, 5vw, 56px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginTop: 16,
              }}
            >
              Let&apos;s{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                start a conversation.
              </span>
            </h1>
            <p
              className="ct-hero-anim"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? 16 : 18,
                color: E.textMuted,
                marginTop: 16,
                lineHeight: 1.7,
              }}
            >
              Whether you have a question, want a demo, or are ready to get started — we&apos;re
              here to help.
            </p>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section style={{ padding: isMobile ? "40px 20px 80px" : "60px 48px 120px" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
              gap: isMobile ? 48 : 64,
              alignItems: "start",
            }}
          >
            {/* Form */}
            <div
              className="ct-content-anim"
              style={{
                padding: isMobile ? 28 : 40,
                background: E.bgSoft,
                border: `1px solid ${E.border}`,
                borderRadius: 18,
              }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                      marginBottom: 28,
                    }}
                  >
                    Send us a message
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: 20,
                      marginBottom: 20,
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = E.accent)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = E.border)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Work Email</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = E.accent)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = E.border)}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = E.accent)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = E.border)}
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your team and what you're looking for..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: 120,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = E.accent)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = E.border)}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "16px 0",
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Send Message →
                  </button>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      color: E.textDim,
                      marginTop: 14,
                      textAlign: "center",
                    }}
                  >
                    We&apos;ll get back to you within one business day.
                  </p>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${E.gradient1}, ${E.gradient2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: 28,
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      color: E.textMuted,
                      lineHeight: 1.6,
                    }}
                  >
                    Thanks for reaching out. Our team will review your message and get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", message: "" });
                    }}
                    style={{
                      marginTop: 24,
                      padding: "10px 24px",
                      background: "none",
                      border: `1px solid ${E.border}`,
                      borderRadius: 8,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: E.text,
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = E.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = E.border)}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="ct-content-anim">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="ct-info"
                    style={{
                      padding: 28,
                      background: E.bgSoft,
                      border: `1px solid ${E.border}`,
                      borderRadius: 14,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = E.accent;
                      e.currentTarget.style.transform = "translateX(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = E.border;
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{info.icon}</span>
                      <h4
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 16,
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {info.title}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: E.accent,
                        margin: "0 0 4px",
                      }}
                    >
                      {info.detail}
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        color: E.textMuted,
                        margin: 0,
                      }}
                    >
                      {info.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Office Location */}
              <div
                style={{
                  marginTop: 24,
                  padding: 28,
                  background: E.bgDark,
                  borderRadius: 14,
                  color: "#FFFFFF",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>📍</span>
                  <h4
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    Our Office
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  548 Market Street, Suite 400
                  <br />
                  San Francisco, CA 94104
                  <br />
                  United States
                </p>
                <div
                  style={{
                    marginTop: 20,
                    height: 140,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${E.gradient1}33, ${E.gradient2}33)`,
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Map placeholder
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ElevateLayout>
  );
}
