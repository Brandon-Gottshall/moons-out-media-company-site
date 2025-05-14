"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PortfolioHero from "@/components/portfolio/portfolio-hero"
import PortfolioGallery from "@/components/portfolio/portfolio-gallery"
import FeaturedProject from "@/components/portfolio/featured-project"
import ClientSuccessTimeline from "@/components/client-success-timeline"
import CallToAction from "@/components/call-to-action"
import { Play } from "lucide-react"
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items"
import Link from "next/link"

export default function PortfolioPage() {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>("all")

  // Find the first published portfolio item to feature
  const featuredItemData = allPortfolioItems.find(item => item.status === 'published')

  const handleGalleryFilterChange = (filter: string) => {
    setActiveGalleryFilter(filter)
  }

  return (
    <div className="min-h-screen">
      <PortfolioHero
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        featuredProject={
          featuredItemData ? (
            <div className="relative max-h-[65vh]">
              <div className="flex flex-col justify-between items-center mb-1">
                <h2 className="text-lg font-bold neon-text">Featured Project</h2>
              </div>
              <div className="origin-top-left -mt-1 overflow-hidden rounded-lg border-2 max-w-6xl border-cyberpunk-blue/30">
                <div className="relative">
                  <FeaturedProject 
                    slug={featuredItemData.slug}
                    hideDescription={true}
                    isCardLinkDisabled={true}
                    customImageOverlay={
                      <div className="absolute inset-0 z-10 bg-black bg-opacity-[10%] backdrop-blur-xxsm flex flex-col items-center justify-center p-4">
                        <div className="p-6 pb-6 max-w-md text-center">
                          <p className="text-white text-sm md:text-base">
                            Our latest and most impactful storytelling work. This documentary series showcases revolutionary
                            sustainable technologies and their real-world impact.
                          </p>
                        </div>
                        <Link 
                          href={`/portfolio/${featuredItemData.slug}?play=true`} 
                          aria-label={`Play video for ${featuredItemData.title}`}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyberpunk-blue/20 backdrop-blur-sm border border-cyberpunk-blue flex items-center justify-center transition-transform hover:scale-110"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="h-8 w-8 md:h-10 md:w-10 text-white fill-white" />
                        </Link>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          ) : null
        }
      />

      {/* Conditional sections - only visible when search is not active */}
      <AnimatePresence>
        {!isSearchActive && (
          <>
            {/* Client Success Stories Section */}
            {/* <motion.section
              className="py-20 md:py-28 bg-gradient-to-b from-black/50 to-cyberpunk-background"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text">Client Success Stories</h2>
                  <p className="text-white max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                    See how our work has transformed businesses and delivered measurable results.
                  </p>
                </div>

                <ClientSuccessTimeline />
              </div>
            </motion.section> */}
          </>
        )}
      </AnimatePresence>

      {/* Project Gallery Section - Now contains PortfolioCategories */}
      <motion.section
        className="pb-20 md:pb-28 relative z-0"
        animate={{
          paddingTop: isSearchActive ? "2rem" : "6rem",
          paddingBottom: isSearchActive ? "5rem" : "7rem",
          y: isSearchActive ? "0" : 0,
          marginTop: isSearchActive ? "0" : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <AnimatePresence>
            {!isSearchActive && (
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-green-text">Project Gallery</h2>
                <p className="text-white max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                  Browse our complete collection of projects and discover the stories we've helped tell.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <PortfolioGallery
            currentFilter={activeGalleryFilter}
            onFilterChange={handleGalleryFilterChange}
          />
        </div>
      </motion.section>

      {/* Call to Action - always visible */}
      <CallToAction />
    </div>
  )
}

