"use client";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import CustomCursor from "../../../../components/CustomCursor";
import SmoothScroll from "../../../../components/SmoothScroll";
import { ArrowLeft, ArrowUpRight, Check, X } from "lucide-react";
import Link from "next/link";

const GUMROAD_URL = "";
const PRICE = "RM 249";
const PRICE_USD = "$59 USD";

export default function Showcase() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <div className="flex w-full flex-col overflow-x-hidden bg-(--color-bg-primary)">
          <Header />
          <div className="flex items-center gap-2 px-16 pt-28 max-md:px-6 max-md:pt-24">
            <Link href="/work" className="flex items-center gap-2 font-body text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-primary)"><ArrowLeft className="h-4 w-4" /> Back to Work</Link>
          </div>

          <section className="w-full px-16 pt-12 pb-16 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-(--color-accent-subtle) px-3 py-1 font-body text-[10px] font-medium tracking-[2px] text-(--color-accent)">TEMPLATE</span>
                <span className="font-body text-[11px] text-(--color-text-muted)">Ultra-Minimal Portfolio</span>
              </div>
              <h1 className="font-display tracking-[-3px] text-(--color-text-primary)" style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.02 }}>Mono</h1>
              <p className="mt-6 max-w-160 font-body text-lg leading-[1.75] text-(--color-text-dim)">Extreme minimalism. One font, zero decoration, black on white. Project titles ARE the navigation. For designers, developers, and creatives who let their work speak for itself.</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {["Next.js", "GSAP", "Tailwind"].map((t) => (<span key={t} className="border border-(--color-border) px-3 py-1 font-body text-[11px] text-(--color-text-muted)">{t}</span>))}
                <span className="font-body text-[13px] text-(--color-text-muted)">|</span>
                <span className="font-body text-[13px] font-medium text-(--color-text-primary)">{PRICE}</span>
                <span className="font-body text-[12px] text-(--color-text-muted)">{PRICE_USD}</span>
              </div>
              <div className="mt-10 flex items-center gap-4">
                {GUMROAD_URL ? (
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-8 py-4 font-body text-sm font-semibold text-white">Get This Template <ArrowUpRight className="h-4 w-4" /></a>
                ) : (
                  <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-8 py-4 font-body text-sm font-medium text-(--color-accent)">Coming Soon</span>
                )}
                <Link href="/work/designs/mono/preview" className="flex items-center gap-2 border border-(--color-border) px-8 py-4 font-body text-sm font-medium text-(--color-text-secondary) transition-all hover:border-(--color-accent-border)">Live Preview →</Link>
              </div>
            </div>
          </section>

          <div className="h-px w-full max-w-250 mx-auto bg-(--color-border)" />

          <section className="w-full px-16 py-24 max-md:px-6">
            <div className="mx-auto max-w-250">
              <div className="mb-16 flex items-center gap-4"><span className="font-body text-[10px] font-medium tracking-[4px] text-(--color-accent)">DESIGN CHOICES</span><div className="h-px flex-1 bg-(--color-border)" /></div>
              {[
                { num: "01", title: "One Font: Syne", body: "One typeface, five weights. Hierarchy through scale alone — 200px heading, 16px body. When you remove font variety, scale becomes the entire design system. Inspired by Steven Mengin (Awwwards SOTD)." },
                { num: "02", title: "Zero Decoration", body: "No icons. No illustrations. No background colours. No gradients. No borders except functional dividers. The negative space IS the design. Everything on screen either communicates or it's deleted." },
                { num: "03", title: "Project Titles as Navigation", body: "The work section IS the portfolio. Project titles at 80px are both content and UI — click any title to view the project. No cards, no thumbnails, no grids. The names do the work." },
                { num: "04", title: "Hover Accent (#FF3D00)", body: "The only colour on the entire page. It appears ONLY on hover — project titles, email, social links. This single interaction point makes the monochrome meaningful. Without it, the site is just boring. With it, it's a reveal." },
                { num: "05", title: "The About Is One Paragraph", body: "No skills section. No timeline. No 'my journey' essay. One paragraph that says who you are, what you do, and where to reach you. Because a minimal portfolio should be as confident about its words as its design." },
              ].map((c) => (
                <div key={c.num} className="flex gap-12 border-b border-(--color-border) py-10 max-md:flex-col max-md:gap-4">
                  <span className="font-display text-(--color-accent) opacity-15 shrink-0" style={{ fontSize: 56, lineHeight: 1 }}>{c.num}</span>
                  <div className="flex-1"><h3 className="font-display text-[22px] tracking-[-0.5px] text-(--color-text-primary) mb-3">{c.title}</h3><p className="font-body text-[15px] leading-[1.75] text-(--color-text-dim) max-w-160">{c.body}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full px-16 py-24 max-md:px-6" style={{ background: "#0D0C14" }}>
            <div className="mx-auto max-w-200 text-center flex flex-col items-center gap-8">
              <h2 className="font-display tracking-[-2px] text-(--color-text-primary)" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Get Mono.</h2>
              <p className="max-w-125 font-body text-[15px] leading-[1.75] text-(--color-text-dim)">The portfolio template that proves less is more. Source code for people who trust their work.</p>
              <div className="flex items-center gap-6"><span className="font-display text-[32px] text-(--color-text-primary)">{PRICE}</span><span className="font-body text-sm text-(--color-text-muted)">{PRICE_USD}</span></div>
              {GUMROAD_URL ? (
                <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-(--color-accent) px-10 py-4 font-body text-base font-semibold text-white">Buy on Gumroad <ArrowUpRight className="h-4 w-4" /></a>
              ) : (
                <span className="flex items-center gap-2 bg-(--color-accent)/20 border border-(--color-accent)/30 px-10 py-4 font-body text-base font-medium text-(--color-accent)">Coming Soon</span>
              )}
              <p className="font-body text-[12px] text-(--color-text-muted)">Or <Link href="/contact" className="text-(--color-accent) underline">hire me to customise it</Link> for you.</p>
            </div>
          </section>

          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
