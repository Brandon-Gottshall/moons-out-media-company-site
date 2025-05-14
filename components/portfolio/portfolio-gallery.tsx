"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { allPortfolioItems, type PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { PortfolioItemCard } from "@/components/portfolio/portfolio-item-card"
import MetaCategorySwiper from "./meta-category-swiper"
import SubCategorySwiper from "./sub-category-swiper"
import { metaCategoriesData } from "@/lib/category-data"

interface PortfolioGalleryProps {
  selectedMetaCategoryId: string;
  activeGalleryFilterId: string;
  onMetaCategorySelect: (metaId: string) => void;
  onSubCategorySelect: (subId: string) => void;
}

export default function PortfolioGallery({ 
  selectedMetaCategoryId,
  activeGalleryFilterId,
  onMetaCategorySelect,
  onSubCategorySelect
}: PortfolioGalleryProps) {
  const [isSearchContext, setIsSearchContext] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setIsSearchContext(searchParams.has("search") || window.location.hash === "#search")

    const handleSearchStateChange = (e: CustomEvent) => {
      setIsSearchContext(e.detail.isSearchActive)
    }

    window.addEventListener("searchStateChange" as any, handleSearchStateChange)
    return () => {
      window.removeEventListener("searchStateChange" as any, handleSearchStateChange)
    }
  }, [])

  const currentSelectedMeta = useMemo(() => 
    metaCategoriesData.find(meta => meta.id === selectedMetaCategoryId)
  , [selectedMetaCategoryId]);

  const filteredItems = useMemo(() => {
    if (selectedMetaCategoryId === "all-projects") {
      return allPortfolioItems.filter(item => item.status === 'published');
    }

    const isMetaAllSubCategorySelected = currentSelectedMeta?.subCategories.find(
      sub => sub.id === activeGalleryFilterId && sub.isMetaAll
    );

    if (isMetaAllSubCategorySelected) {
      return allPortfolioItems.filter(item => 
        item.status === 'published' && 
        item.metaCategory === selectedMetaCategoryId
      );
    } else {
      return allPortfolioItems.filter(item => 
        item.status === 'published' && 
        item.subCategory === activeGalleryFilterId
      );
    }
  }, [activeGalleryFilterId, selectedMetaCategoryId, currentSelectedMeta]);

  return (
    <motion.div
      className="max-w-6xl mx-auto"
    >
      <div className="mb-1 md:mb-2">
        <MetaCategorySwiper 
          metaCategories={metaCategoriesData}
          selectedMetaCategoryId={selectedMetaCategoryId}
          onMetaCategorySelect={onMetaCategorySelect}
        />
      </div>

      <AnimatePresence initial={false}> 
        {currentSelectedMeta && !currentSelectedMeta.isGlobalAll && currentSelectedMeta.subCategories.length > 0 && (
          <SubCategorySwiper 
            subCategories={currentSelectedMeta.subCategories}
            activeGalleryFilterId={activeGalleryFilterId}
            onSubCategorySelect={onSubCategorySelect}
            metaCategoryColor={currentSelectedMeta.color}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <PortfolioItemCard key={item.slug} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && activeGalleryFilterId !== "all-projects" && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No projects found for the current filter.</p>
          <Button 
            variant="ghost" 
            onClick={() => onMetaCategorySelect("all-projects")} 
            className="text-cyberpunk-blue mt-2"
          >
            Show all projects
          </Button>
        </div>
      )}

      {!isSearchContext && (
        <div className="mt-12 text-center">
          <Button
            className="cyberpunk-button py-6 px-10 text-base relative overflow-hidden group disabled:opacity-50"
            onClick={() => console.log("Load more projects - (Placeholder: currently shows all published)")}
            disabled={true} 
          >
            <span className="relative z-10">Load More Projects (Placeholder)</span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

