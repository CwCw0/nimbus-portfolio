import type { Metadata } from 'next';
import WorkPageContent from './WorkPageContent';

export const metadata: Metadata = {
  title: 'Work — Selected Projects',
  description:
    'Selected projects and case studies spanning web apps, SaaS platforms, health dashboards, and productivity tools.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Nimbus Work — Selected Projects',
    description:
      'Case studies spanning web apps, SaaS platforms, and more.',
    url: '/work',
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
