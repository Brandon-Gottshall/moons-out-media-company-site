"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"
import Link from "next/link"

interface FeaturedProjectProps {
  hideDescription?: boolean;
  customImageOverlay?: React.ReactNode;
  slug: string;
  isCardLinkDisabled?: boolean;
  isHeroCompact?: boolean;
}

export default function FeaturedProject({ 
  hideDescription = false,
  customImageOverlay,
  slug,
  isCardLinkDisabled = false,
  isHeroCompact = false
}: FeaturedProjectProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleOverlayInteraction = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      e.stopPropagation();
    }
  };

  // Create a compact layout for the hero section
  if (isHeroCompact) {
    return (
      <div className="w-full h-full relative group overflow-hidden rounded-lg">
        {/* Thumbnail with play button */}
        <div className="w-full h-full relative">
          <img
            src="/images/project1.webp"
            alt="Featured project image" 
            width={1200}
            height={675}
            className="w-full h-full object-cover rounded-lg shadow-2xl group-hover:shadow-[0_0_30px_theme(colors.cyberpunk.blue)] transition-all duration-300"
          />
          {customImageOverlay}
        </div>
        
        {/* Project and company name - always visible */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 z-10">
          <h3 className="text-sm font-bold text-white leading-tight">Sustainable Innovation</h3>
          <p className="text-xs text-cyberpunk-blue">EcoTech Innovations</p>
        </div>
        
        {/* Description drawer - visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <p className="text-xs text-white">
            Our latest and most impactful storytelling work. This documentary series showcases revolutionary
            sustainable technologies and their real-world impact.
          </p>
        </div>
      </div>
    );
  }

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-black/20 backdrop-blur-sm border border-cyberpunk-blue/30 rounded-lg overflow-hidden transition-all duration-300 ${!isCardLinkDisabled ? 'group-hover:shadow-cyberpunk-blue/40 group-hover:shadow-lg hover:border-cyberpunk-blue/60 cursor-pointer' : ''}`}
    >
      <div className="relative rounded-lg overflow-hidden aspect-video" onClick={customImageOverlay ? handleOverlayInteraction : undefined}>
        <img
          src="/images/project1.webp"
          alt="Featured project image"
          width={1200}
          height={675}
          className="w-full h-full object-cover rounded-lg shadow-2xl group-hover:shadow-[0_0_30px_theme(colors.cyberpunk.pink)] transition-all duration-300"
        />
        {customImageOverlay || (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
            <button
              onClick={(e) => { 
                if (!isCardLinkDisabled) e.stopPropagation();
                setIsVideoModalOpen(true); 
              }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cyberpunk-blue/20 backdrop-blur-sm border border-cyberpunk-blue flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Play video"
            >
              <Play className="h-10 w-10 md:h-12 md:w-12 text-white fill-white" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-cyberpunk-blue/20 text-cyberpunk-blue mb-2">
              Documentary Series
            </span>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 whitespace-nowrap overflow-hidden text-overflow-ellipsis leading-tight">
              Sustainable Innovation Documentary
            </h3>
            <p className="text-cyberpunk-pink text-base">Client: EcoTech Innovations</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-black/50 rounded-md text-sm text-white">4K</span>
            <span className="px-3 py-1 bg-black/50 rounded-md text-sm text-white">5-Part Series</span>
            <span className="px-3 py-1 bg-black/50 rounded-md text-sm text-white">2023</span>
          </div>
        </div>

        {!hideDescription && (
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg mb-8">
            <p className="text-white text-lg leading-relaxed">
              A documentary series showcasing EcoTech's revolutionary sustainable technologies and their real-world
              impact on communities and the environment. This project combined cinematic storytelling with data-driven
              insights to create compelling content that resonated with both consumers and investors.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-black/50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-white mb-0">87%</p>
            <p className="text-sm text-white mb-0">Brand Awareness</p>
            <p className="text-xs text-cyberpunk-green">+42%</p>
          </div>
          <div className="bg-black/50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-white mb-0">$12M</p>
            <p className="text-sm text-white mb-0">Investor Interest</p>
            <p className="text-xs text-cyberpunk-green">+156%</p>
          </div>
          <div className="bg-black/50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-white mb-0">14</p>
            <p className="text-sm text-white mb-0">New Partnerships</p>
            <p className="text-xs text-cyberpunk-green">+250%</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="cyberpunk-button py-3 text-sm"
            onClick={(e) => { 
              if (!isCardLinkDisabled) e.stopPropagation();
              window.location.href = "/portfolio/ecotech-documentary"; 
            }}
          >
            View Full Project <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 p-3 text-sm"
            onClick={(e) => { 
              if (!isCardLinkDisabled) e.stopPropagation();
              window.location.href = "/contact"; 
            }}
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return isCardLinkDisabled ? (
    <div className="w-full max-w-6xl">{cardContent}</div>
  ) : (
    <Link href={`/portfolio/${slug}`} className="block group w-full max-w-6xl" aria-label={`View details for project ${slug}`}>
      {cardContent}
    </Link>
  );
}

