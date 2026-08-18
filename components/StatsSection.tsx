"use client";

import { useEffect, useRef, useState } from "react";
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
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
