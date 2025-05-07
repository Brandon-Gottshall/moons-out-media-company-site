"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useTypewriter, Cursor } from 'react-simple-typewriter'

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
    <section ref={containerRef} className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden">
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
        <motion.img
          style={{ y, opacity }}
          src="/images/services-hero.png"
          alt="Services Hero Background"
          className="absolute w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-white mb-2">Our Services</span>
            <span className="block text-cyberpunk-blue relative inline-block min-h-[60px] md:min-h-[80px] lg:min-h-[100px]">
              <TypewriterEffect />
            </span>
          </motion.h1>

          <motion.div
            className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-gray-800 mb-8 relative overflow-hidden"
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

            <p className="text-white text-lg md:text-xl leading-relaxed">
            Cinematic artistry meets cutting-edge tech: documentary storytelling, strategic ad campaigns, and end-to-end web, AI & cloud engineering—all under one roof to drive real results.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              className="cyberpunk-button py-6 text-base relative overflow-hidden group"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="relative z-10">Start Your Project</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyberpunk-purple/0 via-white/10 to-cyberpunk-purple/0"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </Button>

            <Button
              variant="outline"
              className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 bg-black/50 py-6 text-base relative overflow-hidden group"
              onClick={() => document.getElementById("services-showcase")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="relative z-10">Explore Services</span>
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

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyberpunk-background to-transparent z-10"></div>

      {/* Digital noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-40 pointer-events-none"></div>

      {/* Scroll indicator - positioned at the very bottom of the hero section */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-cyberpunk-blue text-sm mb-2">Explore Our Services</span>
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
    words: ["Authentic Stories", "Scalable Tech"],
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

