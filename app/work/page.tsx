import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { WorkTabs } from "@/components/WorkTabs";
import { MotionVideoGrid } from "@/components/MotionVideoGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "AI video, motion & reels, branding & visuals, and web experiences — the full body of work.",
  openGraph: {
    title: "Abu Kalam — Work",
    description:
      "AI video, motion & reels, branding & visuals, and web experiences — the full body of work.",
  },
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <WorkTabs />

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        All Work
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Every project, across AI video, motion, branding, and web.
      </p>

      <div className="mt-12">
        <MotionVideoGrid projects={projects} />
      </div>
    </section>
  );
}
