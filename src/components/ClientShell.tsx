"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import TabWink from "@/components/TabWink";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});
const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
});
const AmbientWaves = dynamic(() => import("@/components/AmbientWaves"), {
  ssr: false,
});

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <TabWink />
      <PageLoader />
      <AmbientWaves lineCount={18} />
      <SmoothScroll />
      {children}
    </>
  );
}
