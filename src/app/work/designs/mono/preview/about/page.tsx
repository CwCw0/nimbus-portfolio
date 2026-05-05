"use client";

/**
 * MONO — About Page
 *
 * Pure typography. Giant statement text fills the viewport.
 * Counter-scrolling text columns. Massive typographic numbers for stats.
 * Line-draw reveals for section dividers. Zero decoration.
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

const leftColumnText = [
  "Clarity over complexity.",
  "Restraint as a feature.",
  "Negative space speaks.",
  "Type is the interface.",
  "Less decided, more discovered.",
  "Every pixel justified.",
];

const rightColumnText = [
  "Eight years of practice.",
  "Hundreds of projects shipped.",
  "Zero unnecessary elements.",
  "One font is enough.",
  "Precision over decoration.",
  "The work speaks for itself.",
];

const stats = [
  { number: "08", label: "YEARS" },
  { number: "47", label: "PROJECTS" },
  { number: "01", label: "FONT" },
  { number: "00", label: "DECORATION" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useLineDraw(containerRef);

  /* Giant statement char reveal */
  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars" });
    gsap.set(split.chars || [], { y: "120%", opacity: 0 });
    gsap.to(split.chars || [], {
      y: "0%",
      opacity: 1,
      duration: 1.1,
      stagger: 0.02,
      ease: "power3.out",
      delay: 0.1,
    });

    return () => split.revert();
  }, []);

  /* Counter-scrolling columns */
  useEffect(() => {
    const left = leftColRef.current;
    const right = rightColRef.current;
    if (!left || !right || isMobile) return;

    const ctx = gsap.context(() => {
      // Left column scrolls UP (normal direction, faster)
      gsap.to(left, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: left.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Right column scrolls DOWN (counter direction)
      gsap.to(right, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: right.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  /* Stats number reveal */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-stat-number").forEach((num) => {
        gsap.fromTo(
          num,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: num,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <MonoLayout>
      <div ref={containerRef}>
        {/* Hero — viewport-filling statement */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "120px 24px" : "0 48px",
          }}
        >
          <div style={{ maxWidth: 1400, width: "100%" }}>
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={statementRef}
                style={{
                  fontFamily: FONT,
                  fontSize: isMobile
                    ? "clamp(40px, 12vw, 64px)"
                    : "clamp(72px, 8.5vw, 150px)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                I design with
                <br />
                restraint and
                <br />
                build with
                <br />
                precision.
              </h1>
            </div>
          </div>
        </section>

        {/* Counter-scrolling columns */}
        <section
          style={{
            padding: isMobile ? "80px 24px" : "160px 48px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: isMobile ? "block" : "flex",
              gap: 120,
            }}
          >
            {/* Left column — scrolls up */}
            <div
              ref={leftColRef}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 32 : 48,
              }}
            >
              {leftColumnText.map((text, i) => (
                <p
                  key={i}
                  className="mn-fade-up"
                  style={{
                    fontFamily: FONT,
                    fontSize: isMobile ? 18 : 22,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    margin: 0,
                    color: PALETTE.text,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Right column — scrolls down (counter) */}
            <div
              ref={rightColRef}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 32 : 48,
                marginTop: isMobile ? 48 : 0,
              }}
            >
              {rightColumnText.map((text, i) => (
                <p
                  key={i}
                  className="mn-fade-up"
                  style={{
                    fontFamily: FONT,
                    fontSize: isMobile ? 18 : 22,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    margin: 0,
                    color: PALETTE.muted,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Line divider */}
        <div
          style={{ padding: isMobile ? "0 24px" : "0 48px" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="mn-line-draw"
              style={{ height: 1, background: PALETTE.border }}
            />
          </div>
        </div>

        {/* Stats — massive typographic numbers */}
        <section
          style={{
            padding: isMobile ? "100px 24px" : "180px 48px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: isMobile ? 60 : 0,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  textAlign: "center",
                  flex: isMobile ? "0 0 45%" : "0 0 auto",
                  cursor: "default",
                }}
              >
                <span
                  className="mn-stat-number"
                  style={{
                    fontFamily: FONT,
                    fontSize: isMobile
                      ? "clamp(64px, 18vw, 90px)"
                      : "clamp(100px, 10vw, 180px)",
                    fontWeight: 800,
                    letterSpacing: "-0.06em",
                    lineHeight: 1,
                    display: "block",
                    color:
                      hoveredStat === i ? PALETTE.accent : PALETTE.text,
                    transition: "color 0.3s",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 6,
                    color: PALETTE.muted,
                    display: "block",
                    marginTop: 16,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Line divider */}
        <div
          style={{ padding: isMobile ? "0 24px" : "0 48px" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="mn-line-draw"
              style={{ height: 1, background: PALETTE.border }}
            />
          </div>
        </div>

        {/* Closing statement */}
        <section
          style={{
            padding: isMobile ? "100px 24px 140px" : "160px 48px 200px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p
              className="mn-fade-up"
              style={{
                fontFamily: FONT,
                fontSize: isMobile
                  ? "clamp(28px, 7vw, 40px)"
                  : "clamp(36px, 3.5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: "-0.03em",
                margin: 0,
                color: PALETTE.text,
              }}
            >
              Good design disappears. Great design was never noticed in the first place.
            </p>
            <p
              className="mn-fade-up"
              style={{
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 400,
                color: PALETTE.muted,
                marginTop: 32,
                lineHeight: 1.8,
              }}
            >
              Currently based in [City]. Open to collaborations that value
              clarity, restraint, and craft above all else.
            </p>
          </div>
        </section>
      </div>
    </MonoLayout>
  );
}
