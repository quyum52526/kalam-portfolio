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
          linkLabel: "Live Demo",
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
          linkLabel: "Live Demo",
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
          linkLabel: "Live Demo",
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
        {
          id: "bitepos",
          title: "BitePOS",
          tagline: "MULTI-TENANT POS SAAS",
          description:
            "Multi-tenant point-of-sale platform with company and branch management, per-company module entitlements, and a super-admin control panel.",
          thumbnail: `${WEB_DEV_DIR}/bitepos.png`,
          liveUrl: "https://bitepos-rho.vercel.app/login",
          linkLabel: "Live Demo",
          details: [
            {
              label: "Overview",
              value:
                "A multi-tenant POS product for retail and super-shop businesses, where the platform owner provisions companies and switches features on per company. A read-only demo is available from the login page.",
              type: "paragraph",
            },
            {
              label: "Key Features",
              value:
                "Multi-tenant structure: companies, branches, and per-company module entitlements\nTwo access levels: tenant ADMIN and platform SUPER_ADMIN\nSuper Admin portal at /super-admin — Tenants, Company Modules, Users, Audit Log, Permissions, with tenant-only header controls hidden in platform mode\nCompany Modules page: company picker, quick presets (Basic Retail / Super Shop / Manufacturing) and per-module toggles (Accounting, Advanced Reports, Stock Transfers, Production & Repackaging, Marketing & Loyalty)",
              type: "paragraph",
            },
            {
              label: "Role",
              value: "Solo — product design, full build and deployment.",
              type: "text",
            },
            {
              label: "Live URL",
              value: "https://bitepos-rho.vercel.app/login",
              type: "text",
            },
            {
              label: "Tech Stack",
              value: "Next.js (App Router), TypeScript, Prisma, Neon Postgres, NextAuth, Vercel",
              type: "text",
            },
          ],
        },
        {
          id: "rayyan-e-commerce",
          title: "Rayyan E-Commerce",
          tagline: "E-COMMERCE",
          description:
            "A full-stack, responsive e-commerce web application engineered for smooth online retail operations and fast checkout experiences.",
          thumbnail: "/rayyan.png",
          liveUrl: "https://www.rayyan.com.bd/",
          linkLabel: "Live Demo",
          details: [
            {
              label: "Description",
              value:
                "A full-stack, responsive e-commerce web application engineered for smooth online retail operations and fast checkout experiences. Developed with a robust backend architecture (Laravel) and a modern UI focused on user conversion and mobile responsiveness.",
              type: "paragraph",
            },
            {
              label: "Key Features",
              value:
                "Dynamic Product Catalog: Categorized product listings, advanced filtering, and instant search functionality.\nOrder & Cart Flow: Streamlined cart management, secure multi-step checkout, and seamless order tracking.\nAdmin Dashboard: Centralized control for inventory tracking, order status updates, and sales analytics.\nPerformance & Security: Optimized database queries, caching for fast load speeds, and secure payment processing.",
              type: "paragraph",
            },
            {
              label: "Live URL",
              value: "https://www.rayyan.com.bd/",
              type: "text",
            },
            {
              label: "Tech Stack",
              value: "Laravel, responsive web UI",
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
