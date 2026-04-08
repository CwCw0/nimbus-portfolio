"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const quote = quoteRef.current;
    const wordmark = wordmarkRef.current;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cleanups: (() => void)[] = [];

    // Quote fade-in
    if (quote) {
      const ctx = gsap.context(() => {
        gsap.from(quote, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 90%",
            once: true,
          },
        });
      }, quote);
      cleanups.push(() => ctx.revert());
    }

    // Wordmark character stagger
    if (wordmark) {
      const split = new SplitType(wordmark, { types: "chars" });
      gsap.set(split.chars || [], { opacity: 0, y: 20 });

      gsap.to(split.chars || [], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wordmark,
          start: "top 90%",
          once: true,
        },
      });

      cleanups.push(() => split.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <footer className="flex w-full flex-col items-center bg-[var(--color-bg-footer)] px-16 py-16 max-md:px-6 max-md:py-10">
      {/* Large wordmark */}
      <span
        ref={wordmarkRef}
        className="font-display text-[var(--color-text-primary)] mb-8"
        style={{
          fontSize: "clamp(48px, 8vw, 140px)",
          letterSpacing: "0.15em",
          opacity: 0.06,
          lineHeight: 1,
        }}
      >
        NIMBUS
      </span>

      {/* Pull quote */}
      <div ref={quoteRef} className="flex justify-center py-6 max-md:py-4">
        <p className="max-w-[500px] text-center font-display text-lg italic leading-[1.5] text-[var(--color-text-subtle)] max-md:text-base">
          &ldquo;Good design is as little design as possible.&rdquo;
          <span className="mt-2 block font-body text-[11px] not-italic tracking-[2px] text-[var(--color-text-faint)]">
            — DIETER RAMS
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full max-w-[600px] bg-[var(--color-border)] my-8" />

      {/* Nav — centered row */}
      <div className="flex items-center gap-8 max-md:flex-wrap max-md:justify-center max-md:gap-5">
        {[
          { label: "Services", href: "/services" },
          { label: "Work", href: "/work" },
          { label: "Products", href: "/products" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "#contact" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-body text-[13px] text-[var(--color-text-dim)] transition-colors duration-200 hover:text-[var(--color-accent)]"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Brand + copyright */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-body text-sm font-semibold tracking-[6px] text-[var(--color-text-primary)]">
            NIMBUS
          </span>
        </Link>
        <div className="flex items-center gap-4 max-md:flex-col max-md:gap-1">
          <span className="font-body text-[11px] tracking-[0.5px] text-[var(--color-text-faint)]">
            &copy; 2026 Nimbus. All rights reserved.
          </span>
          <span className="font-body text-[11px] tracking-[0.5px] text-[var(--color-text-faint)]">
            Designed & built with <span className="text-[var(--color-accent)]">precision</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
