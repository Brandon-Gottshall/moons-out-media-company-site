"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Filter } from "lucide-react"

type Project = {
  id: string
  title: string
  client: string
  category: string
  description: string
  image: string
  year: string
}

const projects: Project[] = [
  {
    id: "ecotech-documentary",
    title: "Sustainable Innovation Documentary",
    client: "EcoTech Innovations",
    category: "Documentary",
    description: "A documentary series showcasing revolutionary sustainable technologies and their real-world impact.",
    image: "/images/project1.png",
    year: "2023",
  },
  {
    id: "urban-fitness-campaign",
    title: "Fitness Transformation Campaign",
    client: "Urban Fitness",
    category: "Social Media",
    description: "A social media campaign featuring authentic customer transformation stories.",
    image: "/images/project2.png",
    year: "2022",
  },
  {
    id: "artisan-series",
    title: "Artisan Craftsmanship Series",
    client: "Artisan Collective",
    category: "Brand Storytelling",
    description: "A series of intimate artisan profiles showcasing craftsmanship and passion.",
    image: "/images/project3.png",
    year: "2022",
  },
  {
    id: "techstart-impact",
    title: "Tech Impact Stories",
    client: "TechStart Inc.",
    category: "Digital Marketing",
    description: "A campaign translating complex technology into relatable human stories.",
    image: "/images/project4.png",
    year: "2023",
  },
  {
    id: "global-brands-campaign",
    title: "Global Market Expansion",
    client: "Global Brands",
    category: "Digital Marketing",
    description: "A strategic digital campaign supporting international market expansion.",
    image: "/images/project5.png",
    year: "2021",
  },
  {
    id: "city-tourism-documentary",
    title: "Urban Explorers",
    client: "City Tourism Board",
    category: "Documentary",
    description: "A documentary series showcasing hidden gems and local stories from the city.",
    image: "/images/project6.png",
    year: "2022",
  },
]

type FilterOption = "All" | "Documentary" | "Digital Marketing" | "Social Media" | "Brand Storytelling"

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All")
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isSearchContext, setIsSearchContext] = useState(false)

  // Check if we're in search context by looking at URL params or parent state
  useEffect(() => {
    // This is a simplified check - in a real app, you'd use URL params or context
    const searchParams = new URLSearchParams(window.location.search)
    setIsSearchContext(searchParams.has("search") || window.location.hash === "#search")

    // Listen for custom events from parent components
    const handleSearchStateChange = (e: CustomEvent) => {
      setIsSearchContext(e.detail.isSearchActive)
    }

    window.addEventListener("searchStateChange" as any, handleSearchStateChange)
    return () => {
      window.removeEventListener("searchStateChange" as any, handleSearchStateChange)
    }
  }, [])

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

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
        {" "}
        {/* Added margin-top */}
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
              className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-gray-800 rounded-md overflow-hidden z-20"
            >
              {["All", "Documentary", "Digital Marketing", "Social Media", "Brand Storytelling"].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ backgroundColor: "rgba(0, 255, 255, 0.1)" }}
                  className={`w-full text-left px-6 py-4 text-base transition-all duration-200 ${
                    activeFilter === filter ? "bg-cyberpunk-purple/20 text-white" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setActiveFilter(filter as FilterOption)
                    setIsFilterMenuOpen(false)
                  }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`bg-black/60 backdrop-blur-sm border rounded-lg overflow-hidden group transition-all duration-300 ${
                hoveredProject === project.id
                  ? "border-cyberpunk-blue/70 shadow-glow-blue transform scale-[1.02]"
                  : "border-gray-800 hover:border-cyberpunk-blue/50"
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredProject === project.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    className="cyberpunk-button scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 py-6 px-8 text-base shadow-glow-blue"
                    onClick={() => (window.location.href = `/portfolio/${project.id}`)}
                  >
                    View Project
                  </Button>
                </motion.div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-md text-sm text-white">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-black/50 text-cyberpunk-blue">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-base text-cyberpunk-pink mb-3">Client: {project.client}</p>
                <p className="text-base text-white leading-relaxed line-clamp-2 mb-6">{project.description}</p>

                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-cyberpunk-blue hover:bg-cyberpunk-blue/10 p-0 h-auto group"
                    onClick={() => (window.location.href = `/portfolio/${project.id}`)}
                  >
                    <span className="flex items-center text-base">
                      View Case Study
                      <motion.div
                        animate={{
                          x: hoveredProject === project.id ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button - Hide when in search context */}
      {!isSearchContext && (
        <div className="mt-12 text-center">
          <Button
            className="cyberpunk-button py-6 px-10 text-base relative overflow-hidden group"
            onClick={() => console.log("Load more projects")}
          >
            <span className="relative z-10">Load More Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/0 via-cyberpunk-blue/30 to-cyberpunk-blue/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </Button>
        </div>
      )}
    </motion.div>
  )
}

