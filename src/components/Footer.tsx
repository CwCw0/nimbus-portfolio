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
  { href: '/changelog', label: 'Changelog' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

/* ── External links ── */
const ELSEWHERE_LINKS = [
  { href: 'https://www.upwork.com/freelancers/~018e3e05f351d165d4', label: 'Upwork' },
  { href: 'https://github.com/CwCw0', label: 'GitHub' },
  { href: 'https://www.instagram.com/nmbs.log/', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/darren-ng-chi-weng/', label: 'LinkedIn' },
  { href: '/contact', label: 'Send a project brief' },
];

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
              href="/contact"
              className="btn footer-cta-btn"
            >
              Start a conversation <span aria-hidden="true">→</span>
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
              <span className="footer-col-brand-name">nmbs<span className="round-dot" aria-hidden="true"></span></span>
              <span className="footer-col-brand-sub">Nimbus Forma Studio &middot; 2026</span>
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
              {ELSEWHERE_LINKS.map((link) =>
                link.href.startsWith('http') ? (
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
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-col-link link-underline">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
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

      {/* ═══ 4. Giant wordmark — HTML, solid bone, round dot ═══ */}
      <div ref={wordmarkRef} className="footer-wordmark container">
        <div className="footer-wordmark-text" aria-label="Nimbus Forma Studio">
          nmbs<span className="round-dot" aria-hidden="true"></span>
        </div>
        <span className="mono footer-wordmark-sub">Nimbus Forma Studio</span>
      </div>

      {/* ═══ 5. Legal row ═══ */}
      <div className="footer-legal container">
        <span>
          &copy; 2026 Nimbus Forma Studio &middot; SSM 202603095969
          &nbsp;&middot;&nbsp;
          <Link href="/privacy" className="link-underline" style={{ color: 'inherit' }}>
            Privacy
          </Link>
        </span>
        <span>One project at a time.</span>
      </div>
    </footer>
  );
}
