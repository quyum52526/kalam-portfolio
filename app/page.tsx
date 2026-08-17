import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { projects } from "@/data/projects";

export default function Home() {
  const featuredReel = projects.find((p) => p.featured);

  return (
    <>
      <HeroSection />

      {featuredReel && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted">
            Featured Reel
          </h2>
          <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-black">
            {featuredReel.videoUrl ? (
              <VideoPlayer src={featuredReel.videoUrl} controls />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted">
                Reel coming soon
              </div>
            )}
          </div>
        </section>
      )}

      <BentoGrid />
    </>
  );
}
