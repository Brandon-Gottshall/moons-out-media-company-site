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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-800 hover:border-cyberpunk-blue/70 hover:shadow-glow-blue transition-all duration-300 bg-black/60 backdrop-blur-sm"
    >
      <Link href={`/portfolio/${item.slug}`} className="block aspect-video overflow-hidden">
        <Image
          src={item.heroImage.url}
          alt={item.heroImage.alt}
          width={600} // Provide appropriate dimensions
          height={338}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

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
          <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
        </h3>
        
        <p className="text-sm text-cyberpunk-pink mb-3">Client: {item.clientName}</p>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
          {item.summary}
        </p>

        <div className="mt-auto">
          <Link
            href={`/portfolio/${item.slug}`}
            className="inline-flex items-center text-sm font-medium text-cyberpunk-blue hover:text-cyberpunk-blue/80 group-hover:underline underline-offset-4"
          >
            View Case Study
            <ExternalLink className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
} 