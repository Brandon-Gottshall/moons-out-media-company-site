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
        className="bg-black/70 border border-gray-800/70 rounded-lg overflow-hidden flex flex-col group hover:border-cyberpunk-blue/50 transition-all duration-300 shadow-lg hover:shadow-cyberpunk-blue/20 h-full"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <Image
            src={item.heroImage.url}
            alt={item.heroImage.alt}
            width={600}
            height={338}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyberpunk-blue transition-colors">
            {item.title}
          </h3>
          
          <p className="text-sm text-cyberpunk-pink mb-3">Client: {item.clientName}</p>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {item.summary}
          </p>

          <div className="mt-auto">
            <div className="inline-flex items-center text-sm font-medium text-cyberpunk-blue group-hover:text-cyberpunk-blue/80 group-hover:underline underline-offset-4">
              View Project
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 