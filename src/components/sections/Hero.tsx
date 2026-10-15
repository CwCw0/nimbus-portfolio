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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--section-gap) 0',
        background:
          'radial-gradient(1200px 700px at 0% 100%, rgba(245, 243, 239, 0.04), transparent 65%)',
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-12)' }}>
        {/* Eyebrow */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span className="status-dot" />
            <span className="mono" style={{ color: 'var(--fg-dim)' }}>
              Currently accepting 1 new project for Q4 2026
            </span>
          </div>
        </FadeIn>

        {/* Title — the loader's dot lands as the headline's full stop */}
        <h1>
          <RevealLine>
            <span className="display-xl">I build the system</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-xl">
              that runs your business<span className="hero-dot" aria-hidden="true">.</span>
            </span>
          </RevealLine>
        </h1>

        <FadeIn delay={240}>
          <p className="hero-kicker">(The website&rsquo;s included.)</p>
        </FadeIn>

        {/* Meta area — 2 col */}
        <div className="hero-meta">
          <FadeIn delay={300}>
            <p style={{ color: 'var(--fg-dim)', maxWidth: 520, lineHeight: 1.7 }}>
              Internal dashboards, custom apps, workflow automation, and
              assistants trained on your own data. Custom-coded — not templates,
              not a subscription. Deployed, documented, and yours to own.
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
              <Magnetic>
                <Link href="/work" className="btn">
                  See the work <span aria-hidden="true">↗</span>
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>

        {/* Byline */}
        <FadeIn delay={600}>
          <span className="mono" style={{ color: 'var(--fg-faint)' }}>
            Dee — solo builder, Kuala Lumpur. Nimbus Forma Studio (SSM 202603095969).
          </span>
        </FadeIn>
      </div>

      <style jsx>{`
        .hero-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-10);
          align-items: start;
        }
        .hero-kicker {
          display: block;
          margin-top: -14px;
          font-size: clamp(19px, 2.6vw, 30px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--fg-dim);
        }
        .hero-dot {
          display: inline-block;
          animation: hero-dot-land 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.95s both;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        h1:hover .hero-dot {
          transform: translateY(-0.08em);
        }
        @keyframes hero-dot-land {
          from {
            opacity: 0;
            transform: translateY(-1.4em) scale(0.6);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-dot {
            animation: none;
          }
        }
        @media (max-width: 900px) {
          .hero-meta {
            grid-template-columns: 1fr;
            gap: var(--sp-6);
          }
        }
      `}</style>
    </section>
  );
}
