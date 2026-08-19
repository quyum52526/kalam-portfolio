export interface FeaturedReelData {
  /** YouTube video ID only — embed/thumbnail URLs are derived from this so swapping the video is a one-line change. */
  videoId: string;
  title: string;
  description: string;
}

export const featuredReel: FeaturedReelData = {
  videoId: "ofOym-ErhT8",
  title: "GAP: confirm title",
  description: "GAP: confirm description",
};
