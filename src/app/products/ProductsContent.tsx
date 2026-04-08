"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import SmoothScroll from "../../components/SmoothScroll";
import ProductMockup from "../../components/products/ProductMockup";
import ProductWaitlistInline from "../../components/products/ProductWaitlistInline";
import VaultWaitlistForm from "../../components/products/VaultWaitlistForm";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  products,
  statusLabel,
  formatPrice,
  formatSecondaryPrice,
  type Product,
} from "../../data/products";
import { useCurrency } from "../../components/products/CurrencyContext";

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORY = "All";

// ---------------------------------------------------------------------------
// PRODUCTS_LOCKED
// -----------------
// While the storefront, payments, and fulfillment are being set up, the
// Vault is sealed. Flip this flag to `false` when the catalogue is ready
// to go live and the existing wall view will return automatically.
// ---------------------------------------------------------------------------
const PRODUCTS_LOCKED = false;

export default function ProductsContent() {
  if (PRODUCTS_LOCKED) return <ProductsLockedView />;
  return <ProductsWallView />;
}

function ProductsWallView() {
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
      if (overlay) overlay.style.display = "none";
      return;
    }

    const cleanups: (() => void)[] = [];
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    if (mark) {
      tl.from(mark, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, 0);
      tl.to(mark, { opacity: 0, y: -10, duration: 0.5, ease: "power2.in" }, 1.2);
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

    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      gsap.set(split.chars || [], { opacity: 0, y: 60 });
      tl.to(
        split.chars || [],
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.025, ease: "power3.out" },
        1.6
      );
      cleanups.push(() => split.revert());
    }

    if (hero) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      tl.to(
        subs,
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        1.9
      );
    }

    if (chips) {
      const chipEls = chips.querySelectorAll(".category-chip");
      gsap.set(chipEls, { opacity: 0, x: -20 });
      tl.to(
        chipEls,
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        2.4
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, []);

  // ---------- Card stagger reveal ----------
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
        stagger: 0.1,
        ease: "power3.out",
        delay: activeCategory === ALL_CATEGORY ? 2.6 : 0.05,
      });
    }, wallEl);

    return () => ctx.revert();
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
            <span className="vault-eyebrow">From the studio</span>
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
            className="relative flex min-h-screen w-full flex-col items-center justify-center px-16 pt-24 pb-24 max-md:px-6 max-md:pt-20 max-md:pb-16"
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

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <div className="hero-fade flex items-center gap-3 font-body text-[11px] font-medium tracking-[5px] text-[var(--color-text-secondary)]">
                <span className="products-eyebrow-mark" />
                FROM THE STUDIO
                <span className="products-eyebrow-mark" />
              </div>

              <h1
                ref={headingRef}
                className="font-display italic tracking-[-2px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(48px, 9vw, 140px)", lineHeight: 0.95 }}
              >
                The Vault.
              </h1>

              <p className="hero-fade max-w-[680px] font-body text-lg leading-[1.75] text-[var(--color-text-secondary)] max-md:text-base">
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
            <div className="hero-fade absolute bottom-12 left-1/2 -translate-x-1/2 max-md:bottom-6">
              <div className="flex flex-col items-center gap-2 text-[var(--color-text-subtle)]">
                <span className="font-body text-[9px] tracking-[3px]">SCROLL</span>
                <div className="h-8 w-px bg-gradient-to-b from-[var(--color-text-subtle)] to-transparent" />
              </div>
            </div>
          </section>

          {/* ---------- CATEGORY CHIPS ---------- */}
          <section className="relative w-full px-16 pb-16 max-md:px-6 max-md:pb-10">
            <div className="mx-auto max-w-[1320px]">
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
            className="relative w-full px-16 pb-40 max-md:px-6 max-md:pb-20"
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

            <div className="relative mx-auto max-w-[1320px]">
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
                <div className="flex flex-col gap-10 max-md:gap-7">
                  {/* Featured card — full width */}
                  {featured && <FeaturedCard product={featured} />}

                  {/* Rest — 2 per row on desktop, 1 per row on mobile */}
                  {rest.length > 0 && (
                    <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-md:gap-7">
                      {rest.map((product, i) => (
                        <NormalCard key={product.slug} product={product} index={i + 1} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer call */}
              <div className="mt-32 flex flex-col items-center gap-4 text-center max-md:mt-20">
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
  const rotateY = x * 4;
  const rotateX = -y * 4;
  card.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
}

function handleTiltLeave(e: React.MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  card.style.transform = `perspective(1600px) rotateX(0) rotateY(0) translateZ(0)`;
}

// ===========================================================================
// FEATURED CARD — full width, mockup left, content right
// ===========================================================================
function FeaturedCard({ product }: { product: Product }) {
  const useSans = product.markStyle === "sans";
  const { currency } = useCurrency();
  const primaryPrice = formatPrice(product.price, currency);
  const secondaryPrice = formatSecondaryPrice(product.price, currency);
  const isLive = product.status === "live";
  return (
    <article
      className="product-card tilt-card glass-panel-strong group relative block overflow-hidden"
      onMouseMove={handleTiltMove}
      onMouseLeave={(e) => {
        handleTiltLeave(e);
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `inset 0 1px 0 0 rgba(255,255,255,0.09), inset 0 -1px 0 0 rgba(0,0,0,0.55), 0 50px 120px -40px ${product.accent.glow}, 0 0 0 1px ${product.accent.border}`;
        e.currentTarget.style.borderColor = product.accent.border;
      }}
    >
      {/* Stretched overlay link — the card is clickable anywhere the
          inline waitlist form isn't. The form sits at `z-20` to keep its
          inputs/button interactive. */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={`Open ${product.name}`}
        className="absolute inset-0 z-10"
      />
      <div className="tilt-card-inner relative grid grid-cols-[1.2fr_1fr] gap-0 max-lg:grid-cols-1">
        {/* Mockup side */}
        <div
          className="relative flex items-center justify-center overflow-hidden py-16 max-md:py-12"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${product.accent.soft}, transparent 75%)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(${product.accent.hex} 1px, transparent 1px), linear-gradient(90deg, ${product.accent.hex} 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />

          {/* Featured pill */}
          <div className="absolute left-7 top-7 flex items-center gap-2">
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
          <span className="glass-chip absolute right-7 top-7 px-3 py-1.5 font-body text-[10px] font-semibold tracking-[1.5px] text-[var(--color-text-secondary)]">
            {statusLabel(product.status)}
          </span>

          <div className="relative z-10 w-full">
            <ProductMockup product={product} size="hero" />
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-between gap-10 p-14 max-md:p-9">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 font-body text-[10px] tracking-[2.5px] text-[var(--color-text-subtle)]">
              <span>{product.category.toUpperCase()}</span>
              {product.releaseDate && (
                <>
                  <span className="h-px w-4 bg-[var(--color-text-subtle)]" />
                  <span>{product.releaseDate.toUpperCase()}</span>
                </>
              )}
            </div>
            <h2
              className={
                useSans
                  ? "font-body font-bold tracking-[-1.5px] text-[var(--color-text-primary)]"
                  : "font-display italic tracking-[-1px] text-[var(--color-text-primary)]"
              }
              style={{ fontSize: "clamp(34px, 3.4vw, 52px)", lineHeight: 1.05 }}
            >
              {product.tagline}
            </h2>
            <p className="font-body text-[15px] leading-[1.85] text-[var(--color-text-secondary)] max-md:text-[14px]">
              {product.cardDescription}
            </p>

            {/* Top-3 feature peek */}
            {product.features.length > 0 && (
              <ul className="mt-2 flex flex-col gap-2">
                {product.features.slice(0, 3).map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 font-body text-[13px] leading-[1.55] text-[var(--color-text-secondary)]"
                  >
                    <span
                      className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ background: product.accent.hex }}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${product.accent.border}, transparent)`,
              }}
            />
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="font-body text-[10px] tracking-[2px] text-[var(--color-text-subtle)]">
                  PRICE
                </span>
                <span
                  className="font-body text-[17px] font-semibold tracking-[-0.2px]"
                  style={{ color: product.accent.hex }}
                >
                  {primaryPrice}
                </span>
                {secondaryPrice && (
                  <span className="font-body text-[11px] tracking-[0.2px] text-[var(--color-text-subtle)]">
                    {secondaryPrice}
                  </span>
                )}
              </div>
              {isLive && (
                <span
                  className="flex items-center gap-2 font-body text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: product.accent.hex }}
                >
                  Open the file
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>

            {/* Inline waitlist for non-live products — sits above the
                card-wide overlay link at z-20 so clicks land on the input. */}
            {!isLive && <ProductWaitlistInline product={product} />}
          </div>
        </div>
      </div>
    </article>
  );
}

// ===========================================================================
// NORMAL CARD — half width, mockup top, content bottom
// ===========================================================================
function NormalCard({ product, index }: { product: Product; index: number }) {
  const useSans = product.markStyle === "sans";
  const { currency } = useCurrency();
  const primaryPrice = formatPrice(product.price, currency, true);
  const isLive = product.status === "live";
  return (
    <article
      className="product-card tilt-card glass-panel group relative flex h-full flex-col overflow-hidden"
      onMouseMove={handleTiltMove}
      onMouseLeave={(e) => {
        handleTiltLeave(e);
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `inset 0 1px 0 0 rgba(255,255,255,0.07), inset 0 -1px 0 0 rgba(0,0,0,0.5), 0 40px 90px -30px ${product.accent.glow}, 0 0 0 1px ${product.accent.border}`;
        e.currentTarget.style.borderColor = product.accent.border;
      }}
    >
      {/* Stretched overlay link — see FeaturedCard for the same pattern. */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={`Open ${product.name}`}
        className="absolute inset-0 z-10"
      />
      <div className="tilt-card-inner flex h-full flex-col">
        {/* Mockup */}
        <div
          className="relative flex items-center justify-center overflow-hidden py-12 max-md:py-10"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${product.accent.soft}, transparent 70%)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(${product.accent.hex} 1px, transparent 1px), linear-gradient(90deg, ${product.accent.hex} 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />

          {/* Status pill */}
          <span className="glass-chip absolute right-5 top-5 px-2.5 py-1 font-body text-[9px] font-semibold tracking-[1.5px] text-[var(--color-text-secondary)]">
            {statusLabel(product.status)}
          </span>

          {/* Index */}
          <span
            className="absolute bottom-4 left-5 font-display italic"
            style={{
              fontSize: "20px",
              color: product.accent.hex,
              opacity: 0.4,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 w-full">
            <ProductMockup product={product} size="card" />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-5 p-10 max-md:p-7">
          <span className="font-body text-[10px] tracking-[2px] text-[var(--color-text-subtle)]">
            {product.category.toUpperCase()}
          </span>
          <h3
            className={
              useSans
                ? "font-body font-bold tracking-[-0.8px] text-[var(--color-text-primary)]"
                : "font-display italic tracking-[-0.5px] text-[var(--color-text-primary)]"
            }
            style={{ fontSize: "clamp(24px, 2vw, 32px)", lineHeight: 1.15 }}
          >
            {product.tagline}
          </h3>
          <p className="font-body text-[14px] leading-[1.75] text-[var(--color-text-secondary)]">
            {product.cardDescription}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-3">
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${product.accent.border}, transparent)`,
              }}
            />
            <div className="flex items-center justify-between gap-3">
              <span className="font-body text-[12px] text-[var(--color-text-secondary)]">
                {primaryPrice}
              </span>
              {isLive && (
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
              )}
            </div>

            {/* Inline waitlist for non-live products */}
            {!isLive && <ProductWaitlistInline product={product} />}
          </div>
        </div>
      </div>
    </article>
  );
}

// ===========================================================================
// PRODUCTS LOCKED VIEW
// --------------------
// Shown while PRODUCTS_LOCKED === true. The vault is being filled in the
// background — payments, fulfillment, store, license keys. This screen tells
// people the storm is brewing without making promises about a date and lets
// them leave their email so they're first to know when the clouds clear.
// ===========================================================================
function ProductsLockedView() {
  const lockHeroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const hero = lockHeroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const fades = hero.querySelectorAll(".lock-fade");
      gsap.set(fades, { opacity: 0, y: 30 });
      gsap.to(fades, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.25,
      });

      const headline = hero.querySelector(".lock-headline");
      if (headline) {
        const split = new SplitType(headline as HTMLElement, { types: "chars" });
        gsap.set(split.chars || [], { opacity: 0, y: 50 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.035,
          ease: "power3.out",
          delay: 0.5,
        });
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main
          id="main-content"
          className="vault-bg flex min-h-screen w-full flex-col overflow-x-hidden"
        >
          <Header />

          <section
            ref={lockHeroRef}
            className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center px-16 py-24 max-md:px-6 max-md:py-16"
          >
            {/* Animated orbs — same vibe as the open vault */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="product-orb orb-anim-1"
                style={{
                  width: 540,
                  height: 540,
                  left: "6%",
                  top: "8%",
                  background: "rgba(124, 92, 252, 0.42)",
                }}
              />
              <div
                className="product-orb orb-anim-2"
                style={{
                  width: 440,
                  height: 440,
                  right: "8%",
                  top: "18%",
                  background: "rgba(94, 234, 212, 0.28)",
                }}
              />
              <div
                className="product-orb orb-anim-3"
                style={{
                  width: 400,
                  height: 400,
                  left: "38%",
                  bottom: "6%",
                  background: "rgba(124, 92, 252, 0.32)",
                }}
              />
            </div>

            {/* Faded backdrop word */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display italic text-[var(--color-text-primary)]"
              style={{
                fontSize: "clamp(140px, 24vw, 380px)",
                opacity: 0.025,
                letterSpacing: "0.06em",
              }}
            >
              Soon
            </span>

            <div className="relative z-10 flex w-full max-w-[820px] flex-col items-center gap-10 text-center max-md:gap-7">
              {/* Eyebrow */}
              <div className="lock-fade flex items-center gap-3 font-body text-[11px] font-medium tracking-[5px] text-[var(--color-text-secondary)]">
                <span className="products-eyebrow-mark" />
                THE NIMBUS VAULT
                <span className="products-eyebrow-mark" />
              </div>

              {/* Big display headline */}
              <h1
                className="lock-headline font-display italic tracking-[-2px] text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(56px, 11vw, 160px)", lineHeight: 0.95 }}
              >
                Still forming.
              </h1>

              {/* Pun stack — the on-brand explanation */}
              <div className="lock-fade flex max-w-[640px] flex-col gap-2 font-body text-[16px] leading-[1.85] text-[var(--color-text-secondary)] max-md:text-[14px]">
                <p>The clouds aren&apos;t ready yet.</p>
                <p>
                  We&apos;re evaporating the bugs, condensing the catalogue, and stitching
                  the storefront together one careful seam at a time.
                </p>
                <p className="text-[var(--color-text-subtle)]">
                  The vault opens when the forecast clears.
                </p>
              </div>

              {/* Forecast trio */}
              <div className="lock-fade mt-2 grid w-full max-w-[540px] grid-cols-3 gap-4 max-md:max-w-full">
                <ForecastCell label="FORECAST" value="Brewing" />
                <ForecastCell label="STATUS" value="In the lab" />
                <ForecastCell label="ETA" value="Soon" />
              </div>

              {/* CTA — inline waitlist form, no click-through to /contact */}
              <div className="lock-fade mt-6 flex w-full flex-col items-center gap-4">
                <VaultWaitlistForm />
                <span className="font-body text-[10px] tracking-[3px] text-[var(--color-text-subtle)]">
                  ONE EMAIL · NO SPAM · NO CHASING
                </span>
              </div>

              {/* Tiny secondary signal */}
              <div className="lock-fade mt-10 flex items-center gap-3 font-body text-[10px] tracking-[2.5px] text-[var(--color-text-subtle)]">
                <span className="h-px w-8 bg-[var(--color-text-subtle)]" />
                <span>{products.length} PROJECTS BREWING IN THE LAB</span>
                <span className="h-px w-8 bg-[var(--color-text-subtle)]" />
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

// Tiny forecast tile used by the lock screen
function ForecastCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center gap-2 px-4 py-5 max-md:py-4">
      <span className="font-body text-[9px] tracking-[2.5px] text-[var(--color-text-subtle)]">
        {label}
      </span>
      <span className="font-display italic text-[22px] text-[var(--color-text-primary)] max-md:text-[18px]">
        {value}
      </span>
    </div>
  );
}
