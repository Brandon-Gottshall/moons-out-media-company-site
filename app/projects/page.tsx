"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioHero from "@/components/projects/portfolio-hero";
import PortfolioGallery from "@/components/projects/portfolio-gallery";
import FeaturedProject from "@/components/projects/featured-project";
import CallToAction from "@/components/call-to-action";
import { Play } from "lucide-react";
import { allPortfolioItems } from "@/lib/placeholder-data/portfolio-items";
import { metaCategoriesData } from "@/lib/category-data";
import Link from "next/link";
import MetaCategorySwiper from "@/components/projects/meta-category-swiper";

const GALLERY_SECTION_ID = "project-gallery-section";

export default function PortfolioPage() {
  //   // const [isSearchActive, setIsSearchActive] = useState(false)

  // New state variables for two-tier filtering
  const [selectedMetaCategoryId, setSelectedMetaCategoryId] =
    useState<string>("all-projects");
  const [activeGalleryFilterId, setActiveGalleryFilterId] =
    useState<string>("all-projects");

  const featuredItemData = allPortfolioItems.find(
    (item) => item.status === "published"
  );

  // Filter handler without scrolling (for in-gallery clicks)
  const handleMetaCategorySelect = (metaId: string) => {
    setSelectedMetaCategoryId(metaId);
    setActiveGalleryFilterId(metaId);

    // COMMENTED OUT: Second tier filtering logic
    // if (metaId === "all-projects") {
    //   setActiveGalleryFilterId("all-projects")
    // } else {
    //   const meta = metaCategoriesData.find(m => m.id === metaId)
    //   if (meta && meta.subCategories.length > 0) {
    //     setActiveGalleryFilterId(meta.subCategories[0].id)
    //   } else {
    //     setActiveGalleryFilterId(metaId)
    //   }
    // }
  };

  // Updated to include scroll and to be used by Hero buttons as well
  // const handleMetaCategorySelectAndScroll = (metaId: string) => {
  //   // Apply filter
  //   handleMetaCategorySelect(metaId)
  //   // Then scroll to gallery (hero-triggered)
  //   setTimeout(() => {
  //     const galleryElement = window.document.getElementById(GALLERY_SECTION_ID)
  //     galleryElement?.scrollIntoView({ behavior: "smooth", block: "start" })
  //   }, 50)
  // };

  // DISABLED: Second tier filtering - SubCategory handler (no-op to satisfy interface)
  const handleSubCategorySelect = (subId: string) => {
    // No-op: Second tier filtering disabled
    // Original logic commented out:
    // setActiveGalleryFilterId(subId);
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
      {/* Portfolio Hero and conditional sections commented out for safekeeping       {/* Project Gallery Section - always mounted to enable scrolling on search open */}
      <motion.section
        key="project-gallery"
        id={GALLERY_SECTION_ID}
        className="transform-gpu relative z-0 h-auto"
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            {/* Top row: heading & description on left, filters on right */}
            <div className="sticky top-0 z-10 py-4 mt-24">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                {/* Left panel: title and description */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                  <AnimatePresence>
                    <motion.div
                      className="w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-4 neon-green-text">
                        Project Gallery
                      </h2>
                      <p className="text-white md:text-body-lg leading-relaxed">
                        Browse our complete collection of projects and discover the impact we've made.
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Right panel: filter controls */}
                <div className="w-full lg:flex-1">
                  <MetaCategorySwiper
                    isSearchActive={false}
                    metaCategories={metaCategoriesData}
                    selectedMetaCategoryId={selectedMetaCategoryId}
                    onMetaCategorySelect={handleMetaCategorySelect}
                  />
                </div>
              </div>
            </div>
            {/* Cards grid below */}
            <div className="my-8">
              <PortfolioGallery
                selectedMetaCategoryId={selectedMetaCategoryId}
                activeGalleryFilterId={activeGalleryFilterId}
                onMetaCategorySelect={handleMetaCategorySelect}
                onSubCategorySelect={handleSubCategorySelect}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action - always visible */}
      <CallToAction hideSecondaryButton />
    </div>
  );
}

/*
=== SAFEKEEPING - COMMENTED OUT HERO AND SEARCH LOGIC ===

The following code was commented out for safekeeping:
- Search state: const [isSearchActive, setIsSearchActive] = useState(false)
- handleMetaCategorySelectAndScroll function with scroll behavior
- PortfolioHero component with all its props and featured project logic
- AnimatePresence conditional section for Client Success Stories
- Conditional rendering based on isSearchActive state
- Dynamic className assignment for search state
- PortfolioGallery isSearchActive prop

This code can be restored if needed by uncommenting the relevant sections.
*/
