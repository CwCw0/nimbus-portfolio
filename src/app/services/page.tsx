import type { Metadata } from 'next';
import ServicesPageContent from './ServicesPageContent';
import { faqItems } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Ops Dashboards, AI Assistants & Workflow Automation',
  description:
    'Internal ops dashboards, AI knowledge assistants, and workflow automation. Custom-coded by a solo builder — deployed, documented, yours to own. Built with intention.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Nimbus Services — Ops Dashboards, AI Assistants & Automation',
    description:
      'Internal ops dashboards, AI knowledge assistants, and workflow automation. Custom-coded, yours to own. Built with intention.',
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
