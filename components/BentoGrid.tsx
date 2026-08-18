"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type GridSpan, type Project } from "@/data/projects";
import ProjectModal from "@/components/ProjectModal";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkTabs } from "@/components/WorkTabs";

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

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  return (
    <section
      id="projects-grid"
      className="relative mx-auto max-w-6xl px-6 py-16"
    >
      <WorkTabs />

      <motion.div
        layout
        className="grid grid-cols-12 auto-rows-[220px] gap-6"
      >
        {projects.map((project) => (
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
