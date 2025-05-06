"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function AboutHero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Moons Out Media Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10"></div>

        {/* Cyberpunk grid overlay */}
        <div
          className="absolute inset-0 z-20 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00f0ff10 1px, transparent 1px), linear-gradient(to bottom, #00f0ff10 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="text-cyberpunk-blue">Who</span> We Are
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            A collective of storytellers, digital artists, and marketing strategists pushing the boundaries of creative
            content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyberpunk-button relative overflow-hidden group"
            >
              Our Mission
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink opacity-30 blur-xl group-hover:opacity-50 transition duration-300"></span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyberpunk-button relative overflow-hidden group"
            >
              Meet The Team
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-green opacity-30 blur-xl group-hover:opacity-50 transition duration-300"></span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-cyberpunk-blue z-10"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-cyberpunk-pink z-10"
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 flex flex-col items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-cyberpunk-pink text-sm mb-2">Discover Our Story</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="h-6 w-6 text-cyberpunk-pink" />
        </motion.div>
      </motion.div>
    </div>
  )
}

