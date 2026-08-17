"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import ProjectModal from "@/components/ProjectModal";
import { ProjectCard } from "@/components/ProjectCard";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Motion", value: "motion" },
  { label: "AI Video", value: "ai-video" },
  { label: "Creative Dev", value: "creative-dev" },
];

export default function BentoGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">(
    "all"
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
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
        className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={project.featured}
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
