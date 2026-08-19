import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

const DIGICODE_IT_DIR =
  "/all-featured-portfolio/featurd-logo/Digicode-IT";

const GAP_LOGO_DETAILS = [
  { label: "Alternate Logo", value: "GAP", type: "image" as const },
  { label: "Brand Color", value: "GAP", type: "color" as const },
  { label: "Typography", value: "GAP", type: "text" as const },
  { label: "Complementary Background", value: "GAP", type: "color" as const },
];

const GAP_PRINT_DETAILS = [
  { label: "Printing Instruction", value: "GAP", type: "text" as const },
  { label: "Material / Paper Stock", value: "GAP", type: "text" as const },
  { label: "Brand Color", value: "GAP", type: "color" as const },
];

export const brandingVisualsPage: PortfolioPage = {
  id: "branding-visuals",
  label: "Branding & Visuals",
  categories: [
    {
      id: "logo-design",
      name: "Logo Design",
      items: [
        {
          id: "castel-logo",
          title: "Castel Logo",
          thumbnail: "/Graphics/castel-logo.jpg",
          details: GAP_LOGO_DETAILS,
        },
        {
          id: "lmt-agro-logo",
          title: "LMT Agro Logo",
          thumbnail: "/Graphics/lmt-agro-logo.jpg",
          details: GAP_LOGO_DETAILS,
        },
        {
          id: "wildwood-logo",
          title: "Wildwood Logo",
          thumbnail: "/Graphics/wildwood-logo.png",
          details: GAP_LOGO_DETAILS,
        },
        {
          id: "digicode-it-logo",
          title: "DigiCode IT",
          thumbnail: `${DIGICODE_IT_DIR}/DIGICODEit-primary.svg`,
          details: [
            {
              label: "Alternate Logo",
              value: `${DIGICODE_IT_DIR}/DIGICODEit-alternate.svg`,
              type: "image",
            },
            { label: "Brand Color", value: "#007BC4", type: "color" },
            { label: "Typography", value: "Montserrat / Open Sans", type: "text" },
            { label: "Complementary Background", value: "#EEF3F7", type: "color" },
          ],
          brandBoard: {
            tagline: "SOFTWARE · WEB · IT SOLUTIONS",
            hero: {
              image: `${DIGICODE_IT_DIR}/DIGICODEit-primary.svg`,
              alt: "DigiCode IT primary logo lockup",
            },
            logoOptions: {
              // No second full (icon + wordmark) lockup exists in the asset folder — only one
              // combined lockup (the primary) was supplied, plus the icon-only mark below.
              alternateLockup: null,
              icon: `${DIGICODE_IT_DIR}/DIGICODEit-alternate.svg`,
            },
            moodBoard: [
              `${DIGICODE_IT_DIR}/Mood board-01.jpg`,
              `${DIGICODE_IT_DIR}/Mood board-02.jpg`,
              `${DIGICODE_IT_DIR}/Mood board-03.jpg`,
              `${DIGICODE_IT_DIR}/Mood board-04.jpg`,
            ],
            // From the PDF's explicitly stated palette. The SVG's own fill colours (#007bc4,
            // #494e4a) are a subset of this and agree. Mood board-01.jpg separately prints its
            // own close-but-different swatches (#0077C8/#4A4D4D/#A6A6A6) — not used here since
            // the PDF is the designated palette source, but flagged as an unresolved discrepancy.
            palette: ["#007BC4", "#005A91", "#494E4A", "#101418", "#EEF3F7"],
            fonts: [
              { family: "Montserrat", usage: "HEADINGS · LOGOTYPE · LABELS" },
              { family: "Open Sans", usage: "BODY COPY · UI · DOCUMENTS" },
            ],
            rules: [
              "Icon alone at small sizes; full lockup everywhere else.",
              "Clear space around the mark equals one icon square.",
              "Blue leads, graphite supports, ink carries the text.",
              "Montserrat for headings, Open Sans for body. Nothing else.",
            ],
          },
        },
      ],
    },
    {
      id: "business-card-design",
      name: "Business Card Design",
      items: [
        {
          id: "business-card-01",
          title: "Business Card Design 01",
          thumbnail: "/Graphics/business-ard-01.jpg",
          details: GAP_PRINT_DETAILS,
        },
        {
          id: "business-card-02",
          title: "Business Card Design 02",
          thumbnail: "/Graphics/business-ard-02.jpg",
          details: GAP_PRINT_DETAILS,
        },
      ],
    },
    {
      id: "t-shirt-design",
      name: "T-Shirt Design",
      items: [
        {
          id: "tshirt-design-01",
          title: "T-Shirt Design 01",
          thumbnail: "/Graphics/t-shirt-01.png",
          details: [
            { label: "Print Method", value: "GAP", type: "text" },
            { label: "Fabric Color", value: "GAP", type: "color" },
            { label: "Variations", value: "GAP", type: "image" },
          ],
        },
        {
          id: "tshirt-design-02",
          title: "T-Shirt Design 02",
          thumbnail: "/Graphics/t-shirt-02.jpg",
          details: [
            { label: "Print Method", value: "GAP", type: "text" },
            { label: "Fabric Color", value: "GAP", type: "color" },
            { label: "Variations", value: "GAP", type: "image" },
          ],
        },
      ],
    },
    {
      id: "packaging-design",
      name: "Packaging Design",
      items: [
        {
          id: "moomilk-packaging",
          title: "MooMilk Packaging",
          thumbnail: "/Graphics/moomilk-packaging.jpeg",
          details: GAP_PRINT_DETAILS,
        },
      ],
    },
  ],
  allWork: projects
    .filter((p) => p.category === "design")
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.thumbnailUrl || p.imageUrl || "",
    })),
};
