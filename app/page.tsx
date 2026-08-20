import HeroSection from "@/components/HeroSection";
import { FeaturedReel } from "@/components/FeaturedReel";
import { HomeFeaturedWork } from "@/components/HomeFeaturedWork";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <StatsSection />

      <MarqueeTicker />

      <FeaturedReel />

      <HomeFeaturedWork />
    </>
  );
}
