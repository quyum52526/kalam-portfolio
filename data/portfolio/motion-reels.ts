import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

export const motionReelsPage: PortfolioPage = {
  id: "motion-reels",
  label: "Motion & Reels",
  categories: [
    {
      // TEMPLATE — duplicate this object in the array above to add a real
      // category (e.g. "Vertical Reels", "Brand Campaigns"). Fill in real
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
    .filter((p) => p.category === "motion")
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.thumbnailUrl || p.imageUrl || "",
    })),
};
