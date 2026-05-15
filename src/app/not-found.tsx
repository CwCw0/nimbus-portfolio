"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '0 24px',
      }}
    >
      {/* Glitch 404 */}
      <div style={{ position: 'relative', userSelect: 'none' }}>
        <h1
          className="glitch-text"
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(100px, 20vw, 240px)',
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(180deg, var(--accent) 0%, var(--ink-0) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>
        <span
          className="glitch-r"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(100px, 20vw, 240px)',
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
          }}
        >
          404
        </span>
        <span
          className="glitch-b"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(100px, 20vw, 240px)',
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
          }}
        >
          404
        </span>
      </div>

      <span
        className="mono"
        style={{ color: 'var(--fg-faint)', letterSpacing: '0.2em' }}
      >
        PAGE NOT FOUND
      </span>

      <p
        style={{
          maxWidth: 460,
          textAlign: 'center',
          fontFamily: 'var(--f-body)',
          fontSize: 16,
          lineHeight: 1.7,
          color: 'var(--fg-dim)',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          ← Back to Home
        </Link>
        <Link
          href="/contact"
          className="btn ghost"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
