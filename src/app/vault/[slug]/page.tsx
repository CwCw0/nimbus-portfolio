import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { vaultProducts } from '@/data/vault';
import ProductShowcase from './ProductShowcase';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return vaultProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = vaultProducts.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Nimbus Forma Studio`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = vaultProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  const otherProducts = vaultProducts.filter((p) => p.slug !== slug);

  return <ProductShowcase product={product} others={otherProducts} />;
}
