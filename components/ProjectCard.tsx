"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn, handleSpotlightMove } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Thumbnail-only card — never mounts <video>/<iframe>. The actual stream is
 * only initialized once the user clicks through to ProjectModal, keeping the
 * grid light on mobile networks (LCP/bandwidth).
 */
export function ProjectCard({
  project,
  onClick,
  featured = false,
  className,
}: {
  project: Project;
  onClick: () => void;
  featured?: boolean;
  className?: string;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      onMouseMove={handleSpotlightMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "spotlight group relative overflow-hidden rounded-2xl border border-border bg-surface text-left transition-shadow duration-300 hover:border-white/20 hover:shadow-[0_0_40px_-12px_rgba(120,119,198,0.35)]",
        featured && "sm:col-span-2 sm:row-span-2",
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
        <div className="absolute inset-0 bg-gradient-to-br from-white/[.04] to-transparent" />
      )}

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <MagneticButton className="h-14 w-14">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </MagneticButton>
      </div>

      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4">
        <div>
          <p className="font-medium">{project.title}</p>
          <p className="text-xs text-muted">{project.tags.join(" / ")}</p>
        </div>
      </div>
    </motion.button>
  );
}
