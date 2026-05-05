"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FH = "'Cormorant Garamond', Georgia, serif";
const FB = "'Karla', 'Helvetica Neue', sans-serif";
const R = { bg: "#F5F0E8", bgDark: "#1C1814", cream: "#FAF6EE", text: "#1C1814", muted: "#7A7062", dim: "#9A9082", accent: "#8B4513", accentLight: "#D4A574", border: "#D8D0C4" };
const BASE = "/work/designs/roast/preview";

export default function RoastContact() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll(".rs-fade").forEach((item) => {
        gsap.fromTo(item, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 85%", once: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: R.bg, color: R.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&display=swap');`}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", background: "rgba(245,240,232,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${R.border}` }}>
        <Link href={BASE} style={{ fontFamily: FH, fontSize: 28, fontWeight: 400, fontStyle: "italic", color: R.text, textDecoration: "none" }}>Roast</Link>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[{ l: "Coffee", h: `${BASE}/coffee` }, { l: "Story", h: `${BASE}/story` }, { l: "Locations", h: `${BASE}/locations` }, { l: "Contact", h: `${BASE}/contact` }].map((item) => (
            <Link key={item.l} href={item.h} style={{ fontFamily: FB, fontSize: 13, color: item.l === "Contact" ? R.accent : R.muted, textDecoration: "none", fontWeight: 500 }}>{item.l}</Link>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: isMobile ? "120px 20px 60px" : "160px 48px 80px" }}>
        <span className="rs-fade" style={{ fontFamily: FB, fontSize: 12, letterSpacing: 5, color: R.accent, fontWeight: 700 }}>GET IN TOUCH</span>
        <h1 className="rs-fade" style={{ fontFamily: FH, fontSize: isMobile ? "40px" : "clamp(48px, 6vw, 80px)", fontWeight: 400, marginTop: 16, lineHeight: 1.1 }}>
          Let&apos;s talk <em style={{ fontStyle: "italic", color: R.accent }}>coffee.</em>
        </h1>
        <p className="rs-fade" style={{ fontFamily: FB, fontSize: 17, color: R.muted, marginTop: 20, maxWidth: 480, lineHeight: 1.75 }}>
          Whether you&apos;re a wholesale buyer, a cafe owner, or just want to say hello — we&apos;d love to hear from you.
        </p>
      </section>

      {/* Form + Info */}
      <section style={{ padding: isMobile ? "0 20px 80px" : "0 48px 120px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 64 }}>
          <div className="rs-fade">
            <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 4, color: R.accent, fontWeight: 700, display: "block", marginBottom: 32 }}>SEND A MESSAGE</span>
            <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[{ label: "Name", ph: "Your name" }, { label: "Email", ph: "your@email.com" }, { label: "Subject", ph: "Wholesale / Partnership / General" }].map((f) => (
                <div key={f.label}>
                  <label style={{ fontFamily: FB, fontSize: 12, color: R.muted, display: "block", marginBottom: 8, letterSpacing: 2 }}>{f.label.toUpperCase()}</label>
                  <input type="text" placeholder={f.ph} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${R.border}`, padding: "12px 0", fontFamily: FB, fontSize: 16, color: R.text, outline: "none" }} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: FB, fontSize: 12, color: R.muted, display: "block", marginBottom: 8, letterSpacing: 2 }}>MESSAGE</label>
                <textarea placeholder="Tell us what's on your mind..." rows={4} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${R.border}`, padding: "12px 0", fontFamily: FB, fontSize: 16, color: R.text, outline: "none", resize: "vertical" }} />
              </div>
              <button type="submit" style={{ fontFamily: FB, fontSize: 14, fontWeight: 700, padding: "14px 36px", background: R.accent, color: R.cream, border: "none", cursor: "pointer", alignSelf: "flex-start", transition: "opacity 0.2s" }}>Send Message</button>
            </form>
          </div>

          <div className="rs-fade">
            <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 4, color: R.accent, fontWeight: 700, display: "block", marginBottom: 32 }}>CONTACT INFO</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[{ label: "EMAIL", value: "hello@roastcoffee.co" }, { label: "PHONE", value: "+60 3-1234 5678" }, { label: "WHOLESALE", value: "wholesale@roastcoffee.co" }].map((item) => (
                <div key={item.label} style={{ borderBottom: `1px solid ${R.border}`, paddingBottom: 20 }}>
                  <span style={{ fontFamily: FB, fontSize: 11, letterSpacing: 3, color: R.muted, display: "block", marginBottom: 6 }}>{item.label}</span>
                  <span style={{ fontFamily: FB, fontSize: 17, color: R.text }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <span style={{ fontFamily: FB, fontSize: 12, letterSpacing: 4, color: R.accent, fontWeight: 700, display: "block", marginBottom: 16 }}>NEWSLETTER</span>
              <p style={{ fontFamily: FB, fontSize: 14, color: R.muted, lineHeight: 1.7, marginBottom: 16 }}>New roasts, behind-the-scenes, and first access to limited drops.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="email" placeholder="your@email.com" style={{ flex: 1, background: "transparent", border: `1px solid ${R.border}`, padding: "10px 16px", fontFamily: FB, fontSize: 14, color: R.text, outline: "none" }} />
                <button style={{ padding: "10px 20px", background: R.accent, color: R.cream, fontFamily: FB, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "36px 48px", background: R.bgDark, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: FH, fontSize: 20, color: R.cream, fontStyle: "italic" }}>Roast</span>
        <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(250,246,238,0.3)" }}>&copy; 2026 Roast Coffee Co.</span>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link href="/work/designs/roast" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: R.accent, color: R.cream, fontFamily: FB, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>← Breakdown</Link>
      </div>
    </div>
  );
}
