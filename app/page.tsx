import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import { FeaturedReel } from "@/components/FeaturedReel";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <StatsSection />

      <MarqueeTicker />

      <FeaturedReel />

      <BentoGrid />
    </>
  );
}
