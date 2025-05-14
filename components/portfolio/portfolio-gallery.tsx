"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { allPortfolioItems, type PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { PortfolioItemCard } from "@/components/portfolio/portfolio-item-card"
import PortfolioCategories from "@/components/portfolio/portfolio-categories"

interface PortfolioGalleryProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PortfolioGallery({ 
  currentFilter, 
  onFilterChange 
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

  const filteredItems = useMemo(() => 
    currentFilter === "All"
      ? allPortfolioItems.filter(item => item.status === 'published')
      : allPortfolioItems.filter(
          (item) => item.status === 'published' && item.category === currentFilter
        )
  , [currentFilter])

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      animate={{
        scale: isSearchContext ? 1 : 1,
        y: isSearchContext ? 0 : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 md:mb-12">
        <PortfolioCategories 
          activeFilter={currentFilter} 
          onFilterChange={onFilterChange} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <PortfolioItemCard key={item.slug} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && currentFilter !== "All" && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No projects found for the filter "{currentFilter}".</p>
          <Button variant="ghost" onClick={() => onFilterChange("All")} className="text-cyberpunk-blue mt-2">
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

