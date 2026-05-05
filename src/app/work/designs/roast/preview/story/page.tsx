"use client";

/**
 * Roast — Story / Origin page
 * Parallax image layers, wipe reveals, editorial split-page layout,
 * coffee bean origin map with staggered pin drops.
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoastLayout, R, FH, FB, GrainOverlay, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    year: "2018",
    title: "A popcorn popper & a dream",
    body: "It started in a studio apartment — one modified popcorn popper, a kitchen scale from the dollar store, and an obsessive curiosity about why coffee could taste like blueberries. We roasted 200g at a time, filling the apartment with smoke and the neighbours with complaints.",
  },
  {
    year: "2020",
    title: "The shared kitchen era",
    body: "Friends became customers. Customers became a waitlist. We moved into a shared commercial kitchen, installed a second-hand 3kg sample roaster, and started selling at the Saturday farmers market. We learned more in those six months than in two years of home-roasting.",
  },
  {
    year: "2022",
    title: "The first Loring",
    body: "We signed the lease on our Downtown space and took delivery of a Loring S35 Kestrel — the cleanest, most efficient production roaster made. No smoke, no chaff fires, no compromise. This was the moment Roast became real.",
  },
  {
    year: "2024",
    title: "Three roasteries, one philosophy",
    body: "Today we operate three cafes and a central roastery. The team is fourteen people. The philosophy hasn&apos;t changed: make specialty coffee feel like it belongs to everyone, not just the people who already know what &apos;anaerobic natural&apos; means.",
  },
];

const origins = [
  { country: "Ethiopia", region: "Gedeo Zone", lat: "6.1°N", lng: "38.2°E", note: "Birthplace of coffee. Floral washed lots from Konga." },
  { country: "Colombia", region: "Huila", lat: "2.5°N", lng: "75.7°W", note: "Volcanic soil, experimental fermentation, Diego Bermúdez." },
  { country: "Brazil", region: "Mogiana", lat: "21.2°S", lng: "47.8°W", note: "Honey-processed Catuaí. Creamy body, chocolate sweetness." },
  { country: "Kenya", region: "Nyeri County", lat: "0.4°S", lng: "36.9°E", note: "AA grade, double-washed. Blackcurrant brightness." },
  { country: "Guatemala", region: "Antigua Valley", lat: "14.5°N", lng: "90.7°W", note: "Shadow of Volcán de Agua. Nutty, balanced, clean." },
  { country: "Costa Rica", region: "Tarrazú", lat: "9.6°N", lng: "84.0°W", note: "Yellow honey process. Stone fruit, maple, silk." },
];

export default function RoastStory() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero parallax layers
      const heroLayers = el.querySelectorAll(".rs-hero-layer");
      heroLayers.forEach((layer, i) => {
        gsap.to(layer, {
          y: (i + 1) * -40,
          ease: "none",
          scrollTrigger: { trigger: el.querySelector(".rs-hero-section"), start: "top top", end: "bottom top", scrub: 1 },
        });
      });

      // Hero text wipe-in
      const heroTitle = el.querySelector(".rs-hero-title");
      if (heroTitle) {
        gsap.fromTo(heroTitle, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut", delay: 0.4,
        });
      }
      const heroSub = el.querySelector(".rs-hero-sub");
      if (heroSub) {
        gsap.fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.2 });
      }

      // Chapter wipe reveals — each chapter wipes in from left via clipPath
      el.querySelectorAll(".rs-chapter").forEach((chapter) => {
        gsap.fromTo(chapter, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: chapter, start: "top 80%", once: true },
        });
      });

      // Parallax on editorial images
      el.querySelectorAll(".rs-para-img").forEach((img) => {
        gsap.to(img, {
          y: -80,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });

      // Origin map — staggered pin drops
      el.querySelectorAll(".rs-pin").forEach((pin, i) => {
        gsap.fromTo(pin, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)",
          delay: i * 0.15,
          scrollTrigger: { trigger: el.querySelector(".rs-map-section"), start: "top 70%", once: true },
        });
      });

      // Origin cards curtain reveal
      el.querySelectorAll(".rs-origin-card").forEach((card, i) => {
        gsap.fromTo(card, { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.inOut",
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });

      // CTA section wipe
      const ctaSection = el.querySelector(".rs-cta-wipe");
      if (ctaSection) {
        gsap.fromTo(ctaSection, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: ctaSection, start: "top 80%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <RoastLayout current="Story">
      <div ref={mainRef}>
        {/* ═══ Hero — parallax layered ═══ */}
        <section
          className="rs-hero-section"
          style={{
            height: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: isMobile ? "0 20px 80px" : "0 64px 100px",
            background: R.bgDark,
            overflow: "hidden",
          }}
        >
          <GrainOverlay opacity={0.05} />

          {/* Parallax background layers */}
          <div className="rs-hero-layer" style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${R.bgDark} 0%, #2C2218 100%)` }} />
          <div className="rs-hero-layer" style={{ position: "absolute", top: "10%", right: "-5%", width: "60%", height: "80%", background: `radial-gradient(ellipse, rgba(139,69,19,0.08) 0%, transparent 70%)` }} />
          <div className="rs-hero-layer" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(28,24,20,1) 0%, transparent 100%)" }} />

          {/* Large ghosted watermark */}
          <div className="rs-hero-layer" style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: FH, fontSize: "clamp(200px, 25vw, 400px)", fontStyle: "italic", color: R.cream, opacity: 0.02 }}>Origin</span>
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 24, opacity: 0.8 }}>OUR STORY</span>
            <h1 className="rs-hero-title" style={{ fontFamily: FH, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 400, lineHeight: 1.0, color: R.cream }}>
              From a kitchen scale<br />to <em style={{ fontStyle: "italic", color: R.accentLight }}>three roasteries.</em>
            </h1>
            <p className="rs-hero-sub" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.5)", marginTop: 28, maxWidth: 480, lineHeight: 1.85 }}>
              A stubborn belief that specialty coffee doesn&apos;t have to be pretentious — told in four chapters.
            </p>
          </div>
        </section>

        {/* ═══ Timeline — editorial split (image left, scrolling text right) ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "140px 64px", position: "relative" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {chapters.map((chapter, i) => (
              <div
                key={chapter.year}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : i % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
                  gap: isMobile ? 32 : 80,
                  marginBottom: isMobile ? 80 : 140,
                  alignItems: "center",
                }}
              >
                {/* Image panel */}
                <div
                  style={{
                    height: isMobile ? 280 : 500,
                    position: "relative",
                    overflow: "hidden",
                    background: R.bgDark,
                    order: isMobile ? 0 : i % 2 === 1 ? 2 : 0,
                  }}
                >
                  <GrainOverlay opacity={0.06} />
                  <div className="rs-para-img" style={{ position: "absolute", inset: -60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: FH, fontSize: "clamp(160px, 20vw, 280px)", fontStyle: "italic", color: R.accentLight, opacity: 0.06 }}>{chapter.year}</span>
                  </div>
                  {/* Decorative horizontal line */}
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${R.accentLight}40, transparent)` }} />
                </div>

                {/* Text panel */}
                <div className="rs-chapter" style={{ padding: isMobile ? 0 : "0 20px" }}>
                  <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 5, color: R.accent, fontWeight: 700, display: "block", marginBottom: 16 }}>{chapter.year}</span>
                  <h2 style={{ fontFamily: FH, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.12, marginBottom: 20 }}>
                    <em style={{ fontStyle: "italic" }}>{chapter.title}</em>
                  </h2>
                  <p style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.9 }}>{chapter.body}</p>
                  {/* Decorative divider */}
                  <div style={{ width: 60, height: 2, background: R.accent, marginTop: 32, opacity: 0.4 }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Origin Map — staggered pin drops ═══ */}
        <section className="rs-map-section" style={{ padding: isMobile ? "80px 20px" : "120px 64px", background: R.bgDark, position: "relative", overflow: "hidden" }}>
          <GrainOverlay opacity={0.05} />

          {/* Section heading */}
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 64, maxWidth: 560 }}>
              <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500 }}>SOURCING MAP</span>
              <h2 style={{ fontFamily: FH, fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 400, color: R.cream, lineHeight: 1.08, marginTop: 16 }}>
                Six origins. <em style={{ fontStyle: "italic", color: R.accentLight }}>Six stories.</em>
              </h2>
              <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.5)", lineHeight: 1.85, marginTop: 20 }}>
                Every bag is traceable to the farm, the producer, and the harvest date. These are the places we return to, season after season.
              </p>
            </div>

            {/* Map representation — stylised world band with pins */}
            <div style={{ position: "relative", height: isMobile ? 200 : 300, marginBottom: 64, border: "1px solid rgba(250,246,238,0.06)", overflow: "hidden" }}>
              {/* Latitude band lines */}
              {[25, 50, 75].map((pct) => (
                <div key={pct} style={{ position: "absolute", top: `${pct}%`, left: 0, right: 0, height: 1, background: "rgba(250,246,238,0.04)" }} />
              ))}
              {/* Equator */}
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `${R.accentLight}20`, }} />
              <span style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", fontFamily: FB, fontSize: 10, color: "rgba(250,246,238,0.2)", letterSpacing: 2 }}>EQUATOR</span>

              {/* Coffee Belt band */}
              <div style={{ position: "absolute", top: "30%", bottom: "30%", left: 0, right: 0, background: `rgba(139,69,19,0.05)`, borderTop: `1px dashed ${R.accentLight}15`, borderBottom: `1px dashed ${R.accentLight}15` }} />

              {/* Pin drops */}
              {origins.map((origin, i) => {
                const positions = [
                  { left: "62%", top: "38%" },
                  { left: "30%", top: "48%" },
                  { left: "35%", top: "65%" },
                  { left: "58%", top: "50%" },
                  { left: "22%", top: "42%" },
                  { left: "25%", top: "46%" },
                ];
                const pos = positions[i];
                return (
                  <div
                    key={origin.country}
                    className="rs-pin"
                    style={{
                      position: "absolute",
                      left: pos.left,
                      top: pos.top,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: R.accentLight, boxShadow: `0 0 0 3px rgba(212,165,116,0.3), 0 0 20px rgba(212,165,116,0.2)` }} />
                    <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, color: R.cream, background: "rgba(28,24,20,0.8)", padding: "2px 8px", whiteSpace: "nowrap", letterSpacing: 1 }}>{origin.country.toUpperCase()}</span>
                  </div>
                );
              })}
            </div>

            {/* Origin detail cards */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
              {origins.map((origin) => (
                <div
                  key={origin.country}
                  className="rs-origin-card"
                  style={{
                    padding: 28,
                    background: "rgba(250,246,238,0.03)",
                    border: "1px solid rgba(250,246,238,0.06)",
                    transition: "all 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${R.accentLight}40`;
                    e.currentTarget.style.background = "rgba(250,246,238,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(250,246,238,0.06)";
                    e.currentTarget.style.background = "rgba(250,246,238,0.03)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontFamily: FH, fontSize: 22, fontWeight: 600, color: R.cream }}>{origin.country}</h3>
                    <span style={{ fontFamily: FB, fontSize: 10, color: "rgba(250,246,238,0.3)", letterSpacing: 1 }}>{origin.lat}, {origin.lng}</span>
                  </div>
                  <span style={{ fontFamily: FB, fontSize: 12, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 10 }}>{origin.region}</span>
                  <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(250,246,238,0.45)", lineHeight: 1.7 }}>{origin.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Philosophy — full-bleed editorial with wipe ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "140px 64px", position: "relative", overflow: "hidden" }}>
          {/* Large ghosted text */}
          <div style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center" }}>
            <span style={{ fontFamily: FH, fontSize: "clamp(100px, 15vw, 220px)", fontStyle: "italic", color: R.text, opacity: 0.03, whiteSpace: "nowrap" }}>Philosophy</span>
          </div>

          <div className="rs-cta-wipe" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 100, alignItems: "center" }}>
            <div>
              <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accent, fontWeight: 700, display: "block", marginBottom: 20 }}>WHAT WE BELIEVE</span>
              <h2 style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
                Coffee should be <em style={{ fontStyle: "italic" }}>welcoming,</em> not <em style={{ fontStyle: "italic" }}>gatekept.</em>
              </h2>
              <p style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.9, marginBottom: 16 }}>
                We reject the idea that knowing about coffee should feel like passing a test. Great coffee is for everyone — you don&apos;t need to know what &apos;Q-grading&apos; means to enjoy a perfect cup.
              </p>
              <p style={{ fontFamily: FB, fontSize: 16, color: R.muted, lineHeight: 1.9 }}>
                Our job is to make the invisible work visible: sourcing, roasting, consistency. Your job is just to drink something that makes your morning better.
              </p>
            </div>

            {/* Values — editorial stacked list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { num: "I", text: "Transparency over mystique. We tell you exactly where the coffee comes from, what we paid, and how we roasted it." },
                { num: "II", text: "Consistency is kindness. The same coffee should taste the same every time you order it. That&apos;s not boring — that&apos;s respect." },
                { num: "III", text: "Sustainability isn&apos;t optional. Every decision — from packaging to pricing — is measured against its impact on people and planet." },
              ].map((v, i) => (
                <div key={v.num} style={{ padding: "28px 0", borderTop: i === 0 ? `1px solid ${R.border}` : "none", borderBottom: `1px solid ${R.border}` }}>
                  <span style={{ fontFamily: FH, fontSize: 32, fontStyle: "italic", color: R.accent, opacity: 0.4, display: "block", marginBottom: 8 }}>{v.num}</span>
                  <p style={{ fontFamily: FB, fontSize: 15, color: R.muted, lineHeight: 1.8 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ padding: isMobile ? "80px 20px" : "120px 64px", background: R.accent, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <GrainOverlay opacity={0.06} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 400, color: R.cream, lineHeight: 1.05 }}>
              Taste the <em style={{ fontStyle: "italic" }}>difference.</em>
            </h2>
            <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.7)", marginTop: 16, maxWidth: 420, margin: "16px auto 0" }}>
              See what happens when coffee is sourced with care and roasted with soul.
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: 36,
                padding: "16px 48px",
                background: R.cream,
                color: R.accent,
                fontFamily: FB,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Shop Coffee →
            </span>
          </div>
        </section>
      </div>
    </RoastLayout>
  );
}
