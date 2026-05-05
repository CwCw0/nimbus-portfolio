"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SNLayout, C, F_HEAD, F_BODY, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { num: "01", title: "MERIDIAN", cat: "Brand Identity", year: "2026", desc: "Complete visual identity system for a luxury real estate developer. Logo, typography, colour system, and full brand guidelines.", color: "#C9A55A" },
  { num: "02", title: "ATLAS", cat: "Web Platform", year: "2025", desc: "SaaS platform redesign for a mapping analytics company. 40+ pages, design system, and component library.", color: "#7B9EA8" },
  { num: "03", title: "ONYX", cat: "E-Commerce", year: "2026", desc: "Luxury jewellery e-commerce with 3D product viewers, custom checkout flow, and editorial content pages.", color: "#A87B7B" },
  { num: "04", title: "PRISM", cat: "Campaign Site", year: "2025", desc: "Award-winning campaign microsite for a fashion label's seasonal launch. WebGL, scroll-driven storytelling.", color: "#8BA87B" },
  { num: "05", title: "ECHO", cat: "Product Design", year: "2026", desc: "Mobile app design for a meditation and journalling platform. iOS + Android, 60+ screens.", color: "#9B7BC8" },
  { num: "06", title: "VERTEX", cat: "Architecture", year: "2024", desc: "Portfolio website for an architecture firm. Full-bleed photography, horizontal scroll case studies, parallax.", color: "#8BA8A0" },
];

export default function StudioNoirWork() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (heading) {
        const split = new SplitType(heading, { types: "chars" });
        gsap.set(split.chars || [], { y: "100%", opacity: 0 });
        gsap.to(split.chars || [], { y: "0%", opacity: 1, duration: 0.7, stagger: 0.02, ease: "power3.out", delay: 0.3 });
      }

      el.querySelectorAll(".sn-proj").forEach((row, i) => {
        const line = row.querySelector(".sn-proj-line");
        const content = row.querySelector(".sn-proj-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left" });
          tl.to(line, { scaleX: 1, duration: 0.5, ease: "power2.inOut" });
        }
        if (content) {
          gsap.set(content, { y: 30, opacity: 0 });
          tl.to(content, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2");
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <SNLayout current="Work">
      <div ref={mainRef}>
        {/* Hero */}
        <section style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "120px 20px 60px" : "140px 48px 80px" }}>
          <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, fontWeight: 500, marginBottom: 32 }}>PORTFOLIO</span>
          <h1 ref={headingRef} style={{ fontFamily: F_HEAD, fontSize: isMobile ? "48px" : "clamp(64px, 9vw, 130px)", lineHeight: 0.9, letterSpacing: "0.02em", overflow: "hidden" }}>
            SELECTED WORK
          </h1>
          <p style={{ fontFamily: F_BODY, fontSize: 16, color: C.dim, marginTop: 24, maxWidth: 480, lineHeight: 1.8 }}>
            A curated selection of projects spanning brand identity, web platforms, e-commerce, and digital campaigns.
          </p>
        </section>

        {/* Projects — detailed list */}
        <section style={{ padding: isMobile ? "0 20px 80px" : "0 48px 140px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {projects.map((proj) => (
              <div key={proj.num} className="sn-proj" style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const title = e.currentTarget.querySelector(".sn-proj-title") as HTMLElement;
                  if (title) title.style.color = proj.color;
                }}
                onMouseLeave={(e) => {
                  const title = e.currentTarget.querySelector(".sn-proj-title") as HTMLElement;
                  if (title) title.style.color = C.text;
                }}
              >
                <div className="sn-proj-line" style={{ height: 1, background: C.border }} />
                <div className="sn-proj-content" style={{ padding: isMobile ? "28px 0" : "40px 0" }}>
                  <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 16 : 32, flexDirection: isMobile ? "column" : "row" }}>
                    <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.muted, letterSpacing: 3, minWidth: 40 }}>{proj.num}</span>
                    <div style={{ flex: 1 }}>
                      <h3 className="sn-proj-title" style={{ fontFamily: F_HEAD, fontSize: isMobile ? "36px" : "clamp(40px, 5vw, 72px)", letterSpacing: "0.03em", lineHeight: 0.95, transition: "color 0.4s" }}>{proj.title}</h3>
                      <p style={{ fontFamily: F_BODY, fontSize: 15, color: C.dim, lineHeight: 1.7, marginTop: 12, maxWidth: 500 }}>{proj.desc}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: 4 }}>
                      <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.muted, letterSpacing: 2 }}>{proj.cat.toUpperCase()}</span>
                      <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.muted }}>{proj.year}</span>
                    </div>
                    <span style={{ fontSize: 20, color: C.muted }}>↗</span>
                  </div>
                  {/* Tags */}
                  <div style={{ display: "flex", gap: 8, marginTop: 16, marginLeft: isMobile ? 0 : 72 }}>
                    {proj.cat.split(" ").map((tag) => (
                      <span key={tag} style={{ padding: "4px 12px", border: `1px solid ${C.border}`, fontFamily: F_BODY, fontSize: 10, color: C.muted, letterSpacing: 1 }}>{tag.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ height: 1, background: C.border }} />
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: isMobile ? "80px 20px" : "160px 48px", background: C.bgAlt, textAlign: "center" }}>
          <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 32 }}>LIKE WHAT YOU SEE?</span>
          <h2 style={{ fontFamily: F_HEAD, fontSize: isMobile ? "40px" : "clamp(48px, 7vw, 100px)", lineHeight: 0.9, letterSpacing: "0.02em" }}>
            LET&apos;S MAKE YOURS<br /><span style={{ color: C.accent }}>NEXT.</span>
          </h2>
          <a href="/work/designs/studio-noir/preview/contact" style={{ display: "inline-block", marginTop: 40, fontFamily: F_HEAD, fontSize: 16, letterSpacing: 5, padding: "18px 44px", border: `1px solid ${C.accent}`, color: C.accent, textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
          >GET IN TOUCH ↗</a>
        </section>
      </div>
    </SNLayout>
  );
}
