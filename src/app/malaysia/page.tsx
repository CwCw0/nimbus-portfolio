import type { Metadata } from 'next';
import MalaysiaContent from './MalaysiaContent';

export const metadata: Metadata = {
  title: 'Malaysia — Business Systems from RM 20,000',
  description:
    'Custom business systems for Malaysian SMEs — inventory, orders, bookings, dashboards, AI assistants. From RM 20,000, built in KL. Websites from RM 6,000.',
  alternates: { canonical: '/malaysia' },
  openGraph: {
    title: 'Nimbus Forma Studio — Business Systems for Malaysian SMEs',
    description:
      'The system that runs your shop — inventory, orders, dashboards, AI. From RM 20,000, built in KL.',
    url: '/malaysia',
  },
};

export default function MalaysiaPage() {
  return <MalaysiaContent />;
}
