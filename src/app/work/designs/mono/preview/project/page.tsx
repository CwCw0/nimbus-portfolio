"use client";

/**
 * MONO — Project Detail (Horizontal Scroll Case Study)
 *
 * Horizontal scroll with full-viewport panels per project.
 * Each panel: huge project name + small metadata below.
 * Hover reveals accent color on project names only.
 * Type only — zero images, zero thumbnails.
 */

import { Suspense, useRef, useEffect, useState } from "react";
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
  BASE_PATH,
  projects,
} from "../shared";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage() {
  return (
    <Suspense
      fallback={
        <div style={{ background: PALETTE.bg, minHeight: "100vh" }} />
      }
    >
      <ProjectContent />
    </Suspense>
  );
}

function ProjectContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useLineDraw(containerRef);

  /* Intro text char reveal */
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars" });
    gsap.set(split.chars || [], { y: "100%", opacity: 0 });
    gsap.to(split.chars || [], {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      stagger: 0.025,
      ease: "power3.out",
      delay: 0.15,
    });

    return () => split.revert();
  }, []);

  /* Horizontal scroll */
  useEffect(() => {
    const horizontal = horizontalRef.current;
    const panels = panelsRef.current;
    if (!horizontal || !panels || isMobile) return;

    const totalWidth = panels.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: horizontal,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  /* Mobile: staggered reveal for project panels */
  useEffect(() => {
    if (!isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".mn-project-panel").forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <MonoLayout>
      <div ref={containerRef}>
        {/* Intro section */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? "120px 24px" : "0 48px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={introRef}
                style={{
                  fontFamily: FONT,
                  fontSize: isMobile
                    ? "clamp(48px, 14vw, 72px)"
                    : "clamp(80px, 9vw, 160px)",
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: "-0.05em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Selected
                <br />
                Work
              </h1>
            </div>
            <p
              className="mn-fade-up"
              style={{
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 400,
                color: PALETTE.muted,
                marginTop: 40,
                maxWidth: 400,
              }}
            >
              {projects.length} projects. Scroll{isMobile ? " down" : " right"} to explore.
            </p>
          </div>
        </section>

        {/* Horizontal scroll section (desktop) / Vertical stack (mobile) */}
        {!isMobile ? (
          <section ref={horizontalRef} style={{ overflow: "hidden" }}>
            <div
              ref={panelsRef}
              style={{
                display: "flex",
                width: "fit-content",
                height: "100vh",
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className="mn-project-panel"
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 80px",
                    position: "relative",
                    cursor: "default",
                  }}
                >
                  {/* Project number */}
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 4,
                      color: PALETTE.muted,
                      position: "absolute",
                      top: 60,
                      left: 80,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>

                  {/* Massive project name */}
                  <h2
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(80px, 12vw, 200px)",
                      fontWeight: 800,
                      letterSpacing: "-0.06em",
                      lineHeight: 0.9,
                      margin: 0,
                      textTransform: "uppercase",
                      color:
                        hoveredProject === i
                          ? PALETTE.accent
                          : PALETTE.text,
                      transition: "color 0.4s ease",
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Metadata below */}
                  <div
                    style={{
                      marginTop: 48,
                      display: "flex",
                      gap: 56,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 4,
                          color: PALETTE.muted,
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        TYPE
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 15,
                          fontWeight: 500,
                          color: PALETTE.text,
                        }}
                      >
                        {project.cat}
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 4,
                          color: PALETTE.muted,
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        YEAR
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 15,
                          fontWeight: 500,
                          color: PALETTE.text,
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 4,
                          color: PALETTE.muted,
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        DURATION
                      </span>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: 15,
                          fontWeight: 500,
                          color: PALETTE.text,
                        }}
                      >
                        {project.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Description — subtle, below */}
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      fontWeight: 400,
                      color: PALETTE.muted,
                      lineHeight: 1.7,
                      marginTop: 32,
                      maxWidth: 500,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Vertical line divider between panels */}
                  {i < projects.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "20%",
                        bottom: "20%",
                        width: 1,
                        background: PALETTE.border,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Mobile: vertical stack */
          <section style={{ padding: "0 24px 120px" }}>
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className="mn-project-panel"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  padding: "80px 0",
                  borderBottom:
                    i < projects.length - 1
                      ? `1px solid ${PALETTE.border}`
                      : "none",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 4,
                    color: PALETTE.muted,
                    display: "block",
                    marginBottom: 20,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <h2
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(48px, 14vw, 72px)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.92,
                    margin: 0,
                    textTransform: "uppercase",
                    color:
                      hoveredProject === i
                        ? PALETTE.accent
                        : PALETTE.text,
                    transition: "color 0.4s ease",
                  }}
                >
                  {project.title}
                </h2>

                {/* Meta */}
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    gap: 32,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      color: PALETTE.muted,
                    }}
                  >
                    {project.cat}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      color: PALETTE.muted,
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 400,
                    color: PALETTE.muted,
                    lineHeight: 1.7,
                    marginTop: 20,
                    maxWidth: 400,
                  }}
                >
                  {project.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Footer line */}
        <div style={{ padding: isMobile ? "0 24px" : "0 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="mn-line-draw"
              style={{ height: 1, background: PALETTE.border }}
            />
          </div>
        </div>

        {/* End statement */}
        <section
          style={{
            padding: isMobile ? "80px 24px 140px" : "120px 48px 200px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p
              className="mn-fade-up"
              style={{
                fontFamily: FONT,
                fontSize: isMobile
                  ? "clamp(24px, 6vw, 36px)"
                  : "clamp(32px, 3vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: "-0.03em",
                margin: 0,
                color: PALETTE.text,
              }}
            >
              Every project starts with understanding the problem.
            </p>
            <p
              className="mn-fade-up"
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 400,
                color: PALETTE.muted,
                marginTop: 24,
              }}
            >
              Not jumping to the solution.
            </p>
          </div>
        </section>
      </div>
    </MonoLayout>
  );
}
