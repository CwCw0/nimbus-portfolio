"use client";

import type { ReactNode } from "react";
import { CurrencyProvider } from "../../components/products/CurrencyContext";

/**
 * Wraps the entire /products subtree in the CurrencyProvider so that
 * the wall, the cards, and individual product detail pages can all
 * read/write the visitor's preferred currency (USD vs MYR) from the
 * same context. The provider is intentionally scoped here instead of
 * the root layout — the rest of the site doesn't deal with prices.
 */
export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
