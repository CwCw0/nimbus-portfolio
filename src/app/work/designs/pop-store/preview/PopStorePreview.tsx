"use client";

/**
 * POP STORE — Full Production Preview
 * Neo-brutalist e-commerce. Bouncy, bold, personality-driven.
 * Real GSAP animations, scrolling marquee, hover interactions.
 * References: tonyschocolonely.com, simplychocolate.com, liquiddeath.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const P = {
  bg: "#FFF8F0",
  text: "#1A1A1A",
  textLight: "#FFF8F0",
  muted: "#6B6B6B",
  coral: "#FF6B35",
  purple: "#8B5CF6",
  green: "#22C55E",
  yellow: "#FBBF24",
  pink: "#F472B6",
  border: "3px solid #1A1A1A",
  borderThin: "2px solid #1A1A1A",
};

const products = [
  { name: "The Original", price: "$24", tag: "BESTSELLER", color: P.coral, emoji: "🔥" },
  { name: "Berry Blast", price: "$28", tag: "NEW DROP", color: P.purple, emoji: "🫐" },
  { name: "Green Machine", price: "$26", tag: "FAN FAVORITE", color: P.green, emoji: "🥑" },
  { name: "Golden Hour", price: "$30", tag: "LIMITED", color: P.yellow, emoji: "✨" },
];

const reviews = [
  { text: "Literally the best thing I've ever put in my body. And I've tried a lot of things.", name: "Jake M." },
  { text: "My fridge has never looked this cool. My roommate is jealous. Life is good.", name: "Priya S." },
  { text: "Bought one. Then bought twelve more. No regrets. Send help.", name: "Tom K." },
];

export default function PopStorePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero — bouncy entrance
      const heroEls = container.querySelectorAll(".ps-hero-animate");
      gsap.set(heroEls, { y: 60, opacity: 0, scale: 0.95 });
      gsap.to(heroEls, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)", delay: 0.1 });

      // Hero badge — playful rotation entrance
      const badge = container.querySelector(".ps-badge");
      if (badge) {
        gsap.set(badge, { rotation: -8, scale: 0, opacity: 0 });
        gsap.to(badge, { rotation: -2, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 0.3 });
      }

      // Floating emojis — gentle float animation
      container.querySelectorAll(".ps-float").forEach((el, i) => {
        gsap.to(el, { y: -15, duration: 2 + i * 0.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
      });

      // Marquee — continuous scroll
      const marqueeTrack = container.querySelector(".ps-marquee-track");
      if (marqueeTrack) {
        gsap.to(marqueeTrack, { xPercent: -50, duration: 20, ease: "none", repeat: -1 });
      }

      // Product cards — bouncy stagger
      container.querySelectorAll(".ps-product-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotation: i % 2 === 0 ? -2 : 2 },
          {
            y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "back.out(1.2)", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });

      // Categories — slide in from right
      container.querySelectorAll(".ps-category").forEach((el, i) => {
        gsap.fromTo(el,
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Reviews — staggered scale in
      container.querySelectorAll(".ps-review").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.93 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.3)", delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // CTA — dramatic entrance
      const ctaHeading = container.querySelector(".ps-cta-heading");
      if (ctaHeading) {
        gsap.fromTo(ctaHeading,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)",
            scrollTrigger: { trigger: ctaHeading, start: "top 80%", once: true },
          }
        );
      }

    }, container);

    return () => ctx.revert();
  }, [loaded]);

  // ── LOADER ──
  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: P.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 48, animation: "ps-bounce 0.6s ease-in-out infinite" }}>🛒</div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: P.text, letterSpacing: 2 }}>LOADING THE GOOD STUFF</span>
        <style>{`@keyframes ps-bounce { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-20px) rotate(10deg); } }`}</style>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ background: P.bg, color: P.text, minHeight: "100vh", cursor: "default", overflowX: "hidden" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 48px", background: P.bg, borderBottom: P.border }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700 }}>POP<span style={{ color: P.coral }}>.</span></span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Shop", "About", "FAQ"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: P.text, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
              onMouseLeave={(e) => (e.currentTarget.style.color = P.text)}
            >{item}</a>
          ))}
          <span style={{ padding: "12px 28px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, border: P.border, boxShadow: "4px 4px 0 #1A1A1A", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = "6px 6px 0 #1A1A1A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 #1A1A1A"; }}
          >Cart (0) 🛒</span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        <div className="ps-float" style={{ position: "absolute", top: "12%", left: "6%", fontSize: 80, opacity: 0.15, transform: "rotate(-15deg)" }}>🍋</div>
        <div className="ps-float" style={{ position: "absolute", bottom: "18%", right: "8%", fontSize: 80, opacity: 0.15, transform: "rotate(20deg)" }}>🧃</div>
        <div className="ps-float" style={{ position: "absolute", top: "60%", left: "80%", fontSize: 60, opacity: 0.1 }}>🌶️</div>

        <div className="ps-badge" style={{ display: "inline-block", padding: "8px 20px", background: P.coral, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 32, border: P.border, boxShadow: "3px 3px 0 #1A1A1A" }}>
          NOT YOUR AVERAGE BRAND
        </div>

        <h1 className="ps-hero-animate" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(52px, 10vw, 130px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.03em" }}>
          GOOD STUFF.
          <br />
          <span style={{ color: P.coral, fontStyle: "italic" }}>NO FLUFF.</span>
        </h1>

        <p className="ps-hero-animate" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: P.muted, marginTop: 28, maxWidth: 480, lineHeight: 1.7 }}>
          We make things you actually want to buy. Real ingredients, real personality, real good. No corporate nonsense.
        </p>

        <div className="ps-hero-animate" style={{ display: "flex", gap: 16, marginTop: 44 }}>
          <span style={{ padding: "16px 44px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: P.border, boxShadow: "5px 5px 0 #1A1A1A", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = "8px 8px 0 #1A1A1A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "5px 5px 0 #1A1A1A"; }}
          >SHOP NOW →</span>
          <span style={{ padding: "16px 36px", background: "transparent", color: P.text, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: P.border, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = P.text, e.currentTarget.style.color = P.textLight)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = P.text)}
          >OUR STORY</span>
        </div>
      </section>

      {/* Feature strip */}
      <div style={{ padding: "16px 0", background: P.text, overflow: "hidden", borderTop: P.border, borderBottom: P.border }}>
        <div className="ps-marquee-track" style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(3)].flatMap(() => ["FREE SHIPPING OVER $50", "100% NATURAL", "FOUNDED IN A KITCHEN", "NO WEIRD STUFF", "ACTUALLY TASTES GOOD"]).map((item, i) => (
            <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.textLight, letterSpacing: 2, display: "flex", alignItems: "center", gap: 48 }}>
              {item}<span style={{ color: P.coral }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* Products */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.coral, letterSpacing: 2 }}>WHAT WE MAKE</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginTop: 8, letterSpacing: "-0.02em" }}>The Good Stuff.</h2>
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, borderBottom: `2px solid ${P.text}`, paddingBottom: 2, cursor: "pointer" }}>VIEW ALL →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {products.map((prod) => (
              <div key={prod.name} className="ps-product-card" style={{ background: prod.color + "15", border: P.border, position: "relative", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-4px, -4px)"; e.currentTarget.style.boxShadow = "8px 8px 0 #1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 12px", background: prod.color, fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: P.textLight, letterSpacing: 1.5, border: P.borderThin }}>{prod.tag}</div>
                <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", background: prod.color + "20", borderBottom: P.border }}>
                  <span style={{ fontSize: 100, transition: "transform 0.3s" }}>{prod.emoji}</span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>{prod.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700 }}>{prod.price}</span>
                    <span style={{ padding: "10px 20px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = prod.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = P.text)}
                    >ADD TO CART</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "80px 48px", background: P.text }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.coral, letterSpacing: 2, marginBottom: 32 }}>BROWSE BY VIBE</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[{ name: "All Products", count: 24, emoji: "🛍️" }, { name: "New Drops", count: 6, emoji: "🆕" }, { name: "Bestsellers", count: 8, emoji: "🏆" }, { name: "Limited Edition", count: 3, emoji: "💎" }].map((cat) => (
              <div key={cat.name} className="ps-category" style={{ padding: "32px 24px", border: "2px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 16 }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = P.coral)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                <span style={{ fontSize: 32 }}>{cat.emoji}</span>
                <div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: P.textLight, display: "block" }}>{cat.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{cat.count} products</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.coral, letterSpacing: 2 }}>WHAT PEOPLE SAY</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, marginTop: 8 }}>Don&apos;t trust us. Trust them.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {reviews.map((r) => (
              <div key={r.name} className="ps-review" style={{ padding: 32, border: P.border, background: P.bg, boxShadow: "4px 4px 0 #1A1A1A", transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = "7px 7px 0 #1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 #1A1A1A"; }}
              >
                <div style={{ marginBottom: 16, fontSize: 20, letterSpacing: 2, color: P.yellow }}>★★★★★</div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>&ldquo;{r.text}&rdquo;</p>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.muted }}>— {r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 48px", background: P.coral, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="ps-float" style={{ position: "absolute", top: -20, left: "10%", fontSize: 120, opacity: 0.15, transform: "rotate(-10deg)" }}>🎉</div>
        <div className="ps-float" style={{ position: "absolute", bottom: -20, right: "10%", fontSize: 120, opacity: 0.15, transform: "rotate(15deg)" }}>🚀</div>

        <h2 className="ps-cta-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 700, color: P.textLight, lineHeight: 0.95, position: "relative", zIndex: 1 }}>
          STOP SCROLLING.
          <br />START SHOPPING.
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginTop: 24, maxWidth: 400, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
          Free shipping on orders over $50. No minimum. No weird subscriptions.
        </p>
        <span style={{ display: "inline-block", marginTop: 36, padding: "18px 48px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: `3px solid ${P.textLight}`, cursor: "pointer", position: "relative", zIndex: 1, transition: "all 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${P.textLight}`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "none"; }}
        >SHOP THE DROP →</span>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px", background: P.text, borderTop: P.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>&copy; 2026 Pop Store. All rights reserved. Stay weird.</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["TikTok", "Instagram", "Twitter"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >{s}</a>
          ))}
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <Link href="/work/designs/pop-store" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: P.coral, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, textDecoration: "none", border: P.borderThin, boxShadow: "3px 3px 0 #1A1A1A" }}>← BREAKDOWN</Link>
      </div>
    </div>
  );
}
