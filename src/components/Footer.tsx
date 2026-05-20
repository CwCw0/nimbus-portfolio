'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';

/* ── Internal nav links ── */
const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/vault', label: 'Vault' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

/* ── External links ── */
const ELSEWHERE_LINKS = [
  { href: 'https://github.com/CwCw0', label: 'GitHub' },
  { href: 'mailto:heyitsnimbus@gmail.com', label: 'Email' },
  { href: 'https://calendly.com/heyitsnimbus/30min', label: 'Book a free strategy call' },
];

export default function Footer() {
  const [wordmarkHovered, setWordmarkHovered] = useState(false);
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWordmarkVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer-root">
      {/* ═══ 1. Big CTA ═══ */}
      <section className="footer-cta container">
        <div className="footer-cta-heading">
          <RevealLine>
            <span className="display-xl">Have a project</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-xl">
              <em className="serif">in mind?</em>
            </span>
          </RevealLine>
        </div>

        <FadeIn delay={240}>
          <p className="footer-cta-body body">
            Tell me what you need. I&apos;ll tell you how I&apos;d build it.
          </p>
        </FadeIn>

        <FadeIn delay={360}>
          <Magnetic strength={0.2}>
            <a
              href="https://calendly.com/heyitsnimbus/30min"
              className="btn footer-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>
        </FadeIn>
      </section>

      {/* ═══ 2. Meta grid ═══ */}
      <div className="footer-meta container">
        <FadeIn className="footer-meta-grid">
          {/* Col 1: Brand */}
          <div className="footer-col">
            <p className="footer-col-brand">
              <span className="footer-col-brand-name">Nimbus</span>
              <span className="footer-col-brand-sub">Forma Studio &middot; 2026</span>
            </p>
            <p className="footer-col-slogan serif">&ldquo;Built with intention.&rdquo;</p>
          </div>

          {/* Col 2: Navigate */}
          <div className="footer-col">
            <span className="footer-col-title">Navigate</span>
            <ul className="footer-col-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-col-link link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Elsewhere */}
          <div className="footer-col">
            <span className="footer-col-title">Elsewhere</span>
            <ul className="footer-col-list">
              {ELSEWHERE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-col-link link-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Status */}
          <div className="footer-col">
            <span className="footer-col-title">Status</span>
            <div className="footer-status-block">
              <p className="footer-status-line">
                <span className="status-dot" />
                <span>Available &middot; Remote worldwide</span>
              </p>
              <p className="footer-status-line">Kuala Lumpur, Malaysia</p>
              <p className="footer-status-line footer-status-dim">3.14&deg;N &middot; 101.69&deg;E</p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ═══ 3. Eames quote ═══ */}
      <FadeIn>
        <div className="footer-quote container">
          <blockquote className="footer-quote-text">
            &ldquo;The details are not the details. They make the design.&rdquo;
          </blockquote>
          <cite className="footer-quote-cite">&mdash; Charles Eames</cite>
        </div>
      </FadeIn>

      {/* ═══ 4. Giant SVG wordmark ═══ */}
        <div
          ref={wordmarkRef}
          className="footer-wordmark container"
          onMouseEnter={() => setWordmarkHovered(true)}
          onMouseLeave={() => setWordmarkHovered(false)}
        >
          <svg
            viewBox="0 0 1640 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="footer-wordmark-svg"
            aria-label="Nimbus"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="wordmark-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="60%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
            </defs>

            {/* NIMBUS text */}
            <text
              x="820"
              y="190"
              textAnchor="middle"
              fill="url(#wordmark-grad)"
              style={{
                fontFamily: 'var(--f-display)',
                fontSize: '320px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              NIMBUS
            </text>

            {/* Diagonal slash — bottom-left to top-right across NIMBUS */}
            <line
              x1="120"
              y1="195"
              x2="1520"
              y2="15"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1600"
              strokeDashoffset={(wordmarkHovered || wordmarkVisible) ? '0' : '1600'}
              style={{
                transition: 'stroke-dashoffset 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
                filter: 'drop-shadow(0 0 10px var(--accent-glow))',
              }}
            />

            {/* Forma Studio subscript */}
            <text
              x="1340"
              y="250"
              textAnchor="end"
              fill="var(--fg-dim)"
              style={{
                fontFamily: 'var(--f-serif)',
                fontSize: '42px',
                fontStyle: 'italic',
              }}
            >
              Forma Studio
            </text>
          </svg>
        </div>

      {/* ═══ 5. Legal row ═══ */}
      <div className="footer-legal container">
        <span>&copy; 2026 Nimbus Forma Studio &middot; SSM 202603095969</span>
        <span>One project at a time.</span>
      </div>
    </footer>
  );
}
