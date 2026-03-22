"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseDown = () => {
      dotRef.current?.classList.add("clicking");
      setTimeout(() => dotRef.current?.classList.remove("clicking"), 150);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data-cursor="view" (case study cards)
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl?.dataset.cursor === "view") {
        ringRef.current?.classList.add("cursor-view");
        if (labelRef.current) labelRef.current.style.opacity = "1";
        return;
      }

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        ringRef.current?.classList.add("hovering");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl?.dataset.cursor === "view") {
        ringRef.current?.classList.remove("cursor-view");
        if (labelRef.current) labelRef.current.style.opacity = "0";
      }
      ringRef.current?.classList.remove("hovering");
    };

    // Smooth ring follow
    let animFrame: number;
    const animateRing = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      animFrame = requestAnimationFrame(animateRing);
    };

    // Magnetic effect for [data-magnetic] elements
    const magneticElements = document.querySelectorAll("[data-magnetic]");
    const magneticHandlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = [];

    magneticElements.forEach((el) => {
      const move = (e: MouseEvent) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        gsap.to(el, { x: distX * 0.3, y: distY * 0.3, duration: 0.4, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      };
      el.addEventListener("mousemove", move as EventListener);
      el.addEventListener("mouseleave", leave);
      magneticHandlers.push({ el, move, leave });
    });

    document.body.classList.add("cursor-ready");
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animFrame = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove("cursor-ready");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animFrame);
      magneticHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move as EventListener);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="custom-cursor-dot" />
      <div ref={ringRef} id="custom-cursor-ring">
        <span
          ref={labelRef}
          className="font-body text-[10px] font-semibold tracking-[2px] text-white pointer-events-none"
          style={{ opacity: 0, transition: "opacity 200ms ease" }}
        >
          VIEW
        </span>
      </div>
    </>
  );
}
