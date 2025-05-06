"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

// Reuse the same video content from portfolio
const storyContent = [
  {
    video: {
      url: "https://cdn.pixabay.com/video/2025/03/18/265501_small.mp4",
      alt: "A fluffy baby chick calmly preens its feathers while resting on soft straw, capturing a quiet moment of innocence and peace.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2024/12/09/245932_small.mp4",
      alt: "A dynamic, shifting view—perhaps abstract or urban—symbolizing change and new beginnings.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2024/11/27/243647_small.mp4",
      alt: "A visually engaging clip that suggests gradual change, growth, and progression through subtle motion.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2024/09/24/233024_medium.mp4",
      alt: "A medium-shot video that draws the eye with intriguing movement and rich, atmospheric detail.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2022/05/16/117133-710564131.mp4",
      alt: "A vibrant, energetic scene that appears to burst with color and life, sparking excitement.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2022/07/31/126234-735976664.mp4",
      alt: "A warm, inviting clip that hints at human or natural connection, filled with gentle motion and light.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2022/02/08/107142-675298847.mp4",
      alt: "A video with an exploratory feel—possibly a journey or a close-up detail that invites curiosity.",
    },
  },
  {
    video: {
      url: "https://cdn.pixabay.com/video/2023/01/28/148282-793718077.mp4",
      alt: "A creative, thought-provoking scene that opens up possibilities, blending dreamy visuals with subtle motion.",
    },
  },
]

