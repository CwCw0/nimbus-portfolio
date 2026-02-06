"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work/flowstate" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-16 py-5 transition-all duration-300 max-md:px-6 max-md:py-4 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[#0C0B10E6] backdrop-blur-[16px]"
          : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        <span className="font-inter text-[15px] font-bold tracking-[5px] text-white">
          NIMBUS
        </span>
      </Link>

      <nav className="flex items-center gap-10 max-md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`group relative font-inter text-sm transition-colors duration-200 hover:text-white ${
              isActive(item.href)
                ? "text-white"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-200 ease-out ${
                isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        className="flex items-center gap-2 bg-[var(--color-accent)] px-6 py-2.5 font-inter text-[13px] font-semibold text-[#0A0A0B] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20] max-md:px-4 max-md:py-2 max-md:text-xs"
      >
        Let&apos;s Talk
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </header>
  );
}
