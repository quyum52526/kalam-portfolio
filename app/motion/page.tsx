import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { MotionVideoGrid } from "@/components/MotionVideoGrid";
import { getEmbedInfo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Motion Design & AI Video Reel",
  description:
    "High-impact visual narratives, AI video workflows, and motion graphics showcase.",
  openGraph: {
    title: "Abu Kalam — Motion & AI Video Showcase",
    description:
      "High-impact visual narratives, AI video workflows, and motion graphics showcase.",
    images: ["/og-motion.jpg"],
  },
};

export default function MotionPage() {
  const motionProjects = projects.filter(
    (p) => p.category === "motion" || p.category === "ai-video"
  );
  const showreel = motionProjects.find((p) => p.featured) ?? motionProjects[0];
  const rest = motionProjects.filter((p) => p.id !== showreel?.id);
  const showreelEmbed = showreel ? getEmbedInfo(showreel.videoUrl) : null;

  return (
    <>
      {showreel && (
        <section className="sticky top-16 z-10 border-b border-border bg-background/90 px-6 py-6 backdrop-blur-md">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
              Featured Showreel
            </p>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface-inset">
              {showreelEmbed?.type === "mp4" && (
                <VideoPlayer
                  src={showreelEmbed.src}
                  poster={showreel.thumbnailUrl || undefined}
                  autoPlay
                  controls
                  preload="metadata"
                />
              )}
              {showreelEmbed?.type === "iframe" && (
                <iframe
                  src={showreelEmbed.src}
                  title={showreel.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              )}
              {(!showreelEmbed || showreelEmbed.type === "none") && (
                <div className="flex h-full w-full items-center justify-center text-muted">
                  Showreel coming soon
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Motion &amp; AI Video Showcase
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          A collection of motion graphics and AI-assisted video work, with
          breakdowns of process and tooling.
        </p>

        <div className="mt-12">
          <MotionVideoGrid projects={rest} />
        </div>
      </section>
    </>
  );
}
