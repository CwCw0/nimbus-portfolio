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
          'radial-gradient(1200px 700px at 0% 100%, rgba(245, 240, 228, 0.04), transparent 65%)',
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
            <span className="display-xl">I make businesses</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-xl">
              run smoother<span className="hero-dot round-dot" aria-hidden="true"></span>
            </span>
          </RevealLine>
        </h1>

        <FadeIn delay={240}>
          <p className="hero-domains mono">Business development &middot; Operations systems &middot; AI &amp; agents</p>
        </FadeIn>

        {/* Meta — editorial row under a hairline */}
        <div className="hero-meta">
          <FadeIn delay={300}>
            <div className="hero-desc">
              <span className="mono hero-meta-label">What I do</span>
              <p>
                Internal dashboards, custom apps, workflow automation, and
                assistants trained on your own data. Custom-coded, not templates,
                not a subscription. Deployed, documented, and yours to own.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={430}>
            <div className="hero-cta">
              <Magnetic>
                <Link href="/work" className="btn">
                  See the work <span aria-hidden="true">↗</span>
                </Link>
              </Magnetic>
              <Link href="/services" className="hero-cta-sub link-underline">
                What I build, in detail
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={560}>
          <span className="mono hero-byline">
            Dee — solo builder, Kuala Lumpur. Nimbus Forma Studio (SSM 202603095969).
          </span>
        </FadeIn>
      </div>

      <style jsx>{`
        .hero-meta {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: end;
          gap: var(--sp-10);
          border-top: 1px solid var(--line);
          padding-top: var(--sp-8);
        }
        .hero-desc {
          display: grid;
          grid-template-columns: 140px minmax(0, 52ch);
          gap: var(--sp-6);
          align-items: start;
        }
        .hero-meta-label {
          color: var(--fg-faint);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 11px;
          padding-top: 5px;
        }
        .hero-desc p { color: var(--fg-dim); line-height: 1.7; }
        .hero-cta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--sp-4);
        }
        .hero-cta-sub { font-size: 14px; color: var(--fg-dim); }
        .hero-byline { color: var(--fg-faint); display: block; margin-top: var(--sp-6); }
        .hero-domains {
          display: block;
          margin-top: -8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: clamp(11px, 1.3vw, 13px);
          color: var(--fg-dim);
        }
        .hero-dot {
          display: inline-block;
          color: var(--aurora);
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
          .hero-meta { grid-template-columns: 1fr; gap: var(--sp-6); }
          .hero-desc { grid-template-columns: 1fr; gap: var(--sp-2); }
          .hero-cta { flex-direction: row; align-items: center; }
        }
      `}</style>
    </section>
  );
}
