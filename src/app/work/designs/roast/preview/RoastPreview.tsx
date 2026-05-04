"use client";

/**
 * ROAST — Specialty Coffee / Cafe Template
 * Warm, artisan, editorial. Grain texture, earthy tones.
 * Refs: ceremonycoffee.com, coffeecollective.dk, seycoffee.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FONT_HEAD = "'Cormorant Garamond', 'Georgia', serif";
const FONT_BODY = "'Karla', 'Helvetica Neue', sans-serif";

const R = {
  bg: "#F5F0E8",
  bgDark: "#1C1814",
  bgCard: "#EDE7DB",
  text: "#1C1814",
  muted: "#7A7062",
  dim: "#9A9082",
  accent: "#8B4513",
  accentLight: "#D4A574",
  cream: "#FAF6EE",
  border: "#D8D0C4",
};

const coffees = [
  { name: "Ethiopia Yirgacheffe", origin: "Gedeo, Ethiopia", process: "Washed", notes: "Jasmine, bergamot, honey", altitude: "1,900m", price: "$22" },
  { name: "Colombia Huila", origin: "Huila, Colombia", process: "Natural", notes: "Cherry, dark chocolate, caramel", altitude: "1,750m", price: "$19" },
  { name: "Guatemala Antigua", origin: "Antigua, Guatemala", process: "Washed", notes: "Orange, brown sugar, walnut", altitude: "1,600m", price: "$20" },
];

export default function RoastPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero — gentle stagger
      const heroEls = el.querySelectorAll(".rs-hero-fade");
      gsap.set(heroEls, { y: 30, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.2 });

      // Coffee cards — stagger from below with slight scale
      el.querySelectorAll(".rs-coffee-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Reveals
      el.querySelectorAll(".rs-reveal").forEach((item) => {
        gsap.fromTo(item, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // Image clips
      el.querySelectorAll(".rs-clip").forEach((img) => {
        gsap.fromTo(img,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
            scrollTrigger: { trigger: img, start: "top 80%", once: true },
          }
        );
      });

      // Parallax on hero image
      const heroImg = el.querySelector(".rs-hero-img");
      if (heroImg) {
        gsap.to(heroImg, {
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: heroImg, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: R.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&display=swap');`}</style>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 48, color: R.text, fontWeight: 400, fontStyle: "italic", animation: "rs-breathe 2s ease-in-out infinite" }}>Roast</span>
        <div style={{ width: 40, height: 2, background: R.accent, animation: "rs-draw 1.2s ease-out 0.5s both" }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 4, color: R.muted }}>SPECIALTY COFFEE</span>
        <style>{`
          @keyframes rs-breathe { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
          @keyframes rs-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: R.bg, color: R.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&display=swap');`}</style>

      {/* Nav — warm, editorial */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", background: "rgba(245,240,232,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${R.border}` }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 400, fontStyle: "italic", color: R.text }}>Roast</span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Coffee", "About", "Locations", "Shop"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: FONT_BODY, fontSize: 13, color: R.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = R.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = R.muted)}
            >{item}</a>
          ))}
          <span style={{ padding: "10px 24px", background: R.accent, color: R.cream, fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >Order Online</span>
        </div>
      </nav>

      {/* Hero — full width image + overlay text, editorial */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", overflow: "hidden" }}>
        {/* Image placeholder with parallax */}
        <div className="rs-hero-img" style={{ position: "absolute", inset: -60, background: R.bgDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 200, opacity: 0.08 }}>☕</span>
        </div>
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.95) 0%, rgba(28,24,20,0.3) 60%, transparent 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, color: R.cream }}>
          <span className="rs-hero-fade" style={{ fontFamily: FONT_BODY, fontSize: 12, letterSpacing: 4, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 24 }}>SPECIALTY COFFEE ROASTERS</span>
          <h1 className="rs-hero-fade" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.05, color: R.cream }}>
            Sourced with care.
            <br />
            <em style={{ fontStyle: "italic", color: R.accentLight }}>Roasted with soul.</em>
          </h1>
          <p className="rs-hero-fade" style={{ fontFamily: FONT_BODY, fontSize: 17, color: "rgba(250,246,238,0.7)", marginTop: 28, maxWidth: 440, lineHeight: 1.75 }}>
            Single-origin specialty coffee, roasted in small batches. From farm to cup — every step intentional.
          </p>
          <div className="rs-hero-fade" style={{ display: "flex", gap: 16, marginTop: 36 }}>
            <span style={{ padding: "14px 36px", background: R.accentLight, color: R.bgDark, fontFamily: FONT_BODY, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >Shop Coffee</span>
            <span style={{ padding: "14px 36px", border: "1px solid rgba(250,246,238,0.2)", color: R.cream, fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "border-color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = R.accentLight)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,246,238,0.2)")}
            >Our Story</span>
          </div>
        </div>
      </section>

      {/* Coffee selection — editorial cards */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="rs-reveal" style={{ marginBottom: 64 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 12, letterSpacing: 4, color: R.accent, fontWeight: 700 }}>CURRENT SELECTION</span>
            <h2 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, marginTop: 12, color: R.text }}>What&apos;s <em style={{ fontStyle: "italic" }}>roasting.</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {coffees.map((coffee) => (
              <div key={coffee.name} className="rs-coffee-card" style={{ background: R.cream, border: `1px solid ${R.border}`, overflow: "hidden", transition: "all 0.4s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(28,24,20,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Image placeholder */}
                <div style={{ height: 240, background: R.bgCard, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${R.border}` }}>
                  <span style={{ fontFamily: FONT_HEAD, fontSize: 60, color: R.accent, opacity: 0.12, fontStyle: "italic" }}>☕</span>
                </div>
                <div style={{ padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 600, color: R.text }}>{coffee.name}</h3>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 18, fontWeight: 700, color: R.accent }}>{coffee.price}</span>
                  </div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: R.dim, marginBottom: 16 }}>{coffee.origin} · {coffee.altitude}</p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    <span style={{ padding: "4px 12px", background: R.bgCard, fontFamily: FONT_BODY, fontSize: 11, color: R.muted, fontWeight: 500 }}>{coffee.process}</span>
                  </div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: R.muted, fontStyle: "italic" }}>Notes: {coffee.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story section — split with image */}
      <section style={{ padding: "120px 48px", background: R.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className="rs-clip" style={{ height: 500, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 100, opacity: 0.2 }}>🌱</span>
          </div>
          <div>
            <span className="rs-reveal" style={{ fontFamily: FONT_BODY, fontSize: 12, letterSpacing: 4, color: R.accentLight, fontWeight: 700, display: "block", marginBottom: 24 }}>OUR STORY</span>
            <h2 className="rs-reveal" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 400, color: R.cream, lineHeight: 1.15 }}>
              From a kitchen scale to
              <br /><em style={{ fontStyle: "italic", color: R.accentLight }}>three roasteries.</em>
            </h2>
            <p className="rs-reveal" style={{ fontFamily: FONT_BODY, fontSize: 16, color: "rgba(250,246,238,0.6)", lineHeight: 1.85, marginTop: 28, maxWidth: 440 }}>
              What started as a home-roasting obsession in 2018 has become a mission: make specialty coffee accessible without compromising on sourcing, roasting, or the farmers who grow it.
            </p>
            <p className="rs-reveal" style={{ fontFamily: FONT_BODY, fontSize: 16, color: "rgba(250,246,238,0.6)", lineHeight: 1.85, marginTop: 16, maxWidth: 440 }}>
              We visit every farm. We know every producer by name. We pay above Fair Trade — because Fair Trade isn&apos;t fair enough.
            </p>
          </div>
        </div>
      </section>

      {/* Visit section */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <span className="rs-reveal" style={{ fontFamily: FONT_BODY, fontSize: 12, letterSpacing: 4, color: R.accent, fontWeight: 700 }}>VISIT US</span>
          <h2 className="rs-reveal" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, marginTop: 16 }}>Three locations. <em style={{ fontStyle: "italic" }}>One standard.</em></h2>
          <div className="rs-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48 }}>
            {[{ name: "Downtown", address: "42 Roast Lane", hours: "7am — 6pm" }, { name: "Uptown", address: "118 Bean Street", hours: "7am — 5pm" }, { name: "Harbour", address: "7 Wharf Road", hours: "8am — 4pm" }].map((loc) => (
              <div key={loc.name} style={{ padding: 36, background: R.cream, border: `1px solid ${R.border}`, textAlign: "left" }}>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{loc.name}</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: R.muted, lineHeight: 1.6 }}>{loc.address}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: R.dim, marginTop: 8 }}>{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 48px", background: R.accent, textAlign: "center" }}>
        <h2 className="rs-reveal" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: R.cream, lineHeight: 1.1 }}>
          Life&apos;s too short for
          <br /><em style={{ fontStyle: "italic" }}>bad coffee.</em>
        </h2>
        <span style={{ display: "inline-block", marginTop: 36, padding: "16px 44px", background: R.cream, color: R.accent, fontFamily: FONT_BODY, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >Shop Now →</span>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 48px", background: R.bgDark, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 20, color: R.cream, fontStyle: "italic" }}>Roast</span>
        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(250,246,238,0.3)" }}>&copy; 2026 Roast Coffee Co. All rights reserved.</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/roast" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: R.accent, color: R.cream, fontFamily: FONT_BODY, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>← Breakdown</Link>
      </div>
    </div>
  );
}
