"use client";

import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import PackageSection from "../PackageSection";
import TemplateNav from "../TemplateNav";
import CustomCursor from "../../../../components/CustomCursor";
import SmoothScroll from "../../../../components/SmoothScroll";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/* ── REPLACE THIS with your Gumroad product URL when ready ── */
const GUMROAD_URL = "";
const PRICE = "RM 349";
const PRICE_USD = "$79 USD";

const designChoices = [
  {
    num: "01",
    title: "Two-Color Constraint",
    body: "Pitch black #050505 + single violet accent #7C5CFC. Every Awwwards SOTY in the studio category uses two colors maximum. When you remove colour variety, typography and spacing become the design. The eye has nowhere to hide.",
  },
  {
    num: "02",
    title: "Typography as Hero",
    body: "No hero image. No stock photography. The first thing you see is type — Instrument Serif at 120px. This says 'we're confident enough that we don't need imagery to make an impression.' It also loads instantly and scales perfectly.",
  },
  {
    num: "03",
    title: "120px+ Section Gaps",
    body: "Most templates cram sections at 40-60px. Studio Noir uses 140px. Premium design breathes. Monocle, Bloomberg, Wallpaper* — they all use generous whitespace. It communicates confidence without saying a word.",
  },
  {
    num: "04",
    title: "Vertical Project List",
    body: "Not a card grid — a vertical list. Each project gets a full-width row with hover-triggered image reveal. The pattern used by Dennis Snellenberg (Awwwards SOTD) and Locomotive (7x Agency of the Year). Scannable, dramatic, mobile-perfect.",
  },
  {
    num: "05",
    title: "Ghost Watermark",
    body: "The massive letter at 500px behind the hero — at 1.5% opacity. Adds depth and atmosphere without clutter. Creates a layered visual hierarchy that makes the page feel designed, not assembled.",
  },
];

const uxDecisions = [
  { title: "Sticky Navigation", body: "Fixed nav with section anchors. Transparent — doesn't compete with content. Users always know where they are." },
  { title: "Scroll-Triggered Reveals", body: "Every section has GSAP ScrollTrigger hooks. Characters stagger in, lines draw across, content fades up. Studies show scroll reveals increase time-on-page by 20-40%." },
  { title: "Marquee Section Breaker", body: "Scrolling text strip communicates capabilities at a glance and creates visual rhythm between hero and content sections." },
];

const included = [
  "6 sections (Hero, Marquee, Work, About, Services, Contact, Footer)",
  "Dark mode with carefully tuned opacity levels",
  "Responsive — same design intent on mobile, not a shrunken desktop",
  "Accessibility: proper contrast ratios, semantic HTML, skip-to-content",
  "Performance: zero external images in base — loads under 1 second",
  "GSAP class hooks on every section — animation-ready out of the box",
  "Next.js + Tailwind source code",
  "1-click Vercel deploy",
];

const excluded = [
  "No hamburger menu on desktop — never hide navigation from users who can see it",
  "No auto-playing video — performance killer, accessibility issue",
  "No parallax on mobile — drains battery, janky on touch",
  "No cookie banner — add your own if legally required, we don't bake tracking in",
];

