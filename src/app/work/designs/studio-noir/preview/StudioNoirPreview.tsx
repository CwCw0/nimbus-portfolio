"use client";

/**
 * STUDIO NOIR — Standalone Full-Page Preview
 * No Nimbus header/footer. Just the raw template.
 */

const p = {
  bg: "#050505",
  text: "#F0EDE8",
  textMuted: "rgba(240,237,232,0.45)",
  textDim: "rgba(240,237,232,0.65)",
  accent: "#7C5CFC",
  border: "rgba(240,237,232,0.08)",
};

const projects = [
  { num: "01", title: "Meridian", category: "Brand Identity", year: "2026" },
  { num: "02", title: "Voidframe", category: "Web Application", year: "2025" },
  { num: "03", title: "Obsidian", category: "E-Commerce", year: "2026" },
  { num: "04", title: "Parallax", category: "Landing Page", year: "2025" },
  { num: "05", title: "Zenith", category: "Product Design", year: "2026" },
];

const services = [
  { num: "01", title: "Web Design & Development", desc: "Custom websites that move. Editorial layouts, cinematic motion, modern stacks." },
  { num: "02", title: "Brand Identity", desc: "Visual systems that tell your story. Logo, colour, type, guidelines." },
  { num: "03", title: "Creative Direction", desc: "The thinking behind the work. Strategy, art direction, creative oversight." },
];

