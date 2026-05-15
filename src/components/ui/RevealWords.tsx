'use client';

import { useRef, useEffect } from 'react';

interface RevealWordsProps {
  text: string;
  stagger?: number;
  className?: string;
}

export default function RevealWords({ text, stagger = 70, className = '' }: RevealWordsProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const words = el.querySelectorAll('.reveal-word');
          words.forEach((word) => word.classList.add('in'));
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="reveal-word" style={{ transitionDelay: `${i * stagger}ms` }}>
          <span style={{ transitionDelay: `${i * stagger}ms` }}>
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
