"use client";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  fixedValue,
}: {
  target?: number;
  suffix?: string;
  fixedValue?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (fixedValue || target === undefined) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 2000;
            const start = Date.now();
            const tick = () => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            tick();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, fixedValue]);

  return (
    <div
      ref={ref}
      className="text-display text-[clamp(56px,6vw,88px)] font-extralight leading-none tracking-[-0.04em] mb-4 flex items-start gap-1"
    >
      {fixedValue ? (
        <>
          <span>{fixedValue}</span>
          {suffix && (
            <em className="italic text-caramel text-[0.6em] mt-2 not-italic">
              <span className="italic">{suffix}</span>
            </em>
          )}
        </>
      ) : (
        <>
          <span>{value.toLocaleString()}</span>
          {suffix && (
            <em className="italic text-caramel text-[0.6em] mt-2 not-italic">
              <span className="italic">{suffix}</span>
            </em>
          )}
        </>
      )}
    </div>
  );
}

const STATS = [
  { num: 10000, suffix: "+", label: "Products Curated" },
  { num: 30, suffix: "+", label: "Global Brands" },
  { num: 11, label: "Years in UAE" },
  { fixed: "5", suffix: "★", label: "Hotel Partners" },
];

export default function Stats() {
  return (
    <section className="bg-cream py-20 px-6 md:px-16 border-b border-cocoa/10">
      <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`reveal px-0 md:px-8 ${
              i > 0 ? "md:border-l md:border-cocoa/10" : ""
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="w-8 h-px bg-caramel mb-4" />
            <AnimatedCounter
              target={stat.num}
              fixedValue={stat.fixed}
              suffix={stat.suffix}
            />
            <div className="text-[11px] tracking-[0.25em] uppercase text-cocoa/70 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
