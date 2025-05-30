"use client"

import { motion } from "framer-motion"
import CreativeProcess from "@/components/about/creative-process"

export default function CreativeProcessPage() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-black/90">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/5 via-transparent to-cyberpunk-pink/5" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-heading mb-6">
            Our Creative <span className="text-cyberpunk-blue">Process</span>
          </h1>
          <p className="text-heading-md md:text-2xl text-gray-300 max-w-3xl mx-auto">
            From discovery to optimization, discover how we bring your vision to life
          </p>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyberpunk-blue rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-cyberpunk-pink rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-cyberpunk-green rounded-full animate-pulse delay-2000" />
        </div>
      </section>

      {/* Content Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4"
      >
        <CreativeProcess />
      </motion.div>
    </div>
  )
} 