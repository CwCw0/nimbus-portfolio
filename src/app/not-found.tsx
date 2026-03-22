"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import CustomCursor from "../components/CustomCursor";

export default function NotFound() {
  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen w-full flex-col bg-[var(--color-bg-primary)]">
        {/* Header */}
        <header className="flex items-center justify-between px-16 py-5 max-md:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            <span className="font-body text-[15px] font-bold tracking-[5px] text-[var(--color-text-primary)]">
              NIMBUS
            </span>
          </Link>
        </header>

        {/* 404 Content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-16 max-md:px-6">
          {/* Glitch 404 */}
          <div className="relative select-none">
            <h1
              className="glitch-text font-display text-[180px] leading-none tracking-[-4px] max-md:text-[100px]"
              style={{
                background: "linear-gradient(180deg, #7C5CFC 0%, #0A0A0F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </h1>
            <span
              className="glitch-r font-display text-[180px] leading-none tracking-[-4px] max-md:text-[100px]"
              aria-hidden
            >
              404
            </span>
            <span
              className="glitch-b font-display text-[180px] leading-none tracking-[-4px] max-md:text-[100px]"
              aria-hidden
            >
              404
            </span>
          </div>

          <span className="font-body text-[11px] font-medium tracking-[4px] text-[var(--color-text-muted)]">
            PAGE NOT FOUND
          </span>

          <p className="w-[460px] text-center font-body text-base leading-[1.7] text-[var(--color-text-dim)] max-md:w-full">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex items-center gap-4 max-md:flex-col">
            <Link
              href="/"
              className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-8 py-4 font-body text-[15px] font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 border border-[var(--color-border-light)] px-8 py-4 font-body text-[15px] font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-[var(--color-text-primary)]"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </Link>
          </div>
        </div>

        {/* Mini Footer */}
        <footer className="flex items-center justify-center px-16 py-8 max-md:px-6">
          <span className="font-body text-xs text-[var(--color-text-faint)]">
            &copy; 2026 Nimbus. All rights reserved.
          </span>
        </footer>
      </div>
    </>
  );
}
