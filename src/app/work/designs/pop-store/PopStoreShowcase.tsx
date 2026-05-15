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
  { num: "01", title: "Neo-Brutalist Language", body: "3px solid borders. Hard box shadows (4px offset, no blur). Zero border-radius. Raw, honest, impossible to ignore. In a sea of rounded corners and soft shadows, hard edges stop the scroll. Tony's Chocolonely pioneered this for e-commerce." },
  { num: "02", title: "Per-Product Color Theming", body: "Each product card has its own background tint. Inspired by Simply Chocolate (Awwwards SOTD) where each product lives in its own visual world. Users identify products by colour before reading the name — that's faster browsing." },
  { num: "03", title: "Space Grotesk — Chunky & Fun", body: "Bold, geometric, slightly playful heading font paired with Inter for body. Says 'we're serious about quality but we don't take ourselves seriously.' The typographic equivalent of showing up to a board meeting in a great t-shirt." },
  { num: "04", title: "Warm Cream Base", body: "#FFF8F0 — not pure white. Makes the entire site warmer and more inviting. Pure white feels clinical (Elevate uses it intentionally). E-commerce wants approachable. The warm base makes the coral accent #FF6B35 sing instead of clash." },
  { num: "05", title: "Personality in Every Pixel", body: "Feature strips, irreverent copy, emoji as visual system, floating decorative elements. Inspired by Liquid Death and Graza — brands where the design IS the brand. The template teaches clients what fun looks like." },
];

const uxDecisions = [
  { title: "Visible Add-to-Cart", body: "Every product card shows the button by default — not hidden behind hover. On mobile, hover doesn't exist. Any template that hides purchase buttons behind hover is losing mobile conversions." },
  { title: "Feature Strip", body: "Scrolling marquee communicates key selling points without taking page real estate. 'FREE SHIPPING · 100% NATURAL · NO WEIRD STUFF' — three value props absorbed in 2 seconds." },
  { title: "Review Personality", body: "Testimonials with real personality, not corporate speak. 'Bought one. Then bought twelve more.' signals to clients what authentic reviews sound like." },
];

const included = [
  "7 sections (Nav, Hero, Feature Strip, Products, Categories, Reviews, CTA, Footer)",
  "Per-product colour theming system",
  "Neo-brutalist component library (borders, shadows, offset elements)",
  "Product cards with integrated CTA — always visible, never hover-gated",
  "Category browsing section (most templates skip this entirely)",
  "Mobile-first: single column, full-width images, large tap targets",
  "Accessible focus states on all interactive elements",
  "Next.js + Tailwind source code",
];

const excluded = [
  "No infinite scroll — kills SEO, can't share specific pages",
  "No 'quick view' modals — break back button, confuse users",
  "No star ratings on listings — 3 reviews at 5 stars isn't social proof, it's noise",
  "No 'sale' red badges — they cheapen the brand. Discount with style instead",
  "No auto-playing product videos — respect user choice and battery",
];

export default function PopStoreShowcase() {
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
            <span className="font-body text-xs text-(--fg-dim)">Pop Store</span>
          </div>

          <section ref={heroRef} className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="showcase-fade bg-(--accent-soft) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--accent)">TEMPLATE</span>
                <span className="showcase-fade font-body text-[11px] text-(--fg-faint)">Fun E-Commerce</span>
              </div>
              <h1 ref={headingRef} className="font-display tracking-[-3px] text-(--fg)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Pop Store</h1>
              <p className="showcase-fade mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim) max-md:text-base" style={{ textWrap: 'balance' } as React.CSSProperties}>
                A bold, personality-driven e-commerce template for brands that refuse to be boring. Neo-brutalist grid, per-product colour theming, chunky type, and attitude in every pixel.
              </p>
              <div className="showcase-fade mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind"].map((t) => (
                  <span key={t} className="border border-(--line) px-3 py-1 font-body text-[11px] text-(--fg-faint)">{t}</span>
                ))}
              </div>
              <div className="showcase-fade mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:scale-[1.03]">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-8 py-4 font-body text-sm font-medium text-(--accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/pop-store/preview" className="flex items-center gap-2 border border-(--line) px-8 py-4 font-body text-sm font-medium text-(--fg-dim) transition-all hover:border-(--accent-2)">Live Preview →</Link>
              </div>
            </div>
          </section>

          {/* Screenshot Gallery */}
          <section className="w-full px-16 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250 flex flex-col gap-4">
              {/* Hero screenshot — full width */}
              <div className="overflow-hidden rounded-xl border border-(--line)">
                <Image
                  src="/images/templates/pop-store/hero.png"
                  alt="Pop Store homepage"
                  width={2000}
                  height={1200}
                  className="w-full object-cover"
                />
              </div>
              {/* Two-column row: inner page (wider) + mobile (narrower) */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/pop-store/inner.png"
                    alt="Pop Store inner page"
                    width={1400}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/pop-store/mobile.png"
                    alt="Pop Store mobile view"
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
                DTC brands, food & beverage, lifestyle products, streetwear, indie cosmetics, pet brands, craft goods — any brand with personality that wants their store to feel like their brand, not a Shopify default.
              </p>
            </div>
          </section>

          <section className="w-full px-16 py-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--fg-faint) mb-8 block">DESIGN REFERENCES</span>
              <div className="flex flex-wrap gap-4">
                {["tonyschocolonely.com", "simplychocolate.com", "liquiddeath.com", "graza.co", "snif.co"].map((ref) => (
                  <span key={ref} className="border border-(--line) px-4 py-2 font-body text-[13px] text-(--fg-faint)">{ref}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--fg)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Pop Store.</h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>Source code for an e-commerce template with more personality than most brands.</p>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-10 py-4 font-body text-base font-semibold text-white transition-all hover:scale-[1.03]">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-10 py-4 font-body text-base font-medium text-(--accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--fg-faint)">Or <Link href="/contact" className="text-(--accent) underline">hire me to customise it</Link> for your brand.</p>
            </div>
          </section>

          <PackageSection />

          <TemplateNav current="pop-store" />
        </div>
  );
}
