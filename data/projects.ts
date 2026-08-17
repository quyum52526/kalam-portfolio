export type ProjectCategory = "motion" | "ai-video" | "creative-dev";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  /** Direct .mp4/.webm/.mov file OR a YouTube/Vimeo watch URL. */
  videoUrl: string;
  thumbnailUrl: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  /** creative-dev only */
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "example-motion-reel",
    title: "Example Motion Reel",
    category: "motion",
    tags: ["After Effects", "Cinema 4D"],
    description: "Placeholder project entry — replace with real work.",
    videoUrl: "",
    thumbnailUrl: "",
    featured: true,
  },
  {
    id: "example-ai-video",
    title: "Example AI Video",
    category: "ai-video",
    tags: ["Runway", "Midjourney"],
    description: "Placeholder project entry — replace with real work.",
    videoUrl: "",
    thumbnailUrl: "",
  },
  {
    id: "example-creative-dev",
    title: "Example Interactive Build",
    category: "creative-dev",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    description: "Placeholder project entry — replace with real work.",
    videoUrl: "",
    thumbnailUrl: "",
    liveUrl: "#",
    githubUrl: "#",
  },
];
