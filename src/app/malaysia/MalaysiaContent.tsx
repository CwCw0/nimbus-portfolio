'use client';

import Link from 'next/link';
import RevealLine from '@/components/ui/RevealLine';
import FadeIn from '@/components/ui/FadeIn';

const tiers = [
  {
    name: 'Website',
    price: 'from RM 6,000',
    desc: 'Landing or portfolio site. Fast, designed in code, yours to own.',
  },
  {
    name: 'Business website',
    price: 'from RM 10,000',
    desc: 'CMS, catalog, or e-commerce. The public face of the business, done properly.',
  },
  {
    name: 'Website + business system',
    price: 'from RM 20,000',
    desc: 'The sweet spot: inventory, orders or bookings, payments, and an owner’s dashboard behind the site. The system that runs the shop.',
    featured: true,
  },
  {
    name: 'Ongoing care',
    price: 'from RM 800/month',
    desc: 'Security updates, monitoring, content changes, priority support.',
  },
];

export default function MalaysiaContent() {
  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      {/* Hero */}
      <section
        className="container"
        style={{ paddingTop: 'clamp(140px, 18vh, 200px)', paddingBottom: 'var(--sp-16)' }}
      >
        <div className="section-head">
          <span className="section-index">MY / Malaysia</span>
          <span className="section-label">Untuk bisnes Malaysia</span>
        </div>
        <RevealLine>
          <h1 className="display-xl" style={{ maxWidth: '18ch' }}>
            The system that runs your shop.
          </h1>
        </RevealLine>
        <FadeIn delay={200}>
          <p
            style={{
              color: 'var(--fg-dim)',
              maxWidth: 640,
              marginTop: 'var(--sp-8)',
              lineHeight: 1.7,
            }}
          >
            Still running on WhatsApp, spreadsheets, and a paper notebook? I build
            the inventory, orders, bookings, and dashboard system behind your
            business &mdash; with the website included. Custom-coded in KL, deployed,
            documented, and yours to own. No monthly platform fees.
          </p>
        </FadeIn>
      </section>

      {/* Pricing */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'var(--sp-20) 0' }}>
        <div className="container">
          <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--sp-8)' }}>
            HARGA &mdash; STRAIGHT ANSWERS
          </span>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {tiers.map((t) => (
              <FadeIn key={t.name}>
                <div
                  style={{
                    borderBottom: '1px solid var(--line)',
                    padding: 'var(--sp-8) 0',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(140px, 1fr) auto',
                    gap: 'var(--sp-6)',
                    alignItems: 'baseline',
                  }}
                >
                  <div>
                    <h2
                      className="display-sm"
                      style={{ color: t.featured ? 'var(--accent-2)' : 'var(--fg)' }}
                    >
                      {t.name}
                    </h2>
                    <p
                      className="body-sm"
                      style={{ color: 'var(--fg-dim)', marginTop: 'var(--sp-2)', maxWidth: '52ch', lineHeight: 1.6 }}
                    >
                      {t.desc}
                    </p>
                  </div>
                  <span
                    className="mono"
                    style={{ color: t.featured ? 'var(--accent)' : 'var(--fg-dim)', whiteSpace: 'nowrap' }}
                  >
                    {t.price}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p
              className="body-sm"
              style={{ color: 'var(--fg-faint)', marginTop: 'var(--sp-6)', maxWidth: '68ch', lineHeight: 1.6 }}
            >
              Every project is scoped individually &mdash; these are honest starting
              points, not teaser rates. Payment in three parts: 50% to start, 25%
              mid-build, 25% at launch.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Proof */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'var(--sp-20) 0' }}>
        <div className="container">
          <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: 'var(--sp-6)' }}>
            BUKTI, BUKAN JANJI
          </span>
          <FadeIn>
            <p style={{ color: 'var(--fg-dim)', maxWidth: '62ch', lineHeight: 1.7, marginBottom: 'var(--sp-8)' }}>
              A badminton specialty shop in KL runs its inventory, orders, and
              stringing queue on a system I built. My own studio runs on one too.
              Both case studies are public &mdash; real screens, honest labels.
            </p>
          </FadeIn>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
            <Link href="/work/88bh" className="btn ghost">
              88 Badminton House &rarr;
            </Link>
            <Link href="/work/forge" className="btn ghost">
              Forge &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'var(--sp-20) 0' }}>
        <div className="container">
          <FadeIn>
            <p style={{ color: 'var(--fg-dim)', maxWidth: '58ch', lineHeight: 1.7, marginBottom: 'var(--sp-8)' }}>
              Cerita sikit apa yang slow dalam bisnes you &mdash; WhatsApp orders
              yang bertimbun, stok yang tak tally, booking dalam buku. I&apos;ll
              send back a written build plan within 48 hours. No call required.
            </p>
            <Link href="/contact" className="btn">
              Send a project brief &rarr;
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
