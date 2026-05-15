'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface MotionContextValue {
  level: number;
  setLevel: (level: number) => void;
}

const MotionContext = createContext<MotionContextValue>({
  level: 8,
  setLevel: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState(8);

  const setLevel = useCallback((newLevel: number) => {
    const clamped = Math.max(0, Math.min(10, Math.round(newLevel)));
    setLevelState(clamped);
  }, []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setLevelState(0);
      }
    };

    handleChange(mq);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Sync data-motion attribute on body
  useEffect(() => {
    document.body.setAttribute('data-motion', String(level));
  }, [level]);

  return (
    <MotionContext.Provider value={{ level, setLevel }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
