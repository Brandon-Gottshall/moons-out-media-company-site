"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PortfolioHero from "@/components/projects/portfolio-hero"
import PortfolioGallery from "@/components/projects/portfolio-gallery"
import FeaturedProject from "@/components/projects/featured-project"
import CallToAction from "@/components/call-to-action"
import { Play } from "lucide-react"
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items"
import { metaCategoriesData } from "@/lib/category-data"
import Link from "next/link"

const GALLERY_SECTION_ID = "project-gallery-section";

export default function PortfolioPage() {
  const [isSearchActive, setIsSearchActive] = useState(false)

  // New state variables for two-tier filtering
  const [selectedMetaCategoryId, setSelectedMetaCategoryId] = useState<string>("all-projects")
  const [activeGalleryFilterId, setActiveGalleryFilterId] = useState<string>("all-projects")

  const featuredItemData = allPortfolioItems.find(item => item.status === 'published')

  // Filter handler without scrolling (for in-gallery clicks)
  const handleMetaCategorySelect = (metaId: string) => {
    setSelectedMetaCategoryId(metaId)
    if (metaId === "all-projects") {
      setActiveGalleryFilterId("all-projects")
    } else {
      const meta = metaCategoriesData.find(m => m.id === metaId)
      if (meta && meta.subCategories.length > 0) {
        setActiveGalleryFilterId(meta.subCategories[0].id)
      } else {
        setActiveGalleryFilterId(metaId)
      }
    }
  }

  // Updated to include scroll and to be used by Hero buttons as well
  const handleMetaCategorySelectAndScroll = (metaId: string) => {
    // Apply filter
    handleMetaCategorySelect(metaId)
    // Then scroll to gallery (hero-triggered)
    setTimeout(() => {
      const galleryElement = window.document.getElementById(GALLERY_SECTION_ID)
      galleryElement?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  };

  // This handler is specifically for the SubCategorySwiper INSIDE PortfolioGallery
  const handleSubCategorySelect = (subId: string) => {
    setActiveGalleryFilterId(subId);
    // Optional: could also scroll here if changing sub-category should re-focus the gallery
    // setTimeout(() => { document.getElementById(GALLERY_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 50);
  };

  // Effect to handle initial load with potential query params for filtering (optional future enhancement)
  useEffect(() => {
    // Example: if URL is /portfolio?meta=creative-narrative-driven&sub=documentary
    // const params = new URLSearchParams(window.location.search);
    // const initialMeta = params.get("meta");
    // const initialSub = params.get("sub");
    // if (initialMeta) {
    //   handleMetaCategorySelect(initialMeta);
    //   if (initialSub) {
    //     // Need to ensure meta-category is set first, then sub, potentially with a slight delay or combined logic
    //     setActiveGalleryFilterId(initialSub);
    //   }
    // }
  }, []);

  return (
    <div className="min-h-screen">
      <PortfolioHero
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        selectedMetaCategoryId={selectedMetaCategoryId}
        featuredProject={
          featuredItemData ? (
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <FeaturedProject 
                slug={featuredItemData.slug}
                hideDescription={true}
                isCardLinkDisabled={true}
                isHeroCompact={true}
                customImageOverlay={
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Link 
                      href={`/project/${featuredItemData.slug}?play=true`} 
                      aria-label={`Play video for ${featuredItemData.title}`}
                      className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/60 flex items-center justify-center transition-transform hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play className="h-5 w-5 text-white fill-white" />
                    </Link>
                  </div>
                }
              />
            </div>
          ) : null
        }
        metaCategories={metaCategoriesData}
        onHeroMetaButtonSelect={handleMetaCategorySelectAndScroll}
        gallerySectionId={GALLERY_SECTION_ID}
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
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 neon-text">Client Success Projects</h2>
                  <p className="text-white max-w-2xl mx-auto  md:text-body-lg leading-relaxed">
                    See how our projects have transformed businesses and delivered measurable results.
                  </p>
                </div>

                <ClientSuccessTimeline />
              </div>
            </motion.section> */}
          </>
        )}
      </AnimatePresence>

      {/* Project Gallery Section - always mounted to enable scrolling on search open */}
      <motion.section
        key="project-gallery"
        id={GALLERY_SECTION_ID}
        className="transform-gpu pb-20 md:pb-28 relative z-0 pt-6 md:pt-10"
        initial={{ y: '-100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="w-full px-4">
          <AnimatePresence>
            <motion.div
              className={`text-center ${isSearchActive ? 'mb-4 md:mb-6' : 'mb-8 md:mb-10'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 neon-green-text">Project Gallery</h2>
              { !isSearchActive && (
                <p className="text-white max-w-2xl mx-auto  md:text-body-lg leading-relaxed">
                  Browse our complete collection of projects and discover the impact we've made.
                </p>
              ) }
            </motion.div>
          </AnimatePresence>

          <PortfolioGallery
            isSearchActive={isSearchActive}
            selectedMetaCategoryId={selectedMetaCategoryId}
            activeGalleryFilterId={activeGalleryFilterId}
            onMetaCategorySelect={handleMetaCategorySelect}
            onSubCategorySelect={handleSubCategorySelect}
          />
        </div>
      </motion.section>

      {/* Call to Action - always visible */}
      <CallToAction />
    </div>
  )
}

