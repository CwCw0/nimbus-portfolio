"use client";
import Image from "next/image";
import PackageSection from "../PackageSection";
import TemplateNav from "../TemplateNav";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const GUMROAD_URL = "";

export default function Showcase() {
  return (
        <div className="flex w-full flex-col overflow-x-hidden bg-(--ink-0)">
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work?view=lab" className="flex items-center gap-2 font-body text-sm text-(--fg-faint) transition-colors hover:text-(--fg)"><ArrowLeft className="h-4 w-4" /> Design Lab</Link>
            <span className="font-body text-xs text-(--fg-faint)">/</span>
            <span className="font-body text-xs text-(--fg-dim)">Roast</span>
          </div>

          <section className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-(--accent-soft) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--accent)">TEMPLATE</span>
                <span className="font-body text-[11px] text-(--fg-faint)">Coffee Shop & Cafe</span>
              </div>
              <h1 className="font-display tracking-[-3px] text-(--fg)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Roast</h1>
              <p className="mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--fg-dim)" style={{ textWrap: 'balance' } as React.CSSProperties}>An artisan, editorial coffee shop template. Earthy tones, Cormorant Garamond serif, parallax hero, origin-focused product cards. For specialty roasters, cafes, and artisan food brands.</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind"].map((t) => (<span key={t} className="border border-(--line) px-3 py-1 font-body text-[11px] text-(--fg-faint)">{t}</span>))}
              </div>
              <div className="mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-8 py-4 font-body text-sm font-semibold text-white">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-8 py-4 font-body text-sm font-medium text-(--accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/roast/preview" className="flex items-center gap-2 border border-(--line) px-8 py-4 font-body text-sm font-medium text-(--fg-dim) transition-all hover:border-(--accent-2)">Live Preview →</Link>
              </div>
            </div>
          </section>

          {/* Screenshot Gallery */}
          <section className="w-full px-16 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250 flex flex-col gap-4">
              {/* Hero screenshot — full width */}
              <div className="overflow-hidden rounded-xl border border-(--line)">
                <Image
                  src="/images/templates/roast/hero.png"
                  alt="Roast homepage"
                  width={2000}
                  height={1200}
                  className="w-full object-cover"
                />
              </div>
              {/* Two-column row: inner page (wider) + mobile (narrower) */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/roast/inner.png"
                    alt="Roast inner page"
                    width={1400}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-xl border border-(--line)">
                  <Image
                    src="/images/templates/roast/mobile.png"
                    alt="Roast mobile view"
                    width={600}
                    height={900}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="h-px w-full max-w-250 mx-auto bg-(--line)" />

          <section className="w-full px-16 py-24 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4"><span className="font-body text-[10px] font-medium tracking-[4px] text-(--accent)">DESIGN CHOICES</span><div className="h-px flex-1 bg-(--line)" /></div>
              {[
                { num: "01", title: "Earthy Warm Palette", body: "Cream #F5F0E8 base, coffee brown #8B4513 accent, warm amber highlights. The palette IS the brand — it smells like a roastery. Not a single blue pixel." },
                { num: "02", title: "Cormorant Garamond + Karla", body: "Elegant editorial serif for headings, friendly geometric sans for body. This pairing says 'artisan quality' — it's the type system of a high-end wine label applied to coffee." },
                { num: "03", title: "Full-Bleed Hero with Parallax", body: "The hero IS the atmosphere. Dark overlay on a full-viewport image placeholder with parallax scroll. You feel the roastery before reading a word. Inspired by Ceremony Coffee (Awwwards SOTD)." },
                { num: "04", title: "Origin-Focused Product Cards", body: "Every coffee card shows: name, origin, altitude, process, tasting notes, price. Like a wine list — not a product grid. Inspired by Sey Coffee's data-rich minimal approach." },
                { num: "05", title: "Story Over Sales", body: "The 'Our Story' section is as prominent as the product section. Coffee brands sell a narrative — the farm, the producer, the journey. The template structures this storytelling naturally." },
              ].map((c) => (
                <div key={c.num} className="flex gap-12 border-b border-(--line) py-10 max-md:flex-col max-md:gap-4">
                  <span className="font-display text-(--accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{c.num}</span>
                  <div className="flex-1"><h3 className="font-display text-[22px] tracking-[-0.5px] text-(--fg) mb-3">{c.title}</h3><p className="font-body text-[15px] leading-[1.75] text-(--fg-dim) max-w-160">{c.body}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--fg)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Roast.</h2>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--accent) px-10 py-4 font-body text-base font-semibold text-white">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--accent)/20 border border-(--accent)/30 px-10 py-4 font-body text-base font-medium text-(--accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--fg-faint)">Or <Link href="/contact" className="text-(--accent) underline">hire me to customise it</Link> for your brand.</p>
            </div>
          </section>

          <PackageSection />

          <TemplateNav current="roast" />
        </div>
  );
}
