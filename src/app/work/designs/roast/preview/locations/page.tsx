"use client";

/**
 * Roast — Locations page
 * Full-height panels with curtain wipe on scroll,
 * parallax interior photos, editorial typography.
 */

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoastLayout, R, FH, FB, GrainOverlay, useIsMobile } from "../shared";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Downtown Flagship",
    tagline: "Where it all started.",
    address: "42 Roast Lane, Downtown District",
    city: "Portland, OR 97201",
    hours: { weekday: "Mon — Fri: 7:00am – 6:00pm", weekend: "Sat — Sun: 8:00am – 5:00pm" },
    phone: "(503) 555-0142",
    description: "Our original location and roastery. Floor-to-ceiling windows, a 25-seat bar facing the Loring roaster, and a brew bar serving all six single-origins as pour-over.",
    features: ["Roastery on-site", "Brew bar", "Retail wall", "Wi-Fi"],
    vibe: "Industrial warmth. Concrete floors, brass fixtures, the hum of the Loring in the background. Come for the coffee, stay for the theatre of roasting.",
  },
  {
    name: "Uptown Studio",
    tagline: "The quiet room.",
    address: "118 Bean Street, Uptown Quarter",
    city: "Portland, OR 97209",
    hours: { weekday: "Mon — Fri: 7:00am – 5:00pm", weekend: "Sat — Sun: 8:00am – 4:00pm" },
    phone: "(503) 555-0118",
    description: "A quieter, more intimate space designed for focused work and long conversations. Exposed brick, communal tables, and a curated menu of espresso drinks and batch brew.",
    features: ["Quiet workspace", "Communal tables", "Pastry menu", "Wi-Fi"],
    vibe: "Soft jazz, exposed brick, morning light through arched windows. The neighbourhood&apos;s unofficial living room since 2022.",
  },
  {
    name: "Harbour Kiosk",
    tagline: "Coffee on the waterfront.",
    address: "7 Wharf Road, Harbour Front",
    city: "Portland, OR 97209",
    hours: { weekday: "Mon — Fri: 7:00am – 4:00pm", weekend: "Sat — Sun: 8:00am – 3:00pm" },
    phone: "(503) 555-0107",
    description: "A compact waterfront kiosk built for speed without sacrificing quality. Two-group espresso, cold brew on tap, and a rotating single-origin drip.",
    features: ["Takeaway focus", "Cold brew tap", "Outdoor seating", "Dog friendly"],
    vibe: "Salt air, harbour bells, a flat white in hand. Grab your coffee and walk the trail — or linger on the bench and watch the boats.",
  },
];

