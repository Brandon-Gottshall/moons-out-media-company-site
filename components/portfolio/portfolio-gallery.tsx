"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { allPortfolioItems, type PortfolioItem } from "@/lib/placeholder-data/portfolio-items"
import { PortfolioItemCard } from "@/components/portfolio/portfolio-item-card"

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isSearchContext, setIsSearchContext] = useState(false)

  // Generate filter options from the tags in allPortfolioItems
  const filterOptions = useMemo(() => {
    const allTags = new Set<string>()
    allPortfolioItems.forEach(item => {
      item.tags?.forEach(tag => allTags.add(tag))
    })
    return ["All", ...Array.from(allTags).sort()]
  }, [])

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
    activeFilter === "All"
      ? allPortfolioItems.filter(item => item.status === 'published') // Only show published items
      : allPortfolioItems.filter(
          (item) => item.status === 'published' && item.tags?.includes(activeFilter)
        )
  , [activeFilter])

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      animate={{
        scale: isSearchContext ? 1 : 1,
        y: isSearchContext ? 0 : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter Controls */}
      <div className="mb-8 mt-8">
        {/* Mobile Filter */}
        <div className="md:hidden relative mb-6">
          <Button
            className="w-full flex justify-between items-center bg-black/60 border border-gray-700 text-white py-6 text-base hover:border-cyberpunk-blue/50 transition-all duration-300"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <span>Filter: {activeFilter}</span>
            <Filter className="h-5 w-5" />
          </Button>

          {isFilterMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-gray-800 rounded-md overflow-hidden z-20 shadow-lg"
            >
              {filterOptions.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ backgroundColor: "rgba(0, 255, 255, 0.1)" }}
                  className={`w-full text-left px-6 py-4 text-base transition-all duration-200 ${
                    activeFilter === filter ? "bg-cyberpunk-purple/20 text-white" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setActiveFilter(filter)
                    setIsFilterMenuOpen(false)
                  }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Desktop Filter - You might want to add a similar one if needed */}
        <div className="hidden md:flex flex-wrap gap-2 mb-6 justify-center">
          {filterOptions.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`${activeFilter === filter ? 'bg-cyberpunk-blue text-black hover:bg-cyberpunk-blue/80' : 'border-gray-700 text-gray-300 hover:border-cyberpunk-blue/50 hover:text-white'} transition-all`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <PortfolioItemCard key={item.slug} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && activeFilter !== "All" && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No projects found for the filter "{activeFilter}".</p>
          <Button variant="ghost" onClick={() => setActiveFilter("All")} className="text-cyberpunk-blue mt-2">
            Show all projects
          </Button>
        </div>
      )}

      {/* Load More Button - Hide when in search context */}
      {/* This might need adjustment if pagination is implemented based on allPortfolioItems */}
      {!isSearchContext && (
        <div className="mt-12 text-center">
          <Button
            className="cyberpunk-button py-6 px-10 text-base relative overflow-hidden group disabled:opacity-50"
            onClick={() => console.log("Load more projects - (Placeholder: currently shows all published)")}
            // Consider disabling if all items are shown, or implement actual pagination
            disabled={true} 
          >
            <span className="relative z-10">Load More Projects (Placeholder)</span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

