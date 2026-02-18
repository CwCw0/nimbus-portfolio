import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-12 bg-[var(--color-bg-footer)] px-16 py-14 max-md:px-6 max-md:py-10 max-md:gap-8">
      {/* Top */}
      <div className="flex w-full justify-between max-md:flex-col max-md:gap-10">
        {/* Brand */}
        <div className="flex w-[300px] flex-col gap-4 max-md:w-full">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            <span className="font-inter text-base font-semibold tracking-[6px] text-white">
              NIMBUS
            </span>
          </Link>
          <p className="font-inter text-sm leading-[1.6] text-[var(--color-text-subtle)]">
            Crafting digital experiences that
            <br />
            elevate brands and businesses.
          </p>
        </div>

        {/* Nav columns */}
        <div className="flex gap-20 max-md:gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
              Navigation
            </span>
            {[
              { label: "Services", href: "/services" },
              { label: "Work", href: "/work" },
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-inter text-[13px] text-[var(--color-text-dim)] transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-inter text-xs font-semibold tracking-[1px] text-white">
              Connect
            </span>
            <a
              href="https://github.com/CwCw0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[13px] text-[var(--color-text-dim)] transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              GitHub
            </a>
            <a
              href="mailto:heyitsnimbus@gmail.com"
              className="font-inter text-[13px] text-[var(--color-text-dim)] transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[var(--color-grid)]" />

      {/* Bottom */}
      <div className="flex w-full items-center justify-between max-md:flex-col max-md:gap-2">
        <span className="font-dm-mono text-xs text-[var(--color-text-faint)]">
          &copy; 2026 Nimbus. All rights reserved.
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-dm-mono text-xs text-[var(--color-text-faint)]">
            Designed &amp; built with
          </span>
          <span className="font-dm-mono text-xs font-medium text-[var(--color-accent)]">
            precision
          </span>
        </div>
      </div>
    </footer>
  );
}
