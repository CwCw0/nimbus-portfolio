"use client";

import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import CustomCursor from "../../../../components/CustomCursor";
import SmoothScroll from "../../../../components/SmoothScroll";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const GUMROAD_URL = "";
const PRICE = "RM 299";
const PRICE_USD = "$69 USD";

const designChoices = [
  { num: "01", title: "White + One Accent", body: "Pure white #FFFFFF background, near-black text, single blue #3B82F6 accent. The 'Linear look' — works because white creates perceived space and cleanliness. One accent colour gives every CTA instant visual priority. Zero confusion about what to click." },
  { num: "02", title: "Inter — One Font, Three Weights", body: "400, 600, 700. Corporate sites need consistency, not personality. Inter is the most readable sans-serif on screens — used by GitHub, Figma, and Linear. Three weights create sufficient hierarchy without noise." },
  { num: "03", title: "Dot Grid Background", body: "Subtle radial dot grid at low opacity in the hero. Pattern pioneered by Vercel — adds visual texture without competing. Says 'technical, precise, engineered' without showing code. CSS-only — zero performance cost." },
  { num: "04", title: "Bento Feature Cards", body: "3-column grid with equal cards. Named after Japanese lunch boxes. Linear, Notion, and Arc all use it. Scannable, modular, mobile-friendly. Users compare features quickly, easy to add/remove cards." },
  { num: "05", title: "Trust Above the Fold", body: "Logo bar immediately after hero. Metric callouts in a dark strip. Testimonials with real names. Pages with trust signals above the fold convert 37% better (Baymard Institute). This isn't decoration — it's conversion optimization." },
];

const uxDecisions = [
  { title: "Glassmorphism Nav", body: "Backdrop-filter blur creates frosted glass. Content scrolls behind but stays readable. Both aesthetic and functional — user always knows where they are." },
  { title: "Beta Badge Pattern", body: "Creates urgency (be early) and sets expectations (product evolving). Every successful SaaS launch page uses some version of this." },
  { title: "Dark Metrics Strip", body: "Contrast break signals importance. Creates visual rhythm — without it, the page is a white wall." },
];

const included = [
  "7 sections (Nav, Hero, Logos, Features, Metrics, Testimonials, CTA, Footer)",
  "Light mode with proper accessible contrast ratios (WCAG AA)",
  "Bento grid that degrades gracefully: 3-col → 2-col → 1-col",
  "Testimonial avatars with fallback initials (no broken images)",
  "Single clear CTA per section — not four competing buttons",
  "Semantic HTML with proper heading hierarchy",
  "Next.js + Tailwind source code",
  "1-click Vercel deploy",
];

const excluded = [
  "No carousel for testimonials — carousels have <1% interaction rate (NNG)",
  "No mega-menu — overkill for most SaaS sites",
  "No animations that delay content — everything visible immediately",
  "No dark mode toggle — corporate clients show this to their boss, boss uses light mode",
];

