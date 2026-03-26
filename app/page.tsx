import Link from "next/link";
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items";

export default function Home() {
  const featuredProjects = allPortfolioItems
    .filter((project) => project.status === "published")
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Media Mode
              </p>
              <h1 className="text-4xl md:text-5xl font-heading text-primary">
                Featured Stories
              </h1>
            </div>
            <Link
              href="/projects"
              className="text-xs uppercase tracking-[0.4em] text-accent underline-offset-4 hover:underline"
            >
              View full archive
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition hover:border-primary"
              >
                <div
                  className="h-56 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.heroImage.url})` }}
                />
                <div className="space-y-3 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {project.clientName}
                  </p>
                  <h2 className="text-xl font-heading text-primary">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {project.summary}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex text-xs uppercase tracking-[0.3em] text-accent underline-offset-4 hover:underline"
                  >
                    Read case study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
