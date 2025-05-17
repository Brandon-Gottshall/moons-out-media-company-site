"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { allPortfolioItems, type PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { PortfolioItemCard } from "@/components/projects/portfolio-item-card"
import MetaCategorySwiper from "./meta-category-swiper"
import SubCategorySwiper from "./sub-category-swiper"
import { metaCategoriesData } from "@/lib/category-data"

interface PortfolioGalleryProps {
  selectedMetaCategoryId: string;
  activeGalleryFilterId: string;
  onMetaCategorySelect: (metaId: string) => void;
  onSubCategorySelect: (subId: string) => void;
  isSearchActive: boolean;
}

export default function PortfolioGallery({ 
  selectedMetaCategoryId,
  activeGalleryFilterId,
  onMetaCategorySelect,
  onSubCategorySelect,
  isSearchActive
}: PortfolioGalleryProps) {
  const PAGE_SIZE = 6
  const [itemsToShow, setItemsToShow] = useState(PAGE_SIZE)
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

  useEffect(() => {
    setItemsToShow(PAGE_SIZE)
  }, [filteredItems])

  const displayedItems = useMemo(
    () => filteredItems.slice(0, itemsToShow),
    [filteredItems, itemsToShow]
  )

  return (
    <motion.div
      className="w-full"
    >
      {/* Meta-category swiper */}
      <div className="mb-1 md:mb-2">
        <MetaCategorySwiper 
          isSearchActive={isSearchActive}
          metaCategories={metaCategoriesData}
          selectedMetaCategoryId={selectedMetaCategoryId}
          onMetaCategorySelect={onMetaCategorySelect}
        />
      </div>

      {/* Sub-category swiper */}
      <AnimatePresence initial={false}>
        {currentSelectedMeta && !currentSelectedMeta.isGlobalAll && currentSelectedMeta.subCategories.length > 0 && (
          <div className={`${isSearchActive ? 'mt-1 mb-2' : 'mt-2 mb-4'}`}>
            <SubCategorySwiper 
              isSearchActive={isSearchActive}
              subCategories={currentSelectedMeta.subCategories}
              activeGalleryFilterId={activeGalleryFilterId}
              onSubCategorySelect={onSubCategorySelect}
              metaCategoryColor={currentSelectedMeta.color}
            />
          </div>
        )}
      </AnimatePresence>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isSearchActive ? 'mt-2 md:mt-3' : 'mt-4 md:mt-6'}`}>
        <AnimatePresence>
          {displayedItems.map((item, index) => (
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

      {!isSearchContext && displayedItems.length < filteredItems.length && (
        <div className="mt-12 text-center">
          <Button
            className="cyberpunk-button py-6 px-10 text-base relative overflow-hidden group"
            onClick={() => setItemsToShow(prev => Math.min(prev + PAGE_SIZE, filteredItems.length))}
          >
            <span className="relative z-10">Load More Projects</span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

