"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const stats: {
  label: string;
  value: number | null;
  suffix: string;
  unit: string;
}[] = [
  { label: "Motion & AI", value: 50, suffix: "+", unit: "Deliverables" },
  { label: "Render Quality", value: 60, suffix: "", unit: "FPS / 4K UHD" },
  { label: "Availability", value: null, suffix: "", unit: "Retainers / Direct 2026" },
];

// This section's own cards switch from a stacked column to a horizontal row at `sm:`
// (640px — see the grid classes below), not at `md:` (768px). Gating the hero overlap
// at `md` while the row is already horizontal from `sm` would leave a 640–767px zone
// with a horizontal row sitting fully below the hero, then jumping into overlap at
// 768px. Matching the overlap to this component's own existing `sm:` breakpoint avoids
// that inconsistent zone.
const OVERLAP_BREAKPOINT_PX = 640;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Straddles the hero's bottom edge: pulls this whole section up by exactly half the
  // card row's own rendered height — never a fixed pixel guess. Grid's default
  // align-items:stretch already makes every card match the tallest one, so the row's
  // measured height always reflects the tallest card, including the two-line
  // "Retainers / Direct 2026" card, and a ResizeObserver keeps it correct across
  // resizes/reflow instead of measuring once. Applied via margin-top (a real flow
  // adjustment, not a transform), so everything after this section — the marquee,
  // featured reel, etc. — shifts up with it automatically; nothing downstream needs a
  // separate compensating offset.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    function applyOverlap() {
      if (!section || !row) return;
      if (window.innerWidth < OVERLAP_BREAKPOINT_PX) {
        section.style.removeProperty("margin-top");
        return;
      }
      const half = row.getBoundingClientRect().height / 2;
      section.style.marginTop = `-${half}px`;
    }

    applyOverlap();

    const observer = new ResizeObserver(applyOverlap);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 mx-auto max-w-6xl px-6 pb-5"
    >
      <div ref={rowRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_OUT }}
            className="rounded-2xl border border-border-strong bg-surface-card p-6"
          >
            <p className="font-accent text-[length:var(--size-label)] uppercase tracking-[var(--track-label)] text-muted">
              {stat.label}
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold text-text-body sm:text-4xl">
              {stat.value !== null ? (
                <>
                  <Counter to={stat.value} suffix={stat.suffix} />{" "}
                  <span className="text-xl font-semibold text-muted sm:text-2xl">
                    {stat.unit}
                  </span>
                </>
              ) : (
                <span className="text-2xl sm:text-3xl">{stat.unit}</span>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
