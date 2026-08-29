import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

const WEB_DEV_DIR = "/all-featured-portfolio/web-dev";

export const webExperiencesPage: PortfolioPage = {
  id: "web-experiences",
  label: "Web Experiences",
  categories: [
    {
      // TEMPLATE — duplicate this object in the array above to add another
      // category (e.g. "Next.js Builds", "Interactive Sites"). Fill in real
      // items the same way branding-visuals.ts does.
      id: "web-experiences",
      name: "Web Experiences",
      // Thumbnails here are full-page site screenshots (tall, not square) — 16:9 crops
      // their top/hero section for the card; ItemCard.tsx's object-top keeps that crop
      // anchored to the top instead of the (mostly empty, below-the-fold) center.
      aspectRatio: "16/9",
      items: [
        {
          id: "match-media",
          title: "Match Media",
          tagline: "Privacy-First Matrimonial",
          description:
            "Multi-level verified matchmaking platform with consent-based photo reveals and encrypted communication.",
          thumbnail: `${WEB_DEV_DIR}/match-media.png`,
          liveUrl: "https://match-media.vercel.app/en",
          details: [
            {
              label: "Description",
              value:
                "A modern matrimonial and matchmaking web platform interface built with Next.js and Tailwind CSS.",
              type: "paragraph",
            },
            {
              label: "Live URL",
              value: "https://match-media.vercel.app/en",
              type: "text",
            },
            {
              label: "Tech Stack",
              value: "Next.js, React, Tailwind CSS",
              type: "text",
            },
          ],
        },
        {
          id: "kalam-portfolio",
          title: "Kalam Portfolio",
          tagline: "Brand & Creative Showcase",
          description:
            "Interactive portfolio highlighting brand identity systems, AI video workflows, and web development.",
          thumbnail: `${WEB_DEV_DIR}/kalam-portfolio.png`,
          liveUrl: "https://kalam-portfolio-phi.vercel.app",
          details: [
            {
              label: "Description",
              value:
                "Interactive personal portfolio built with Next.js, React, and Tailwind CSS featuring dynamic motion engines, dark-themed UI, and generative AI showcases.",
              type: "paragraph",
            },
            {
              label: "Live URL",
              value: "https://kalam-portfolio-phi.vercel.app",
              type: "text",
            },
            {
              label: "Tech Stack",
              value: "Next.js, React, Tailwind CSS, Framer Motion",
              type: "text",
            },
          ],
        },
        {
          id: "tech-bites-paypulse",
          title: "Tech Bites / PayPulse",
          tagline: "Payroll & Attendance SaaS",
          description:
            "Automated workforce platform for real-time attendance tracking, payroll processing, and salary disbursement.",
          thumbnail: `${WEB_DEV_DIR}/tech-bites-paypulse.png`,
          liveUrl: "https://tech-bites-paypulse.vercel.app",
          details: [
            {
              label: "Description",
              value:
                "Payroll & Attendance Dashboard built for Meghna Apparels Ltd. — a Next.js/React web app for managing staff attendance and payroll processing.",
              type: "paragraph",
            },
            {
              label: "Live URL",
              value: "https://tech-bites-paypulse.vercel.app",
              type: "text",
            },
            {
              label: "Tech Stack",
              value: "Next.js, React",
              type: "text",
            },
          ],
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
