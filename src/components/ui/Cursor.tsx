'use client';

import { useEffect, useRef } from 'react';

const HOVER_SELECTORS = 'a, button, [data-hover], input, textarea, select';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (window.innerWidth < 900) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show the cursor elements
    dot.style.display = '';
    ring.style.display = '';
    mounted.current = true;
    document.body.classList.add('cursor-ready');

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const shouldHover = target ? !!target.closest(HOVER_SELECTORS) : false;

      if (shouldHover && !isHovering) {
        isHovering = true;
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      } else if (!shouldHover && isHovering) {
        isHovering = false;
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    const onMouseDown = () => dot.classList.add('clicking');
    const onMouseUp = () => dot.classList.remove('clicking');

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.classList.remove('cursor-ready');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
      mounted.current = false;
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="custom-cursor-dot" style={{ display: 'none' }}>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path
            d="M0 0L12 9L6.5 11.5L5 19L0 0Z"
            fill="var(--accent)"
          />
        </svg>
      </div>
      <div ref={ringRef} id="custom-cursor-ring" style={{ display: 'none' }} />
    </>
  );
}
