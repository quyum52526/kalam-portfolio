import type { PortfolioPage } from "@/types/portfolio";
import { projects } from "@/data/projects";

const DATING_APP_AD_VIDEO_ID = "zhI1k2TdGPQ";
// maxresdefault.jpg confirmed live for this video (curl -I → 200, downloaded and verified as a
// real 1280x720 JPEG, not YouTube's ~8-10KB grey placeholder that some videos return with a
// false 200) — used directly, no hqdefault.jpg fallback needed.
const DATING_APP_AD_THUMBNAIL = `https://i.ytimg.com/vi/${DATING_APP_AD_VIDEO_ID}/maxresdefault.jpg`;

const TYPESCRIPT_VIDEO_ID = "L6zrC7gkVwI";
const TYPESCRIPT_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${TYPESCRIPT_VIDEO_ID}/hqdefault.jpg`;

const HOME_GUARANTEE_VIDEO_ID = "jaETednE6p8";
const HOME_GUARANTEE_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${HOME_GUARANTEE_VIDEO_ID}/hqdefault.jpg`;

const BNB_NTE_VIDEO_ID = "TN3taR07EUM";
const BNB_NTE_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${BNB_NTE_VIDEO_ID}/hqdefault.jpg`;

export const aiGenerativePage: PortfolioPage = {
  id: "ai-generative",
  label: "AI & Generative",
  categories: [
    {
      id: "ai-video",
      // ASSUMED — propose "AI Video" as the group name; confirm or rename.
      name: "AI Video",
      // Video thumbnails are 16:9 — the default 1:1 square would crop them top/bottom.
      aspectRatio: "16/9",
      items: [
        {
          id: "dating-app-ad",
          // Exact title from the YouTube oEmbed API (fetched live, not guessed) — short enough
          // to use verbatim as the card label (36 characters, one line at normal card widths).
          title: "The hardest part of a dating app ad",
          thumbnail: DATING_APP_AD_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: DATING_APP_AD_VIDEO_ID,
            videoTitle: "The hardest part of a dating app ad",
            thumbnail: DATING_APP_AD_THUMBNAIL,
            // ASSUMED — I haven't watched the video; this is inferred from the title and the
            // channel's own name ("Abu Kalam Khandaker's Perspective," a commentary-style
            // channel, not a raw reel) rather than verified content.
            overview:
              "A behind-the-scenes look at producing a short-form dating-app advertisement — the creative and technical challenge of making an ad concept land in just a few seconds. Part of an ongoing series on AI-assisted video production.",
            specs: [
              // ASSUMED — duration and format aren't available from the oEmbed response.
              { label: "Duration", value: "0:30" },
              // FACT — maxresdefault.jpg downloaded and measured at 1280x720.
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            // ASSUMED — the specific tools/workflow aren't verifiable from the video's public
            // metadata; a reasonable draft for an AI-video-engineer's own reel.
            pipeline: [
              "AI-assisted generative video (prompt-to-render)",
              "Edited and paced in a non-linear editor",
              "Colour graded for a punchy, high-contrast social feed look",
            ],
            // FACT — canonical short link, matches the video ID above.
            youtubeUrl: `https://youtu.be/${DATING_APP_AD_VIDEO_ID}`,
          },
        },
        {
          id: "typescript-branded-video-workflow",
          title: "TypeScript workflow that generates multiple branded videos automatically",
          thumbnail: TYPESCRIPT_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: TYPESCRIPT_VIDEO_ID,
            videoTitle: "TypeScript workflow that generates multiple branded videos automatically",
            thumbnail: TYPESCRIPT_VIDEO_THUMBNAIL,
            overview:
              "A TypeScript-powered workflow for generating multiple branded videos automatically, showing how reusable code can connect content, visual identity, and video production at scale.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "TypeScript automation and reusable video components",
              "Branded content generation from structured inputs",
              "Automated rendering of multiple video outputs",
            ],
            youtubeUrl: `https://youtu.be/${TYPESCRIPT_VIDEO_ID}`,
          },
        },
        {
          id: "first-home-guarantee-explainer",
          title: "First Home Guarantee Explained: Buy a Home with Just 5% Deposit (2026 Scheme)",
          thumbnail: HOME_GUARANTEE_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: HOME_GUARANTEE_VIDEO_ID,
            videoTitle: "First Home Guarantee Explained: Buy a Home with Just 5% Deposit (2026 Scheme)",
            thumbnail: HOME_GUARANTEE_VIDEO_THUMBNAIL,
            overview:
              "An explanatory video breaking down the First Home Guarantee and how eligible buyers may purchase a home with a 5% deposit under the 2026 scheme.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Research-led explainer structure",
              "Scripted educational video production",
              "Branded editing and visual pacing for clear communication",
            ],
            youtubeUrl: `https://youtu.be/${HOME_GUARANTEE_VIDEO_ID}`,
          },
        },
        {
          id: "bnb-nte-pancakeswap-tutorial",
          title: "How to Swap BNB for NTE Token on PancakeSwap | Step-by-Step MetaMask Tutorial",
          thumbnail: BNB_NTE_VIDEO_THUMBNAIL,
          details: [
            { label: "Format", value: "16:9 video", type: "text" },
            { label: "Platform", value: "YouTube", type: "text" },
          ],
          videoBoard: {
            videoId: BNB_NTE_VIDEO_ID,
            videoTitle: "How to Swap BNB for NTE Token on PancakeSwap | Step-by-Step MetaMask Tutorial",
            thumbnail: BNB_NTE_VIDEO_THUMBNAIL,
            overview:
              "A step-by-step tutorial showing how to swap BNB for NTE Token on PancakeSwap using MetaMask, presented as a clear crypto onboarding walkthrough.",
            specs: [
              { label: "Aspect Ratio", value: "16:9" },
              { label: "Format", value: "MP4, YouTube upload" },
            ],
            pipeline: [
              "Screen-recorded product walkthrough",
              "Step-by-step instructional scripting",
              "Branded editing with clear on-screen guidance",
            ],
            youtubeUrl: `https://youtu.be/${BNB_NTE_VIDEO_ID}`,
          },
        },
      ],
    },
  ],
  allWork: projects
    .filter((p) => p.category === "ai-video")
    .map((p) => ({
      id: p.id,
      title: p.title,
      image: p.thumbnailUrl || p.imageUrl || "",
    })),
};
