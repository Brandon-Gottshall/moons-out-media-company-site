"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't apply parallax effect during SSR
  const parallaxStyle = mounted
    ? {
        transform: `translateY(${scrollY * 0.5}px)`,
      }
    : {}

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-cyberpunk-background z-10"
          style={{ mixBlendMode: "multiply" }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.1)_0%,transparent_70%)] z-20"></div>
        {/* Use an image instead of video for SSR consistency */}
        {mounted ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/placeholder.svg?height=1080&width=1920"
          >
            <source src="#" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero background"
            className="absolute w-full h-full object-cover"
          />
        )}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block glitch-text font-extrabold tracking-tight" data-text="Authentic Stories">
              Authentic Stories
            </span>
            <span className="block mt-2 text-cyberpunk-pink font-black tracking-tight text-shadow-lg">
              Cinematic Experiences
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
            We create documentary-style content that captures the essence of your brand and connects with your audience
            on a deeper level.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-cyberpunk-purple text-white border-cyberpunk-gold border-2 py-6 px-8 font-bold shadow-glow-blue"
              onClick={() => (window.location.href = "/contact")}
            >
              Start Your Story
            </Button>
            <Button
              variant="outline"
              className="border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink/10 text-lg py-6 px-8 font-bold shadow-glow-subtle"
              onClick={() => (window.location.href = "/portfolio")}
            >
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown className="h-8 w-8 text-cyberpunk-pink" />
        </motion.div>
      </motion.div>
    </section>
  )
}