export default function ElevateShowcase() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const cleanups: (() => void)[] = [];
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      gsap.set(split.chars || [], { opacity: 0, y: 40 });
      gsap.to(split.chars || [], { opacity: 1, y: 0, duration: 0.5, stagger: 0.02, ease: "power3.out", delay: 0.3 });
      cleanups.push(() => split.revert());
    }
    const hero = heroRef.current;
    if (hero) {
      const subs = hero.querySelectorAll(".showcase-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.5 });
    }
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <div className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work" className="flex items-center gap-2 font-body text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)">
              <ArrowLeft className="h-4 w-4" /> Back to Work
            </Link>
          </div>

          <section ref={heroRef} className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="showcase-fade bg-(--color-accent-subtle) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--color-accent)">TEMPLATE</span>
                <span className="showcase-fade font-body text-[11px] text-(--color-text-muted)">Corporate & SaaS</span>
              </div>
              <h1 ref={headingRef} className="font-display tracking-[-3px] text-(--color-text-primary)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Elevate</h1>
              <p className="showcase-fade mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim) max-md:text-base">
                A premium, light-mode corporate website template for SaaS companies, startups, and professional services. Structured grid, bento cards, trust signals woven throughout.
              </p>
              <div className="showcase-fade mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "Tailwind", "Framer Motion"].map((t) => (
                  <span key={t} className="border border-(--color-border) px-3 py-1 font-body text-[11px] text-(--color-text-muted)">{t}</span>
                ))}
                <span className="font-body text-[13px] text-(--color-text-muted)">|</span>
                <span className="font-body text-[13px] font-medium text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-[12px] text-(--color-text-muted)">{PRICE_USD}</span>
              </div>
              <div className="showcase-fade mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:scale-[1.03]">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-8 py-4 font-body text-sm font-medium text-(--color-accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/elevate/preview" className="flex items-center gap-2 border border-(--color-border) px-8 py-4 font-body text-sm font-medium text-(--color-text-secondary) transition-all hover:border-(--color-accent-border)">Live Preview →</Link>
              </div>
            </div>
          </section>

          <div className="h-px w-full max-w-250 mx-auto bg-(--color-border)" />

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">DESIGN CHOICES</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>
              <div className="flex flex-col gap-0">
                {designChoices.map((c) => (
                  <div key={c.num} className="flex gap-12 border-b border-(--color-border) py-10 max-md:flex-col max-md:gap-4">
                    <span className="font-display text-(--color-accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{c.num}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-[22px] tracking-[-0.5px] text-(--color-text-primary) mb-3">{c.title}</h3>
                      <p className="font-body text-[15px] leading-[1.75] text-(--color-text-dim) max-w-160">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">UX DECISIONS</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>
              <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
                {uxDecisions.map((ux) => (
                  <div key={ux.title} className="flex flex-col gap-4 border border-(--color-border) p-8">
                    <h3 className="font-display text-lg text-(--color-text-primary)">{ux.title}</h3>
                    <p className="font-body text-[14px] leading-[1.7] text-(--color-text-dim)">{ux.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250 grid grid-cols-2 gap-16 max-md:grid-cols-1">
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">WHAT&apos;S INCLUDED</span>
                  <div className="h-px flex-1 bg-(--color-border)" />
                </div>
                <div className="flex flex-col gap-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 shrink-0 text-(--color-accent) mt-0.5" />
                      <span className="font-body text-[14px] leading-[1.6] text-(--color-text-secondary)">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted)">DELIBERATELY EXCLUDED</span>
                  <div className="h-px flex-1 bg-(--color-border)" />
                </div>
                <div className="flex flex-col gap-4">
                  {excluded.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <X className="h-4 w-4 shrink-0 text-(--color-text-muted) mt-0.5" />
                      <span className="font-body text-[14px] leading-[1.6] text-(--color-text-dim)">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250 text-center">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent) mb-6 block">WHO THIS IS FOR</span>
              <p className="mx-auto max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim)">
                SaaS companies, startups, fintech, professional services, consulting firms — any business that needs to project trust, clarity, and modern competence.
              </p>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted) mb-8 block">DESIGN REFERENCES</span>
              <div className="flex flex-wrap gap-4">
                {["linear.app", "stripe.com", "vercel.com", "ramp.com", "resend.com"].map((ref) => (
                  <span key={ref} className="border border-(--color-border) px-4 py-2 font-body text-[13px] text-(--color-text-muted)">{ref}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--color-text-primary)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Elevate.</h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--color-text-dim)">Source code and documentation for a corporate site that looks like it cost six figures.</p>
              <div className="flex items-center gap-6">
                <span className="font-display text-[32px] text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-sm text-(--color-text-muted)">{PRICE_USD}</span>
              </div>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-10 py-4 font-body text-base font-semibold text-white transition-all hover:scale-[1.03]">Buy on Gumroad <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-10 py-4 font-body text-base font-medium text-(--color-accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--color-text-muted)">Or <Link href="/contact" className="text-(--color-accent) underline">hire me to customise it</Link> for your brand.</p>
            </div>
          </section>

          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
