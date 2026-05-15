'use client';

import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export default function FadeIn({ children, delay = 0, className = '', as: Tag = 'div' }: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

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
    // @ts-expect-error -- dynamic tag with ref
    <Tag ref={ref} className={`fade-in ${className}`} style={style}>
      {children}
    </Tag>
  );
}
