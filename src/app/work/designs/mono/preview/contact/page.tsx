"use client";

/**
 * MONO — Contact Page
 *
 * Email address as the ENTIRE hero (massive type, char-by-char reveal).
 * Minimal underline-input form with focus = accent color.
 * No labels, just placeholders. Single "SEND" button with border only.
 * Maximum whitespace.
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
  const [btnHovered, setBtnHovered] = useState(false);

  useLineDraw(containerRef);

  /* Email char-by-char reveal */
  useEffect(() => {
    const el = emailRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars" });
    gsap.set(split.chars || [], { y: "110%", opacity: 0 });
    gsap.to(split.chars || [], {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      stagger: 0.035,
      ease: "power3.out",
      delay: 0.3,
    });

    return () => split.revert();
  }, []);

  /* Form fields stagger reveal */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-contact-field").forEach((field, i) => {
        gsap.fromTo(
          field,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: field,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const inputStyle = (field: string): React.CSSProperties => ({
    fontFamily: FONT,
    fontSize: isMobile ? 16 : 18,
    fontWeight: 400,
    color: focusedField === field ? PALETTE.accent : PALETTE.text,
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${
      focusedField === field ? PALETTE.accent : PALETTE.border
    }`,
    outline: "none",
    width: "100%",
    padding: "20px 0",
    transition: "color 0.3s, border-color 0.3s",
    letterSpacing: "-0.01em",
  });

  return (
    <MonoLayout>
      <div ref={containerRef}>
        {/* Email as ENTIRE hero — fills the viewport */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "0 24px" : "0 48px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "100%",
              maxWidth: 1400,
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={emailRef}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
                style={{
                  fontFamily: FONT,
                  fontSize: isMobile
                    ? "clamp(24px, 7.5vw, 44px)"
                    : "clamp(56px, 7.5vw, 130px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  margin: 0,
                  cursor: "pointer",
                  color: emailHovered ? PALETTE.accent : PALETTE.text,
                  transition: "color 0.4s",
                  wordBreak: "break-all",
                }}
              >
                hello@mono.studio
              </h1>
            </div>
          </div>
        </section>

        {/* Form section — maximum whitespace above */}
        <section
          style={{
            padding: isMobile ? "0 24px 160px" : "0 48px 240px",
          }}
        >
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div
              className="mn-line-draw"
              style={{ height: 1, background: PALETTE.border, marginBottom: isMobile ? 64 : 100 }}
            />

            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 48 : 56,
              }}
            >
              <div className="mn-contact-field">
                <input
                  type="text"
                  placeholder="Name"
                  style={inputStyle("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="mn-contact-field">
                <input
                  type="email"
                  placeholder="Email"
                  style={inputStyle("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="mn-contact-field">
                <textarea
                  placeholder="Message"
                  rows={1}
                  style={{
                    ...inputStyle("message"),
                    resize: "none",
                    lineHeight: 1.7,
                    minHeight: 56,
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="mn-contact-field" style={{ marginTop: isMobile ? 16 : 32 }}>
                <button
                  type="submit"
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 4,
                    color: btnHovered ? PALETTE.bg : PALETTE.text,
                    background: btnHovered ? PALETTE.text : "transparent",
                    border: `1px solid ${PALETTE.text}`,
                    padding: "18px 56px",
                    cursor: "pointer",
                    transition: "all 0.3s",
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
