import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-[var(--color-bg-footer)] px-16 py-12 max-md:px-6 max-md:py-10">
      {/* Pull quote */}
      <div className="flex justify-center py-8 max-md:py-6">
        <p className="max-w-[600px] text-center font-display text-[22px] italic leading-[1.5] text-[var(--color-text-subtle)] max-md:text-lg">
          &ldquo;Good design is as little design as possible.&rdquo;
          <span className="mt-2 block font-body text-[12px] not-italic tracking-[2px] text-[var(--color-text-faint)]">
            — DIETER RAMS
          </span>
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[var(--color-border)]" />

      {/* Bottom row — brand / nav / email */}
      <div className="flex items-center justify-between pt-8 max-md:flex-col max-md:gap-6 max-md:items-start">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-body text-sm font-semibold tracking-[6px] text-[var(--color-text-primary)]">
            NIMBUS
          </span>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-8 max-md:flex-wrap max-md:gap-5">
          {[
            { label: "Services", href: "/services" },
            { label: "Work", href: "/work" },
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

        {/* Email */}
        <a
          href="mailto:heyitsnimbus@gmail.com"
          className="font-body text-[13px] text-[var(--color-text-dim)] transition-colors duration-200 hover:text-[var(--color-accent)]"
        >
          heyitsnimbus@gmail.com
        </a>
      </div>

      {/* Copyright */}
      <div className="mt-6 flex items-center justify-between max-md:flex-col max-md:gap-2">
        <span className="font-body text-[11px] tracking-[0.5px] text-[var(--color-text-faint)]">
          &copy; 2026 Nimbus. All rights reserved.
        </span>
        <span className="font-body text-[11px] tracking-[0.5px] text-[var(--color-text-faint)]">
          Designed & built with <span className="text-[var(--color-accent)]">precision</span>
        </span>
      </div>
    </footer>
  );
}
