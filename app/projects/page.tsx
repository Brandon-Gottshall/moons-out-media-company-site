import Link from "next/link";
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items";

export default function ProjectsPage() {
  const projects = allPortfolioItems.filter(
    (project) => project.status === "published"
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Media Mode
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-primary">
              Project Gallery
            </h1>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            A curated archive of documentary storytelling, launch narratives, and growth campaigns.
            Each card highlights what was built, why it mattered, and the story it delivered.
          </p>
        </div>

        <div className="mt-12 grid gap-10">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-6 rounded-lg border border-primary/20 bg-card p-6 transition hover:border-primary md:grid-cols-[minmax(240px,320px)_1fr]"
            >
              <div className="overflow-hidden rounded-md border border-border">
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.heroImage.url})` }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{project.clientName}</span>
                  {project.projectYear && <span>{project.projectYear}</span>}
                  {project.industry && <span>{project.industry}</span>}
                </div>
                <h2 className="text-2xl font-heading text-primary">
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                {project.testimonial?.quote && (
                  <blockquote className="border-l-2 border-primary/40 pl-4 text-sm text-foreground/90">
                    “{project.testimonial.quote}”
                    <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {project.testimonial.authorName}
                    </span>
                  </blockquote>
                )}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs uppercase tracking-[0.3em] text-accent underline-offset-4 hover:underline"
                  >
                    View case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