export default function RoastLocations() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero text wipe
      const heroTitle = el.querySelector(".rs-loc-hero-title");
      if (heroTitle) {
        gsap.fromTo(heroTitle, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut", delay: 0.3,
        });
      }
      const heroSub = el.querySelector(".rs-loc-hero-sub");
      if (heroSub) {
        gsap.fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.2 });
      }

      // Location panels — curtain wipe reveal
      el.querySelectorAll(".rs-loc-panel").forEach((panel, i) => {
        // Alternating wipe direction
        const fromClip = i % 2 === 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
        const toClip = "inset(0 0 0 0)";

        gsap.fromTo(panel, { clipPath: fromClip }, {
          clipPath: toClip, duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: panel, start: "top 75%", once: true },
        });
      });

      // Parallax interior image placeholders
      el.querySelectorAll(".rs-loc-parallax").forEach((img) => {
        gsap.to(img, {
          y: -70,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });

      // Location text reveals with stagger
      el.querySelectorAll(".rs-loc-text").forEach((text) => {
        gsap.fromTo(text, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: text, start: "top 85%", once: true },
        });
      });

      // Feature tags cascade
      el.querySelectorAll(".rs-feature-row").forEach((row) => {
        const tags = row.querySelectorAll(".rs-tag");
        gsap.fromTo(tags, { x: 20, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });

      // CTA curtain from bottom
      const ctaSection = el.querySelector(".rs-loc-cta");
      if (ctaSection) {
        gsap.fromTo(ctaSection, { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0 0 0 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: ctaSection, start: "top 80%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <RoastLayout current="Locations">
      <div ref={mainRef}>
        {/* ═══ Hero ═══ */}
        <section
          style={{
            height: "80vh",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: isMobile ? "0 20px 80px" : "0 64px 100px",
            background: R.bgDark,
            overflow: "hidden",
          }}
        >
          <GrainOverlay opacity={0.05} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,1) 0%, rgba(28,24,20,0.3) 100%)" }} />

          {/* Ghosted watermark */}
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: FH, fontSize: "clamp(180px, 22vw, 360px)", fontStyle: "italic", color: R.cream, opacity: 0.02 }}>Visit</span>
          </div>

          {/* Three dots representing locations */}
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 48 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: R.accentLight, opacity: 0.3, boxShadow: `0 0 20px ${R.accentLight}40` }} />
                <span style={{ fontFamily: FB, fontSize: 10, color: "rgba(250,246,238,0.2)", letterSpacing: 2 }}>{String(n).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 24 }}>OUR LOCATIONS</span>
            <h1 className="rs-loc-hero-title" style={{ fontFamily: FH, fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.0, color: R.cream }}>
              Three spaces.<br /><em style={{ fontStyle: "italic", color: R.accentLight }}>One standard.</em>
            </h1>
            <p className="rs-loc-hero-sub" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.5)", marginTop: 28, maxWidth: 460, lineHeight: 1.85 }}>
              Each location has its own character, but the coffee is identical — roasted centrally and delivered fresh every morning.
            </p>
          </div>
        </section>

        {/* ═══ Location Panels — full-height curtain reveals ═══ */}
        {locations.map((loc, idx) => (
          <section
            key={loc.name}
            className="rs-loc-panel"
            style={{
              minHeight: isMobile ? "auto" : "100vh",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : idx % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr",
              background: idx % 2 === 0 ? R.bg : R.cream,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Image panel */}
            <div
              style={{
                position: "relative",
                height: isMobile ? 320 : "100%",
                minHeight: isMobile ? 320 : 600,
                background: R.bgDark,
                overflow: "hidden",
                order: isMobile ? 0 : idx % 2 === 1 ? 2 : 0,
              }}
            >
              <GrainOverlay opacity={0.06} />
              <div className="rs-loc-parallax" style={{ position: "absolute", inset: -80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: FH, fontSize: "clamp(120px, 18vw, 240px)", fontStyle: "italic", color: R.accentLight, opacity: 0.05 }}>{String(idx + 1).padStart(2, "0")}</span>
              </div>
              {/* Vibe quote overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "24px 20px" : "40px 48px", background: "linear-gradient(to top, rgba(28,24,20,0.9), transparent)" }}>
                <p style={{ fontFamily: FH, fontSize: isMobile ? 18 : 22, fontStyle: "italic", color: "rgba(250,246,238,0.7)", lineHeight: 1.5, maxWidth: 400 }}>
                  &ldquo;{loc.vibe}&rdquo;
                </p>
              </div>
            </div>

            {/* Info panel */}
            <div style={{ padding: isMobile ? "48px 20px" : "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="rs-loc-text">
                <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 5, color: R.accent, fontWeight: 700, display: "block", marginBottom: 12 }}>LOCATION {String(idx + 1).padStart(2, "0")}</span>
                <h2 style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 8 }}>{loc.name}</h2>
                <p style={{ fontFamily: FH, fontSize: 20, fontStyle: "italic", color: R.accent, marginBottom: 28 }}>{loc.tagline}</p>
              </div>

              <div className="rs-loc-text">
                <p style={{ fontFamily: FB, fontSize: 15, color: R.muted, lineHeight: 1.85, marginBottom: 28 }}>{loc.description}</p>
              </div>

              {/* Address block */}
              <div className="rs-loc-text" style={{ padding: "24px 0", borderTop: `1px solid ${R.border}`, borderBottom: `1px solid ${R.border}`, marginBottom: 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
                  <div>
                    <span style={{ fontFamily: FB, fontSize: 10, letterSpacing: 3, color: R.dim, display: "block", marginBottom: 6 }}>ADDRESS</span>
                    <span style={{ fontFamily: FB, fontSize: 15, color: R.text, display: "block" }}>{loc.address}</span>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.dim }}>{loc.city}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: FB, fontSize: 10, letterSpacing: 3, color: R.dim, display: "block", marginBottom: 6 }}>HOURS</span>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.text, display: "block", lineHeight: 1.7 }}>{loc.hours.weekday}</span>
                    <span style={{ fontFamily: FB, fontSize: 14, color: R.text, lineHeight: 1.7 }}>{loc.hours.weekend}</span>
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <span style={{ fontFamily: FB, fontSize: 10, letterSpacing: 3, color: R.dim, display: "block", marginBottom: 6 }}>PHONE</span>
                  <span style={{ fontFamily: FB, fontSize: 15, color: R.accent, fontWeight: 500 }}>{loc.phone}</span>
                </div>
              </div>

              {/* Features */}
              <div className="rs-feature-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {loc.features.map((f) => (
                  <span key={f} className="rs-tag" style={{ padding: "6px 16px", background: `${R.accent}08`, border: `1px solid ${R.accent}20`, fontFamily: FB, fontSize: 12, color: R.accent, fontWeight: 500 }}>{f}</span>
                ))}
              </div>

              <span
                className="rs-loc-text"
                style={{
                  display: "inline-block",
                  padding: "14px 32px",
                  background: R.accent,
                  color: R.cream,
                  fontFamily: FB,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(139,69,19,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Get Directions →
              </span>
            </div>
          </section>
        ))}

        {/* ═══ CTA Section ═══ */}
        <section className="rs-loc-cta" style={{ padding: isMobile ? "80px 20px" : "120px 64px", background: R.bgDark, position: "relative", overflow: "hidden", textAlign: "center" }}>
          <GrainOverlay opacity={0.05} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 6, color: R.accentLight, fontWeight: 500 }}>FIND US</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 400, color: R.cream, lineHeight: 1.05, marginTop: 16 }}>
              Your next great cup is<br /><em style={{ fontStyle: "italic", color: R.accentLight }}>around the corner.</em>
            </h2>
            <p style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.5)", marginTop: 20, maxWidth: 440, margin: "20px auto 0", lineHeight: 1.8 }}>
              Walk in. No reservation needed, no pretension at the door. Just well-made coffee, served by people who care.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "16px 40px",
                  background: R.accentLight,
                  color: R.bgDark,
                  fontFamily: FB,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(212,165,116,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Order Ahead
              </span>
              <span
                style={{
                  padding: "16px 36px",
                  border: "1px solid rgba(250,246,238,0.2)",
                  color: R.cream,
                  fontFamily: FB,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = R.accentLight)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,246,238,0.2)")}
              >
                View Full Menu
              </span>
            </div>
          </div>
        </section>
      </div>
    </RoastLayout>
  );
}
