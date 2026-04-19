"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SCRAMBLE_FRAMES = 14;

function ScrambleLink({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (!textRef.current) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    let frame = 0;
    const animate = () => {
      if (!textRef.current) return;
      const progress = frame / SCRAMBLE_FRAMES;
      textRef.current.textContent = label
        .split("")
        .map((char, i) => {
          if (i < Math.floor(progress * label.length)) return char;
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");
      frame++;
      if (frame <= SCRAMBLE_FRAMES) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        textRef.current.textContent = label;
      }
    };
    frameRef.current = requestAnimationFrame(animate);
  }, [label]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (textRef.current) textRef.current.textContent = label;
  }, [label]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={`group relative font-body text-sm transition-colors duration-200 hover:text-(--color-text-primary) ${
        isActive
          ? "text-(--color-text-primary)"
          : "text-(--color-text-muted)"
      }`}
    >
      <span ref={textRef}>{label}</span>
      <span
        className={`absolute -bottom-1 left-0 h-[2px] bg-(--color-accent) transition-all duration-300 origin-left ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(.19,1,.22,1)" }}
      />
    </Link>
  );
}

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Logo hover refs
  const logoStrikeRef = useRef<HTMLSpanElement>(null);
  const logoFormaRef = useRef<HTMLSpanElement>(null);

  // Mobile menu refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCtaRef = useRef<HTMLAnchorElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  const handleLogoEnter = useCallback(() => {
    if (logoStrikeRef.current)
      gsap.to(logoStrikeRef.current, {
        scaleX: 1,
        duration: 0.45,
        ease: "power2.inOut",
        transformOrigin: "left center",
      });
    if (logoFormaRef.current)
      gsap.to(logoFormaRef.current, {
        autoAlpha: 0.6,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
        delay: 0.15,
      });
  }, []);

  const handleLogoLeave = useCallback(() => {
    if (logoStrikeRef.current)
      gsap.to(logoStrikeRef.current, {
        scaleX: 0,
        duration: 0.35,
        ease: "power2.inOut",
        transformOrigin: "right center",
      });
    if (logoFormaRef.current)
      gsap.to(logoFormaRef.current, {
        autoAlpha: 0,
        y: -2,
        duration: 0.2,
        ease: "power3.in",
      });
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const menu = mobileMenuRef.current;

      // Animate menu entrance
      gsap.fromTo(
        menu,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          ease: "power3.inOut",
        }
      );

      // Stagger nav links from bottom
      const links = mobileLinkRefs.current.filter(Boolean);
      gsap.fromTo(
        links,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // CTA button entrance
      if (mobileCtaRef.current) {
        gsap.fromTo(
          mobileCtaRef.current,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.3 + links.length * 0.08,
          }
        );
      }

      // Decorative line draw
      if (mobileLineRef.current) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.5,
          }
        );
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 transition-all duration-300 max-md:px-6 max-md:py-4 ${
          scrolled
            ? "border-b border-(--color-border) bg-[#0A0A0FE6] backdrop-blur-[16px]"
            : "bg-transparent"
        }`}
        style={{
          transform:
            hidden && !mobileOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
        >
          <div className="h-2 w-2 rounded-full bg-(--color-accent)" />
          <div className="relative">
            <span className="font-body text-[15px] font-bold tracking-[5px] text-(--color-text-primary)">
              NIMBUS
            </span>

            {/* Strikethrough */}
            <span
              ref={logoStrikeRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                marginTop: "-1px",
                height: "1.5px",
                background:
                  "linear-gradient(90deg, #7C5CFC 0%, #A78BFA 50%, #7C5CFC 100%)",
                opacity: 0.65,
                transformOrigin: "left center",
                transform: "scaleX(0)",
                pointerEvents: "none",
              }}
            />

            {/* Forma Studio */}
            <span
              ref={logoFormaRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                whiteSpace: "nowrap",
                fontFamily: "var(--font-body), Outfit, sans-serif",
                fontSize: "7px",
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#A78BFA",
                opacity: 0,
                marginTop: "4px",
                pointerEvents: "none",
                transform: "translateY(-2px)",
              }}
            >
              Forma Studio
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-10 max-md:hidden">
          {navItems.map((item) => {
            if (item.label === "Products") {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link-products ${isActive(item.href) ? "active" : ""}`}
                >
                  <span className="products-spark" aria-hidden="true" />
                  <span className="products-text">{item.label}</span>
                  <span className="products-underline" aria-hidden="true" />
                </Link>
              );
            }
            return (
              <ScrambleLink
                key={item.label}
                label={item.label}
                href={item.href}
                isActive={isActive(item.href)}
              />
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            data-magnetic
            className="flex items-center gap-2 bg-(--color-accent-warm) px-6 py-2.5 font-body text-[13px] font-semibold text-[#1a1400] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(245,194,107,0.25)] max-md:px-4 max-md:py-2 max-md:text-xs"
          >
            Let&apos;s Talk
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hidden max-md:flex h-11 w-11 items-center justify-center"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-(--color-text-primary)" />
            ) : (
              <Menu className="h-5 w-5 text-(--color-text-primary)" />
            )}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu with GSAP animations */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col bg-[#0A0A0FF5] backdrop-blur-2xl md:hidden"
          style={{ clipPath: "inset(0 0 100% 0)" }}
          data-lenis-prevent
        >
          <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                ref={(el) => {
                  mobileLinkRefs.current[i] = el;
                }}
                onClick={() => setMobileOpen(false)}
                className={`group relative block overflow-hidden py-3 font-display transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-(--color-accent)"
                    : "text-(--color-text-primary) hover:text-(--color-accent)"
                }`}
                style={{
                  fontSize: "clamp(36px, 8vw, 56px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                <span className="flex items-center gap-4">
                  <span className="font-body text-sm text-(--color-text-subtle) tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Decorative line */}
            <div
              ref={mobileLineRef}
              className="my-6 h-px w-full bg-linear-to-r from-(--color-accent) via-(--color-accent-secondary) to-transparent opacity-30"
              style={{ transformOrigin: "left" }}
            />

            <Link
              href="/contact"
              ref={mobileCtaRef}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 bg-(--color-accent-warm) px-8 py-4 font-body text-[15px] font-semibold text-[#1a1400]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>

          {/* Bottom info */}
          <div className="px-8 pb-8">
            <p className="font-body text-xs text-(--color-text-subtle) tracking-[1px]">
              NIMBUS FORMA STUDIO
            </p>
          </div>
        </div>
      )}
    </>
  );
}
