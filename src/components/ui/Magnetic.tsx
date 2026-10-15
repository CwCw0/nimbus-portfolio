'use client';

import type { ReactNode } from 'react';

/**
 * Magnetic — RETIRED 2026-10-16 (Dee: no cursor-chasing / text movement on hover).
 * Now a plain passthrough so existing usage keeps working with zero motion.
 * Git history has the original if it's ever wanted again.
 */
export default function Magnetic({ children }: { children: ReactNode; strength?: number }) {
  return <>{children}</>;
}