export default function StudioNoirPreview() {
  return (
    <div style={{ background: p.bg, color: p.text, minHeight: "100vh", cursor: "default" }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 64px", background: "rgba(5,5,5,0.8)", backdropFilter: "blur(12px)" }}>
        <span style={{ fontFamily: "var(--font-display, 'Instrument Serif', serif)", fontSize: 20, color: p.text, letterSpacing: "0.08em" }}>
          STUDIO<span style={{ color: p.accent }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Work", "About", "Services", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontFamily: "var(--font-body, 'Outfit', sans-serif)", fontSize: 13, color: p.textMuted, textDecoration: "none", letterSpacing: "0.5px" }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 64px", position: "relative", overflow: "hidden" }}>
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--font-display, serif)", fontSize: "clamp(200px, 30vw, 500px)", color: p.text, opacity: 0.015, userSelect: "none", pointerEvents: "none" }}>N</span>
        <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 4, color: p.accent, marginBottom: 32, fontWeight: 500 }}>CREATIVE STUDIO</span>
        <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(48px, 8vw, 120px)", color: p.text, lineHeight: 1.0, letterSpacing: "-0.03em", maxWidth: 900, fontWeight: 400 }}>
          We craft digital
          <br />
          <em style={{ fontStyle: "italic", color: p.accent }}>experiences</em>
        </h1>
        <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 16, color: p.textDim, marginTop: 32, maxWidth: 480, lineHeight: 1.75 }}>
          A creative studio specializing in brand identity, web design, and digital experiences that move. [Demo content]
        </p>
        <div style={{ position: "absolute", bottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 10, letterSpacing: 3, color: p.textMuted }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${p.accent}, transparent)`, opacity: 0.5 }} />
        </div>
      </section>

      {/* Marquee */}
      <div style={{ padding: "40px 0", borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}`, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", fontFamily: "var(--font-display, serif)", fontSize: "clamp(24px, 4vw, 48px)", color: p.textMuted, animation: "marquee 20s linear infinite" }}>
          {["DESIGN", "DEVELOP", "BRAND", "ANIMATE", "LAUNCH", "DESIGN", "DEVELOP", "BRAND", "ANIMATE", "LAUNCH", "DESIGN", "DEVELOP", "BRAND", "ANIMATE", "LAUNCH"].map((w, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 60 }}>{w}<span style={{ color: p.accent, fontSize: 14 }}>&#9670;</span></span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
      </div>

      {/* Work */}
      <section id="work" style={{ padding: "140px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 80 }}>
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 4, color: p.accent, fontWeight: 500 }}>SELECTED WORK</span>
            <div style={{ flex: 1, height: 1, background: p.border }} />
          </div>
          {projects.map((project, i) => (
            <div key={project.num} style={{ borderTop: i === 0 ? `1px solid ${p.border}` : "none", borderBottom: `1px solid ${p.border}`, padding: "40px 0", display: "flex", alignItems: "center", gap: 32, cursor: "pointer" }}>
              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 14, color: p.textMuted, width: 40, letterSpacing: 2 }}>{project.num}</span>
              <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(32px, 4.5vw, 64px)", color: p.text, flex: 1, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{project.title}</h3>
              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, color: p.textMuted, letterSpacing: 1 }}>{project.category}</span>
              <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, color: p.textMuted }}>{project.year}</span>
              <span style={{ fontSize: 20, color: p.textMuted }}>&#8599;</span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "140px 64px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80 }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 4, color: p.accent, fontWeight: 500, display: "block", marginBottom: 24 }}>ABOUT</span>
            <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(36px, 5vw, 72px)", color: p.text, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              We believe in the
              <br />
              power of <em style={{ fontStyle: "italic" }}>restraint.</em>
            </h2>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
            <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 16, color: p.textDim, lineHeight: 1.8 }}>
              Good design isn&apos;t about adding more — it&apos;s about knowing what to remove. We craft digital experiences with intention. Every pixel, every animation, every interaction serves a purpose.
            </p>
            <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 16, color: p.textDim, lineHeight: 1.8 }}>
              Founded in 2024, we&apos;ve worked with brands across fashion, technology, architecture, and culture — always with the same approach: understand deeply, design deliberately, build obsessively.
            </p>
            <div style={{ display: "flex", gap: 48, marginTop: 16 }}>
              {[{ num: "47+", label: "Projects" }, { num: "12", label: "Awards" }, { num: "100%", label: "Independent" }].map((stat) => (
                <div key={stat.label}>
                  <span style={{ fontFamily: "var(--font-display, serif)", fontSize: 40, color: p.text, display: "block", letterSpacing: "-0.02em" }}>{stat.num}</span>
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: p.textMuted, letterSpacing: 1 }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "140px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 4, color: p.accent, fontWeight: 500, display: "block", marginBottom: 80 }}>SERVICES</span>
          {services.map((service) => (
            <div key={service.num} style={{ borderBottom: `1px solid ${p.border}`, padding: "48px 0", display: "flex", gap: 48, alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-display, serif)", fontSize: 64, color: p.accent, opacity: 0.15, lineHeight: 1, minWidth: 80 }}>{service.num}</span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(24px, 3vw, 40px)", color: p.text, letterSpacing: "-0.5px", marginBottom: 12 }}>{service.title}</h3>
                <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 15, color: p.textDim, lineHeight: 1.7, maxWidth: 500 }}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "160px 64px", background: "#0A0A0A", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, letterSpacing: 4, color: p.accent, fontWeight: 500, display: "block", marginBottom: 32 }}>GET IN TOUCH</span>
        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(40px, 7vw, 100px)", color: p.text, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          Let&apos;s create something
          <br />
          <em style={{ fontStyle: "italic", color: p.accent }}>extraordinary.</em>
        </h2>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 48, padding: "18px 40px", border: `1px solid ${p.border}`, color: p.text, fontFamily: "var(--font-body, sans-serif)", fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: 0.5 }}>
          Start a Project &#8599;
        </a>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 64px", borderTop: `1px solid ${p.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: p.textMuted }}>&copy; 2026 Studio. All rights reserved.</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Twitter", "Dribbble", "Instagram"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, color: p.textMuted, textDecoration: "none" }}>{s}</a>
          ))}
        </div>
      </footer>

      {/* Back to showcase link */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        <a href="/work/designs/studio-noir" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: p.accent, color: "#fff", fontFamily: "var(--font-body, sans-serif)", fontSize: 12, fontWeight: 600, textDecoration: "none", letterSpacing: 0.5 }}>
          ← Back to Breakdown
        </a>
      </div>
    </div>
  );
}
