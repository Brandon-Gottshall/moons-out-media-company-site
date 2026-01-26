"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type Category = {
  id: number
  name: string
  description: string
  image: string
  projects: {
    id: number
    title: string
    client: string
    thumbnail: string
    videoUrl: string
  }[]
}

const categories: Category[] = [
  {
    id: 1,
    name: "Cinematography",
    description: "Cinematic authentic story telling content that tells authentic stories.",
    image: "/images/placeholder.svg?height=400&width=600",
    projects: [
      {
        id: 101,
        title: "The Artisan's Journey",
        client: "Handcrafted Co.",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 102,
        title: "Urban Explorers",
        client: "City Tourism Board",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 103,
        title: "Sustainable Future",
        client: "EcoTech Innovations",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
    ],
  },
  {
    id: 2,
    name: "Digital Marketing",
    description: "Targeted digital ad campaigns that drive measurable results.",
    image: "/images/placeholder.svg?height=400&width=600",
    projects: [
      {
        id: 201,
        title: "Conversion Catalyst",
        client: "TechStart Inc.",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 202,
        title: "Market Expansion",
        client: "Global Brands",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 203,
        title: "Product Launch",
        client: "Innovate Labs",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
    ],
  },
  {
    id: 3,
    name: "Social Campaigns",
    description: "Engaging social media content that builds community and drives engagement.",
    image: "/images/placeholder.svg?height=400&width=600",
    projects: [
      {
        id: 301,
        title: "Viral Challenge",
        client: "FitLife App",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 302,
        title: "Community Stories",
        client: "Neighborhood Connect",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 303,
        title: "Influencer Collaboration",
        client: "Fashion Forward",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
    ],
  },
  {
    id: 4,
    name: "Brand Storytelling",
    description: "Authentic narratives that connect with your audience on a deeper level.",
    image: "/images/placeholder.svg?height=400&width=600",
    projects: [
      {
        id: 401,
        title: "Origin Story",
        client: "Heritage Crafts",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 402,
        title: "Customer Journeys",
        client: "Life Solutions",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
      {
        id: 403,
        title: "Behind the Scenes",
        client: "Culinary Masters",
        thumbnail: "/images/placeholder.svg?height=300&width=500",
        videoUrl: "#",
      },
    ],
  },
]

export default function StoryWheel() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0])
  const [rotation, setRotation] = useState(0)
  const [isManualRotation, setIsManualRotation] = useState(false)
  const [selectedProject, setSelectedProject] = useState<null | {
    id: number
    title: string
    client: string
    thumbnail: string
    videoUrl: string
  }>(null)
  const [mounted, setMounted] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCategoryClick = (category: Category, index: number) => {
    setActiveCategory(category)
    const newRotation = -index * (360 / categories.length)
    setRotation(newRotation)
    setIsManualRotation(true)

    // Reset after 5 seconds
    setTimeout(() => {
      setIsManualRotation(false)
    }, 5000)
  }

  const handleProjectClick = (project: {
    id: number
    title: string
    client: string
    thumbnail: string
    videoUrl: string
  }) => {
    setSelectedProject(project)
  }

  useEffect(() => {
    if (!mounted) return

    if (!isManualRotation) {
      const interval = setInterval(() => {
        setRotation((prev) => prev - 90)
        const nextCategoryIndex = (categories.findIndex((c) => c.id === activeCategory.id) + 1) % categories.length
        setActiveCategory(categories[nextCategoryIndex])
      }, 8000)

      return () => clearInterval(interval)
    }
  }, [activeCategory, isManualRotation, mounted])

  if (!mounted) {
    return <div className="h-[700px] md:h-[800px]"></div> // Placeholder with same height
  }

  return (
    <div className="relative h-[700px] md:h-[800px]">
      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full bg-black/80 border-2 border-cyberpunk-blue z-20 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-body-lg md:text-heading-md font-heading text-white">Our Work</h3>
          <p className="text-label-base md:text-body-sm text-gray-400">Explore our universe</p>
        </div>
      </div>

      {/* Rotating Wheel */}
      <div
        ref={wheelRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[700px] md:h-[700px]"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {categories.map((category, index) => {
          const angle = (index * 360) / categories.length
          const radian = (angle * Math.PI) / 180
          const x = Math.cos(radian) * 250
          const y = Math.sin(radian) * 250

          return (
            <div
              key={category.id}
              className={cn(
                "absolute w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden cursor-pointer transition-all duration-300 border-2",
                activeCategory.id === category.id
                  ? "border-cyberpunk-blue shadow-[0_0_15px_rgba(var(--cp-blue-aqua-rgb), 0.7)]"
                  : "border-gray-700",
              )}
              style={{
                left: `calc(50% + ${x}px - 16px)`,
                top: `calc(50% + ${y}px - 16px)`,
                transform: `rotate(${-rotation}deg)`,
                transition:
                  "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onClick={() => handleCategoryClick(category, index)}
            >
              <div className="w-full h-full flex items-center justify-center bg-black/70">
                <p className="text-center text-body-sm md:text-body-base font-emphasis text-white">{category.name}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Category Content */}
      <motion.div
        key={activeCategory.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-cyberpunk-blue/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-heading mb-2 text-white">{activeCategory.name}</h3>
            <p className="text-gray-300 mb-4">{activeCategory.description}</p>
            <Button
              className="cyberpunk-button"
              onClick={() => router.push(`/portfolio?category=${activeCategory.id}`)}
            >
              View All Projects <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {activeCategory.projects.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden rounded-md cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                <img
                  src={project.thumbnail || "/images/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <p className="text-label-base text-white font-emphasis">{project.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative bg-cyberpunk-background border border-cyberpunk-blue/30 rounded-lg w-full max-w-4xl overflow-hidden">
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="aspect-video bg-black">
              <img
                src={selectedProject.thumbnail || "/images/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-heading mb-1 text-white">{selectedProject.title}</h3>
              <p className="text-cyberpunk-blue mb-4">Client: {selectedProject.client}</p>
              <p className="text-gray-300 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula.
              </p>
              <div className="flex justify-between items-center">
                <Button
                  className="cyberpunk-button"
                  onClick={() => router.push(`/projects/${selectedProject.id}`)}
                >
                  View Full Case Study
                </Button>
                <Button
                  variant="outline"
                  className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10"
                  onClick={() => router.push("/contact")}
                >
                  Start Your Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

