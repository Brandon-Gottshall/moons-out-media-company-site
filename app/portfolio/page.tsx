"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PortfolioHero from "@/components/portfolio/portfolio-hero"
import PortfolioGallery from "@/components/portfolio/portfolio-gallery"
import PortfolioCategories from "@/components/portfolio/portfolio-categories"
import FeaturedProject from "@/components/portfolio/featured-project"
import ClientSuccessTimeline from "@/components/client-success-timeline"
import CallToAction from "@/components/call-to-action"

export default function PortfolioPage() {
  const [isSearchActive, setIsSearchActive] = useState(false)

  return (
    <div className="min-h-screen">
      <PortfolioHero
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        featuredProject={
          <div className="w-full lg:w-[110%] -mr-[10%] relative">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-bold neon-text">Featured Project</h2>
            </div>
            <div className="transform scale-95 origin-top-left -mt-1 overflow-hidden rounded-lg border-2 border-cyberpunk-blue/30">
              <div className="relative">
                {/* Position the overlay to cover ONLY the video thumbnail area with a small inset to avoid border intersection */}
                <div className="absolute top-[2px] left-[2px] right-[2px] aspect-video z-10 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="p-6 max-w-md text-center">
                    <p className="text-white text-sm md:text-base">
                      Our latest and most impactful storytelling work. This documentary series showcases revolutionary
                      sustainable technologies and their real-world impact.
                    </p>
                    <div className="mt-4 inline-block px-4 py-2 bg-cyberpunk-blue/20 text-cyberpunk-blue rounded-md text-sm">
                      Click to play
                    </div>
                  </div>
                </div>
                <FeaturedProject hideDescription={true} />
              </div>
            </div>
          </div>
        }
      />

      {/* Conditional sections - only visible when search is not active */}
      <AnimatePresence>
        {!isSearchActive && (
          <>
            {/* Project Categories Section */}
            <motion.section
              className="py-20 md:py-28 bg-gradient-to-b from-black/50 to-cyberpunk-background"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-pink-text">Project Categories</h2>
                  <p className="text-white max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                    Explore our work by category to find the perfect match for your brand's needs.
                  </p>
                </div>

                <PortfolioCategories />
              </div>
            </motion.section>

            {/* Client Success Stories Section */}
            <motion.section
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
            </motion.section>
          </>
        )}
      </AnimatePresence>

      {/* Project Gallery Section - Always visible but slides up when search is active */}
      <motion.section
        className="pb-20 md:pb-28 relative z-0" // Lower z-index than the search form
        animate={{
          paddingTop: isSearchActive ? "2rem" : "6rem", // Adjust padding when search is active
          paddingBottom: isSearchActive ? "5rem" : "7rem",
          y: isSearchActive ? "0" : 0, // Don't move the content up
          marginTop: isSearchActive ? "0" : 0, // No negative margin
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

          <PortfolioGallery />
        </div>
      </motion.section>

      {/* Call to Action - always visible */}
      <CallToAction />
    </div>
  )
}

