"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomCursor from "../../../components/CustomCursor";
import SmoothScroll from "../../../components/SmoothScroll";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  type Product,
  statusLabel,
  formatPrice,
  formatSecondaryPrice,
} from "../../../data/products";
import { useCurrency } from "../../../components/products/CurrencyContext";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  product: Product | null;
  next: { name: string; slug: string };
};

export default function ProductDetailContent({ product, next }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const { currency } = useCurrency();
  const primaryPrice = product ? formatPrice(product.price, currency) : "";
  const secondaryPrice = product ? formatSecondaryPrice(product.price, currency) : null;

  useEffect(() => {
    if (!product) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanups: (() => void)[] = [];

    // Hero name split
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitType(heading, { types: "chars" });
      if (prefersReducedMotion) {
        gsap.set(split.chars || [], { opacity: 1, y: 0 });
      } else {
        gsap.set(split.chars || [], { opacity: 0, y: 60 });
        gsap.to(split.chars || [], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.2,
        });
      }
      cleanups.push(() => split.revert());
    }

    // Hero subtext fade
    const hero = heroRef.current;
    if (hero && !prefersReducedMotion) {
      const subs = hero.querySelectorAll(".hero-fade");
      gsap.set(subs, { opacity: 0, y: 30 });
      gsap.to(subs, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    // Body sections fade-in
    const body = bodyRef.current;
    if (body && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const sections = body.querySelectorAll(".body-section");
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      }, body);
      cleanups.push(() => ctx.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, [product]);

  if (!product) {
    return (
      <>
        <CustomCursor />
        <SmoothScroll>
          <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--color-bg-primary)] px-6 text-center">
            <Header />
            <span className="font-body text-[11px] tracking-[3px] text-[var(--color-accent)]">
              404
            </span>
            <h1 className="mt-4 font-display text-5xl text-[var(--color-text-primary)]">
              Product not found.
            </h1>
            <p className="mt-3 max-w-md font-body text-[var(--color-text-dim)]">
              The product you&apos;re looking for either hasn&apos;t shipped yet or got renamed.
              Head back to the shelf.
            </p>
            <Link
              href="/products"
              className="mt-8 flex items-center gap-2 bg-[var(--color-accent)] px-6 py-3 font-body text-[13px] font-semibold text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Products
            </Link>
            <Footer />
          </main>
        </SmoothScroll>
      </>
    );
  }

  // Split long description on double newlines into paragraphs
  const paragraphs = product.longDescription.split("\n\n");

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main
          id="main-content"
          className="flex w-full flex-col overflow-x-hidden bg-[var(--color-bg-primary)]"
        >
          <Header />

          {/* Hero — themed with the product's accent color */}
          <section
            ref={heroRef}
            className="relative flex min-h-[90vh] w-full flex-col items-center justify-center px-16 pt-32 pb-20 max-md:px-6 max-md:pt-24 max-md:pb-12"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${product.accent.soft}, transparent 60%)`,
            }}
          >
            {/* Subtle accent grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(${product.accent.hex} 1px, transparent 1px), linear-gradient(90deg, ${product.accent.hex} 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              {/* Back to wall */}
              <Link
                href="/products"
                className="hero-fade group flex items-center gap-2 font-body text-[11px] tracking-[2px] text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                BACK TO THE SHELF
              </Link>

              {/* Category */}
              <span
                className="hero-fade font-body text-[11px] font-medium tracking-[4px]"
                style={{ color: product.accent.hex }}
              >
                {product.category.toUpperCase()}
              </span>

              {/* Big name */}
              <h1
                ref={headingRef}
                className="font-display tracking-[-3px] text-[var(--color-text-primary)]"
                style={{
                  fontSize: "clamp(56px, 10vw, 160px)",
                  lineHeight: 0.95,
                  color: product.accent.hex,
                }}
              >
                {product.name}
              </h1>

              {/* Tagline */}
              <p
                className="hero-fade max-w-[760px] font-display italic text-[var(--color-text-secondary)] max-md:text-lg"
                style={{ fontSize: "clamp(20px, 2.2vw, 32px)", lineHeight: 1.4 }}
              >
                {product.tagline}
              </p>

              {/* Status + price + CTA row */}
              <div className="hero-fade mt-4 flex flex-wrap items-center justify-center gap-3">
                <span
                  className="px-3 py-1.5 font-body text-[10px] font-semibold tracking-[1.5px]"
                  style={{
                    background: product.accent.soft,
                    border: `1px solid ${product.accent.border}`,
                    color: product.accent.hex,
                  }}
                >
                  {statusLabel(product.status)}
                </span>
                <span className="px-3 py-1.5 font-body text-[10px] font-semibold tracking-[1.5px] text-[var(--color-text-secondary)]" style={{ background: "var(--color-bg-card-alt)", border: "1px solid var(--color-border-light)" }}>
                  {primaryPrice}
                </span>
                {product.releaseDate && (
                  <span className="px-3 py-1.5 font-body text-[10px] font-semibold tracking-[1.5px] text-[var(--color-text-subtle)]" style={{ background: "var(--color-bg-card-alt)", border: "1px solid var(--color-border-light)" }}>
                    {product.releaseDate.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Big CTA */}
              <a
                href={product.cta.href}
                target={product.cta.external ? "_blank" : undefined}
                rel={product.cta.external ? "noopener noreferrer" : undefined}
                className="hero-fade mt-4 group flex items-center gap-3 px-8 py-4 font-body text-[14px] font-semibold transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: product.accent.hex,
                  color: "#0A0A0F",
                  boxShadow: `0 12px 40px -10px ${product.accent.glow}`,
                }}
              >
                {product.cta.label}
                {product.cta.external ? (
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </a>
            </div>
          </section>

          {/* Body */}
          <section
            ref={bodyRef}
            className="w-full px-16 py-32 max-md:px-6 max-md:py-16"
          >
            <div className="mx-auto grid max-w-[1080px] grid-cols-[1fr_300px] gap-16 max-lg:grid-cols-1 max-lg:gap-12">
              {/* Long description */}
              <div className="body-section flex flex-col gap-8">
                <span className="font-body text-[11px] tracking-[3px] text-[var(--color-text-subtle)]">
                  WHAT IT IS
                </span>
                <div className="flex flex-col gap-6">
                  {paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-body text-[16px] leading-[1.85] text-[var(--color-text-secondary)] max-md:text-[15px]"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Features list */}
                <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-10">
                  <span className="font-body text-[11px] tracking-[3px] text-[var(--color-text-subtle)]">
                    WHAT&apos;S IN IT
                  </span>
                  <ul className="flex flex-col gap-3">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body text-[14px] leading-[1.6] text-[var(--color-text-secondary)]"
                      >
                        <Check
                          className="mt-1 h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: product.accent.hex }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar — sticky info */}
              <aside className="body-section flex flex-col gap-6 self-start max-lg:self-stretch">
                <div className="glass-panel flex flex-col gap-5 p-7">
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[10px] tracking-[1.5px] text-[var(--color-text-subtle)]">
                      STATUS
                    </span>
                    <span
                      className="font-body text-[13px] font-semibold"
                      style={{ color: product.accent.hex }}
                    >
                      {statusLabel(product.status)}
                    </span>
                  </div>
                  <div className="h-px w-full bg-[var(--color-border)]" />
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[10px] tracking-[1.5px] text-[var(--color-text-subtle)]">
                      PRICE
                    </span>
                    <span className="font-body text-[13px] text-[var(--color-text-secondary)]">
                      {primaryPrice}
                    </span>
                    {secondaryPrice && (
                      <span className="font-body text-[11px] text-[var(--color-text-subtle)]">
                        {secondaryPrice}
                      </span>
                    )}
                  </div>
                  {product.releaseDate && (
                    <>
                      <div className="h-px w-full bg-[var(--color-border)]" />
                      <div className="flex flex-col gap-1">
                        <span className="font-body text-[10px] tracking-[1.5px] text-[var(--color-text-subtle)]">
                          RELEASE
                        </span>
                        <span className="font-body text-[13px] text-[var(--color-text-secondary)]">
                          {product.releaseDate}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="h-px w-full bg-[var(--color-border)]" />
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[10px] tracking-[1.5px] text-[var(--color-text-subtle)]">
                      CATEGORY
                    </span>
                    <span className="font-body text-[13px] text-[var(--color-text-secondary)]">
                      {product.category}
                    </span>
                  </div>
                  <a
                    href={product.cta.href}
                    target={product.cta.external ? "_blank" : undefined}
                    rel={product.cta.external ? "noopener noreferrer" : undefined}
                    className="mt-2 flex items-center justify-center gap-2 px-5 py-3 font-body text-[12px] font-semibold transition-all hover:scale-[1.02]"
                    style={{
                      background: product.accent.hex,
                      color: "#0A0A0F",
                    }}
                  >
                    {product.cta.label}
                    {product.cta.external ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </a>
                </div>
              </aside>
            </div>
          </section>

          {/* Next product strip */}
          <section className="border-t border-[var(--color-border)] w-full px-16 py-20 max-md:px-6 max-md:py-12">
            <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 text-center">
              <span className="font-body text-[11px] tracking-[3px] text-[var(--color-text-subtle)]">
                NEXT ON THE SHELF
              </span>
              <Link
                href={`/products/${next.slug}`}
                className="group flex items-center gap-3 font-display text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1 }}
              >
                {next.name}
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
