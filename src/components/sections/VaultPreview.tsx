'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';
import { vaultProducts } from '@/data/vault';

const toneGradients: Record<string, string> = {
  violet: 'linear-gradient(135deg, rgba(124, 92, 252, 0.22), rgba(42, 26, 85, 0.35))',
  deep: 'linear-gradient(135deg, rgba(90, 63, 204, 0.22), rgba(26, 18, 51, 0.35))',
  ember: 'linear-gradient(135deg, rgba(252, 140, 92, 0.22), rgba(85, 42, 26, 0.35))',
};

export default function VaultPreview() {
  return (
    <section
      id="vault"
      style={{ padding: 'var(--section-gap) 0', background: 'transparent' }}
    >
      <div className="container">
        {/* Section head */}
        <div className="section-head">
          <span className="section-index">06 / Vault</span>
          <span className="section-label">Products we&apos;re building</span>
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: 'var(--sp-6)' }}>
          <RevealLine>
            <span className="display-lg">From the</span>
          </RevealLine>
          <RevealLine delay={120}>
            <span className="display-lg serif">Vault.</span>
          </RevealLine>
        </h2>

        {/* Intro */}
        <FadeIn>
          <p style={{ color: 'var(--fg-dim)', maxWidth: 640, lineHeight: 1.7, marginBottom: 'var(--sp-12)' }}>
            Nimbus isn&apos;t only a service. I ship products under this name — tools
            I use every day, released for anyone who wants the same. Built in the open.
          </p>
        </FadeIn>

        {/* 3-card grid */}
        <div className="vault-grid">
          {vaultProducts.slice(0, 3).map((product, i) => (
            <VaultCard key={product.slug} product={product} delay={i * 150} />
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn>
          <div style={{ marginTop: 'var(--sp-12)', display: 'flex', justifyContent: 'center' }}>
            <Link href="/vault" className="btn ghost">
              Explore the Vault <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        .vault-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-6);
        }
        @media (max-width: 900px) {
          .vault-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

function VaultCard({
  product: p,
  delay,
}: {
  product: (typeof vaultProducts)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          transition: 'transform 0.4s var(--ease-out), border-color 0.3s var(--ease-out)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          borderColor: hovered ? 'var(--accent)' : undefined,
          background: 'var(--ink-2)',
        }}
      >
        {/* Screenshot */}
        <div
          style={{
            aspectRatio: '4 / 3',
            background: toneGradients[p.tone] || toneGradients.violet,
            borderRadius: 'var(--r-lg) var(--r-lg) 0 0',
            position: 'relative',
            overflow: 'hidden',
            display: p.image ? undefined : 'flex',
            alignItems: p.image ? undefined : 'center',
            justifyContent: p.image ? undefined : 'center',
          }}
        >
          {p.image ? (
            <Image
              src={p.image}
              alt={`${p.name} — ${p.kind}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          ) : (
            <span className="mono" style={{ color: 'var(--fg-faint)', fontSize: 10, letterSpacing: '0.15em' }}>
              COMING SOON
            </span>
          )}
          {/* Glow overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 60%, var(--accent-glow), transparent 70%)',
              opacity: hovered ? 0.5 : 0,
              transition: 'opacity 0.4s var(--ease-out)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: 'var(--sp-6)' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
            <span className="mono" style={{ color: 'var(--fg-dim)' }}>{p.kind}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--line-strong)' }} />
            <span className="mono" style={{ color: 'var(--accent)' }}>{p.status}</span>
          </div>

          {/* Name */}
          <p className="display-md" style={{ marginBottom: 'var(--sp-3)' }}>{p.name}</p>

          {/* Description */}
          <p className="body-sm" style={{ color: 'var(--fg-dim)', lineHeight: 1.6, marginBottom: 'var(--sp-5)' }}>
            {p.tagline}
          </p>

          {/* Link */}
          <Link
            href={`/vault/${p.slug}`}
            className="link-underline"
            style={{
              fontFamily: 'var(--f-body)',
              fontSize: 'var(--t-body-sm)',
              color: 'var(--accent)',
            }}
          >
            See how it works →
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}
