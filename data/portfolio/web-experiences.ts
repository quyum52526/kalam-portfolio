import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

export const webExperiencesPage: PortfolioPage = {
  id: "web-experiences",
  label: "Web Experiences",
  categories: [
    {
      // TEMPLATE — duplicate this object in the array above to add a real
      // category (e.g. "Next.js Builds", "Interactive Sites"). Fill in real
      // items the same way branding-visuals.ts does.
      id: "example-category",
      name: "GAP — Example Category",
      items: [
        {
          id: "example-item",
          title: "GAP",
          thumbnail: "GAP",
          details: [{ label: "GAP", value: "GAP", type: "text" }],
        },
      ],
    },
  ],
  allWork: projects
    .filter((p) => p.category === "frontend")
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.thumbnailUrl || p.imageUrl || "",
    })),
};
