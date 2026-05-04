"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Currency } from "../../data/products";

/**
 * CurrencyContext
 * ---------------
 * Detects whether the visitor is in Malaysia and shows MYR by default,
 * or USD everywhere else. The detection is purely client-side and uses
 * Intl APIs that every modern browser ships with — no server middleware,
 * no IP lookups, no third-party services.
 *
 * Detection signals (any one of these flips the default to MYR):
 *   1. Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kuala_Lumpur"
 *   2. navigator.language matches /^en-MY$/i, /^ms-MY$/i, /^ms$/i, /-MY$/i
 *
 * The user's manual override (set via the toggle in the header / corner)
 * is persisted in localStorage under "nimbus-currency" and beats the
 * locale detection on subsequent visits.
 */

const STORAGE_KEY = "nimbus-currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (next: Currency) => void;
  toggle: () => void;
  // True after the first client render — until then, we render USD
  // so SSR and CSR markup match (avoids hydration mismatch flicker).
  hydrated: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function detectDefaultCurrency(): Currency {
  if (typeof window === "undefined") return "USD";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Kuala_Lumpur") return "MYR";
  } catch {
    // ignore — fall through to language check
  }
  const lang = (navigator.language || "").toLowerCase();
  if (lang === "ms" || lang.endsWith("-my")) return "MYR";
  return "USD";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let next: Currency | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "USD" || stored === "MYR") {
        next = stored;
      }
    } catch {
      // localStorage may be blocked in some sandboxed contexts
    }
    if (!next) next = detectDefaultCurrency();
    setCurrencyState(next);
    setHydrated(true);
  }, []);

  const setCurrency = (next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const toggle = () => setCurrency(currency === "USD" ? "MYR" : "USD");

  const value = useMemo(
    () => ({ currency, setCurrency, toggle, hydrated }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency, hydrated]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Sensible fallback if used outside the provider — useful in storybook,
    // tests, or if a stray component forgets to wrap.
    return {
      currency: "USD",
      setCurrency: () => {},
      toggle: () => {},
      hydrated: false,
    };
  }
  return ctx;
}
