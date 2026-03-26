import Link from "next/link";

interface LabsProjectPageProps {
  params: { slug: string };
}

export default function LabsProjectPage({ params }: LabsProjectPageProps) {
  const title = params.slug.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="labs-panel p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Labs project
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-heading text-primary labs-text-glow">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            This brief outlines what is broken, the invariant we are protecting, and the system
            we are building to fix it.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/labs/projects" className="btn-secondary">
              All Labs projects
            </Link>
            <Link href="/contact" className="btn-primary">
              Collaborate
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 space-y-10">
        <div className="rounded-lg border border-primary/30 bg-card p-6">
          <h2 className="text-xl font-heading text-primary">Problem statement</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Describe the exact failure mode and the business consequence it creates.
          </p>
        </div>

        <div className="rounded-lg border border-primary/30 bg-card p-6">
          <h2 className="text-xl font-heading text-primary">Broken invariant</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Name the rule that should always be true and how it is currently being violated.
          </p>
        </div>

        <div className="rounded-lg border border-primary/30 bg-card p-6">
          <h2 className="text-xl font-heading text-primary">System / approach</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Outline the architecture, workflow, and tooling that restore the invariant.
          </p>
        </div>

        <div className="rounded-lg border border-primary/30 bg-card p-6">
          <h2 className="text-xl font-heading text-primary">Current status</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Research · Prototype · Live
          </p>
        </div>

        <div className="rounded-lg border border-primary/30 bg-card p-6">
          <h2 className="text-xl font-heading text-primary">Artifacts</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Repo / demo link</li>
            <li>Technical write-up</li>
            <li>Latest milestone notes</li>
          </ul>
        </div>

        <div className="rounded-lg border border-primary/30 bg-card p-6">
          <h2 className="text-xl font-heading text-primary">Call to participate</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Invite collaborators to test, fund, or contribute to the next phase.
          </p>
        </div>
      </section>
    </main>
  );
}
