'use client';

import { useEffect } from 'react';

/** When the visitor switches tabs, the tab whispers. Title restores on return. */
export default function TabWink() {
  useEffect(() => {
    let original = document.title;
    const onVis = () => {
      if (document.hidden) {
        original = document.title;
        document.title = 'psst! still here!';
      } else {
        document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  return null;
}
