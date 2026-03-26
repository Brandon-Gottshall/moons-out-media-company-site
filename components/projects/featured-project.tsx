"use client"

import Link from "next/link"
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items"
import type { PortfolioItem } from "@/lib/placeholder-data/portfolio-items"

interface FeaturedProjectProps {
  hideDescription?: boolean
  customImageOverlay?: React.ReactNode
  slug: string
  isCardLinkDisabled?: boolean
  isHeroCompact?: boolean
}

export default function FeaturedProject({
  hideDescription = false,
  customImageOverlay,
  slug,
  isCardLinkDisabled = false,
  isHeroCompact = false,
}: FeaturedProjectProps) {
  const project = allPortfolioItems.find((item) => item.slug === slug) as PortfolioItem | undefined

  const content = (
    <div className={`card ${isHeroCompact ? "p-4" : "p-6"}`}>
      <div className="relative overflow-hidden rounded-lg border border-border">
        {project?.heroImage?.url ? (
          <img
            src={project.heroImage.url}
            alt={project.heroImage.alt || project.title}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="h-56 w-full bg-background/70" />
        )}
        {customImageOverlay && (
          <div className="absolute inset-0">{customImageOverlay}</div>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {project?.clientName || "Featured Project"}
        </p>
        <h3 className="text-xl font-heading text-primary">
          {project?.title || "Project Highlight"}
        </h3>
        {!hideDescription && (
          <p className="text-sm text-muted-foreground">
            {project?.summary || "A selected highlight from the Moons Out Media archive."}
          </p>
        )}
      </div>
    </div>
  )

  if (isCardLinkDisabled) {
    return content
  }

  return <Link href={`/projects/${slug}`}>{content}</Link>
}
