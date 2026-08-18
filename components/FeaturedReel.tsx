"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

/** Scroll-linked expanding card: scales up and squares off its corners as it enters view. */
export function FeaturedReel({ videoUrl }: { videoUrl?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 8]);

  return (
    <section id="featured-reel" ref={ref} className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted">
        Featured Reel
      </h2>
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="aspect-video overflow-hidden border border-border bg-surface-inset"
      >
        {videoUrl ? (
          <VideoPlayer src={videoUrl} autoPlay controls />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            Reel coming soon
          </div>
        )}
      </motion.div>
    </section>
  );
}
