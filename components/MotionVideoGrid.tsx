"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

/** 2-column video grid — cards are thumbnail-only; the click opens ProjectModal,
 *  which is the only place a <video>/<iframe> actually gets initialized. */
export function MotionVideoGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  return (
    <>
      <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
