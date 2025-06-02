"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PortfolioItemCardProps {
  item: PortfolioItem
  index: number // For staggered animation
}

export function PortfolioItemCard({ item, index }: PortfolioItemCardProps) {
  const isPortrait = item.orientation === "portrait"
  const isSquare = item.orientation === "square"
  const isTall = item.orientation === "tall"
  const [imageError, setImageError] = useState(false)
  
  // Calculate padding-based aspect ratio - more generous for content
  const aspectPadding = isTall ? "177.78%" : // 9:16
                       isPortrait ? "85%" : // 5:4 (taller than 4:3)
                       isSquare ? "100%" : // 1:1
                       "110%" // Much taller for landscape cards with lots of content
  
  // Dynamic padding based on card height
  const contentPadding = isTall ? "p-8 pb-10" : "p-6 pb-8"
  
  // Dynamic line clamping based on card height
  const summaryClamp = isTall ? "line-clamp-4" : "line-clamp-3"
  
  return (
    <Link href={`/portfolio/${item.slug}`} className="block h-full group" aria-label={`View details for ${item.title}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative overflow-hidden rounded-lg border border-gray-800/70 group hover:border-cyberpunk-blue/50 transition-all duration-300 shadow-lg hover:shadow-cyberpunk-blue/20"
      >
        {/* Aspect ratio container */}
        <div className="relative w-full" style={{ paddingBottom: aspectPadding }}>
          {/* Background Image or Placeholder */}
          {!imageError && item.heroImage?.url ? (
            <Image
              src={item.heroImage.url}
              alt={item.heroImage.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Placeholder gradient background */
            <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-purple/30 via-cyberpunk-blue/20 to-cyberpunk-pink/30 transition-transform duration-500 group-hover:scale-105" />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
          
          {/* Content Overlay */}
          <div className={cn("absolute inset-0 flex flex-col justify-end", contentPadding)}>
            <h3 className="text-body-lg md:text-heading-md font-heading text-white mb-2 leading-tight break-words group-hover:text-cyberpunk-blue transition-colors">
              {item.title}
            </h3>
            
            <p className="text-body-sm text-cyberpunk-pink mb-3">Client: {item.clientName}</p>

            <p className={cn("text-gray-300 text-body-sm leading-relaxed mb-4", summaryClamp)}>
              {item.summary}
            </p>

            <div className="inline-flex items-center text-body-sm font-emphasis text-cyberpunk-blue group-hover:text-cyberpunk-blue/80 group-hover:underline underline-offset-4">
              View Project
              <ExternalLink className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
} 