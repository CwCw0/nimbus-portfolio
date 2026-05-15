import type { Metadata } from 'next';
import VaultPageContent from './VaultPageContent';

export const metadata: Metadata = {
  title: 'Vault — Products by Nimbus Forma Studio',
  description:
    'Everything Nimbus is shipping. Apps, tools, and platforms built by one person. Products from the studio, not just services.',
  alternates: { canonical: '/vault' },
  openGraph: {
    title: 'The Vault — Products by Nimbus Forma Studio',
    description:
      'Apps, tools, and platforms built by one person. Products from the studio, not just services.',
    url: '/vault',
  },
};

export default function VaultPage() {
  return <VaultPageContent />;
}
