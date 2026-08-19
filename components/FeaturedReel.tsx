"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { featuredReel } from "@/data/featuredReel";

/** Scroll-linked expanding card: scales up and squares off its corners as it enters view.
 *  Video is fixed to `featuredReel.videoId` (data/featuredReel.ts) — swap the id there. */
export function FeaturedReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 8]);
  const embedSrc = `https://www.youtube-nocookie.com/embed/${featuredReel.videoId}?autoplay=1&rel=0`;

  return (
    <section id="featured-reel" ref={ref} className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted">
        Featured Reel
      </h2>
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative aspect-video overflow-hidden border border-border bg-surface-inset"
      >
        <iframe
          src={embedSrc}
          title={featuredReel.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </motion.div>
      <div className="mt-4">
        <p className="font-medium">{featuredReel.title}</p>
        <p className="text-sm text-muted">{featuredReel.description}</p>
      </div>
    </section>
  );
}
