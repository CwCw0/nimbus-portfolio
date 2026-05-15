"use client";

import Image from "next/image";
import PackageSection from "../PackageSection";
import TemplateNav from "../TemplateNav";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const GUMROAD_URL = "";

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
        <div className="flex w-full flex-col overflow-x-hidden bg-(--ink-0)">
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work?view=lab" className="flex items-center gap-2 font-body text-sm text-(--fg-faint) transition-colors hover:text-(--fg)">
              <ArrowLeft className="h-4 w-4" /> Design Lab
            </Link>
            <span className="font-body text-xs text-(--fg-faint)">/</span>
            <span className="font-body text-xs text-(--fg-dim)">Elevate</span>
          </div>

          <section ref={heroRef} className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="showcase-fade bg-(--accent-soft) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--accent)">TEMPLATE</span>
                <span className="showcase-fade font-body text-[11px] text-(--fg-faint)">Corporate & SaaS</span>
              </div>
              <h1 ref={headingRef} className="font-display tracking-[-3px] text-(--fg)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Elevate</h1>
              <p className="showcase-fade mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim) max-md:text-base" style={{ textWrap: 'balance' } as React.CSSProperties}>
                A premium, light-mode corporate website template for SaaS companies, startups, and professional services. Structured grid, bento cards, trust signals woven throughout.
              </p>
              <div className="showcase-fade mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "Tailwind", "Framer Motion"].map((t) => (
                  <span key={t} className="border border-(--line) px-3 py-1 font-body text-[11px] text-(--fg-faint)">{t}</span>
                ))}
              </div>
              <div className="showcase-fade mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:scale-[1.03]">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-8 py-4 font-body text-sm font-medium text-(--accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/elevate/preview" className="flex items-center gap-2 border border-(--line) px-8 py-4 font-body text-sm font-medium text-(--fg-dim) transition-all hover:border-(--accent-2)">Live Preview →</Link>
              </div>
            </div>
          </section>

          {/* Screenshot Gallery */}
          <section className="w-full px-16 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250 flex flex-col gap-4">
              {/* Hero screenshot — full width */}
              <div className="overflow-hidden rounded-xl border border-(--line)">
                <Image
                  src="/images/templates/elevate/hero.png"
                  alt="Elevate homepage"
                  width={2000}
                  height={1200}
                  className="w-full object-cover"
                />
              </div>
              {/* Two-column row: inner page (wider) + mobile (narrower) */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/elevate/inner.png"
                    alt="Elevate inner page"
                    width={1400}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/elevate/mobile.png"
                    alt="Elevate mobile view"
                    width={600}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="h-px w-full max-w-250 mx-auto bg-(--line)" />

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">DESIGN CHOICES</span>
                <div className="h-px flex-1 bg-(--line)" />
              </div>
              <div className="flex flex-col gap-0">
                {designChoices.map((c) => (
                  <div key={c.num} className="flex gap-12 border-b border-(--line) py-10 max-md:flex-col max-md:gap-4">
                    <span className="font-display text-(--accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{c.num}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-[22px] tracking-[-0.5px] text-(--fg) mb-3">{c.title}</h3>
                      <p className="font-body text-[15px] leading-[1.75] text-(--fg-dim) max-w-160">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">UX DECISIONS</span>
                <div className="h-px flex-1 bg-(--line)" />
              </div>
              <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
                {uxDecisions.map((ux) => (
                  <div key={ux.title} className="flex flex-col gap-4 border border-(--line) p-8">
                    <h3 className="font-display text-lg text-(--fg)">{ux.title}</h3>
                    <p className="font-body text-[14px] leading-[1.7] text-(--fg-dim)">{ux.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250 grid grid-cols-2 gap-16 max-md:grid-cols-1">
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">WHAT&apos;S INCLUDED</span>
                  <div className="h-px flex-1 bg-(--line)" />
                </div>
                <div className="flex flex-col gap-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 shrink-0 text-(--accent) mt-0.5" />
                      <span className="font-body text-[14px] leading-[1.6] text-(--fg-dim)">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-body text-[10px] font-medium tracking-[4px] text-(--fg-faint)">DELIBERATELY EXCLUDED</span>
                  <div className="h-px flex-1 bg-(--line)" />
                </div>
                <div className="flex flex-col gap-4">
                  {excluded.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <X className="h-4 w-4 shrink-0 text-(--fg-faint) mt-0.5" />
                      <span className="font-body text-[14px] leading-[1.6] text-(--fg-dim)">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250 text-center">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent) mb-6 block">WHO THIS IS FOR</span>
              <p className="mx-auto max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>
                SaaS companies, startups, fintech, professional services, consulting firms — any business that needs to project trust, clarity, and modern competence.
              </p>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--fg-faint) mb-8 block">DESIGN REFERENCES</span>
              <div className="flex flex-wrap gap-4">
                {["linear.app", "stripe.com", "vercel.com", "ramp.com", "resend.com"].map((ref) => (
                  <span key={ref} className="border border-(--line) px-4 py-2 font-body text-[13px] text-(--fg-faint)">{ref}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--fg)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Elevate.</h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>Source code and documentation for a corporate site that looks like it cost six figures.</p>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-10 py-4 font-body text-base font-semibold text-white transition-all hover:scale-[1.03]">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-10 py-4 font-body text-base font-medium text-(--accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--fg-faint)">Or <Link href="/contact" className="text-(--accent) underline">hire me to customise it</Link> for your brand.</p>
            </div>
          </section>

          <PackageSection />

          <TemplateNav current="elevate" />
        </div>
  );
}
