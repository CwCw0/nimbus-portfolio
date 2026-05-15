"use client";

/**
 * MONO v3 — Complete rebuild
 *
 * UNIQUE PATTERNS:
 * - Navigation: Barely there — just logo + 3 links, no border
 * - Scroll: Project rows with line-draw + text reveal, hover accent
 * - Hover: ONLY interaction = accent color (#FF3D00) appears on hover
 * - Background: Pure white, zero texture, zero decoration
 * - Typography: Syne only — one font, hierarchy through scale alone
 * - Special: Email as massive clickable heading, geometric shape markers
 *
 * Font: Syne (one font, five weights)
 * Palette: #FAFAFA + #111111 + #FF3D00 (hover only)
 * References: stevenmengin.com, olhalazarieva.com, minimalwim.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";
import { FONT as F, PALETTE as M, BASE_PATH, projects } from "./shared";

gsap.registerPlugin(ScrollTrigger);

export default function MonoPreview() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero name — dramatic char reveal
      const hero = heroRef.current;
      if (hero) {
        const split = new SplitType(hero, { types: "chars" });
        gsap.set(split.chars || [], { y: "110%", opacity: 0 });
        gsap.to(split.chars || [], {
          y: "0%", opacity: 1, duration: 1, stagger: 0.04, ease: "power3.out", delay: 0.2,
        });
      }

      // Subtitle
      const sub = el.querySelector(".mn-sub");
      if (sub) {
        gsap.set(sub, { opacity: 0 });
        gsap.to(sub, { opacity: 1, duration: 0.8, ease: "power2.out", delay: 1 });
      }

      // Project rows — line draw + content fade
      el.querySelectorAll(".mn-row").forEach((row) => {
        const line = row.querySelector(".mn-line");
        const content = row.querySelector(".mn-content");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });

        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left" });
          tl.to(line, { scaleX: 1, duration: 0.5, ease: "power2.inOut" });
        }
        if (content) {
          gsap.set(content, { y: 15, opacity: 0 });
          tl.to(content, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");
        }
      });

      // About
      el.querySelectorAll(".mn-rev").forEach((item) => {
        gsap.fromTo(item, { y: 25, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // CTA email — scale from center
      const ctaEmail = el.querySelector(".mn-email");
      if (ctaEmail) {
        gsap.fromTo(ctaEmail, { scale: 0.88, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ctaEmail, start: "top 80%", once: true },
        });
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: M.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');`}</style>
        <div style={{ overflow: "hidden" }}>
          <span style={{ fontFamily: F, fontSize: 22, fontWeight: 800, letterSpacing: 10, color: M.text, display: "block", animation: "mn-up 0.8s ease-out 0.3s both" }}>MONO</span>
        </div>
        <style>{`@keyframes mn-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      </div>
    );
  }

  return (
    <div ref={mainRef} style={{ background: M.bg, color: M.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');`}</style>

      {/* NAV — barely there */}
      <nav style={{ position: "fixed", top: 44, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", background: "rgba(250,250,250,0.85)", backdropFilter: "blur(8px)" }}>
        <Link href={BASE_PATH} style={{ fontFamily: F, fontSize: 15, fontWeight: 800, letterSpacing: 8, color: M.text, textDecoration: "none" }}>MONO</Link>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Work", href: BASE_PATH },
            { label: "About", href: `${BASE_PATH}/about` },
            { label: "Contact", href: `${BASE_PATH}/contact` },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ fontFamily: F, fontSize: 13, color: M.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = M.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = M.muted)}
            >{item.label}</Link>
          ))}
        </div>
      </nav>

      {/* HERO — just a name. Extreme scale. */}
      <section style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px" }}>
        <div style={{ overflow: "hidden" }}>
          <h1 ref={heroRef} style={{ fontFamily: F, fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", textWrap: "balance" as any }}>
            John
            <br />Doe.
          </h1>
        </div>
        <p className="mn-sub" style={{ fontFamily: F, fontSize: 16, color: M.muted, marginTop: 28, fontWeight: 400 }}>
          Designer & Developer — Available for work
        </p>
      </section>

      {/* PROJECTS — title-as-navigation, hover reveals accent */}
      <section id="mn-work" style={{ padding: "80px 48px 160px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: 5, color: M.muted, display: "block", marginBottom: 56 }}>SELECTED WORK</span>

          {projects.map((proj, i) => (
            <Link key={proj.title} href={`${BASE_PATH}/project?slug=${proj.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div className="mn-row"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <div className="mn-line" style={{ height: 1, background: M.border }} />
                <div className="mn-content" style={{ display: "flex", alignItems: "center", padding: "44px 0", transition: "padding-left 0.4s", paddingLeft: hovered === i ? 16 : 0 }}>
                  <span style={{ fontFamily: F, fontSize: 16, color: hovered === i ? M.accent : M.dim, width: 44, transition: "color 0.3s" }}>{proj.shape}</span>
                  <h3 style={{ fontFamily: F, fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 800, flex: 1, letterSpacing: "-0.03em", lineHeight: 0.95, transition: "color 0.3s", color: hovered === i ? M.accent : M.text }}>
                    {proj.title}
                  </h3>
                  <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                    <span style={{ fontFamily: F, fontSize: 13, color: M.muted, fontWeight: 400 }}>{proj.cat}</span>
                    <span style={{ fontFamily: F, fontSize: 13, color: M.dim }}>{proj.year}</span>
                    <span style={{ fontSize: 20, color: hovered === i ? M.accent : M.muted, transition: "all 0.3s", transform: hovered === i ? "translate(4px, -4px)" : "translate(0, 0)" }}>↗</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div style={{ height: 1, background: M.border }} />
        </div>
      </section>

      {/* ABOUT — one paragraph, extreme clarity */}
      <section id="mn-about" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span className="mn-rev" style={{ fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: 5, color: M.muted, display: "block", marginBottom: 36 }}>ABOUT</span>
          <p className="mn-rev" style={{ fontFamily: F, fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.45, letterSpacing: "-0.01em" }}>
            I design and build digital products with a focus on clarity, restraint, and craft. Every project starts with understanding the problem — not jumping to the solution.
          </p>
          <p className="mn-rev" style={{ fontFamily: F, fontSize: 16, color: M.muted, lineHeight: 1.8, marginTop: 28 }}>
            Currently based in [City]. Previously at [Studio]. Open to freelance, full-time, and collaboration.
          </p>
          <div className="mn-rev" style={{ display: "flex", gap: 28, marginTop: 36 }}>
            {["LinkedIn", "Dribbble", "GitHub", "Twitter"].map((s) => (
              <a key={s} href="#" style={{ fontFamily: F, fontSize: 13, color: M.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s", borderBottom: "1px solid transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = M.accent; e.currentTarget.style.borderBottomColor = M.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = M.muted; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >{s}</a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — email as the entire visual */}
      <section id="mn-contact" style={{ padding: "160px 48px", textAlign: "center" }}>
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: 5, color: M.muted, display: "block", marginBottom: 36 }}>GET IN TOUCH</span>
        <h2 className="mn-email" style={{ fontFamily: F, fontSize: "clamp(36px, 7vw, 110px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, cursor: "pointer", transition: "color 0.3s", color: M.text, textDecoration: "none", wordBreak: "break-all" as any }}
          onMouseEnter={(e) => (e.currentTarget.style.color = M.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = M.text)}
        >
          hello@mono.studio
        </h2>
        <p style={{ fontFamily: F, fontSize: 15, color: M.muted, marginTop: 20 }}>or just say hi — I respond to everything.</p>
      </section>

      {/* Footer — barely visible */}
      <footer style={{ padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${M.border}` }}>
        <span style={{ fontFamily: F, fontSize: 12, color: M.dim }}>&copy; 2026</span>
        <span style={{ fontFamily: F, fontSize: 12, color: M.dim }}>Built with intention.</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link href="/work/designs/mono" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: M.text, color: M.bg, fontFamily: F, fontSize: 11, fontWeight: 700, textDecoration: "none", letterSpacing: 1 }}>← BREAKDOWN</Link>
      </div>
    </div>
  );
}
