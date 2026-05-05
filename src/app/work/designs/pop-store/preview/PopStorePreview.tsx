"use client";

/**
 * POP STORE v3 — Complete rebuild
 *
 * UNIQUE PATTERNS:
 * - Navigation: Sticky bar with animated cart counter, thick borders
 * - Scroll: Product cards stagger with spring physics (back.out)
 * - Hover: Cards translate + shadow grows (neo-brutalist), add-to-cart changes color
 * - Background: Warm cream with per-section color shifts
 * - Typography: Space Grotesk bold condensed, rotated accent labels
 * - Marquee: Continuous GSAP scroll with star separators
 * - CTA: Full-bleed coral with floating emoji + bouncy entrance
 *
 * Fonts: Space Grotesk + Inter
 * Palette: Cream #FFF8F0 + Coral #FF6B35 + Neo-brutalist black borders
 * References: tonyschocolonely.com, liquiddeath.com, simplychocolate.com
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const P = {
  bg: "#FFF8F0", text: "#1A1A1A", textLight: "#FFF8F0", muted: "#6B6B6B",
  coral: "#FF6B35", purple: "#8B5CF6", green: "#22C55E", yellow: "#FBBF24",
  border: "3px solid #1A1A1A", borderThin: "2px solid #1A1A1A",
};

const products = [
  { name: "The Original", price: "$24", tag: "BESTSELLER", color: P.coral, emoji: "🔥" },
  { name: "Berry Blast", price: "$28", tag: "NEW DROP", color: P.purple, emoji: "🫐" },
  { name: "Green Machine", price: "$26", tag: "FAN FAVORITE", color: P.green, emoji: "🥑" },
  { name: "Golden Hour", price: "$30", tag: "LIMITED", color: P.yellow, emoji: "✨" },
];

const reviews = [
  { text: "Literally the best thing I've ever put in my body.", name: "Jake M." },
  { text: "My fridge has never looked this cool. Life is good.", name: "Priya S." },
  { text: "Bought one. Then twelve more. Send help.", name: "Tom K." },
];

export default function PopStorePreview() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 769); }, []);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Hero — bouncy spring entrance
      const heroEls = el.querySelectorAll(".ps-hero-anim");
      gsap.set(heroEls, { y: 80, opacity: 0, scale: 0.9 });
      gsap.to(heroEls, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 });

      // Badge — rotate in
      const badge = el.querySelector(".ps-badge");
      if (badge) {
        gsap.set(badge, { rotation: -15, scale: 0, opacity: 0 });
        gsap.to(badge, { rotation: -2, scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2.5)", delay: 0.4 });
      }

      // Floating decorations
      el.querySelectorAll(".ps-float").forEach((item, i) => {
        gsap.to(item, { y: -20, rotation: "+=5", duration: 2.5 + i * 0.7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });

      // Marquee
      const marquee = el.querySelector(".ps-marquee-track");
      if (marquee) {
        gsap.to(marquee, { xPercent: -50, duration: 18, ease: "none", repeat: -1 });
      }

      // Product cards — spring stagger with rotation
      el.querySelectorAll(".ps-prod").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotation: i % 2 === 0 ? -3 : 3, scale: 0.9 },
          { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)", delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });

      // Categories — slide from right
      el.querySelectorAll(".ps-cat").forEach((cat, i) => {
        gsap.fromTo(cat, { x: 80, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: cat, start: "top 88%", once: true },
        });
      });

      // Reviews — bouncy scale
      el.querySelectorAll(".ps-review").forEach((rev, i) => {
        gsap.fromTo(rev,
          { y: 50, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)", delay: i * 0.12,
            scrollTrigger: { trigger: rev, start: "top 88%", once: true },
          }
        );
      });

      // CTA — dramatic scale
      const cta = el.querySelector(".ps-cta-heading");
      if (cta) {
        gsap.fromTo(cta, { scale: 0.75, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 1, ease: "back.out(1.3)",
          scrollTrigger: { trigger: cta, start: "top 80%", once: true },
        });
      }

    }, el);

    return () => ctx.revert();
  }, [loaded]);

  const addToCart = () => {
    setCartCount((c) => c + 1);
  };

  if (!loaded) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 999, background: P.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ fontSize: 56, animation: "ps-cart-bounce 0.7s ease-in-out infinite" }}>🛒</div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: 3, color: P.text }}>LOADING THE GOOD STUFF</span>
        <div style={{ width: 100, height: 4, background: P.text, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", background: P.coral, animation: "ps-load 1s ease-in-out both" }} />
        </div>
        <style>{`
          @keyframes ps-cart-bounce { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-25px) rotate(12deg); } }
          @keyframes ps-load { from { transform: scaleX(0); transform-origin: left; } to { transform: scaleX(1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={mainRef} style={{ background: P.bg, color: P.text, minHeight: "100vh", overflowX: "hidden" }}>
      {/* NAV — thick borders, animated cart */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 40px", background: P.bg, borderBottom: P.border }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700 }}>POP<span style={{ color: P.coral }}>.</span></span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Shop", "About", "FAQ"].map((item) => (
            <a key={item} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: P.text, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
              onMouseLeave={(e) => (e.currentTarget.style.color = P.text)}
            >{item}</a>
          ))}
          <span style={{ padding: "10px 24px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, border: P.border, boxShadow: "4px 4px 0 #1A1A1A", cursor: "pointer", transition: "all 0.12s", position: "relative" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px, -2px)"; e.currentTarget.style.boxShadow = "6px 6px 0 #1A1A1A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 #1A1A1A"; }}
          >
            Cart ({cartCount}) 🛒
            {cartCount > 0 && <span style={{ position: "absolute", top: -8, right: -8, width: 20, height: 20, borderRadius: "50%", background: P.coral, border: "2px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 800 }}>{cartCount}</span>}
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <div className="ps-float" style={{ position: "absolute", top: "10%", left: "5%", fontSize: 90, opacity: 0.12 }}>🍋</div>
        <div className="ps-float" style={{ position: "absolute", bottom: "15%", right: "7%", fontSize: 90, opacity: 0.12 }}>🧃</div>
        <div className="ps-float" style={{ position: "absolute", top: "55%", left: "82%", fontSize: 65, opacity: 0.08 }}>🌶️</div>

        <div className="ps-badge" style={{ display: "inline-block", padding: "10px 24px", background: P.coral, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 28, border: P.border, boxShadow: "3px 3px 0 #1A1A1A" }}>
          NOT YOUR AVERAGE BRAND
        </div>

        <h1 className="ps-hero-anim" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(56px, 11vw, 140px)", fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.03em" }}>
          GOOD STUFF.
          <br />
          <span style={{ color: P.coral, fontStyle: "italic" }}>NO FLUFF.</span>
        </h1>

        <p className="ps-hero-anim" style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: P.muted, marginTop: 24, maxWidth: 460, lineHeight: 1.75 }}>
          We make things you actually want to buy. Real ingredients, real personality, real good.
        </p>

        <div className="ps-hero-anim" style={{ display: "flex", gap: 14, marginTop: 40 }}>
          <span style={{ padding: "16px 44px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: P.border, boxShadow: "5px 5px 0 #1A1A1A", cursor: "pointer", transition: "all 0.12s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = "8px 8px 0 #1A1A1A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "5px 5px 0 #1A1A1A"; }}
          >SHOP NOW →</span>
          <span style={{ padding: "16px 36px", background: "transparent", color: P.text, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: P.border, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = P.text; e.currentTarget.style.color = P.textLight; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = P.text; }}
          >OUR STORY</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ padding: "14px 0", background: P.text, overflow: "hidden", borderTop: P.border, borderBottom: P.border }}>
        <div className="ps-marquee-track" style={{ display: "flex", gap: 44, whiteSpace: "nowrap", width: "max-content" }}>
          {[...Array(3)].flatMap(() => ["FREE SHIPPING", "100% NATURAL", "FOUNDED IN A KITCHEN", "NO WEIRD STUFF", "TASTES AMAZING"]).map((t, i) => (
            <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.textLight, letterSpacing: 2, display: "flex", alignItems: "center", gap: 44 }}>
              {t}<span style={{ color: P.coral, fontSize: 16 }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44 }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.coral, letterSpacing: 2 }}>WHAT WE MAKE</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 6vw, 60px)", fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em" }}>The Good Stuff.</h2>
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, borderBottom: `2px solid ${P.text}`, paddingBottom: 2, cursor: "pointer" }}>VIEW ALL →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 20 }}>
            {products.map((prod) => (
              <div key={prod.name} className="ps-prod" style={{ background: prod.color + "12", border: P.border, position: "relative", cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-5px, -5px)"; e.currentTarget.style.boxShadow = "10px 10px 0 #1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 10, right: 10, padding: "4px 12px", background: prod.color, fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, fontWeight: 700, color: P.textLight, letterSpacing: 1.5, border: P.borderThin }}>{prod.tag}</div>
                <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", background: prod.color + "18", borderBottom: P.border }}>
                  <span style={{ fontSize: 90, transition: "transform 0.3s" }}>{prod.emoji}</span>
                </div>
                <div style={{ padding: 18 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700 }}>{prod.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>{prod.price}</span>
                    <span onClick={addToCart} style={{ padding: "9px 18px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: "pointer", transition: "background 0.15s" }}
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

      {/* CATEGORIES */}
      <section style={{ padding: "80px 40px", background: P.text }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.coral, letterSpacing: 2, marginBottom: 28 }}>BROWSE BY VIBE</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14 }}>
            {[{ name: "All Products", count: 24, emoji: "🛍️" }, { name: "New Drops", count: 6, emoji: "🆕" }, { name: "Bestsellers", count: 8, emoji: "🏆" }, { name: "Limited", count: 3, emoji: "💎" }].map((cat) => (
              <div key={cat.name} className="ps-cat" style={{ padding: "28px 20px", border: "2px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = P.coral; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: P.textLight, display: "block" }}>{cat.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{cat.count} products</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: P.coral, letterSpacing: 2 }}>WHAT PEOPLE SAY</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 700, marginTop: 6 }}>Don&apos;t trust us. Trust them.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {reviews.map((r) => (
              <div key={r.name} className="ps-review" style={{ padding: 28, border: P.border, background: P.bg, boxShadow: "4px 4px 0 #1A1A1A", transition: "all 0.12s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = "7px 7px 0 #1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 #1A1A1A"; }}
              >
                <div style={{ marginBottom: 14, color: P.yellow, fontSize: 18, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: P.muted }}>— {r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 40px", background: P.coral, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="ps-float" style={{ position: "absolute", top: -30, left: "8%", fontSize: 130, opacity: 0.12 }}>🎉</div>
        <div className="ps-float" style={{ position: "absolute", bottom: -30, right: "8%", fontSize: 130, opacity: 0.12 }}>🚀</div>
        <h2 className="ps-cta-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 700, color: P.textLight, lineHeight: 0.92, position: "relative", zIndex: 1 }}>
          STOP SCROLLING.<br />START SHOPPING.
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginTop: 20, maxWidth: 400, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, position: "relative", zIndex: 1 }}>Free shipping over $50. No minimum. No subscriptions.</p>
        <span style={{ display: "inline-block", marginTop: 32, padding: "18px 48px", background: P.text, color: P.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: `3px solid ${P.textLight}`, cursor: "pointer", position: "relative", zIndex: 1, transition: "all 0.12s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-3px, -3px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${P.textLight}`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "none"; }}
        >SHOP THE DROP →</span>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px", background: P.text, borderTop: P.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>&copy; 2026 Pop Store. Stay weird.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["TikTok", "Instagram", "Twitter"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = P.coral)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >{s}</a>
          ))}
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <Link href="/work/designs/pop-store" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: P.coral, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, textDecoration: "none", border: P.borderThin, boxShadow: "3px 3px 0 #1A1A1A" }}>← BREAKDOWN</Link>
      </div>
    </div>
  );
}
