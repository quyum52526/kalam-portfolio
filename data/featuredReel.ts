export interface FeaturedReelData {
  /** YouTube video ID only — embed/thumbnail URLs are derived from this so swapping the video is a one-line change. */
  videoId: string;
  title: string;
  description: string;
}

export const featuredReel: FeaturedReelData = {
  videoId: "ofOym-ErhT8",
  title: "Showreel — AI Video, Motion & Brand",
  description:
    "A 25-second cut of AI video engineering, motion design, and brand work.",
};
