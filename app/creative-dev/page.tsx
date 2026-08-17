import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";

export const metadata: Metadata = {
  title: "Creative Dev & Interactive UI Work",
  description:
    "Frontend engineering, interactive prototypes, and production UI builds.",
  openGraph: {
    title: "Abu Kalam — Creative Dev & Interactive UI",
    description:
      "Frontend engineering, interactive prototypes, and production UI builds.",
    images: ["/og-creative-dev.jpg"],
  },
};

export default function CreativeDevPage() {
  const creativeDevProjects = projects.filter(
    (p) => p.category === "frontend"
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Frontend &amp; Interactive UI Work
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Interactive experiments and production front-end builds.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creativeDevProjects.length === 0 && (
          <p className="text-sm text-muted">Projects coming soon.</p>
        )}
        {creativeDevProjects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
          >
            <h2 className="font-medium">{project.title}</h2>
            <p className="mt-1 text-sm text-muted">{project.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-5 flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Live Demo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-surface-card"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <LinkButton href="/contact" variant="outline">
          Let&apos;s build something
        </LinkButton>
      </div>
    </section>
  );
}
