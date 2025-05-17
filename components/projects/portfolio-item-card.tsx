"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { Badge } from "@/components/ui/badge"

interface PortfolioItemCardProps {
  item: PortfolioItem
  index: number // For staggered animation
}

export function PortfolioItemCard({ item, index }: PortfolioItemCardProps) {
  return (
    <Link href={`/portfolio/${item.slug}`} className="block h-full group" aria-label={`View details for ${item.title}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative flex flex-col overflow-hidden rounded-lg border border-gray-800 group-hover:border-cyberpunk-blue/70 group-hover:shadow-glow-blue transition-all duration-300 bg-black/60 backdrop-blur-sm h-full"
      >
        <div className="aspect-video overflow-hidden">
          <Image
            src={item.heroImage.url}
            alt={item.heroImage.alt}
            width={600}
            height={338}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
            {item.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="mr-2 mb-1 border-cyberpunk-blue/50 text-cyberpunk-blue bg-cyberpunk-blue/10 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyberpunk-blue transition-colors">
            {item.title}
          </h3>
          
          <p className="text-sm text-cyberpunk-pink mb-3">Client: {item.clientName}</p>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {item.summary}
          </p>

          <div className="mt-auto">
            <div className="inline-flex items-center text-sm font-medium text-cyberpunk-blue group-hover:text-cyberpunk-blue/80 group-hover:underline underline-offset-4">
              View Case Study
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 