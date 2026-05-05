"use client";

/**
 * MONO — Contact Page
 *
 * Email address as massive heading.
 * Minimal underline-input form below.
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  MonoLayout,
  Divider,
  useLineDraw,
  useIsMobile,
  FONT,
  PALETTE,
} from "../shared";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const [emailHovered, setEmailHovered] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useLineDraw(containerRef);

  /* Email char reveal */
  useEffect(() => {
    const el = emailRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars" });
    gsap.set(split.chars || [], { y: "100%", opacity: 0 });
    gsap.to(split.chars || [], {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: 0.025,
      ease: "power3.out",
      delay: 0.2,
    });

    return () => split.revert();
  }, []);

  /* Staggered fade-ups */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-contact-fade").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.8 + i * 0.1,
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const inputStyle = (field: string): React.CSSProperties => ({
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 400,
    color: PALETTE.text,
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focusedField === field ? PALETTE.text : PALETTE.border}`,
    outline: "none",
    width: "100%",
    padding: "16px 0",
    transition: "border-color 0.3s",
  });

  return (
    <MonoLayout>
      <div ref={containerRef}>
        {/* Email as hero */}
        <section
          style={{
            padding: isMobile ? "100px 24px 60px" : "160px 48px 80px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <span
              className="mn-contact-fade"
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 5,
                color: PALETTE.muted,
                display: "block",
                marginBottom: 32,
              }}
            >
              GET IN TOUCH
            </span>
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={emailRef}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
                style={{
                  fontFamily: FONT,
                  fontSize: isMobile
                    ? "clamp(28px, 8vw, 48px)"
                    : "clamp(48px, 7vw, 110px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  margin: 0,
                  cursor: "pointer",
                  color: emailHovered ? PALETTE.accent : PALETTE.text,
                  transition: "color 0.3s",
                }}
              >
                hello@mono.studio
              </h1>
            </div>
            <p
              className="mn-contact-fade"
              style={{
                fontFamily: FONT,
                fontSize: 15,
                color: PALETTE.muted,
                marginTop: 24,
                fontWeight: 400,
              }}
            >
              or just say hi &mdash; I respond to everything.
            </p>
          </div>
        </section>

        {/* Form */}
        <section
          style={{
            padding: isMobile ? "60px 24px 120px" : "80px 48px 160px",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <Divider style={{ marginBottom: isMobile ? 48 : 64 }} />

            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 36,
              }}
            >
              <div className="mn-contact-fade">
                <label
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 4,
                    color: PALETTE.muted,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  NAME
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={inputStyle("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="mn-contact-fade">
                <label
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 4,
                    color: PALETTE.muted,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={inputStyle("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="mn-contact-fade">
                <label
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 4,
                    color: PALETTE.muted,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  MESSAGE
                </label>
                <textarea
                  placeholder="Tell me about your project"
                  rows={4}
                  style={{
                    ...inputStyle("message"),
                    resize: "none",
                    lineHeight: 1.7,
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="mn-contact-fade">
                <button
                  type="submit"
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 3,
                    color: PALETTE.text,
                    background: "transparent",
                    border: `1px solid ${PALETTE.text}`,
                    padding: "16px 48px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = PALETTE.text;
                    e.currentTarget.style.color = PALETTE.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = PALETTE.text;
                  }}
                >
                  SEND
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </MonoLayout>
  );
}
