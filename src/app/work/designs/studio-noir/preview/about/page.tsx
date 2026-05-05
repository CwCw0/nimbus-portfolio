"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SNLayout, C, F_HEAD, F_BODY, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Alex Mercer", role: "Creative Director", bio: "15 years of pushing pixels into places they've never been." },
  { name: "Sora Tanaka", role: "Lead Developer", bio: "Full-stack architect who thinks in systems, not pages." },
  { name: "Maya Chen", role: "Brand Strategist", bio: "Turns business problems into visual solutions." },
];

const values = [
  { num: "01", title: "RESTRAINT OVER EXCESS", body: "We remove until only the essential remains. Every element earns its place on the screen." },
  { num: "02", title: "CRAFT OVER SPEED", body: "We don't rush. Good work takes as long as it takes. The deadline is quality." },
  { num: "03", title: "HONESTY OVER TRENDS", body: "We design for the brand, not for the portfolio. Trends expire. Craft endures." },
];

export default function StudioNoirAbout() {
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
        gsap.to(split.chars || [], { y: "0%", opacity: 1, duration: 0.7, stagger: 0.025, ease: "power3.out", delay: 0.3 });
      }

      el.querySelectorAll(".sn-fade").forEach((item) => {
        gsap.fromTo(item, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      el.querySelectorAll(".sn-team-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });

      el.querySelectorAll(".sn-value").forEach((val, i) => {
        gsap.fromTo(val, { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: val, start: "top 88%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <SNLayout current="About">
      <div ref={mainRef}>
        {/* Hero */}
        <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "120px 20px 60px" : "140px 48px 80px" }}>
          <span className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, fontWeight: 500, marginBottom: 32 }}>ABOUT THE STUDIO</span>
          <h1 ref={headingRef} style={{ fontFamily: F_HEAD, fontSize: isMobile ? "48px" : "clamp(64px, 9vw, 130px)", lineHeight: 0.9, letterSpacing: "0.02em", overflow: "hidden" }}>
            WE BELIEVE IN THE POWER OF RESTRAINT
          </h1>
          <p className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 17, color: C.dim, marginTop: 40, maxWidth: 520, lineHeight: 1.85 }}>
            Studio Noir was founded on a single principle: good design is about knowing what to remove, not what to add. We craft digital experiences for brands that demand craft over convention.
          </p>
        </section>

        {/* Story */}
        <section style={{ padding: isMobile ? "60px 20px" : "120px 48px", background: C.bgAlt }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: "center" }}>
            <div>
              <span className="sn-fade" style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent }}>OUR STORY</span>
              <h2 className="sn-fade" style={{ fontFamily: F_HEAD, fontSize: isMobile ? "36px" : "clamp(40px, 5vw, 72px)", lineHeight: 0.95, marginTop: 20, letterSpacing: "0.02em" }}>
                STARTED WITH TWO DESIGNERS AND A REFUSAL TO COMPROMISE.
              </h2>
              <p className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 16, color: C.dim, lineHeight: 1.85, marginTop: 24 }}>
                In 2018, we left our agency positions because we were tired of selling work we weren&apos;t proud of. We believed there was a market for restraint — for digital work that felt inevitable rather than decorated. Eight years later, that belief has become 47 projects across fashion, architecture, technology, and culture.
              </p>
              <p className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 16, color: C.dim, lineHeight: 1.85, marginTop: 16 }}>
                We remain intentionally small. Three people. No account managers. No junior designers learning on your project. Every brief is touched by every hand in the studio.
              </p>
            </div>
            <div className="sn-fade" style={{ height: isMobile ? 300 : 500, background: C.bgWarm, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: F_HEAD, fontSize: 120, color: C.accent, opacity: 0.05 }}>✦</span>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: isMobile ? "60px 20px" : "140px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span className="sn-fade" style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 60 }}>OUR VALUES</span>
            {values.map((val) => (
              <div key={val.num} className="sn-value" style={{ borderBottom: `1px solid ${C.border}`, padding: isMobile ? "32px 0" : "48px 0", display: "flex", gap: isMobile ? 20 : 48, alignItems: "flex-start" }}>
                <span style={{ fontFamily: F_HEAD, fontSize: 56, color: C.accent, opacity: 0.12, lineHeight: 1, minWidth: isMobile ? 40 : 80 }}>{val.num}</span>
                <div>
                  <h3 style={{ fontFamily: F_HEAD, fontSize: isMobile ? "24px" : "36px", letterSpacing: "0.04em", marginBottom: 12 }}>{val.title}</h3>
                  <p style={{ fontFamily: F_BODY, fontSize: 15, color: C.dim, lineHeight: 1.75, maxWidth: 500 }}>{val.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: isMobile ? "60px 20px" : "140px 48px", background: C.bgAlt }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span className="sn-fade" style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 60 }}>THE TEAM</span>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
              {team.map((person) => (
                <div key={person.name} className="sn-team-card" style={{ padding: 36, background: C.bg, border: `1px solid ${C.border}`, transition: "border-color 0.4s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                >
                  <div style={{ width: 64, height: 64, background: C.bgWarm, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <span style={{ fontFamily: F_HEAD, fontSize: 24, color: C.accent, opacity: 0.5 }}>{person.name[0]}</span>
                  </div>
                  <h3 style={{ fontFamily: F_HEAD, fontSize: 24, letterSpacing: "0.04em", marginBottom: 4 }}>{person.name}</h3>
                  <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.accent, letterSpacing: 2, display: "block", marginBottom: 16 }}>{person.role.toUpperCase()}</span>
                  <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.dim, lineHeight: 1.7 }}>{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section style={{ padding: isMobile ? "60px 20px" : "100px 48px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <span className="sn-fade" style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 40 }}>RECOGNITION</span>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 24 }}>
              {[{ num: "12", label: "AWARDS" }, { num: "47+", label: "PROJECTS" }, { num: "8", label: "YEARS" }, { num: "3", label: "PEOPLE" }].map((stat) => (
                <div key={stat.label} className="sn-fade" style={{ textAlign: "center", padding: 32, background: C.bgAlt, border: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: F_HEAD, fontSize: 48, color: C.accent, display: "block" }}>{stat.num}</span>
                  <span style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SNLayout>
  );
}
