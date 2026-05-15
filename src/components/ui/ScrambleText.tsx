'use client';

import { useRef, useState, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';
const TOTAL_FRAMES = 28;

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    // Cancel any running animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    frameRef.current = 0;

    const tick = () => {
      frameRef.current++;
      const progress = frameRef.current / TOTAL_FRAMES;

      const result = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          // Characters resolve left-to-right as progress increases
          if (i / text.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(result);

      if (frameRef.current < TOTAL_FRAMES) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(text);
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      aria-label={text}
    >
      {display}
    </span>
  );
}
