import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import CallToAction from "@/components/call-to-action"
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items"

export default function PortfolioItemPage({ params }: { params: { slug: string } }) {
  const currentItem = allPortfolioItems.find(
    (item) => item.slug === params.slug && item.status === "published",
  )

  if (!currentItem) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <Link
          href="/projects"
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:underline"
        >
          Back to projects
        </Link>
        <h1 className="mt-4 text-4xl md:text-5xl font-heading text-primary">
          {currentItem.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
          {currentItem.summary}
        </p>

        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <Image
            src={currentItem.heroImage.url}
            alt={currentItem.heroImage.alt || currentItem.title}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-8 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Client</p>
            <p className="mt-2 text-foreground">{currentItem.clientName || "Confidential"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Year</p>
            <p className="mt-2 text-foreground">{currentItem.projectYear || "Ongoing"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Industry</p>
            <p className="mt-2 text-foreground">{currentItem.industry || "Media"}</p>
          </div>
        </div>
      </section>

      {(currentItem.challenge || currentItem.solution || currentItem.results) && (
        <section className="mx-auto w-full max-w-5xl px-4 pb-16 grid gap-6 md:grid-cols-3">
          {currentItem.challenge && (
            <div className="card">
              <h2 className="text-lg font-heading text-primary">Challenge</h2>
              <p className="mt-3 text-sm text-muted-foreground">{currentItem.challenge}</p>
            </div>
          )}
          {currentItem.solution && (
            <div className="card">
              <h2 className="text-lg font-heading text-primary">Solution</h2>
              <p className="mt-3 text-sm text-muted-foreground">{currentItem.solution}</p>
            </div>
          )}
          {currentItem.results && (
            <div className="card">
              <h2 className="text-lg font-heading text-primary">Results</h2>
              <p className="mt-3 text-sm text-muted-foreground">{currentItem.results}</p>
            </div>
          )}
        </section>
      )}

      {currentItem.galleryImages && currentItem.galleryImages.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-4 pb-16">
          <h2 className="text-2xl font-heading text-primary">Gallery</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {currentItem.galleryImages.map((image) => (
              <div key={image.url} className="overflow-hidden rounded-lg border border-border">
                <Image
                  src={image.url}
                  alt={image.alt || currentItem.title}
                  width={900}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <CallToAction />
    </main>
  )
}
