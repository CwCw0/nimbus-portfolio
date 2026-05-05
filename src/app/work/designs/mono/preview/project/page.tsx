"use client";

/**
 * MONO — Single Project Detail
 *
 * Massive title, full-width image placeholder,
 * minimal info grid, next/prev navigation.
 */

import { Suspense, useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";
import {
  MonoLayout,
  Divider,
  useLineDraw,
  useIsMobile,
  FONT,
  PALETTE,
  BASE_PATH,
  projects,
} from "../shared";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  return (
    <Suspense fallback={<div style={{ background: PALETTE.bg, minHeight: "100vh" }} />}>
      <ProjectContent />
    </Suspense>
  );
}

function ProjectContent() {
  const params = useSearchParams();
  const slug = params.get("slug") || projects[0].slug;

  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx >= 0 ? idx : 0];
  const prevProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const [hoveredNav, setHoveredNav] = useState<"prev" | "next" | null>(null);

  useLineDraw(containerRef);

  /* Title char reveal */
  useEffect(() => {
    const el = titleRef.current;
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
  }, [slug]);

  /* Fade-up animations */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-proj-fade").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.5 + i * 0.1,
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [slug]);

  return (
    <MonoLayout>
      <div ref={containerRef}>
        {/* Hero section — massive title */}
        <section
          style={{
            padding: isMobile ? "80px 24px 60px" : "120px 48px 80px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <span
              className="mn-proj-fade"
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
              {project.cat.toUpperCase()}
            </span>
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={titleRef}
                style={{
                  fontFamily: FONT,
                  fontSize: isMobile
                    ? "clamp(56px, 16vw, 80px)"
                    : "clamp(80px, 10vw, 160px)",
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Full-width image placeholder */}
        <section
          className="mn-proj-fade"
          style={{
            padding: isMobile ? "0 24px" : "0 48px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              aspectRatio: "16 / 9",
              background: PALETTE.border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 500,
                color: PALETTE.dim,
                letterSpacing: 3,
              }}
            >
              PROJECT IMAGE
            </span>
          </div>
        </section>

        {/* Description */}
        <section
          style={{
            padding: isMobile ? "80px 24px" : "120px 48px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Divider style={{ marginBottom: isMobile ? 48 : 64 }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 48 : 80,
              }}
            >
              {/* Left — description */}
              <div className="mn-fade-up">
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: isMobile
                      ? "clamp(20px, 5vw, 28px)"
                      : "clamp(24px, 2.5vw, 36px)",
                    fontWeight: 500,
                    lineHeight: 1.45,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Right — metadata grid */}
              <div className="mn-fade-up">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 0,
                  }}
                >
                  {[
                    { label: "Client", value: project.client },
                    { label: "Role", value: project.role },
                    { label: "Timeline", value: project.timeline },
                    { label: "Year", value: project.year },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "20px 0",
                        borderBottom: `1px solid ${PALETTE.border}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: 3,
                          color: PALETTE.muted,
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 15,
                          fontWeight: 500,
                          color: PALETTE.text,
                          textAlign: "right",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional image placeholders */}
        <section
          style={{
            padding: isMobile ? "0 24px 80px" : "0 48px 120px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 16 : 24,
              }}
            >
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="mn-fade-up"
                  style={{
                    aspectRatio: "4 / 3",
                    background: PALETTE.border,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      fontWeight: 500,
                      color: PALETTE.dim,
                      letterSpacing: 3,
                    }}
                  >
                    DETAIL {n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prev / Next navigation */}
        <section
          style={{
            padding: isMobile ? "0 24px 120px" : "0 48px 160px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Divider style={{ marginBottom: 0 }} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {/* Previous */}
              <div
                style={{
                  padding: isMobile ? "40px 0" : "56px 0",
                  borderBottom: isMobile
                    ? `1px solid ${PALETTE.border}`
                    : "none",
                  borderRight: isMobile
                    ? "none"
                    : `1px solid ${PALETTE.border}`,
                }}
              >
                {prevProject ? (
                  <Link
                    href={`${BASE_PATH}/project?slug=${prevProject.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={() => setHoveredNav("prev")}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 3,
                        color: PALETTE.muted,
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      &larr; PREVIOUS
                    </span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: isMobile ? 28 : 36,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color:
                          hoveredNav === "prev"
                            ? PALETTE.accent
                            : PALETTE.text,
                        transition: "color 0.3s",
                      }}
                    >
                      {prevProject.title}
                    </span>
                  </Link>
                ) : (
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 3,
                      color: PALETTE.dim,
                    }}
                  >
                    &mdash;
                  </span>
                )}
              </div>

              {/* Next */}
              <div
                style={{
                  padding: isMobile ? "40px 0" : "56px 0",
                  textAlign: isMobile ? "left" : "right",
                  paddingLeft: isMobile ? 0 : 56,
                }}
              >
                {nextProject ? (
                  <Link
                    href={`${BASE_PATH}/project?slug=${nextProject.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={() => setHoveredNav("next")}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 3,
                        color: PALETTE.muted,
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      NEXT &rarr;
                    </span>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: isMobile ? 28 : 36,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color:
                          hoveredNav === "next"
                            ? PALETTE.accent
                            : PALETTE.text,
                        transition: "color 0.3s",
                      }}
                    >
                      {nextProject.title}
                    </span>
                  </Link>
                ) : (
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 3,
                      color: PALETTE.dim,
                    }}
                  >
                    &mdash;
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MonoLayout>
  );
}
