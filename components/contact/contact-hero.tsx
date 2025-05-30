"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ContactHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative pb-32 pt-28 bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="h-full w-full grid grid-cols-12 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-full border-r border-cyberpunk-blue/30"></div>
              ))}
          </div>
          <div className="h-full w-full grid grid-rows-12 gap-4">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-full border-b border-cyberpunk-blue/30"></div>
              ))}
          </div>
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-cyberpunk-blue/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyberpunk-pink/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-40 left-[30%] w-48 h-48 rounded-full bg-cyberpunk-green/20 blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-pink to-cyberpunk-green"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading mb-6">
              <span className="text-white">Let's Solve Your</span> <br />
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Media Challenges
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-heading-md text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            No generic solutions. Tell us your specific challenges, and we'll show you how our authentic story telling
            approach can transform your results. We collaborate virtually with clients worldwide.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {[
              { value: "87%", label: "Increase in brand engagement", color: "blue" },
              { value: "3.2x", label: "Higher conversion rates", color: "pink" },
              { value: "92%", label: "Client satisfaction", color: "green" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`bg-black/40 backdrop-blur-sm border border-cyberpunk-${stat.color}/30 p-4 rounded-lg text-center`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 20px rgba(var(--color-cyberpunk-${stat.color}-rgb), 0.3)`,
                  borderColor: `rgba(var(--color-cyberpunk-${stat.color}-rgb), 0.6)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <motion.p
                  className={`text-3xl font-heading text-cyberpunk-${stat.color}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-body-sm text-white">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

