"use client";

/**
 * MONO — About Page
 *
 * One large paragraph IS the content.
 * Experience list, comma-separated skills, social links.
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

const experience = [
  { role: "Lead Designer", company: "Studio Null", period: "2024 — Present" },
  { role: "Senior Designer", company: "Form & Co", period: "2021 — 2024" },
  { role: "Designer", company: "Pixel Bureau", period: "2019 — 2021" },
  { role: "Junior Designer", company: "Freelance", period: "2017 — 2019" },
];

const skills =
  "Brand Identity, Web Design, UI/UX, Art Direction, Typography, Motion Design, Design Systems, Frontend Development, Prototyping, Strategy";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  useLineDraw(containerRef);

  /* Heading char reveal */
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars" });
    gsap.set(split.chars || [], { y: "110%", opacity: 0 });
    gsap.to(split.chars || [], {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.15,
    });

    return () => split.revert();
  }, []);

  /* Staggered fade-ups */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-about-fade").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.6 + i * 0.12,
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <MonoLayout>
      <div ref={containerRef}>
        {/* Hero — page title */}
        <section
          style={{
            padding: isMobile ? "80px 24px 40px" : "120px 48px 60px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={headingRef}
                style={{
                  fontFamily: FONT,
                  fontSize: isMobile
                    ? "clamp(48px, 14vw, 72px)"
                    : "clamp(72px, 9vw, 140px)",
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                About
              </h1>
            </div>
          </div>
        </section>

        {/* Bio — the about IS the content */}
        <section
          style={{
            padding: isMobile ? "60px 24px" : "80px 48px 120px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Divider style={{ marginBottom: isMobile ? 48 : 64 }} />

            <p
              className="mn-about-fade"
              style={{
                fontFamily: FONT,
                fontSize: isMobile
                  ? "clamp(22px, 5.5vw, 30px)"
                  : "clamp(28px, 3vw, 40px)",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                margin: 0,
                maxWidth: 800,
              }}
            >
              I design and build digital products with a focus on clarity,
              restraint, and craft. Every project starts with understanding the
              problem — not jumping to the solution. Good design disappears.
              Great design was never noticed in the first place.
            </p>

            <p
              className="mn-about-fade"
              style={{
                fontFamily: FONT,
                fontSize: 16,
                color: PALETTE.muted,
                lineHeight: 1.8,
                marginTop: 32,
                maxWidth: 600,
              }}
            >
              Currently based in [City]. Eight years shaping brands, interfaces,
              and experiences across tech, culture, and commerce. I believe the
              best work comes from saying no to almost everything.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section
          style={{
            padding: isMobile ? "0 24px 80px" : "0 48px 120px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <span
              className="mn-about-fade"
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 5,
                color: PALETTE.muted,
                display: "block",
                marginBottom: 40,
              }}
            >
              EXPERIENCE
            </span>

            {experience.map((exp, i) => (
              <div key={i}>
                <div className="mn-line-draw" style={{ height: 1, background: PALETTE.border }} />
                <div
                  className="mn-fade-up"
                  onMouseEnter={() => setHoveredExp(i)}
                  onMouseLeave={() => setHoveredExp(null)}
                  style={{
                    display: "flex",
                    alignItems: isMobile ? "flex-start" : "center",
                    flexDirection: isMobile ? "column" : "row",
                    padding: isMobile ? "24px 0" : "28px 0",
                    gap: isMobile ? 4 : 0,
                    transition: "padding-left 0.3s",
                    paddingLeft: hoveredExp === i ? 12 : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: isMobile ? 18 : 22,
                      fontWeight: 700,
                      flex: 1,
                      color:
                        hoveredExp === i ? PALETTE.accent : PALETTE.text,
                      transition: "color 0.3s",
                    }}
                  >
                    {exp.role}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      color: PALETTE.muted,
                      fontWeight: 400,
                      minWidth: isMobile ? "auto" : 160,
                      textAlign: isMobile ? "left" : "center",
                    }}
                  >
                    {exp.company}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      color: PALETTE.dim,
                      fontWeight: 400,
                      minWidth: isMobile ? "auto" : 140,
                      textAlign: isMobile ? "left" : "right",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
              </div>
            ))}
            <div className="mn-line-draw" style={{ height: 1, background: PALETTE.border }} />
          </div>
        </section>

        {/* Skills — comma-separated, nothing else */}
        <section
          style={{
            padding: isMobile ? "0 24px 80px" : "0 48px 120px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <span
              className="mn-about-fade"
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 5,
                color: PALETTE.muted,
                display: "block",
                marginBottom: 24,
              }}
            >
              CAPABILITIES
            </span>
            <p
              className="mn-fade-up"
              style={{
                fontFamily: FONT,
                fontSize: isMobile ? 16 : 18,
                fontWeight: 400,
                lineHeight: 1.8,
                color: PALETTE.text,
                margin: 0,
              }}
            >
              {skills}
            </p>
          </div>
        </section>

        {/* Social links */}
        <section
          style={{
            padding: isMobile ? "0 24px 120px" : "0 48px 160px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Divider style={{ marginBottom: isMobile ? 36 : 48 }} />
            <div
              className="mn-fade-up"
              style={{ display: "flex", gap: isMobile ? 24 : 36, flexWrap: "wrap" }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    color:
                      hoveredSocial === s.label ? PALETTE.accent : PALETTE.muted,
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                    borderBottom:
                      hoveredSocial === s.label
                        ? `1px solid ${PALETTE.accent}`
                        : "1px solid transparent",
                    paddingBottom: 2,
                  }}
                  onMouseEnter={() => setHoveredSocial(s.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MonoLayout>
  );
}
