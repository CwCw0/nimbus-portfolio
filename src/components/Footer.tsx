"use client";

/**
 * FOOTER — Full exit experience
 *
 * The footer is the last impression. It should feel like a deliberate conclusion,
 * not a dumping ground for links.
 *
 * Sequence:
 * 1. CTA heading: words reveal one by one (scroll-linked)
 * 2. CTA button: slides up with emphasis
 * 3. Gradient divider: draws left to right
 * 4. Wordmark: chars stagger in → strikethrough draws → "Forma Studio" fades in
 * 5. Quote: chars fade in contemplatively
 * 6. Nav links: cascade in with staggered delays
 * 7. Copyright: fades in last — the quiet ending
 */

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const strikethroughRef = useRef<HTMLSpanElement>(null);
  const formaStudioRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (strikethroughRef.current) gsap.set(strikethroughRef.current, { scaleX: 1 });
      if (formaStudioRef.current) gsap.set(formaStudioRef.current, { opacity: 0.3, y: 0 });
      return;
    }

    const cleanups: (() => void)[] = [];

    // ── 1. CTA heading: word-by-word reveal ──
    if (ctaHeadingRef.current) {
      const ctaSplit = new SplitType(ctaHeadingRef.current, { types: "words" });
      gsap.set(ctaSplit.words || [], { opacity: 0, y: 24, filter: "blur(4px)" });
      gsap.to(ctaSplit.words || [], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaHeadingRef.current,
          start: "top 85%",
          once: true,
        },
      });
      cleanups.push(() => ctaSplit.revert());
    }

    // ── 2. CTA button: slide up ──
    if (ctaButtonRef.current) {
      gsap.fromTo(
        ctaButtonRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }

    // ── 3. Gradient divider: draw left to right ──
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }

    // ── 4. Wordmark → strikethrough → Forma Studio ──
    const wordmark = wordmarkRef.current;
    const strikethrough = strikethroughRef.current;
    const formaStudio = formaStudioRef.current;

    if (wordmark && strikethrough && formaStudio) {
      const split = new SplitType(wordmark, { types: "chars" });
      gsap.set(split.chars || [], { opacity: 0, y: 20 });
      gsap.set(strikethrough, { scaleX: 0 });
      gsap.set(formaStudio, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wordmark,
          start: "top 90%",
          once: true,
        },
      });

      // Chars stagger in
      tl.to(split.chars || [], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
      });

      // Strikethrough draws
      tl.to(strikethrough, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
      }, "+=0.25");

      // Forma Studio fades in
      tl.to(formaStudio, {
        opacity: 0.3,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.25");

      cleanups.push(() => split.revert());
    }

    // ── 5. Quote: contemplative char-by-char ──
    if (quoteRef.current) {
      const quoteText = quoteRef.current.querySelector("p");
      if (quoteText) {
        const quoteSplit = new SplitType(quoteText, { types: "words" });
        gsap.set(quoteSplit.words || [], { opacity: 0 });
        gsap.to(quoteSplit.words || [], {
          opacity: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 90%",
            once: true,
          },
        });
        cleanups.push(() => quoteSplit.revert());
      }
    }

    // ── 6. Nav links: cascade ──
    if (navRef.current) {
      const links = navRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: navRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }

    // ── 7. Copyright: last to appear ──
    if (copyrightRef.current) {
      gsap.fromTo(
        copyrightRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: "top 98%",
            once: true,
          },
        }
      );
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <footer className="sticky bottom-0 z-0 flex w-full flex-col items-center bg-[var(--color-bg-footer)] px-16 pt-0 pb-16 max-md:px-6 max-md:pb-10">

      {/* CTA moment */}
      <div className="flex w-full flex-col items-center py-24 max-md:py-16">
        <h3
          ref={ctaHeadingRef}
          className="mb-6 text-center font-display italic leading-[1.1] text-(--color-text-primary)"
          style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
        >
          Have a project in mind?
        </h3>
        <p className="mb-10 max-w-md text-center font-body text-base text-(--color-text-muted)">
          Let&apos;s make something remarkable.
        </p>
        <Link
          ref={ctaButtonRef}
          href="/contact"
          data-magnetic
          className="flex items-center gap-3 bg-(--color-accent-warm) px-10 py-4 font-body text-[15px] font-semibold text-[#1a1400] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(245,194,107,0.25)]"
        >
          Start a Conversation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Gradient divider — draws left to right */}
      <div
        ref={dividerRef}
        className="mb-12 h-px w-full max-w-150"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent-secondary) 70%, transparent)" }}
      />

      {/* Large wordmark with strikethrough reveal */}
      <div className="relative flex flex-col items-center mb-8">
        <div className="relative">
          <span
            ref={wordmarkRef}
            className="font-display text-(--color-text-primary)"
            style={{
              fontSize: "clamp(48px, 8vw, 140px)",
              letterSpacing: "0.15em",
              opacity: 0.06,
              lineHeight: 1,
              display: "block",
            }}
          >
            NIMBUS
          </span>
          {/* Strikethrough line */}
          <span
            ref={strikethroughRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #7C5CFC 20%, #A78BFA 50%, #7C5CFC 80%, transparent)",
              opacity: 0.45,
              transformOrigin: "left center",
              transform: "scaleX(0)",
              pointerEvents: "none",
              filter: "blur(0.4px)",
            }}
          />
        </div>

        {/* Forma Studio — fades in after strikethrough */}
        <span
          ref={formaStudioRef}
          aria-hidden="true"
          className="font-body"
          style={{
            fontSize: "clamp(9px, 1vw, 16px)",
            letterSpacing: "0.4em",
            opacity: 0,
            color: "var(--color-text-primary)",
            fontWeight: 600,
            marginTop: "6px",
            display: "block",
            textTransform: "uppercase",
          }}
        >
          Forma Studio
        </span>
      </div>

      {/* Pull quote — contemplative word reveal */}
      <div ref={quoteRef} className="flex justify-center py-6 max-md:py-4">
        <p className="max-w-125 text-center font-display text-lg italic leading-normal text-(--color-text-subtle) max-md:text-base">
          &ldquo;Good design is as little design as possible.&rdquo;
          <span className="mt-2 block font-body text-[11px] not-italic tracking-[2px] text-(--color-text-faint)">
            — DIETER RAMS
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full max-w-150 bg-(--color-border) my-8" />

      {/* Nav — cascading links */}
      <div ref={navRef} className="flex items-center gap-8 max-md:flex-wrap max-md:justify-center max-md:gap-5">
        {[
          { label: "Services", href: "/services" },
          { label: "Work", href: "/work" },
          { label: "Vault", href: "/vault" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-body text-[13px] text-(--color-text-dim) transition-colors duration-200 hover:text-(--color-accent-secondary)"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Brand + copyright — the quiet ending */}
      <div ref={copyrightRef} className="mt-8 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
          <span className="font-body text-sm font-semibold tracking-[6px] text-(--color-text-primary)">
            NIMBUS
          </span>
        </Link>
        <div className="flex items-center gap-4 max-md:flex-col max-md:gap-1">
          <span className="font-body text-[11px] tracking-[0.5px] text-(--color-text-faint)">
            &copy; 2026 Nimbus Forma Studio. All rights reserved.
          </span>
          <span className="font-body text-[11px] tracking-[0.5px] text-(--color-text-faint)">
            Designed & built with <span className="text-(--color-accent)">intention</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
