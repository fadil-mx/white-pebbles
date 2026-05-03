"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0,
      cursorX = 0,
      cursorY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    // Expand on hover over interactive elements
    const handlers: Array<{ el: Element; enter: () => void; leave: () => void }> = [];
    const targets = document.querySelectorAll(
      'a, button, .cursor-target, [role="button"]'
    );
    targets.forEach((el) => {
      const enter = () => cursor.classList.add("expanded");
      const leave = () => cursor.classList.remove("expanded");
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      handlers.push({ el, enter, leave });
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot" />;
}
