import { getProductBySlug, getNextProduct, products } from "../../../data/products";
import ProductDetailContent from "./ProductDetailContent";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// While the storefront is being built, individual product pages redirect to
// the locked /products screen. Flip this off when PRODUCTS_LOCKED in
// ProductsContent.tsx is also flipped off.
const PRODUCT_DETAILS_LOCKED = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (PRODUCT_DETAILS_LOCKED) {
    return {
      title: "The Nimbus Vault — Still forming",
      description:
        "The Nimbus storefront is being built. Drop your email and we'll let you know the moment the vault opens.",
    };
  }
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
  if (PRODUCT_DETAILS_LOCKED) {
    redirect("/products");
  }
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const next = product ? getNextProduct(slug) : { name: "Koji", slug: "koji" };

  return <ProductDetailContent product={product ?? null} next={next} />;
}