export default function StudioNoirShowcase() {
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

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work?view=lab" className="flex items-center gap-2 font-body text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)">
              <ArrowLeft className="h-4 w-4" />
              Design Lab
            </Link>
            <span className="font-body text-xs text-(--color-text-muted)">/</span>
            <span className="font-body text-xs text-(--color-text-dim)">Studio Noir</span>
          </div>

          {/* Hero */}
          <section ref={heroRef} className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="showcase-fade bg-(--color-accent-subtle) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--color-accent)">TEMPLATE</span>
                <span className="showcase-fade font-body text-[11px] text-(--color-text-muted)">Dark Creative Studio</span>
              </div>

              <h1 ref={headingRef} className="font-display tracking-[-3px] text-(--color-text-primary)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>
                Studio Noir
              </h1>

              <p className="showcase-fade mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim) max-md:text-base">
                A cinematic, animation-heavy website template for creative studios and design agencies.
                Pitch-black canvas, single violet accent, oversized editorial typography, GSAP-ready scroll animations.
              </p>

              {/* Meta row */}
              <div className="showcase-fade mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind", "Lenis"].map((t) => (
                  <span key={t} className="border border-(--color-border) px-3 py-1 font-body text-[11px] text-(--color-text-muted)">{t}</span>
                ))}
                <span className="font-body text-[13px] text-(--color-text-muted)">|</span>
                <span className="font-body text-[13px] font-medium text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-[12px] text-(--color-text-muted)">{PRICE_USD}</span>
              </div>

              {/* CTA */}
              <div className="showcase-fade mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-8 py-4 font-body text-sm font-semibold text-white transition-all hover:scale-[1.03]">
                    Get This Template <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-8 py-4 font-body text-sm font-medium text-(--color-accent)">
                    Coming Soon
                  </span>
                )}
                <Link href="/work/designs/studio-noir/preview" className="flex items-center gap-2 border border-(--color-border) px-8 py-4 font-body text-sm font-medium text-(--color-text-secondary) transition-all hover:border-(--color-accent-border)">
                  Live Preview →
                </Link>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full max-w-250 mx-auto bg-(--color-border)" />

          {/* Design Choices */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4">
                <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">DESIGN CHOICES</span>
                <div className="h-px flex-1 bg-(--color-border)" />
              </div>

              <div className="flex flex-col gap-0">
                {designChoices.map((choice) => (
                  <div key={choice.num} className="flex gap-12 border-b border-(--color-border) py-10 max-md:flex-col max-md:gap-4">
                    <span className="font-display text-(--color-accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{choice.num}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-[22px] tracking-[-0.5px] text-(--color-text-primary) mb-3">{choice.title}</h3>
                      <p className="font-body text-[15px] leading-[1.75] text-(--color-text-dim) max-w-160">{choice.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* UX Decisions */}
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

          {/* What's Included / Excluded */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16">
            <div className="mx-auto max-w-250">
              <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
                {/* Included */}
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

                {/* Excluded */}
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
            </div>
          </section>

          {/* Who This Is For */}
          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-250 text-center">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent) mb-6 block">WHO THIS IS FOR</span>
              <p className="mx-auto max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim)">
                Creative studios, design agencies, freelance designers, photographers, architects —
                anyone whose work speaks for itself and needs a canvas that doesn&apos;t compete with it.
              </p>
            </div>
          </section>

          {/* References */}
          <section className="w-full px-16 py-16 max-md:px-6 max-md:py-10">
            <div className="mx-auto max-w-250">
              <span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-text-muted) mb-8 block">DESIGN REFERENCES</span>
              <div className="flex flex-wrap gap-4">
                {["unseen.co", "locomotive.ca", "obys.agency", "dennissnellenberg.com", "aristidebenoist.com"].map((ref) => (
                  <span key={ref} className="border border-(--color-border) px-4 py-2 font-body text-[13px] text-(--color-text-muted)">{ref}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Get Template CTA */}
          <section className="w-full px-16 py-24 max-md:px-6 max-md:py-16" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--color-text-primary)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
                Get Studio Noir.
              </h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--color-text-dim)">
                Source code, documentation, and a design that stands apart from every template marketplace. Built by one person who cares about every pixel.
              </p>
              <div className="flex items-center gap-6">
                <span className="font-display text-[32px] text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-sm text-(--color-text-muted)">{PRICE_USD}</span>
              </div>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-10 py-4 font-body text-base font-semibold text-white transition-all hover:scale-[1.03]">
                  Buy on Gumroad <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-10 py-4 font-body text-base font-medium text-(--color-accent)">
                  Coming Soon
                </span>
              )}
              <p className="font-body text-[12px] text-(--color-text-muted)">
                Or <Link href="/contact" className="text-(--color-accent) underline">hire me to customise it</Link> for your brand.
              </p>
            </div>
          </section>

          <PackageSection price={PRICE} priceUsd={PRICE_USD} />

          <TemplateNav current="studio-noir" />

          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
