"use client";

/**
 * ROAST v3 — Complete rebuild
 *
 * UNIQUE PATTERNS:
 * - Navigation: Transparent overlay nav with editorial type
 * - Scroll: Full-bleed hero with parallax, editorial coffee cards
 * - Hover: Cards lift with warm shadow, text links get underline draw
 * - Background: Dark hero with warm gradient overlays, grain texture
 * - Typography: Cormorant Garamond italic + Karla — magazine editorial
 * - Special: Coffee origin data cards (altitude, process, notes), story section
 *
 * Fonts: Cormorant Garamond + Karla
 * Palette: Cream #F5F0E8 + Coffee brown #8B4513 + Dark #1C1814
 * References: ceremonycoffee.com, coffeecollective.dk, seycoffee.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FH = "'Cormorant Garamond', Georgia, serif";
const FB = "'Karla', 'Helvetica Neue', sans-serif";

const R = {
  bg: "#F5F0E8", bgDark: "#1C1814", bgCard: "#EDE7DB", cream: "#FAF6EE",
  text: "#1C1814", muted: "#7A7062", dim: "#9A9082",
  accent: "#8B4513", accentLight: "#D4A574", border: "#D8D0C4",
};

const coffees = [
  { name: "Ethiopia Yirgacheffe", origin: "Gedeo, Ethiopia", process: "Washed", notes: "Jasmine, bergamot, honey", altitude: "1,900m", price: "$22" },
  { name: "Colombia Huila", origin: "Huila, Colombia", process: "Natural", notes: "Cherry, dark chocolate, caramel", altitude: "1,750m", price: "$19" },
  { name: "Guatemala Antigua", origin: "Antigua, Guatemala", process: "Washed", notes: "Orange, brown sugar, walnut", altitude: "1,600m", price: "$20" },
];

export default function RoastPreview() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = el.querySelectorAll(".rs-hero");
      gsap.set(heroEls, { y: 40, opacity: 0 });
      gsap.to(heroEls, { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "power2.out", delay: 0.3 });

      // Parallax hero image
      const heroImg = el.querySelector(".rs-hero-bg");
      if (heroImg) {
        gsap.to(heroImg, { y: -80, ease: "none", scrollTrigger: { trigger: heroImg, start: "top top", end: "bottom top", scrub: 1.5 } });
      }

      // Coffee cards
      el.querySelectorAll(".rs-coffee").forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.15,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });

      // Reveals
      el.querySelectorAll(".rs-rev").forEach((item) => {
        gsap.fromTo(item, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // Image clips
      el.querySelectorAll(".rs-clip").forEach((img) => {
        gsap.fromTo(img, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: img, start: "top 80%", once: true },
        });
      });

      // Location cards — stagger
      el.querySelectorAll(".rs-loc").forEach((loc, i) => {
        gsap.fromTo(loc, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: i * 0.12,
          scrollTrigger: { trigger: loc, start: "top 88%", once: true },
        });
      });

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: R.bgDark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&display=swap');`}</style>
        <span style={{ fontFamily: FH, fontSize: 56, color: R.cream, fontWeight: 400, fontStyle: "italic", animation: "rs-fade 2s ease-in-out infinite" }}>Roast</span>
        <div style={{ width: 50, height: 2, background: R.accentLight, animation: "rs-draw 1.5s ease-out 0.5s both" }} />
        <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 5, color: R.muted }}>SPECIALTY COFFEE</span>
        <style>{`
          @keyframes rs-fade { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
          @keyframes rs-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={mainRef} style={{ background: R.bg, color: R.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&display=swap');`}</style>

      {/* NAV — transparent, editorial */}
      <nav style={{ position: "fixed", top: 44, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "14px 16px" : "18px 48px", background: "rgba(28,24,20,0.5)", backdropFilter: "blur(16px)" }}>
        <span style={{ fontFamily: FH, fontSize: isMobile ? 22 : 28, fontWeight: 400, fontStyle: "italic", color: R.cream }}>Roast</span>
        <div style={{ display: "flex", gap: isMobile ? 14 : 28, alignItems: "center" }}>
          {[
            { label: "Coffee", href: "/work/designs/roast/preview/coffee" },
            { label: "Story", href: "/work/designs/roast/preview/story" },
            ...(isMobile ? [] : [
              { label: "Locations", href: "/work/designs/roast/preview/locations" },
              { label: "Contact", href: "/work/designs/roast/preview/contact" },
            ]),
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ fontFamily: FB, fontSize: isMobile ? 11 : 13, color: "rgba(250,246,238,0.6)", textDecoration: "none", fontWeight: 500, transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = R.cream)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,246,238,0.6)")}
            >{item.label}</Link>
          ))}
          <span style={{ padding: isMobile ? "8px 14px" : "10px 24px", background: R.accentLight, color: R.bgDark, fontFamily: FB, fontSize: isMobile ? 11 : 13, fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >Order Online</span>
        </div>
      </nav>

      {/* HERO — full-bleed dark with parallax */}
      <section style={{ height: "100vh", position: "relative", display: "flex", alignItems: "flex-end", padding: isMobile ? "0 20px 60px" : "0 48px 72px", overflow: "hidden" }}>
        <div className="rs-hero-bg" style={{ position: "absolute", inset: -80, background: R.bgDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 240, opacity: 0.04 }}>☕</span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,24,20,0.95) 0%, rgba(28,24,20,0.4) 50%, rgba(28,24,20,0.2) 100%)" }} />
        {/* Grain */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, color: R.cream }}>
          <span className="rs-hero" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 500, display: "block", marginBottom: 24 }}>SPECIALTY COFFEE ROASTERS</span>
          <h1 className="rs-hero" style={{ fontFamily: FH, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 400, lineHeight: 1.02, color: R.cream, textWrap: "balance" as any }}>
            Sourced with care.
            <br /><em style={{ fontStyle: "italic", color: R.accentLight }}>Roasted with soul.</em>
          </h1>
          <p className="rs-hero" style={{ fontFamily: FB, fontSize: 17, color: "rgba(250,246,238,0.6)", marginTop: 24, maxWidth: 420, lineHeight: 1.8 }}>
            Single-origin specialty coffee, roasted in small batches. From farm to cup — every step intentional.
          </p>
          <div className="rs-hero" style={{ display: "flex", gap: 14, marginTop: 32 }}>
            <span style={{ padding: "14px 36px", background: R.accentLight, color: R.bgDark, fontFamily: FB, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,165,116,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >Shop Coffee</span>
            <span style={{ padding: "14px 32px", border: "1px solid rgba(250,246,238,0.2)", color: R.cream, fontFamily: FB, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "border-color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = R.accentLight)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,246,238,0.2)")}
            >Our Story</span>
          </div>
        </div>
      </section>

      {/* COFFEE SELECTION */}
      <section style={{ padding: isMobile ? "80px 20px" : "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="rs-rev" style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>CURRENT SELECTION</span>
            <h2 style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 400, marginTop: 10 }}>What&apos;s <em style={{ fontStyle: "italic" }}>roasting.</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
            {coffees.map((c) => (
              <div key={c.name} className="rs-coffee" style={{ background: R.cream, border: `1px solid ${R.border}`, overflow: "hidden", transition: "all 0.4s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 56px rgba(28,24,20,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 220, background: R.bgCard, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: `1px solid ${R.border}` }}>
                  <span style={{ fontFamily: FH, fontSize: 56, color: R.accent, opacity: 0.1, fontStyle: "italic" }}>☕</span>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <h3 style={{ fontFamily: FH, fontSize: 22, fontWeight: 600 }}>{c.name}</h3>
                    <span style={{ fontFamily: FB, fontSize: 18, fontWeight: 700, color: R.accent }}>{c.price}</span>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: 13, color: R.dim }}>{c.origin} · {c.altitude}</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 12, marginBottom: 12 }}>
                    <span style={{ padding: "3px 10px", background: R.bgCard, fontFamily: FB, fontSize: 11, color: R.muted, fontWeight: 500 }}>{c.process}</span>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: 14, color: R.muted, fontStyle: "italic" }}>Notes: {c.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY — dark split */}
      <section style={{ padding: isMobile ? "80px 20px" : "120px 48px", background: R.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div className="rs-clip" style={{ height: 460, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 100, opacity: 0.15 }}>🌱</span>
          </div>
          <div>
            <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accentLight, fontWeight: 700 }}>OUR STORY</span>
            <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 400, color: R.cream, lineHeight: 1.12, marginTop: 16 }}>
              From a kitchen scale to<br /><em style={{ fontStyle: "italic", color: R.accentLight }}>three roasteries.</em>
            </h2>
            <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.55)", lineHeight: 1.85, marginTop: 24, maxWidth: 420 }}>
              Started home-roasting in 2018. Now a mission: make specialty coffee accessible without compromising on sourcing or the farmers who grow it.
            </p>
            <p className="rs-rev" style={{ fontFamily: FB, fontSize: 16, color: "rgba(250,246,238,0.55)", lineHeight: 1.85, marginTop: 14, maxWidth: 420 }}>
              We visit every farm. We know every producer. We pay above Fair Trade — because Fair Trade isn&apos;t fair enough.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <span className="rs-rev" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>VISIT US</span>
          <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, marginTop: 12 }}>Three locations. <em style={{ fontStyle: "italic" }}>One standard.</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginTop: 44 }}>
            {[{ name: "Downtown", addr: "42 Roast Lane", hrs: "7am–6pm" }, { name: "Uptown", addr: "118 Bean Street", hrs: "7am–5pm" }, { name: "Harbour", addr: "7 Wharf Road", hrs: "8am–4pm" }].map((loc) => (
              <div key={loc.name} className="rs-loc" style={{ padding: 32, background: R.cream, border: `1px solid ${R.border}`, textAlign: "left", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(28,24,20,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <h3 style={{ fontFamily: FH, fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{loc.name}</h3>
                <p style={{ fontFamily: FB, fontSize: 14, color: R.muted }}>{loc.addr}</p>
                <p style={{ fontFamily: FB, fontSize: 13, color: R.dim, marginTop: 6 }}>{loc.hrs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", background: R.accent, textAlign: "center" }}>
        <h2 className="rs-rev" style={{ fontFamily: FH, fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, color: R.cream, lineHeight: 1.08, textWrap: "balance" as any }}>
          Life&apos;s too short for<br /><em style={{ fontStyle: "italic" }}>bad coffee.</em>
        </h2>
        <span style={{ display: "inline-block", marginTop: 32, padding: "16px 44px", background: R.cream, color: R.accent, fontFamily: FB, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >Shop Now →</span>
      </section>

      {/* Footer */}
      <footer style={{ padding: isMobile ? "24px 20px" : "36px 48px", background: R.bgDark, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: FH, fontSize: 20, color: R.cream, fontStyle: "italic" }}>Roast</span>
        <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.3)" }}>&copy; 2026 Roast Coffee Co.</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link href="/work/designs/roast" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: R.accent, color: R.cream, fontFamily: FB, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>← Breakdown</Link>
      </div>
    </div>
  );
}
