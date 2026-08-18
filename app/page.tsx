import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import { FeaturedReel } from "@/components/FeaturedReel";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { projects } from "@/data/projects";

export default function Home() {
  const featuredReel = projects.find((p) => p.featured);

  return (
    <>
      <HeroSection />

      <MarqueeTicker />

      {featuredReel && <FeaturedReel videoUrl={featuredReel.videoUrl} />}

      <BentoGrid />
    </>
  );
}
