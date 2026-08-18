"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Maximize2, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn, handleSpotlightMove, supportsFinePointer } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Thumbnail-only card — never mounts <video>/<iframe>. The actual stream is
 * only initialized once the user clicks through to ProjectModal, keeping the
 * grid light on mobile networks (LCP/bandwidth).
 */
export function ProjectCard({
  project,
  onClick,
  className,
}: {
  project: Project;
  onClick: () => void;
  className?: string;
}) {
  const isDesign = project.category === "design";
  const ref = useRef<HTMLButtonElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    handleSpotlightMove(e);
    if (!supportsFinePointer()) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.button
      ref={ref}
      layout
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className={cn(
        "spotlight group relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-950/80 text-left backdrop-blur-xl transition-colors duration-300 hover:border-cyan-500/50",
        className
      )}
    >
      {project.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface-card to-transparent" />
      )}

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <MagneticButton className="h-14 w-14">
          {isDesign ? (
            <Maximize2 className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5 fill-current" />
          )}
        </MagneticButton>
      </div>

      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent p-4">
        <div>
          <p className="font-medium">{project.title}</p>
          <p className="text-xs text-muted">{project.tags.join(" / ")}</p>
        </div>
      </div>
    </motion.button>
  );
}
