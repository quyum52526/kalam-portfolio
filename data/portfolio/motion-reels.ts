import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

const AI_PROMO_VIDEO_ID = "BCA9uK3lle8";
// maxresdefault.jpg confirmed live (curl -I → 200, downloaded and verified as a real 1280x720
// JPEG, not a placeholder) — used directly, no hqdefault.jpg fallback needed. Like every YouTube
// Short, the stored file is a 16:9 canvas with the real 9:16 frame pillarboxed (blurred/zoomed
// copy of the same frame filling the side bars) — confirmed by opening it directly. ItemCard
// crops this to 9:16 centre via object-cover (see its own comment) rather than showing that
// letterboxing, and object-cover's default centre positioning recovers exactly the real vertical
// frame here: for a 720px-tall canvas the pillarboxed content is exactly 720*(9/16)=405px wide,
// centred — precisely what a 9:16-box object-cover crop of a 1280-wide source removes on each
// side ((1280-405)/2 = 437.5px), confirmed by direct visual comparison, not assumed.
const AI_PROMO_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${AI_PROMO_VIDEO_ID}/maxresdefault.jpg`;

export const motionReelsPage: PortfolioPage = {
  id: "motion-reels",
  label: "Motion & Reels",
  categories: [
    {
      id: "short-form-reels",
      // ASSUMED — propose "Short-Form Reels" as the group name; confirm or rename.
      name: "Short-Form Reels",
      // Vertical Short thumbnails are 9:16 — the default 1:1 square would crop them further.
      aspectRatio: "9/16",
      items: [
        {
          id: "ai-promo-video",
          // Exact title from the YouTube oEmbed API (fetched live, not guessed) — short enough
          // to use verbatim as the card label.
          title: "AI Promo video",
          thumbnail: AI_PROMO_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "9:16 video", type: "text" },
            { label: "Platform", value: "YouTube Shorts", type: "text" },
          ],
          videoBoard: {
            videoId: AI_PROMO_VIDEO_ID,
            videoTitle: "AI Promo video",
            thumbnail: AI_PROMO_VIDEO_THUMBNAIL,
            orientation: "portrait",
            // FACT (what's visible in the real thumbnail, viewed directly) + light framing —
            // the full video's actual pacing/edit beyond this single frame is inferred.
            overview:
              'A vertical short-form promo clip — a spoon lifts a creamy, stuffed dish from a rich sauce, garnished with pistachio and saffron, with on-screen text reading "Ek Hi Bite Mein…" ("In just one bite…"). Framed and paced for the Shorts feed.',
            specs: [
              // Confirmed by the site owner.
              { label: "Duration", value: "0:22" },
              // FACT — this is a YouTube Short; the pillarboxed source confirms a 9:16 frame.
              { label: "Aspect Ratio", value: "9:16" },
              // Confirmed by the site owner.
              { label: "Format", value: "1080×1920 · MP4" },
            ],
            // Confirmed by the site owner.
            pipeline: ["Veo 3 for generation", "CapCut for edit and captions"],
            // FACT — canonical Shorts link, matches the video ID above and the URL you gave.
            youtubeUrl: `https://youtube.com/shorts/${AI_PROMO_VIDEO_ID}`,
          },
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
