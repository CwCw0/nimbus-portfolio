"use client";

const e = { bg: "#FFFFFF", bgSoft: "#F8FAFC", bgDark: "#0F172A", text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8", accent: "#3B82F6", accentLight: "#DBEAFE", border: "#E2E8F0" };

const features = [
  { title: "Lightning Fast", desc: "Sub-100ms response times on every action. No loading spinners, no waiting.", icon: "⚡" },
  { title: "Enterprise Security", desc: "SOC 2 Type II compliant. End-to-end encryption. Your data stays yours.", icon: "🔒" },
  { title: "Team Collaboration", desc: "Real-time multiplayer editing. See your team's cursors, changes, and comments live.", icon: "👥" },
  { title: "API-First", desc: "Everything you see in the UI is available through our REST and GraphQL APIs.", icon: "⚙️" },
  { title: "Analytics Built In", desc: "Understand usage patterns, track engagement, and make data-driven decisions.", icon: "📊" },
  { title: "24/7 Support", desc: "Human support, not chatbots. Average response time under 4 minutes.", icon: "💬" },
];

export default function ElevatePreview() {
  return (
    <div style={{ background: e.bg, color: e.text, minHeight: "100vh", cursor: "default" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 64px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${e.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: e.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700 }}>E</div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700 }}>Elevate</span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Product", "Pricing", "Docs", "Blog"].map((i) => (
            <a key={i} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: e.textMuted, textDecoration: "none" }}>{i}</a>
          ))}
          <span style={{ padding: "10px 24px", background: e.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, borderRadius: 8 }}>Get Started</span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "120px 64px 80px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${e.border} 1px, transparent 1px)`, backgroundSize: "32px 32px", opacity: 0.5 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: e.accentLight, borderRadius: 20, marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.accent }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: e.accent }}>Now in public beta</span>
          </div>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: 800 }}>The platform your team actually wants to use.</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: e.textMuted, marginTop: 24, maxWidth: 560, lineHeight: 1.7, marginLeft: "auto", marginRight: "auto" }}>Elevate brings your entire workflow into one place. Plan, build, ship, and measure — without the context switching.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}>
            <span style={{ padding: "14px 32px", background: e.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600, borderRadius: 8 }}>Start for Free</span>
            <span style={{ padding: "14px 32px", border: `1px solid ${e.border}`, fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500, borderRadius: 8 }}>Watch Demo</span>
          </div>
        </div>
      </section>

      {/* Logos */}
      <div style={{ padding: "48px 64px", borderTop: `1px solid ${e.border}`, borderBottom: `1px solid ${e.border}`, textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: e.textDim, marginBottom: 32 }}>Trusted by 10,000+ teams worldwide</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
          {["Acme Corp", "TechFlow", "Pinnacle", "Meridian", "CloudBase", "Quantum"].map((l) => (
            <span key={l} style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, color: e.textDim, opacity: 0.5 }}>{l}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ padding: "120px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: e.accent, letterSpacing: 1, textTransform: "uppercase" }}>Features</span>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, marginTop: 16, letterSpacing: "-0.02em" }}>Everything you need. Nothing you don&apos;t.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} style={{ padding: 32, background: e.bgSoft, border: `1px solid ${e.border}`, borderRadius: 12 }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 16 }}>{f.icon}</span>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: e.textMuted, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ padding: "80px 64px", background: e.bgDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          {[{ v: "99.99%", l: "Uptime SLA" }, { v: "< 100ms", l: "Response Time" }, { v: "10,000+", l: "Teams Using Us" }, { v: "4.9/5", l: "Customer Rating" }].map((m) => (
            <div key={m.l}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#FFFFFF" }}>{m.v}</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", display: "block", marginTop: 8 }}>{m.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "120px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            { quote: "Elevate replaced three tools for us. Our team is faster and our clients are happier.", name: "Sarah Chen", role: "CTO, TechFlow", avatar: "SC" },
            { quote: "The API is incredibly well-documented. We had our integration running in under a day.", name: "Marcus Webb", role: "Lead Engineer, Pinnacle", avatar: "MW" },
          ].map((t) => (
            <div key={t.name} style={{ padding: 40, background: e.bgSoft, border: `1px solid ${e.border}`, borderRadius: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: e.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: e.accent }}>{t.avatar}</div>
                <div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, display: "block" }}>{t.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: e.textMuted }}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 64px", background: e.bgSoft, textAlign: "center" }}>
        <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Ready to elevate your workflow?</h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 17, color: e.textMuted, marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>Start free. No credit card required. Upgrade when you&apos;re ready.</p>
        <span style={{ display: "inline-block", marginTop: 32, padding: "16px 40px", background: e.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 600, borderRadius: 8 }}>Get Started Free</span>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px 64px", borderTop: `1px solid ${e.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: e.textDim }}>&copy; 2026 Elevate. All rights reserved.</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Privacy", "Terms", "Status"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: e.textDim, textDecoration: "none" }}>{s}</a>
          ))}
        </div>
      </footer>

      {/* Back link */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <a href="/work/designs/elevate" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: e.accent, color: "#fff", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}>← Back to Breakdown</a>
      </div>
    </div>
  );
}
