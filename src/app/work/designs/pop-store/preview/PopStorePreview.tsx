"use client";

const pp = { bg: "#FFF8F0", text: "#1A1A1A", textLight: "#FFF8F0", textMuted: "#6B6B6B", coral: "#FF6B35", purple: "#8B5CF6", green: "#22C55E", yellow: "#FBBF24", border: "3px solid #1A1A1A" };

const products = [
  { name: "The Original", price: "$24", tag: "BESTSELLER", color: pp.coral, emoji: "🔥" },
  { name: "Berry Blast", price: "$28", tag: "NEW DROP", color: pp.purple, emoji: "🫐" },
  { name: "Green Machine", price: "$26", tag: "FAN FAVORITE", color: pp.green, emoji: "🥑" },
  { name: "Golden Hour", price: "$30", tag: "LIMITED", color: pp.yellow, emoji: "✨" },
];

const reviews = [
  { text: "Literally the best thing I've ever put in my body. And I've tried a lot of things.", name: "Jake M.", stars: 5 },
  { text: "My fridge has never looked this cool. My roommate is jealous. Life is good.", name: "Priya S.", stars: 5 },
  { text: "Bought one. Then bought twelve more. No regrets. Send help.", name: "Tom K.", stars: 5 },
];

export default function PopStorePreview() {
  return (
    <div style={{ background: pp.bg, color: pp.text, minHeight: "100vh", cursor: "default" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 48px", background: pp.bg, borderBottom: pp.border }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700 }}>POP<span style={{ color: pp.coral }}>.</span></span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Shop", "About", "FAQ"].map((i) => (
            <a key={i} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: pp.text, textDecoration: "none" }}>{i}</a>
          ))}
          <span style={{ padding: "12px 28px", background: pp.text, color: pp.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, border: pp.border, boxShadow: "4px 4px 0 #1A1A1A" }}>Cart (0) 🛒</span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", left: "8%", fontSize: 80, opacity: 0.1, transform: "rotate(-15deg)" }}>🍋</div>
        <div style={{ position: "absolute", bottom: "20%", right: "10%", fontSize: 80, opacity: 0.1, transform: "rotate(20deg)" }}>🧃</div>
        <div style={{ display: "inline-block", padding: "8px 20px", background: pp.coral, color: pp.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 32, transform: "rotate(-2deg)", border: pp.border, boxShadow: "3px 3px 0 #1A1A1A" }}>NOT YOUR AVERAGE BRAND</div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(48px, 9vw, 120px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.03em" }}>GOOD STUFF.<br /><span style={{ color: pp.coral, fontStyle: "italic" }}>NO FLUFF.</span></h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: pp.textMuted, marginTop: 24, maxWidth: 480, lineHeight: 1.7 }}>We make things you actually want to buy. Real ingredients, real personality, real good. No corporate nonsense.</p>
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          <span style={{ padding: "16px 40px", background: pp.text, color: pp.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: pp.border, boxShadow: "5px 5px 0 #1A1A1A" }}>SHOP NOW →</span>
          <span style={{ padding: "16px 40px", background: "transparent", color: pp.text, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: pp.border }}>OUR STORY</span>
        </div>
      </section>

      {/* Feature strip */}
      <div style={{ padding: "16px 0", background: pp.text, overflow: "hidden", borderTop: pp.border, borderBottom: pp.border }}>
        <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", animation: "marquee 25s linear infinite" }}>
          {["FREE SHIPPING OVER $50", "100% NATURAL", "FOUNDED IN A KITCHEN", "NO WEIRD STUFF", "ACTUALLY TASTES GOOD", "FREE SHIPPING OVER $50", "100% NATURAL", "FOUNDED IN A KITCHEN", "NO WEIRD STUFF", "ACTUALLY TASTES GOOD", "FREE SHIPPING OVER $50", "100% NATURAL"].map((item, i) => (
            <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: pp.textLight, letterSpacing: 2, display: "flex", alignItems: "center", gap: 48 }}>{item}<span style={{ color: pp.coral }}>★</span></span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
      </div>

      {/* Products */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: pp.coral, letterSpacing: 2 }}>WHAT WE MAKE</span>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginTop: 8, letterSpacing: "-0.02em" }}>The Good Stuff.</h2>
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, borderBottom: `2px solid ${pp.text}`, paddingBottom: 2 }}>VIEW ALL →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {products.map((prod) => (
              <div key={prod.name} style={{ background: prod.color + "15", border: pp.border, position: "relative", cursor: "pointer" }}>
                <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 12px", background: prod.color, fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: pp.textLight, letterSpacing: 1.5, border: `2px solid ${pp.text}` }}>{prod.tag}</div>
                <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", background: prod.color + "20", borderBottom: pp.border }}>
                  <span style={{ fontSize: 100 }}>{prod.emoji}</span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700 }}>{prod.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700 }}>{prod.price}</span>
                    <span style={{ padding: "10px 20px", background: pp.text, color: pp.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>ADD TO CART</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "80px 48px", background: pp.text }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: pp.coral, letterSpacing: 2, marginBottom: 32 }}>BROWSE BY VIBE</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[{ name: "All Products", count: 24, emoji: "🛍️" }, { name: "New Drops", count: 6, emoji: "🆕" }, { name: "Bestsellers", count: 8, emoji: "🏆" }, { name: "Limited Edition", count: 3, emoji: "💎" }].map((cat) => (
              <div key={cat.name} style={{ padding: "32px 24px", border: "2px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 32 }}>{cat.emoji}</span>
                <div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: pp.textLight, display: "block" }}>{cat.name}</span>
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
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: pp.coral, letterSpacing: 2 }}>WHAT PEOPLE SAY</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, marginTop: 8 }}>Don&apos;t trust us. Trust them.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {reviews.map((r) => (
              <div key={r.name} style={{ padding: 32, border: pp.border, boxShadow: "4px 4px 0 #1A1A1A" }}>
                <div style={{ marginBottom: 16, fontSize: 20, letterSpacing: 2 }}>{"★".repeat(r.stars)}</div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>&ldquo;{r.text}&rdquo;</p>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: pp.textMuted }}>— {r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 48px", background: pp.coral, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, left: "10%", fontSize: 120, opacity: 0.15, transform: "rotate(-10deg)" }}>🎉</div>
        <div style={{ position: "absolute", bottom: -20, right: "10%", fontSize: 120, opacity: 0.15, transform: "rotate(15deg)" }}>🚀</div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: pp.textLight, lineHeight: 1.0, position: "relative", zIndex: 1 }}>STOP SCROLLING.<br />START SHOPPING.</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginTop: 20, maxWidth: 400, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, position: "relative", zIndex: 1 }}>Free shipping on orders over $50. No minimum. No weird subscriptions.</p>
        <span style={{ display: "inline-block", marginTop: 32, padding: "18px 48px", background: pp.text, color: pp.textLight, fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, border: `3px solid ${pp.textLight}`, position: "relative", zIndex: 1 }}>SHOP THE DROP →</span>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px", background: pp.text, borderTop: pp.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>&copy; 2026 Pop Store. All rights reserved. Stay weird.</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["TikTok", "Instagram", "Twitter"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{s}</a>
          ))}
        </div>
      </footer>

      {/* Back link */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <a href="/work/designs/pop-store" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: pp.coral, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, textDecoration: "none", border: `2px solid ${pp.text}`, boxShadow: "3px 3px 0 #1A1A1A" }}>← Back to Breakdown</a>
      </div>
    </div>
  );
}
