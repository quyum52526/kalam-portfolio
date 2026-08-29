const STEPS = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "Visual direction, moodboarding, concept planning, and defining clear deliverables tailored to your goals.",
  },
  {
    number: "02",
    title: "Execution & Pipeline",
    description:
      "Production-ready execution using modern workflows across Remotion, vector design, motion pipelines, and AI generation.",
  },
  {
    number: "03",
    title: "Delivery & Iteration",
    description:
      "High-resolution source assets, structured export files, and rapid revision cycles for smooth launch.",
  },
];

/** Shared "how I work" block rendered under every /work/<category> page's top
 *  section (via CategoryPageContent) in place of the old flat "All Work" grid. */
export function ProductionWorkflow() {
  return (
    <section className="mt-12">
      <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
        Production Workflow
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <span className="text-xs font-semibold tracking-wider text-text-accent">
              {step.number}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
