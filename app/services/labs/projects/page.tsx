import Link from "next/link";

const labsProjects = [
  {
    slug: "automation-flight-deck",
    title: "Automation Flight Deck",
    status: "prototype",
    summary: "Routing intake, briefs, and asset delivery through a single control surface.",
  },
  {
    slug: "mission-control-dashboards",
    title: "Mission Control Dashboards",
    status: "live",
    summary: "Unified reporting that surfaces campaign momentum and production velocity.",
  },
];

export default function LabsProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Labs Projects
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-heading text-primary">
              Mission briefs
            </h1>
          </div>
          <Link
            href="/services/labs"
            className="text-xs uppercase tracking-[0.4em] text-accent underline-offset-4 hover:underline"
          >
            Back to Labs
          </Link>
        </div>

        <div className="mt-10 grid gap-6">
          {labsProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/services/labs/projects/${project.slug}`}
              className="rounded-lg border border-primary/30 bg-card p-6 transition hover:border-primary"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>{project.status}</span>
                <span>Labs</span>
              </div>
              <h2 className="mt-4 text-xl font-heading text-foreground">
                {project.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {project.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
