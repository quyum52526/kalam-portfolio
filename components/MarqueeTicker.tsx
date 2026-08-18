"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useVelocity,
} from "framer-motion";

const ITEMS = [
  "REMOTION",
  "AI VIDEO WORKFLOW",
  "NEXT.JS 15",
  "RUNWAY GEN-3",
  "FRAMER MOTION",
  "BRAND IDENTITY",
];

const BASE_SPEED = 40; // px/sec
const MAX_VELOCITY_BOOST = 140; // px/sec

/** Infinite ticker that speeds up slightly with scroll velocity. */
export function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth === 0) return;

    const boost = Math.min(Math.abs(scrollVelocity.get()) * 0.05, MAX_VELOCITY_BOOST);
    const speed = BASE_SPEED + boost;

    let next = x.get() - (speed * delta) / 1000;
    if (next <= -halfWidth) next += halfWidth;
    x.set(next);
  });

  const content = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-border bg-surface-inset py-4"
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {content.map((item, i) => (
          <span
            key={i}
            className="font-accent flex items-center text-sm font-semibold uppercase tracking-[var(--track-label)] text-muted"
          >
            {item}
            <span className="mx-10 text-cyan-400">/</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
