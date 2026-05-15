'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

/* ── Nav links config ── */
const NAV_LINKS = [
  { href: '/services', label: 'Services', sub: 'What we build' },
  { href: '/work', label: 'Work', sub: 'Projects & design lab' },
  { href: '/vault', label: 'Vault', sub: 'Products we\'re building' },
  { href: '/about', label: 'About', sub: 'The builder behind Nimbus' },
  { href: '/blog', label: 'Blog', sub: 'Thoughts on building' },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  /* ── Theme from localStorage ── */
  useEffect(() => {
    const saved = localStorage.getItem('nimbus-v6-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.body.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('nimbus-v6-theme', next);
      return next;
    });
  }, []);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body when mobile menu open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Close drawer on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        className={`nav-bar ${scrolled ? 'nav-scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner container">
          {/* ── Brand ── */}
          <Link href="/" className="nav-brand" aria-label="Nimbus Forma Studio — Home">
            <span className="nav-brand-wordmark">
              <span className="nav-brand-text">NIMBUS</span>
              <svg className="nav-brand-line" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="18" x2="100" y2="2" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="120" strokeDashoffset="120" />
              </svg>
            </span>
            <span className="nav-brand-sub">Forma Studio</span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
              >
                <span className="nav-link-label">{link.label}</span>
                <span className="nav-link-sub">{link.sub}</span>
              </Link>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="nav-right">
            {/* Status */}
            <div className="nav-status">
              <span className="status-dot" />
              <span className="nav-status-label">Available</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="nav-theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                background: 'none',
                border: '1px solid var(--line-strong)',
                borderRadius: 'var(--r-pill)',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--fg-dim)',
                transition: 'border-color 0.3s var(--ease-out), color 0.3s var(--ease-out)',
                flexShrink: 0,
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <Magnetic strength={0.20}>
              <Link href="/contact" className="nav-cta">
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </Link>
            </Magnetic>

            {/* Burger */}
            <button
              className="nav-burger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`nav-burger-line nav-burger-line-1 ${mobileOpen ? 'open' : ''}`} />
              <span className={`nav-burger-line nav-burger-line-2 ${mobileOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`nav-drawer ${mobileOpen ? 'nav-drawer-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="nav-drawer-inner">
          <div className="nav-drawer-links">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-drawer-link ${pathname === link.href ? 'nav-link-active' : ''}`}
                onClick={closeMobile}
                style={{ transitionDelay: mobileOpen ? `${80 + i * 60}ms` : '0ms' }}
              >
                <span className="nav-drawer-index">0{i + 1}</span>
                <div>
                  <span className="nav-drawer-label">{link.label}</span>
                  <span className="nav-drawer-sub">{link.sub}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="nav-drawer-bottom">
            <Link href="/contact" className="btn" onClick={closeMobile}>
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
