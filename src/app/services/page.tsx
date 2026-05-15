import type { Metadata } from 'next';
import ServicesPageContent from './ServicesPageContent';
import { faqItems } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Web Design, Branding & AI Tools in Malaysia',
  description:
    'Custom websites, brand identity, and AI-powered tools built by a solo developer in KL, Malaysia. No agency overhead. Built with intention.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Nimbus Services — Web Design, Branding & AI Tools',
    description:
      'Custom websites, brand identity, and AI tools. No agency overhead. Built with intention. Based in Kuala Lumpur.',
    url: '/services',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesPageContent />
    </>
  );
}
