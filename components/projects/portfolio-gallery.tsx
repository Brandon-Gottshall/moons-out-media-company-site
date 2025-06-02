"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { allPortfolioItems, type PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { PortfolioItemCard } from "@/components/projects/portfolio-item-card"

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
  const [pageSize, setPageSize] = useState(6);
  const [itemsToShow, setItemsToShow] = useState(pageSize)

  useEffect(() => {
    const calculatePageSize = () => {
      const width = window.innerWidth;
      let numColumns = 1;
      if (width >= 1280) { // xl
        numColumns = 4;
      } else if (width >= 1024) { // lg
        numColumns = 3;
      } else if (width >= 768) { // md
        numColumns = 2;
      }
      return numColumns * 2; // Load 2 rows
    };

    const newPageSize = calculatePageSize();
    setPageSize(newPageSize);
    setItemsToShow(newPageSize);

    const handleResize = () => {
      const updatedPageSize = calculatePageSize();
      setPageSize(updatedPageSize);
      setItemsToShow(updatedPageSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = useMemo(
    () => allPortfolioItems.filter(item => 
      item.status === 'published' &&
      (selectedMetaCategoryId === 'all-projects' || item.metaCategory === selectedMetaCategoryId)
    ),
    [selectedMetaCategoryId]
  )

  useEffect(() => {
    setItemsToShow(pageSize)
  }, [filteredItems, pageSize])

  const displayedItems = useMemo(
    () => filteredItems.slice(0, itemsToShow),
    [filteredItems, itemsToShow]
  )

  return (
    <motion.div
      className="w-full"
    >

      <div className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-4 md:mt-6`}>
        <AnimatePresence>
          {displayedItems.map((item, index) => (
            <PortfolioItemCard key={item.slug} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && selectedMetaCategoryId !== "all-projects" && (
        <div className="text-center py-12">
          <p className="text-heading-md text-gray-400">No projects found for the current filter.</p>
          <Button 
            variant="ghost" 
            onClick={() => onMetaCategorySelect("all-projects")} 
            className="text-cyberpunk-blue mt-2"
          >
            Show all projects
          </Button>
        </div>
      )}

      {displayedItems.length < filteredItems.length && (
        <div className="mt-12 text-center">
          <Button
            className="cyberpunk-button py-6 px-10  relative overflow-hidden group"
            onClick={() => setItemsToShow(prev => Math.min(prev + pageSize, filteredItems.length))}
          >
            <span className="relative z-10">Load More Projects</span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

