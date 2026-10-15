import type { Metadata } from 'next';
import EngineerPageContent from './EngineerPageContent';

export const metadata: Metadata = {
  title: 'Darren Ng — Forward Deployed Engineer, AI Systems',
  description:
    'Forward Deployed Engineer and AI-focused full-stack engineer. 3+ years shipping production software, AI/LLM integrations, and internal business systems end to end.',
  alternates: { canonical: '/engineer' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Darren Ng — Forward Deployed Engineer, AI Systems',
    description:
      'Stack, experience, and shipped work — full-stack + AI systems engineering.',
    url: '/engineer',
  },
};

export default function EngineerPage() {
  return <EngineerPageContent />;
}
