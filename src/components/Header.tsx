"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Directional hide/show
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true); // scrolling down — hide
      } else {
        setHidden(false); // scrolling up — show
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 transition-all duration-300 max-md:px-6 max-md:py-4 ${
          scrolled
            ? "border-b border-[var(--color-border)] bg-[#0A0A0FE6] backdrop-blur-[16px]"
            : "bg-transparent"
        }`}
        style={{
          transform: hidden && !mobileOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          <span className="font-body text-[15px] font-bold tracking-[5px] text-[var(--color-text-primary)]">
            NIMBUS
          </span>
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
              <Link
                key={item.label}
                href={item.href}
                className={`group relative font-body text-sm transition-colors duration-200 hover:text-[var(--color-text-primary)] ${
                  isActive(item.href)
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300 origin-left ${
                    isActive(item.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(.19,1,.22,1)" }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            data-magnetic
            className="flex items-center gap-2 bg-[var(--color-accent)] px-6 py-2.5 font-body text-[13px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20] max-md:px-4 max-md:py-2 max-md:text-xs"
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
              <X className="h-5 w-5 text-[var(--color-text-primary)]" />
            ) : (
              <Menu className="h-5 w-5 text-[var(--color-text-primary)]" />
            )}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0FF2] backdrop-blur-md md:hidden" data-lenis-prevent>
          <nav className="flex flex-col items-center justify-center gap-8 h-full">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`font-display text-3xl transition-colors ${
                  isActive(item.href)
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center gap-2 bg-[var(--color-accent)] px-8 py-3 font-body text-[15px] font-semibold text-white"
            >
              Let&apos;s Talk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
