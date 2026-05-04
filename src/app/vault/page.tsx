import type { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "Products — Things Nimbus Has Made",
  description:
    "A curated wall of everything Nimbus is shipping — apps, tools, fonts, games, and the desktop fire demon. Built by one person, sold under one roof.",
  alternates: { canonical: "/vault" },
  openGraph: {
    title: "Nimbus Products — Things Nimbus Has Made",
    description:
      "A curated wall of everything Nimbus is shipping — apps, tools, fonts, games, and the desktop fire demon.",
    url: "/vault",
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
