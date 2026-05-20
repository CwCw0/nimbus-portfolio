'use client';

import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import Magnetic from '@/components/ui/Magnetic';

export default function Hero() {

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--section-gap) 0',
        background:
          'radial-gradient(1400px 800px at 80% 20%, rgba(42, 26, 85, 0.20), transparent 60%), radial-gradient(1200px 700px at 0% 100%, rgba(124, 92, 252, 0.04), transparent 65%)',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-12)' }}>
        {/* Eyebrow */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span className="status-dot" />
            <span className="mono" style={{ color: 'var(--fg-dim)' }}>
              Currently accepting 1 new project for Q3 2026
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <h1>
          <RevealLine>
            <span className="display-xl">Built with</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span
              className="display-xxl"
              style={{ paddingLeft: 'clamp(40px, 8vw, 180px)', color: 'var(--accent)' }}
            >
              intention.
            </span>
          </RevealLine>
        </h1>

        {/* Meta area — 2 col */}
        <div className="hero-meta">
          <FadeIn delay={300}>
            <p style={{ color: 'var(--fg-dim)', maxWidth: 520, lineHeight: 1.7 }}>
              Nimbus Forma Studio builds for clients and ships its own products.
              Websites, business systems, AI automation. From strategy to deployment.
              If I build it for you, I&apos;ve already built it for myself first.
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
              <Magnetic>
                <Link href="/contact" className="btn">
                  Start a project <span aria-hidden="true">↗</span>
                </Link>
              </Magnetic>
              <Link href="/work" className="btn ghost">
                View work
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingTop: 'var(--sp-10)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span className="mono" style={{ color: 'var(--fg-faint)' }}>Scroll</span>
            <div
              style={{
                width: 1,
                height: 44,
                background: 'var(--line-strong)',
                position: 'relative',
              }}
            >
              <span
                className="scroll-pulse"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-10);
          align-items: start;
        }
        @media (max-width: 900px) {
          .hero-meta {
            grid-template-columns: 1fr;
            gap: var(--sp-6);
          }
          h1 .display-xxl {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
