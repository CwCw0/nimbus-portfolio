import { getProductBySlug, getNextProduct, products } from "../../../data/products";
import ProductDetailContent from "./ProductDetailContent";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.cardDescription,
    openGraph: {
      title: `${product.name} — Nimbus`,
      description: product.cardDescription,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const next = product ? getNextProduct(slug) : { name: "Koji", slug: "koji" };

  return <ProductDetailContent product={product ?? null} next={next} />;
}
