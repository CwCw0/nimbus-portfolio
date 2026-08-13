"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});
const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});
const AmbientWaves = dynamic(() => import("@/components/AmbientWaves"), {
  ssr: false,
});
const Cursor = dynamic(() => import("@/components/ui/Cursor"), {
  ssr: false,
});

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PageLoader />
      <AmbientWaves lineCount={18} />
      <Cursor />
      <SmoothScroll />
      {children}
    </>
  );
}
