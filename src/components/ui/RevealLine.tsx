'use client';

import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react';

interface RevealLineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealLine({ children, delay = 0, className = '' }: RevealLineProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <span ref={ref} className={`reveal-line ${className}`}>
      <span style={style}>{children}</span>
    </span>
  );
}
