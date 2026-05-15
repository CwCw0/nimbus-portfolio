'use client';

import { useEffect, useLayoutEffect } from 'react';

const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function PreviewShell({ children }: { children: React.ReactNode }) {
  useBrowserLayoutEffect(() => {
    document.body.classList.add('preview-active');
    return () => {
      document.body.classList.remove('preview-active');
    };
  }, []);

  return <>{children}</>;
}
