import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Nimbus Forma Studio collects, uses, and protects your personal data under the Malaysia Personal Data Protection Act 2010 (PDPA).',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — Nimbus Forma Studio',
    description:
      'How we handle your data. PDPA-compliant privacy practices for Nimbus Forma Studio.',
    url: '/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
