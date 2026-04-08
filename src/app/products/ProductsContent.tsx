"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { products, statusLabel, type Product } from "../../data/products";

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORY = "All";

export default function ProductsContent() {
  // ---------- Refs ----------
  const vaultOverlayRef = useRef<HTMLDivElement>(null);
  const vaultMarkRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLElement>(null);

  // ---------- Categories ----------
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return [ALL_CATEGORY, ...unique];
  }, []);

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // ---------- Vault entrance + hero animation (runs once on mount) ----------
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const overlay = vaultOverlayRef.current;
    const mark = vaultMarkRef.current;
    const heading = headingRef.current;
    const hero = heroRef.current;
    const chips = chipsRef.current;

    if (prefersReducedMotion) {
      // Instantly hide overlay, show everything
      if (overlay) overlay.style.display = "none";
      return;
    }

    const cleanups: (() => void)[] = [];

    // Lock body scroll while the overlay is visible
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    // Phase 1 — vault mark settles in
    if (mark) {
      tl.from(
        mark,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );
    }

    // Phase 2 — vault mark fades out, overlay dissolves
    if (mark) {
      tl.to(
        mark,
        {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power2.in",
        },
        1.2
      );
    }
    if (overlay) {
      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: () => {
            if (overlay) overlay.style.display = "none";
          },
        },
        1.4
      );
    }

    // Phase 3 — heading character split-reveal
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      gsap.set(split.chars || [], { opacity: 0, y: 60 });
      tl.to(
        split.chars || [],
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: "power3.out",
        },
        1.6
      );
      cleanups.push(() => split.revert());
    }

    // Phase 4 — hero subtext fades in
    if (hero) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      tl.to(
        subs,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
        1.9
      );
    }

    // Phase 5 — category chips fade in from left
    if (chips) {
      const chipEls = chips.querySelectorAll(".category-chip");
      gsap.set(chipEls, { opacity: 0, x: -20 });
      tl.to(
        chipEls,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
        2.4
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, []);

  // ---------- Card stagger reveal — re-runs whenever category changes ----------
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const wallEl = wallRef.current;
    if (!wallEl) return;

    const ctx = gsap.context(() => {
      const cards = wallEl.querySelectorAll(".product-card");
      gsap.set(cards, { opacity: 0, y: 60, rotateX: -8 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
        delay: activeCategory === ALL_CATEGORY ? 2.6 : 0.05,
      });
    }, wallEl);

    return () => ctx.revert();
    // Intentional: re-run on category change to re-stagger
  }, [activeCategory]);

  const featured = filteredProducts[0];
  const rest = filteredProducts.slice(1);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        {/* ---------- THE VAULT — entrance overlay ---------- */}
        <div ref={vaultOverlayRef} className="vault-overlay">
          <div ref={vaultMarkRef} className="vault-mark">
            <span className="vault-symbol vault-symbol-pulse" />
            <span className="vault-eyebrow">Members only</span>
            <span className="vault-title">The Vault</span>
            <span className="vault-rule" />
          </div>
        </div>

        <main
          id="main-content"
          className="vault-bg flex w-full flex-col overflow-x-hidden"
        >
          <Header />

          {/* ---------- HERO ---------- */}
          <section
            ref={heroRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-20 max-md:px-6 max-md:pt-20 max-md:pb-12"
          >
            {/* Animated orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="product-orb orb-anim-1"
                style={{
                  width: 520,
                  height: 520,
                  left: "8%",
                  top: "10%",
                  background: "rgba(124, 92, 252, 0.5)",
                }}
              />
              <div
                className="product-orb orb-anim-2"
                style={{
                  width: 420,
                  height: 420,
                  right: "10%",
                  top: "20%",
                  background: "rgba(94, 234, 212, 0.32)",
                }}
              />
              <div
                className="product-orb orb-anim-3"
                style={{
                  width: 380,
                  height: 380,
                  left: "40%",
                  bottom: "8%",
                  background: "rgba(124, 92, 252, 0.36)",
                }}
              />
            </div>

            {/* Faded wordmark */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display italic text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(120px, 22vw, 360px)",
                opacity: 0.025,
                letterSpacing: "0.06em",
              }}
            >
              Vault
            </span>

            <div className="relative z-10 flex flex-col items-center gap-7 text-center">
              <div className="hero-fade flex items-center gap-3 font-body text-[11px] font-medium tracking-[5px] text-[var(--color-text-secondary)]">
                <span className="products-eyebrow-mark" />
                MEMBERS ONLY
                <span className="products-eyebrow-mark" />
              </div>

              <h1
                ref={headingRef}
                className="font-display italic tracking-[-2px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(48px, 9vw, 140px)", lineHeight: 0.95 }}
              >
                The Vault.
              </h1>

              <p className="hero-fade max-w-[640px] font-body text-lg leading-[1.7] text-[var(--color-text-secondary)] max-md:text-base">
                Everything Nimbus is shipping, in one place. Apps, tools, fonts, games — each
                made by one person, each polished to one quality bar, each waiting for the
                people who care.
              </p>

              <div className="hero-fade flex items-center gap-4 font-body text-[11px] tracking-[3px] text-[var(--color-text-subtle)]">
                <span className="h-px w-10 bg-[var(--color-text-subtle)]" />
                <span>{products.length} ON THE SHELF</span>
                <span className="h-px w-10 bg-[var(--color-text-subtle)]" />
              </div>
            </div>

            {/* Scroll hint */}
            <div className="hero-fade absolute bottom-10 left-1/2 -translate-x-1/2 max-md:bottom-6">
              <div className="flex flex-col items-center gap-2 text-[var(--color-text-subtle)]">
                <span className="font-body text-[9px] tracking-[3px]">SCROLL</span>
                <div className="h-8 w-px bg-gradient-to-b from-[var(--color-text-subtle)] to-transparent" />
              </div>
            </div>
          </section>

          {/* ---------- CATEGORY CHIPS ---------- */}
          <section className="relative w-full px-16 pb-10 max-md:px-6 max-md:pb-6">
            <div className="mx-auto max-w-[1280px]">
              <div
                ref={chipsRef}
                className="flex flex-wrap items-center gap-3 max-md:gap-2"
              >
                {categories.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`category-chip glass-chip px-5 py-2.5 font-body text-[12px] font-medium tracking-[1px] uppercase max-md:px-4 max-md:py-2 max-md:text-[11px] ${
                        isActive ? "active text-white" : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
                <div className="ml-auto flex items-center gap-2 font-body text-[10px] tracking-[2px] text-[var(--color-text-subtle)] max-md:ml-0 max-md:w-full">
                  <span className="h-px w-6 bg-[var(--color-text-subtle)]" />
                  {filteredProducts.length} {filteredProducts.length === 1 ? "ITEM" : "ITEMS"}
                </div>
              </div>
            </div>
          </section>

          {/* ---------- THE WALL ---------- */}
          <section
            ref={wallRef}
            className="relative w-full px-16 pb-32 max-md:px-6 max-md:pb-16"
            key={activeCategory}
          >
            {/* Aurora bath behind the cards */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="product-orb orb-anim-4"
                style={{
                  width: 600,
                  height: 600,
                  left: "-5%",
                  top: "20%",
                  background: "rgba(124, 92, 252, 0.18)",
                }}
              />
              <div
                className="product-orb orb-anim-2"
                style={{
                  width: 450,
                  height: 450,
                  right: "-5%",
                  top: "60%",
                  background: "rgba(94, 234, 212, 0.14)",
                }}
              />
            </div>

            <div className="relative mx-auto max-w-[1280px]">
              {filteredProducts.length === 0 ? (
                <div className="glass-panel mx-auto flex max-w-md flex-col items-center gap-3 p-12 text-center">
                  <span className="font-body text-[10px] tracking-[3px] text-[var(--color-text-subtle)]">
                    NOTHING HERE YET
                  </span>
                  <p className="font-display italic text-2xl text-[var(--color-text-primary)]">
                    The shelf is empty for this category.
                  </p>
                  <button
                    onClick={() => setActiveCategory(ALL_CATEGORY)}
                    className="mt-3 font-body text-[12px] text-[var(--color-accent)] underline underline-offset-4"
                  >
                    Show everything
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-6 max-lg:grid-cols-6 max-md:grid-cols-1 max-md:gap-5">
                  {/* Featured card spans 8 cols on desktop, 6 on tablet */}
                  {featured && (
                    <div className="col-span-8 max-lg:col-span-6 max-md:col-span-1">
                      <FeaturedCard product={featured} />
                    </div>
                  )}
                  {/* First normal card next to featured (desktop only) */}
                  {rest[0] && (
                    <div className="col-span-4 max-lg:col-span-6 max-md:col-span-1">
                      <NormalCard product={rest[0]} index={1} />
                    </div>
                  )}
                  {/* Remaining cards in 3-col rows */}
                  {rest.slice(1).map((product, i) => (
                    <div
                      key={product.slug}
                      className="col-span-4 max-lg:col-span-3 max-md:col-span-1"
                    >
                      <NormalCard product={product} index={i + 2} />
                    </div>
                  ))}
                </div>
              )}

              {/* Footer call */}
              <div className="mt-24 flex flex-col items-center gap-3 text-center max-md:mt-16">
                <span className="font-body text-[11px] tracking-[3px] text-[var(--color-text-subtle)]">
                  WANT TO BUILD SOMETHING TOGETHER
                </span>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 font-display italic text-3xl text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] max-md:text-2xl"
                >
                  Tell me what you&apos;re thinking
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

// ===========================================================================
// 3D Tilt mouse handlers — shared by both card variants
// ===========================================================================
function handleTiltMove(e: React.MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  // Strength of the tilt — keep it tasteful (~6deg)
  const rotateY = x * 6;
  const rotateX = -y * 6;
  card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
}

function handleTiltLeave(e: React.MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  card.style.transform = `perspective(1400px) rotateX(0) rotateY(0) translateZ(0)`;
}

// ===========================================================================
// FEATURED CARD — large, glass, themed by product accent
// ===========================================================================
function FeaturedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card tilt-card glass-panel-strong group relative block h-full overflow-hidden"
      onMouseMove={handleTiltMove}
      onMouseLeave={(e) => {
        handleTiltLeave(e);
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `inset 0 1px 0 0 rgba(255,255,255,0.09), inset 0 -1px 0 0 rgba(0,0,0,0.55), 0 40px 100px -40px ${product.accent.glow}, 0 0 0 1px ${product.accent.border}`;
        e.currentTarget.style.borderColor = product.accent.border;
      }}
    >
      {/* Inner content — receives translateZ so it floats above the panel surface */}
      <div className="tilt-card-inner relative grid h-full grid-cols-[1.15fr_1fr] max-md:grid-cols-1">
        {/* Visual side */}
        <div
          className="relative flex min-h-[460px] items-center justify-center overflow-hidden p-12 max-md:min-h-[300px] max-md:p-8"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${product.accent.soft}, transparent 70%)`,
          }}
        >
          {/* Accent grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(${product.accent.hex} 1px, transparent 1px), linear-gradient(90deg, ${product.accent.hex} 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />

          {/* Featured pill */}
          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: product.accent.hex,
                boxShadow: `0 0 12px ${product.accent.hex}`,
              }}
            />
            <span
              className="font-body text-[10px] font-semibold tracking-[2px]"
              style={{ color: product.accent.hex }}
            >
              FEATURED
            </span>
          </div>

          {/* Status pill */}
          <span className="glass-chip absolute right-6 top-6 px-3 py-1.5 font-body text-[10px] font-semibold tracking-[1.5px] text-[var(--color-text-secondary)]">
            {statusLabel(product.status)}
          </span>

          {/* Big mark */}
          <span
            className="relative z-10 select-none font-display italic"
            style={{
              fontSize: "clamp(80px, 9vw, 150px)",
              color: product.accent.hex,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              textShadow: `0 0 60px ${product.accent.glow}`,
            }}
          >
            {product.name}
          </span>
        </div>

        {/* Body side */}
        <div className="flex flex-col justify-between gap-8 p-12 max-md:p-8">
          <div className="flex flex-col gap-5">
            <span className="font-body text-[10px] tracking-[2px] text-[var(--color-text-subtle)]">
              {product.category.toUpperCase()}
            </span>
            <h2
              className="font-display italic tracking-[-1px] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
            >
              {product.tagline}
            </h2>
            <p className="font-body text-[14px] leading-[1.75] text-[var(--color-text-secondary)] max-md:text-[13px]">
              {product.cardDescription}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${product.accent.border}, transparent)`,
              }}
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-body text-[10px] tracking-[1.5px] text-[var(--color-text-subtle)]">
                  PRICE
                </span>
                <span className="font-body text-[14px] font-medium text-[var(--color-text-primary)]">
                  {product.price}
                </span>
              </div>
              <span
                className="flex items-center gap-2 font-body text-sm font-semibold transition-all group-hover:gap-3"
                style={{ color: product.accent.hex }}
              >
                Open the file
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ===========================================================================
// NORMAL CARD — smaller glass card, vertical stack
// ===========================================================================
function NormalCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card tilt-card glass-panel group relative flex h-full flex-col overflow-hidden"
      onMouseMove={handleTiltMove}
      onMouseLeave={(e) => {
        handleTiltLeave(e);
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `inset 0 1px 0 0 rgba(255,255,255,0.07), inset 0 -1px 0 0 rgba(0,0,0,0.5), 0 30px 70px -30px ${product.accent.glow}, 0 0 0 1px ${product.accent.border}`;
        e.currentTarget.style.borderColor = product.accent.border;
      }}
    >
      <div className="tilt-card-inner flex h-full flex-col">
        {/* Visual header */}
        <div
          className="relative flex h-[240px] items-center justify-center overflow-hidden max-md:h-[180px]"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${product.accent.soft}, transparent 70%)`,
          }}
        >
          {/* Accent grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(${product.accent.hex} 1px, transparent 1px), linear-gradient(90deg, ${product.accent.hex} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Status pill */}
          <span className="glass-chip absolute right-4 top-4 px-2.5 py-1 font-body text-[9px] font-semibold tracking-[1.5px] text-[var(--color-text-secondary)]">
            {statusLabel(product.status)}
          </span>

          {/* Big mark */}
          <span
            className="relative z-10 select-none font-display italic"
            style={{
              fontSize: "clamp(54px, 5vw, 92px)",
              color: product.accent.hex,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              textShadow: `0 0 50px ${product.accent.glow}`,
            }}
          >
            {product.name}
          </span>

          {/* Index number */}
          <span
            className="absolute bottom-4 right-5 font-display italic opacity-30"
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              color: product.accent.hex,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-7 max-md:p-5">
          <span className="font-body text-[10px] tracking-[1.5px] text-[var(--color-text-subtle)]">
            {product.category.toUpperCase()}
          </span>
          <h3
            className="font-display italic tracking-[-0.5px] text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(22px, 1.8vw, 28px)", lineHeight: 1.15 }}
          >
            {product.tagline}
          </h3>
          <p className="font-body text-[13px] leading-[1.65] text-[var(--color-text-secondary)]">
            {product.cardDescription}
          </p>

          <div className="mt-auto flex flex-col gap-3 pt-2">
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${product.accent.border}, transparent)`,
              }}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="font-body text-[12px] text-[var(--color-text-secondary)]">
                {product.price}
              </span>
              <span
                className="flex items-center gap-1.5 font-body text-[12px] font-semibold transition-all group-hover:gap-2.5"
                style={{ color: product.accent.hex }}
              >
                {product.cta.external ? "Open" : "View"}
                {product.cta.external ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowRight className="h-3 w-3" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