const TRANSITION_INTERVAL = 4000 // Same as portfolio page - 4 seconds between transitions

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Video transition effect
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % storyContent.length)
    }, TRANSITION_INTERVAL)

    return () => clearInterval(interval)
  }, [mounted, storyContent.length])

  // Video playback effect
  useEffect(() => {
    if (!mounted) return

    // Get all video elements
    const videoElements = document.querySelectorAll("video")

    // For the current video, set a calculated start time and play
    videoElements.forEach((video, index) => {
      if (index === currentIndex) {
        // Wait for metadata to load to get duration
        if (video.readyState === 0) {
          video.addEventListener(
            "loadedmetadata",
            () => {
              setCalculatedTimeAndPlay(video)
            },
            { once: true },
          )

          // Start loading the video
          video.load()
        } else {
          setCalculatedTimeAndPlay(video)
        }
      }
    })

    // Helper function to set calculated time and play
    function setCalculatedTimeAndPlay(video: HTMLVideoElement) {
      // Get video duration (or use a default if not available)
      const duration = video.duration || 10

      // Calculate a start time that ensures we don't loop during our display time
      // We want to show exactly TRANSITION_INTERVAL seconds of the video
      const transitionSeconds = TRANSITION_INTERVAL / 1000

      // If the video is shorter than our transition interval, start from the beginning
      if (duration <= transitionSeconds) {
        video.currentTime = 0
      } else {
        // Otherwise, pick a random start point that ensures we don't reach the end
        // during our transition interval
        const maxStartTime = Math.max(0, duration - transitionSeconds)
        const randomTime = Math.random() * maxStartTime
        video.currentTime = randomTime
      }

      video.play().catch((err) => console.log("Autoplay prevented:", err))
    }
  }, [currentIndex, mounted])

  // Handle page visibility changes
  useEffect(() => {
    if (!mounted) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page is now visible again, resume the current video
        const videoElements = document.querySelectorAll("video")
        const currentVideo = videoElements[currentIndex] as HTMLVideoElement

        if (currentVideo && currentVideo.paused) {
          currentVideo.play().catch((err) => console.log("Could not resume video:", err))
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [mounted, currentIndex])

  // Calculate parallax effect based on scroll position
  const parallaxOffset = scrollY * 0.4
  const opacityValue = Math.max(0, 1 - scrollY / 700)

  // Don't render video content during SSR
  if (!mounted) {
    return (
      <div className="min-h-screen">
        {/* Hero Section - Static version for SSR */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-cyberpunk-background"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-white">Authentic Stories</span>
              <span className="block mt-2 text-cyberpunk-blue">Cinematic Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We create documentary-style content that captures the essence of your brand and connects with your
              audience on a deeper level.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-cyberpunk-purple text-white px-6 py-3 rounded-md uppercase tracking-wider font-bold"
              >
                Start Your Story
              </Link>
              <Link
                href="/portfolio"
                className="border border-cyberpunk-blue text-cyberpunk-blue px-6 py-3 rounded-md uppercase tracking-wider font-bold"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyberpunk-blue">Our Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-12">
              Explore our portfolio of documentary-style content, authentic storytelling, and targeted digital campaigns
              that drive real results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Documentary Production",
                  description: "Cinematic documentary-style content that tells authentic stories.",
                },
                {
                  title: "Digital Marketing",
                  description: "Targeted digital ad campaigns that drive measurable results.",
                },
                {
                  title: "Brand Storytelling",
                  description: "Authentic narratives that connect with your audience on a deeper level.",
                },
              ].map((service, index) => (
                <div key={index} className="bg-black/50 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <Link href="/services" className="text-cyberpunk-blue hover:underline">
                    Learn more
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-black">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Tell Your Story?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create documentary-style content that captures the essence of your brand.
            </p>
            <Link
              href="/contact"
              className="bg-cyberpunk-purple text-white px-8 py-4 rounded-md uppercase tracking-wider font-bold inline-block"
            >
              Get Started
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Video Montage */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {storyContent.map((content, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-2000"
                style={{
                  opacity: currentIndex === index ? 1 : 0,
                  zIndex: currentIndex === index ? 1 : 0,
                  transition: `opacity ${TRANSITION_INTERVAL / 2000}s ease-in-out`,
                }}
              >
                <video
                  muted
                  loop={false} // Prevent automatic looping
                  playsInline
                  preload="metadata"
                  className="absolute w-full h-full object-cover"
                  poster="/images/portfolio-hero.png"
                >
                  <source src={content.video.url} type="video/mp4" />
                </video>
                {/* Video overlay */}
                <div className="absolute inset-0 bg-black/70 z-2"></div>
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-cyberpunk-background z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-cyberpunk-background via-cyberpunk-background/95 to-transparent z-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.2)_0%,transparent_70%)] z-20"></div>

          {/* Cyberpunk grid overlay */}
          <div
            className="absolute inset-0 z-10 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 204, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 204, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              transform: `translateY(${parallaxOffset * 0.5}px)`,
            }}
          ></div>

          {/* Cyberpunk accent elements */}
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyberpunk-pink/30 z-10 opacity-60"
            style={{ transform: `rotate(45deg) translateY(${parallaxOffset * 0.7}px)` }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-cyberpunk-blue/30 z-10 opacity-60"
            style={{ transform: `rotate(15deg) translateY(${-parallaxOffset * 0.5}px)` }}
          ></div>
        </div>

        <div
          className="container mx-auto px-4 relative z-30 text-center"
          style={{ transform: `translateY(${-parallaxOffset * 0.3}px)`, opacity: opacityValue }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-white relative inline-block">
                Authentic Stories
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink"></span>
              </span>
              <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink">
                Cinematic Experiences
              </span>
            </h1>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-cyberpunk-blue/20 max-w-2xl mx-auto mb-8">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                We create documentary-style content that captures the essence of your brand and connects with your
                audience on a deeper level.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="relative overflow-hidden inline-block bg-cyberpunk-purple/90 text-white px-8 py-4 rounded-md uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(106,90,205,0.5)] group"
                >
                  <span className="relative z-10">Start Your Story</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/0 via-cyberpunk-blue/30 to-cyberpunk-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-0"></span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/portfolio"
                  className="relative overflow-hidden inline-block bg-black/50 border border-cyberpunk-blue text-white px-8 py-4 rounded-md uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(0,204,255,0.3)] group"
                >
                  <span className="relative z-10">View Our Work</span>
                  <span className="absolute inset-0 bg-cyberpunk-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - positioned at the bottom of hero section */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-cyberpunk-blue text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-cyberpunk-blue" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyberpunk-blue/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyberpunk-pink/5 rounded-full blur-3xl z-0"></div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple">
              Our Services
            </h2>
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800 max-w-2xl mx-auto mb-12">
              <p className="text-gray-300">
                Explore our portfolio of documentary-style content, authentic storytelling, and targeted digital
                campaigns that drive real results.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Documentary Production",
                description: "Cinematic documentary-style content that tells authentic stories.",
                color: "blue",
                icon: "🎬",
              },
              {
                title: "Digital Marketing",
                description: "Targeted digital ad campaigns that drive measurable results.",
                color: "pink",
                icon: "📱",
              },
              {
                title: "Brand Storytelling",
                description: "Authentic narratives that connect with your audience on a deeper level.",
                color: "purple",
                icon: "📖",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 15px rgba(${service.color === "blue" ? "0, 204, 255" : service.color === "pink" ? "255, 105, 180" : "106, 90, 205"}, 0.3)`,
                }}
                className={`bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-cyberpunk-${service.color === "blue" ? "blue" : service.color === "pink" ? "pink" : "purple"}/30 transition-all duration-300`}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-cyberpunk-${service.color === "blue" ? "blue" : service.color === "pink" ? "pink" : "purple"}/10 border border-cyberpunk-${service.color === "blue" ? "blue" : service.color === "pink" ? "pink" : "purple"}/30`}
                >
                  {service.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-3 text-cyberpunk-${service.color === "blue" ? "blue" : service.color === "pink" ? "pink" : "purple"}`}
                >
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className={`inline-flex items-center text-cyberpunk-${service.color === "blue" ? "blue" : service.color === "pink" ? "pink" : "purple"} hover:underline group`}
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink"></div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to <span className="text-cyberpunk-pink">Tell Your Story</span>?
            </h2>
            <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-cyberpunk-blue/20 max-w-2xl mx-auto mb-8">
              <p className="text-xl text-gray-200">
                Let's create documentary-style content that captures the essence of your brand.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="/contact"
                className="relative overflow-hidden inline-block bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink text-white px-8 py-4 rounded-md uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(106,90,205,0.5)] group"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-pink via-cyberpunk-purple to-cyberpunk-blue opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

