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

const AR_STREET_STYLE_VIDEO_ID = "o49dVPrOvss";
const AR_STREET_STYLE_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${AR_STREET_STYLE_VIDEO_ID}/hqdefault.jpg`;

const TECHBITES_AI_CALL_VIDEO_ID = "glNgiQfnijs";
const TECHBITES_AI_CALL_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${TECHBITES_AI_CALL_VIDEO_ID}/hqdefault.jpg`;

const PERSONAL_BRAND_INTRO_VIDEO_ID = "xo4HNVG4Zng";
const PERSONAL_BRAND_INTRO_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${PERSONAL_BRAND_INTRO_VIDEO_ID}/hqdefault.jpg`;

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
        {
          id: "ar-street-style-shopping-ad",
          title: "Point, Shop, Chat, AR Street Style Shopping App Concept | Vertical Ad Edit",
          thumbnail: AR_STREET_STYLE_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "9:16 video", type: "text" },
            { label: "Platform", value: "YouTube Shorts", type: "text" },
          ],
          videoBoard: {
            videoId: AR_STREET_STYLE_VIDEO_ID,
            videoTitle: "Point, Shop, Chat, AR Street Style Shopping App Concept | Vertical Ad Edit",
            thumbnail: AR_STREET_STYLE_VIDEO_THUMBNAIL,
            orientation: "portrait",
            overview:
              "A vertical ad concept for an AR street-style shopping experience where users can point, shop, and chat while discovering fashion in context.",
            specs: [
              { label: "Aspect Ratio", value: "9:16" },
              { label: "Format", value: "MP4, YouTube Short" },
            ],
            pipeline: [
              "AR shopping concept development",
              "Vertical ad edit for mobile viewing",
              "Branded motion graphics and product-focused pacing",
            ],
            youtubeUrl: `https://youtube.com/shorts/${AR_STREET_STYLE_VIDEO_ID}`,
          },
        },
        {
          id: "techbites-ai-call-solution-ad",
          title: "Never Miss a Call Again, TechBites AI Call Solution Ad | Vertical Video Edit",
          thumbnail: TECHBITES_AI_CALL_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "9:16 video", type: "text" },
            { label: "Platform", value: "YouTube Shorts", type: "text" },
          ],
          videoBoard: {
            videoId: TECHBITES_AI_CALL_VIDEO_ID,
            videoTitle: "Never Miss a Call Again, TechBites AI Call Solution Ad | Vertical Video Edit",
            thumbnail: TECHBITES_AI_CALL_VIDEO_THUMBNAIL,
            orientation: "portrait",
            overview:
              "A vertical AI call-solution ad concept for TechBites, focused on helping businesses stay responsive and never miss an important customer call.",
            specs: [
              { label: "Aspect Ratio", value: "9:16" },
              { label: "Format", value: "MP4, YouTube Short" },
            ],
            pipeline: [
              "AI call-solution product concept",
              "Vertical ad edit for mobile viewing",
              "Branded motion graphics and clear service-focused pacing",
            ],
            youtubeUrl: `https://youtube.com/shorts/${TECHBITES_AI_CALL_VIDEO_ID}`,
          },
        },
        {
          id: "ai-personal-brand-intro",
          title: "AI-Themed Personal Brand Intro — Motion Graphics Identity Reveal | Abu Kalam Khandaker",
          thumbnail: PERSONAL_BRAND_INTRO_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "9:16 video", type: "text" },
            { label: "Platform", value: "YouTube Shorts", type: "text" },
          ],
          videoBoard: {
            videoId: PERSONAL_BRAND_INTRO_VIDEO_ID,
            videoTitle: "AI-Themed Personal Brand Intro — Motion Graphics Identity Reveal | Abu Kalam Khandaker",
            thumbnail: PERSONAL_BRAND_INTRO_VIDEO_THUMBNAIL,
            orientation: "portrait",
            overview:
              "A vertical motion-graphics identity reveal introducing Abu Kalam Khandaker through an AI-themed personal brand intro.",
            specs: [
              { label: "Aspect Ratio", value: "9:16" },
              { label: "Format", value: "MP4, YouTube Short" },
            ],
            pipeline: [
              "AI-themed personal brand direction",
              "Vertical motion graphics and identity reveal",
              "Rhythmic edit designed for mobile viewing",
            ],
            youtubeUrl: `https://youtube.com/shorts/${PERSONAL_BRAND_INTRO_VIDEO_ID}`,
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
