"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import Image from "next/image"

export default function ServiceHero() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 sm:py-20 md:pt-24 md:pb-20 overflow-hidden h-dvh flex flex-col w-full"
    >
      {/* Cyberpunk grid overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 204, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 204, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-l-2 border-t-2 border-cyberpunk-blue opacity-30 z-10"
        animate={{
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.05, 1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 border-r-2 border-b-2 border-cyberpunk-pink opacity-30 z-10"
        animate={{
          rotate: [0, -5, 0, 5, 0],
          scale: [1, 0.95, 1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      ></motion.div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-cyberpunk-blue/5 blur-3xl z-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-cyberpunk-pink/5 blur-3xl z-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      ></motion.div>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-cyberpunk-background z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.2)_0%,transparent_70%)] z-20"></div>
        <Image
          alt="Services Hero Image"
          className="absolute w-full h-full object-cover"
          fill
          priority
          src="/images/services-hero.webp"
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center">
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold -mb-2 lg:mb-6 mt-2 sm:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white mb-2">Our Services</span>
              <span className="text-cyberpunk-blue relative inline-block min-h-[50px] sm:min-h-[60px] md:min-h-[60px] lg:min-h-[70px] xl:min-h-[80px]">
                <TypewriterEffect />
              </span>
            </motion.h1>

            <motion.div
              className="bg-black/60 backdrop-blur-sm p-6 md:px-6 md:py-4 lg:p-6 rounded-lg border border-gray-800 mb-8 md:mb-2 lg:mb-12 vh-short:mb-0 vh-xshort:-mb-2 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{
                  background: [
                    "linear-gradient(90deg, transparent 0%, rgba(0, 204, 255, 0.1) 50%, transparent 100%)",
                    "linear-gradient(90deg, transparent 0%, rgba(0, 204, 255, 0) 50%, transparent 100%)",
                  ],
                  opacity: [0, 0.5, 0],
                  left: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              ></motion.div>

              <p className="text-white text-base sm:text-xxs md:text-sm lg:text-lg leading-relaxed">
              Cinematic artistry meets cutting-edge tech: narrative driven storytelling, strategic ad campaigns, and end-to-end web, AI & cloud engineering—all under one roof to drive real results.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-row justify-center gap-4 mb-20 vh-short:mb-0 sm:mb-12 my-12 sm:my-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                className="cyberpunk-button px-6 py-3 vh-short:px-3 vh-short:py-1 relative overflow-hidden group"
                onClick={() => (window.location.href = "/contact")}
              >
                <span className="relative z-10 vh-short:text-xxs sm:text-base">Start Your Project</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyberpunk-purple/0 via-white/10 to-cyberpunk-purple/0"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </Button>

              <Button
                variant="outline"
                className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 bg-black/50 px-6 py-3 vh-short:px-3 vh-xshort:py-1 vh-short:-py-2 text-sm sm:text-base relative overflow-hidden group min-h-8"
                onClick={() => document.getElementById("services-showcase")?.scrollIntoView({ behavior: "smooth"})}
              >
                <span className="relative z-10 vh-short:text-xxs sm:text-base">Explore Services</span>
                <motion.div
                  className="absolute inset-0 bg-cyberpunk-blue/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "center" }}
                ></motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyberpunk-background to-transparent z-10"></div>

      {/* Digital noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-40 pointer-events-none"></div>

      {/* Scroll indicator - positioned at the very bottom of the hero section */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center z-40 vh-short:-mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-cyberpunk-blue text-sm mb-2 vh-xshort:mb-0 vh-short:text-xxs sm:text-base">Explore Our Services</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="h-6 w-6 text-cyberpunk-blue" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Helper component for the typewriter effect
function TypewriterEffect() {
  const [text] = useTypewriter({
    words: ["Measurable Growth", "Scalable Tech", "Higher Conversions"],
    loop: 0, // Loop indefinitely
    typeSpeed: 100,
    deleteSpeed: 70,
    delaySpeed: 1500,
  })

  return (
    <>
      {text}
      <Cursor cursorStyle="_" />
    </>
  )
}

