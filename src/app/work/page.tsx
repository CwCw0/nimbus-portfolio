import type { Metadata } from 'next';
import WorkPageContent from './WorkPageContent';

export const metadata: Metadata = {
  title: 'Work — Projects & Design Lab',
  description:
    'Selected projects and case studies spanning web apps, SaaS platforms, health dashboards, and productivity tools. Plus a design lab of 6 web design templates.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Nimbus Work — Projects & Design Lab',
    description:
      'Case studies spanning web apps, SaaS platforms, and more. Plus 6 web design templates.',
    url: '/work',
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
