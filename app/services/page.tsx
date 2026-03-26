"use client"

import Link from "next/link"
import { Video, Code2 } from "lucide-react"

export default function ServicesChooserPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Services
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-heading text-primary">
          Choose your path
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
          Two specialized teams. One shared standard for clarity, velocity, and measurable impact.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-20 grid gap-6 md:grid-cols-2">
        <Link href="/services/creative" className="card flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-primary">
                Creative Services
              </h2>
              <p className="text-sm text-muted-foreground">
                Documentary storytelling, campaigns, and content systems.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            From strategy to production, Media builds narratives that earn trust and drive growth.
          </p>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            Explore Creative Services
          </span>
        </Link>

        <Link href="/services/labs" className="card flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-primary">
                Labs & Tech
              </h2>
              <p className="text-sm text-muted-foreground">
                Automation, data systems, and product infrastructure.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Labs engineers the operations behind the story: pipelines, dashboards, and delivery stacks.
          </p>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            Explore Labs & Tech
          </span>
        </Link>
      </section>
    </main>
  )
}
