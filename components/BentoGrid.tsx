"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type GridSpan, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import ProjectModal from "@/components/ProjectModal";
import { ProjectCard } from "@/components/ProjectCard";
import { TerminalCodeBackground } from "@/components/TerminalCodeBackground";

const SPAN_CLASSES: Record<GridSpan, string> = {
  wide: "col-span-12 sm:col-span-8",
  tall: "col-span-6 sm:col-span-4 row-span-2",
  square: "col-span-6 sm:col-span-4",
  compact: "col-span-12 sm:col-span-6",
};

function getGridSpan(project: Project): GridSpan {
  if (project.gridSpan) return project.gridSpan;
  if (project.aspectRatio === "9:16") return "tall";
  if (project.aspectRatio === "1:1") return "square";
  return "compact";
}

type FilterValue = "all" | "motion-video" | "shorts" | "design" | "frontend";

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Motion & Video", value: "motion-video" },
  { label: "Shorts (9:16)", value: "shorts" },
  { label: "Graphic Design", value: "design" },
  { label: "Web Development", value: "frontend" },
];

function matchesFilter(project: Project, filter: FilterValue): boolean {
  switch (filter) {
    case "all":
      return true;
    case "motion-video":
      return project.category === "motion" || project.category === "ai-video";
    case "shorts":
      return project.aspectRatio === "9:16";
    case "design":
      return project.category === "design";
    case "frontend":
      return project.category === "frontend";
  }
}

export default function BentoGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  const filteredProjects = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [activeFilter]
  );

  return (
    <section
      id="projects-grid"
      className="relative mx-auto max-w-6xl px-6 py-16"
    >
      <AnimatePresence>
        {activeFilter === "motion-video" && (
          <motion.div
            key="terminal-bg"
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TerminalCodeBackground />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-10 inline-flex gap-1 rounded-full border border-border bg-surface p-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === filter.value
                ? "text-background"
                : "text-muted hover:text-foreground"
            )}
          >
            {activeFilter === filter.value && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-12 auto-rows-[220px] gap-6"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={SPAN_CLASSES[getGridSpan(project)]}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
