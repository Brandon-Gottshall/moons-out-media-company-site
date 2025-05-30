"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink } from "lucide-react"

type Project = {
  id: number
  title: string
  client: string
  category: string
  description: string
  image: string
  results: string[]
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sustainable Innovation Doc (Debug: Full Results)",
    client: "EcoTech Innovations",
    category: "Documentary",
    description:
      "A documentary series showcasing EcoTech's revolutionary sustainable technologies and their real-world impact on communities and the environment.",
    image: "/images/placeholder.svg?height=500&width=800",
    results: ["87% increase in brand awareness", "$12M in new investor interest", "14 new strategic partnerships"],
    link: "/projects/ecotech-documentary",
  },
  {
    id: 2,
    title: "Fitness Campaign (Debug: Minimal Results)",
    client: "Urban Fitness",
    category: "Social Campaign",
    description:
      "A social media campaign featuring authentic customer transformation stories that resonated deeply with the target audience and drove membership growth. This version has fewer result items for debugging.",
    image: "/images/placeholder.svg?height=500&width=800",
    results: ["73% increase in new memberships"],
    link: "/projects/urban-fitness-campaign",
  },
  {
    id: 3,
    title: "Artisan Series (Debug: No Results)",
    client: "Artisan Collective",
    category: "Brand Storytelling",
    description:
      "A series of intimate artisan profiles that showcased the craftsmanship, passion, and stories behind each handmade product, driving e-commerce sales. This version has no result items for debugging.",
    image: "/images/placeholder.svg?height=500&width=800",
    results: [],
    link: "/projects/artisan-series",
  },
  {
    id: 4,
    title: "Tech Impact Stories",
    client: "TechStart Inc.",
    category: "Digital Marketing",
    description:
      "A campaign that translated complex technology into relatable human stories, showcasing real-world impact and applications to drive lead generation.",
    image: "/images/placeholder.svg?height=500&width=800",
    results: ["128% increase in qualified leads", "12.4% conversion rate (86% improvement)", "23% market share growth"],
    link: "/projects/techstart-impact",
  },
]

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="aspect-video">
              <img
                src={activeProject.image || "/images/placeholder.svg"}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
              <span className="inline-block px-3 py-1 rounded-full text-label-base font-emphasis bg-cyberpunk-blue/30 text-cyberpunk-blue mb-2">
                {activeProject.category}
              </span>
              <h3 className="text-2xl font-heading text-white mb-2">{activeProject.title}</h3>
              <p className="text-cyberpunk-pink mb-4">Client: {activeProject.client}</p>
              <p className="text-gray-300 mb-6 max-w-2xl">{activeProject.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                {activeProject.results.map((result, index) => (
                  <div key={index} className="bg-black/60 px-4 py-2 rounded-full flex items-center">
                    <span className="text-cyberpunk-green mr-2">✓</span>
                    <span className="text-body-sm text-white">{result}</span>
                  </div>
                ))}
              </div>

              <Button className="cyberpunk-button w-fit" onClick={() => (window.location.href = activeProject.link)}>
                View Full Case Study <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <h3 className="text-heading-md font-heading text-white mb-4 tracking-wide">Featured Projects</h3>

        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeProject.id === project.id
                ? "bg-black/70 border border-cyberpunk-blue/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                : "bg-black/40 border border-gray-800 hover:border-cyberpunk-blue/30"
            }`}
            onClick={() => setActiveProject(project)}
          >
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                <img
                  src={project.image || "/images/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className={`font-emphasis ${activeProject.id === project.id ? "text-white" : "text-gray-300"}`}>
                  {project.title}
                </h4>
                <p className={`text-body-sm ${activeProject.id === project.id ? "text-cyberpunk-blue" : "text-gray-500"}`}>
                  {project.client}
                </p>
              </div>
              {activeProject.id === project.id && <ChevronRight className="ml-auto h-5 w-5 text-cyberpunk-blue" />}
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10 mt-4 font-heading shadow-glow-pink"
          onClick={() => (window.location.href = "/portfolio")}
        >
          View All Projects
        </Button>
      </div>
    </div>
  )
}

