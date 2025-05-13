"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

type Category = {
  id: string
  title: string
  description: string
  image: string
  projectCount: number
  color: string
}

const categories: Category[] = [
  {
    id: "documentary",
    title: "Narrative Driven",
    description:
      "Cinematic authentic story telling content that tells authentic stories and captures the essence of your brand.",
    image: "/images/documentary.png",
    projectCount: 12,
    color: "cyberpunk-blue",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Campaigns",
    description: "Targeted digital campaigns that combine compelling storytelling with data-driven strategies.",
    image: "/images/digital-marketing.png",
    projectCount: 18,
    color: "cyberpunk-pink",
  },
  {
    id: "social-media",
    title: "Social Media Content",
    description: "Engaging social media content that builds community and drives consistent engagement.",
    image: "/images/social-media.png",
    projectCount: 24,
    color: "cyberpunk-green",
  },
  {
    id: "brand-storytelling",
    title: "Brand Storytelling",
    description: "Authentic narratives that communicate your brand's values and connect with your audience.",
    image: "/images/brand-storytelling.png",
    projectCount: 15,
    color: "cyberpunk-purple-light",
  },
]

export default function PortfolioCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          id={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-lg border border-gray-800 group"
          onMouseEnter={() => setHoveredCategory(category.id)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className="absolute inset-0 z-0">
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent`}></div>
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-${category.color}`}
            ></div>
          </div>

          <div className="relative z-10 p-8 md:p-10 h-full flex flex-col min-h-[320px]">
            <div className="mb-auto">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium bg-${category.color}/20 text-${category.color} mb-3`}
              >
                {category.projectCount} Projects
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{category.title}</h3>
              <p className="text-white text-lg leading-relaxed mb-8">{category.description}</p>
            </div>

            <Button
              className={`w-full bg-${category.color} hover:bg-${category.color}/80 text-white py-6 text-base`}
              onClick={() => (window.location.href = `/portfolio/category/${category.id}`)}
            >
              Explore {category.title} <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

