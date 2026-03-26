import Link from "next/link";

const labsHighlights = [
  {
    title: "Automation Flight Deck",
    summary:
      "Internal orchestration stack that routes intake, briefs, and asset delivery across Moons Out Media and Labs.",
    status: "prototype",
  },
  {
    title: "Mission Control Dashboards",
    summary:
      "Real-time reporting layer that surfaces client momentum, campaign risk, and production velocity.",
    status: "live",
  },
];

export default function LabsServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="labs-panel p-8">
          <h1 className="text-4xl md:text-5xl font-heading text-primary labs-text-glow">
            Moons Out Labs
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Labs is where we prototype the systems behind the stories: automation, data
            pipelines, and infrastructure that keep Media work crisp, fast, and accountable.
            Everything here is built for clarity, stability, and measurable impact.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Start a Labs engagement
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Media portfolio
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Active work
            </p>
            <h2 className="mt-2 text-2xl font-heading text-primary">
              Labs highlights
            </h2>
          </div>
          <Link
            href="/services/labs/projects"
            className="text-xs uppercase tracking-[0.4em] text-accent underline-offset-4 hover:underline"
          >
            Explore Labs projects
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {labsHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-primary/30 bg-card p-6 labs-glow"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>{item.status}</span>
                <span>Labs</span>
              </div>
              <h3 className="mt-4 text-xl font-heading text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
