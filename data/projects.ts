export type ProjectCategory = "motion" | "ai-video" | "frontend" | "design";
export type AspectRatio = "16:9" | "9:16" | "1:1";
/** Bento grid cell sizing: wide = 8 cols, tall = 4 cols/2 rows, square = 4 cols, compact = 6 cols. */
export type GridSpan = "wide" | "tall" | "square" | "compact";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  /** Direct .mp4/.webm/.mov file OR a YouTube/Vimeo watch URL. Empty for image-only (design) entries. */
  videoUrl: string;
  thumbnailUrl: string;
  /** Full-resolution image, shown in a lightbox for `design` entries. */
  imageUrl?: string;
  /** Playback aspect ratio for video entries. Defaults to 16:9 when unset. */
  aspectRatio?: AspectRatio;
  /** Bento grid cell shape. Defaults from aspectRatio when unset (9:16 -> tall, 1:1 -> square, else compact). */
  gridSpan?: GridSpan;
  metrics?: {
    label: string;
    value: string;
  }[];
  /** frontend only */
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // --- Long-form video (public/videos/) ---
  {
    id: "kalam-showreel",
    title: "Kalam Showreel",
    category: "motion",
    tags: ["After Effects", "Cinema 4D"],
    description: "Motion design and edit reel — featured on the homepage.",
    videoUrl: "/videos/kalam-video.mp4",
    thumbnailUrl: "",
    gridSpan: "wide",
    featured: true,
  },
  {
    id: "final-day-10",
    title: "Cinematic AI Render",
    category: "ai-video",
    tags: ["AI Video", "Cinematic"],
    description:
      "AI-generated cinematic render exploring hyper-real visual storytelling.",
    videoUrl: "/videos/Final Day 10.mp4",
    thumbnailUrl: "",
    gridSpan: "square",
  },
  {
    id: "fiverr-commercial-promo",
    title: "Fiverr Commercial Promo",
    category: "motion",
    tags: ["Commercial", "Promo Video"],
    description: "Client commercial promo video produced for a Fiverr gig.",
    videoUrl: "/videos/Fiverr Gig Video-01.mp4",
    thumbnailUrl: "",
    gridSpan: "compact",
  },
  {
    id: "flirtique-brand-campaign",
    title: "Flirtique Brand Campaign",
    category: "motion",
    tags: ["Brand Motion", "Ad"],
    description: "Brand motion campaign and ad edit for Flirtique.",
    videoUrl: "/videos/flirtique-final-video.mp4",
    thumbnailUrl: "",
    gridSpan: "square",
  },
  {
    id: "nama",
    title: "Nama",
    category: "motion",
    tags: ["Motion", "Visual Storytelling"],
    description: "Motion piece built around visual storytelling.",
    videoUrl: "/videos/Nama.mp4",
    thumbnailUrl: "",
    gridSpan: "compact",
  },
  {
    id: "travel-lifestyle-edit",
    title: "Travel & Lifestyle Edit",
    category: "motion",
    tags: ["Video Editing", "Travel"],
    description: "Travel and lifestyle video editing showcase.",
    videoUrl: "/videos/travel-video-compres.mp4",
    thumbnailUrl: "",
    gridSpan: "square",
  },
  {
    id: "youtube-commercial-showcase",
    title: "Commercial Motion & Video Project",
    category: "motion",
    tags: ["Motion Design", "Commercial", "AI Workflow"],
    description:
      "Dynamic commercial video production with refined pacing and visual storytelling.",
    videoUrl: "https://youtu.be/zhI1k2TdGPQ",
    thumbnailUrl: "https://img.youtube.com/vi/zhI1k2TdGPQ/maxresdefault.jpg",
    aspectRatio: "16:9",
    gridSpan: "wide",
    featured: false,
  },

  // --- Short-form vertical reels (public/Short-video/) ---
  {
    id: "ad-reel-01",
    title: "Ad Reel 01",
    category: "motion",
    tags: ["Vertical Reel", "Ad"],
    description: "Short-form vertical ad reel.",
    videoUrl: "/Short-video/ads-01.mp4",
    thumbnailUrl: "",
    aspectRatio: "9:16",
    gridSpan: "tall",
  },
  {
    id: "ad-reel-02",
    title: "Ad Reel 02",
    category: "motion",
    tags: ["Vertical Reel", "Ad"],
    description: "Short-form vertical ad reel.",
    videoUrl: "/Short-video/ads-02.mp4",
    thumbnailUrl: "",
    aspectRatio: "9:16",
    gridSpan: "tall",
  },
  {
    id: "veerji-promo",
    title: "VeerJi Promo",
    category: "motion",
    tags: ["Vertical Reel", "Promo"],
    description: "Vertical promo reel for VeerJi.",
    videoUrl: "/Short-video/VeerJiPromo.mp4",
    thumbnailUrl: "",
    aspectRatio: "9:16",
    gridSpan: "tall",
  },

  // --- Graphic design & branding (public/Graphics/) ---
  {
    id: "castel-logo",
    title: "Castel Logo",
    category: "design",
    tags: ["Brand Identity", "Logo Design"],
    description: "Logo and brand mark design for Castel.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/castel-logo.jpg",
    imageUrl: "/Graphics/castel-logo.jpg",
    aspectRatio: "1:1",
    gridSpan: "square",
  },
  {
    id: "lmt-agro-logo",
    title: "LMT Agro Logo",
    category: "design",
    tags: ["Brand Identity", "Logo Design"],
    description: "Logo and brand mark design for LMT Agro.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/lmt-agro-logo.jpg",
    imageUrl: "/Graphics/lmt-agro-logo.jpg",
    aspectRatio: "1:1",
    gridSpan: "compact",
  },
  {
    id: "wildwood-logo",
    title: "Wildwood Logo",
    category: "design",
    tags: ["Brand Identity", "Logo Design"],
    description: "Logo and brand mark design for Wildwood.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/wildwood-logo.png",
    imageUrl: "/Graphics/wildwood-logo.png",
    aspectRatio: "1:1",
    gridSpan: "square",
  },
  {
    id: "moomilk-packaging",
    title: "MooMilk Packaging",
    category: "design",
    tags: ["Packaging Design", "Print"],
    description: "Packaging design for the MooMilk product line.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/moomilk-packaging.jpeg",
    imageUrl: "/Graphics/moomilk-packaging.jpeg",
    gridSpan: "tall",
  },
  {
    id: "business-card-01",
    title: "Business Card Design 01",
    category: "design",
    tags: ["Stationery", "Corporate Identity"],
    description: "Corporate business card and stationery design.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/business-ard-01.jpg",
    imageUrl: "/Graphics/business-ard-01.jpg",
    gridSpan: "compact",
  },
  {
    id: "business-card-02",
    title: "Business Card Design 02",
    category: "design",
    tags: ["Stationery", "Corporate Identity"],
    description: "Corporate business card and stationery design.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/business-ard-02.jpg",
    imageUrl: "/Graphics/business-ard-02.jpg",
    gridSpan: "square",
  },
  {
    id: "tshirt-design-01",
    title: "T-Shirt Design 01",
    category: "design",
    tags: ["Apparel Design", "Merchandise"],
    description: "Apparel and merchandise graphic design.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/t-shirt-01.png",
    imageUrl: "/Graphics/t-shirt-01.png",
    aspectRatio: "1:1",
    gridSpan: "compact",
  },
  {
    id: "tshirt-design-02",
    title: "T-Shirt Design 02",
    category: "design",
    tags: ["Apparel Design", "Merchandise"],
    description: "Apparel and merchandise graphic design.",
    videoUrl: "",
    thumbnailUrl: "/Graphics/t-shirt-02.jpg",
    imageUrl: "/Graphics/t-shirt-02.jpg",
    aspectRatio: "1:1",
    gridSpan: "square",
  },

  // --- Frontend ---
  {
    id: "match-media",
    title: "Match Media",
    category: "frontend",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    description: "Interactive frontend build — live project walkthrough.",
    videoUrl: "",
    thumbnailUrl: "",
    liveUrl: "https://match-media.vercel.app/en",
    gridSpan: "wide",
  },
];
