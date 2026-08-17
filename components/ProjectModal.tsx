"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Badge } from "@/components/ui/Badge";
import { cn, getEmbedInfo } from "@/lib/utils";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const embed = project ? getEmbedInfo(project.videoUrl) : { type: "none" as const };
  const isDesign = project?.category === "design" && Boolean(project.imageUrl);
  const isVertical = project?.aspectRatio === "9:16";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface-inset/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative w-full overflow-hidden rounded-2xl border border-border bg-background",
              isDesign ? "max-w-4xl" : isVertical ? "max-w-sm" : "max-w-3xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-surface-inset/50 p-2 text-text-body transition-colors hover:bg-surface-inset/70"
            >
              <X className="h-4 w-4" />
            </button>

            {isDesign ? (
              <div className="relative h-[70vh] w-full bg-surface-inset">
                <Image
                  src={project.imageUrl!}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                className={cn(
                  "relative w-full bg-surface-inset",
                  isVertical ? "aspect-[9/16]" : "aspect-video"
                )}
              >
                {embed.type === "mp4" && (
                  <VideoPlayer
                    src={embed.src}
                    autoPlay
                    controls
                    className={isVertical ? "object-contain" : undefined}
                  />
                )}
                {embed.type === "iframe" && (
                  <iframe
                    src={embed.src}
                    title={project.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                )}
                {embed.type === "none" && (
                  <div className="flex h-full w-full items-center justify-center text-muted">
                    No video available
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
