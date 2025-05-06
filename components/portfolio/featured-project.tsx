"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"

export default function FeaturedProject({ hideDescription = false }: { hideDescription?: boolean }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className="max-w-6xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-black/20 backdrop-blur-sm border border-cyberpunk-blue/30 rounded-lg overflow-hidden"
      >
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src="/images/project1.png"
            alt="EcoTech Innovations Documentary"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cyberpunk-blue/20 backdrop-blur-sm border border-cyberpunk-blue flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Play video"
            >
              <Play className="h-10 w-10 md:h-12 md:w-12 text-white fill-white" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-cyberpunk-blue/20 text-cyberpunk-blue mb-2">
                Documentary Series
              </span>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 whitespace-nowrap overflow-hidden text-overflow-ellipsis leading-tight">
                Sustainable Innovation Documentary
              </h3>
              <p className="text-cyberpunk-pink text-base">Client: EcoTech Innovations</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-black/50 rounded-md text-sm text-white">4K</span>
              <span className="px-3 py-1 bg-black/50 rounded-md text-sm text-white">5-Part Series</span>
              <span className="px-3 py-1 bg-black/50 rounded-md text-sm text-white">2023</span>
            </div>
          </div>

          {!hideDescription && (
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg mb-8">
              <p className="text-white text-lg leading-relaxed">
                A documentary series showcasing EcoTech's revolutionary sustainable technologies and their real-world
                impact on communities and the environment. This project combined cinematic storytelling with data-driven
                insights to create compelling content that resonated with both consumers and investors.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-black/50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-white mb-0">87%</p>
              <p className="text-sm text-white mb-0">Brand Awareness</p>
              <p className="text-xs text-cyberpunk-green">+42%</p>
            </div>
            <div className="bg-black/50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-white mb-0">$12M</p>
              <p className="text-sm text-white mb-0">Investor Interest</p>
              <p className="text-xs text-cyberpunk-green">+156%</p>
            </div>
            <div className="bg-black/50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-white mb-0">14</p>
              <p className="text-sm text-white mb-0">New Partnerships</p>
              <p className="text-xs text-cyberpunk-green">+250%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="cyberpunk-button py-3 text-sm"
              onClick={() => (window.location.href = "/portfolio/ecotech-documentary")}
            >
              View Full Case Study <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 p-3 text-sm"
              onClick={() => (window.location.href = "/contact")}
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative bg-cyberpunk-background border border-cyberpunk-blue/30 rounded-lg w-full max-w-5xl overflow-hidden">
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              onClick={() => setIsVideoModalOpen(false)}
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
                src="/images/project1.png"
                alt="EcoTech Innovations Documentary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

