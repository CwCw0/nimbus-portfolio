"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { SNLayout, C, F_HEAD, F_BODY, useIsMobile } from "../shared";

export default function StudioNoirContact() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (heading) {
        const split = new SplitType(heading, { types: "chars" });
        gsap.set(split.chars || [], { y: "100%", opacity: 0 });
        gsap.to(split.chars || [], { y: "0%", opacity: 1, duration: 0.7, stagger: 0.02, ease: "power3.out", delay: 0.3 });
      }

      el.querySelectorAll(".sn-fade").forEach((item) => {
        gsap.fromTo(item, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <SNLayout current="Contact">
      <div ref={mainRef}>
        {/* Hero */}
        <section style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "120px 20px 60px" : "140px 48px 80px", textAlign: "center", alignItems: "center" }}>
          <span style={{ fontFamily: F_BODY, fontSize: 11, letterSpacing: 6, color: C.accent, fontWeight: 500, marginBottom: 32 }}>GET IN TOUCH</span>
          <h1 ref={headingRef} style={{ fontFamily: F_HEAD, fontSize: isMobile ? "48px" : "clamp(56px, 9vw, 140px)", lineHeight: 0.9, letterSpacing: "0.02em", overflow: "hidden", maxWidth: 900 }}>
            LET&apos;S BUILD SOMETHING <span style={{ color: C.accent }}>REMARKABLE</span>
          </h1>
          <p className="sn-fade" style={{ fontFamily: F_BODY, fontSize: 17, color: C.dim, marginTop: 32, maxWidth: 480, lineHeight: 1.85 }}>
            Have a project in mind? We&apos;d love to hear about it. Tell us about your brand and we&apos;ll tell you how we can help.
          </p>
        </section>

        {/* Contact form + info */}
        <section style={{ padding: isMobile ? "0 20px 80px" : "0 48px 140px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80 }}>
            {/* Form */}
            <div className="sn-fade">
              <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 40 }}>SEND A MESSAGE</span>
              <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[{ label: "NAME", placeholder: "Your name" }, { label: "EMAIL", placeholder: "your@email.com" }, { label: "COMPANY", placeholder: "Company (optional)" }].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted, display: "block", marginBottom: 8 }}>{field.label}</label>
                    <input type="text" placeholder={field.placeholder} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.border}`, padding: "12px 0", fontFamily: F_BODY, fontSize: 16, color: C.text, outline: "none" }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted, display: "block", marginBottom: 8 }}>PROJECT DETAILS</label>
                  <textarea placeholder="Tell us about your project..." rows={5} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.border}`, padding: "12px 0", fontFamily: F_BODY, fontSize: 16, color: C.text, outline: "none", resize: "vertical" }} />
                </div>
                <button type="submit" style={{ fontFamily: F_HEAD, fontSize: 16, letterSpacing: 5, padding: "18px 40px", background: C.accent, color: C.bg, border: "none", cursor: "pointer", marginTop: 16, transition: "all 0.3s", alignSelf: "flex-start" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = C.text; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = C.accent; }}
                >SEND MESSAGE ↗</button>
              </form>
            </div>

            {/* Info */}
            <div className="sn-fade">
              <span style={{ fontFamily: F_HEAD, fontSize: 14, letterSpacing: 8, color: C.accent, display: "block", marginBottom: 40 }}>CONTACT INFO</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {[
                  { label: "EMAIL", value: "hello@studionoir.com" },
                  { label: "LOCATION", value: "Remote — Worldwide" },
                  { label: "AVAILABILITY", value: "Open for new projects" },
                ].map((item) => (
                  <div key={item.label} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 24 }}>
                    <span style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted, display: "block", marginBottom: 8 }}>{item.label}</span>
                    <span style={{ fontFamily: F_BODY, fontSize: 18, color: C.text }}>{item.value}</span>
                  </div>
                ))}

                <div>
                  <span style={{ fontFamily: F_BODY, fontSize: 10, letterSpacing: 3, color: C.muted, display: "block", marginBottom: 16 }}>SOCIAL</span>
                  <div style={{ display: "flex", gap: 20 }}>
                    {["Dribbble", "Behance", "Instagram", "Twitter"].map((s) => (
                      <a key={s} href="#" style={{ fontFamily: F_BODY, fontSize: 14, color: C.dim, textDecoration: "none", transition: "color 0.3s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = C.dim)}
                      >{s}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section style={{ height: 300, background: C.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: F_BODY, fontSize: 12, letterSpacing: 3, color: C.muted }}>MAP INTEGRATION</span>
        </section>
      </div>
    </SNLayout>
  );
}
