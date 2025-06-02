"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

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

const TRANSITION_INTERVAL = 4000 // 4 seconds between transitions

export function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Video transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % storyContent.length)
    }, TRANSITION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  // Video playback effect
  useEffect(() => {
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
  }, [currentIndex])

  // Handle page visibility changes
  useEffect(() => {
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
  }, [currentIndex])

  // Calculate parallax effect based on scroll position
  const parallaxOffset = scrollY * 0.5
  const opacityValue = Math.max(0, 1 - scrollY / 500)

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-[max(3rem,8vh)] pb-[max(2rem,6vh)] vh-short:pt-[max(2rem,5vh)] vh-short:pb-[max(1rem,4vh)]"
    >
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
                poster="/images/portfolio-hero.webp"
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
        className="container mx-auto relative z-30 text-center flex flex-col items-center"
        style={{ transform: `translateY(${-parallaxOffset * 0.3}px)`, opacity: opacityValue }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full" // Added to help constrain content if needed
        >
          <h1 className="text-3xl vh-short:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading mb-3 vh-short:mb-2 sm:mb-4 md:mb-6">
            <span className="text-white relative inline-block">
              Authentic Storytelling
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r -z-10 from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink"></span>
            </span>
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink">
              Measurable Growth
            </span>
          </h1>
          <div className="bg-black/40 backdrop-blur-sm p-3 vh-short:p-2 sm:p-4 md:p-6 rounded-lg border border-cyberpunk-blue/20 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-4 vh-short:mb-3 sm:mb-6 md:mb-8">
            <p className=" vh-short:text-body-sm sm:text-body-lg md:text-heading-md lg:text-heading-md text-gray-200 leading-relaxed">
            At Moons Out Media, we transform your unique story into compelling video content that builds trust and drives measurable growth. Our targeted ad strategies connect you directly with your ideal audience, turning views into valuable leads and, ultimately, sales.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="relative overflow-hidden inline-block bg-cyberpunk-purple/90 text-white px-5 py-2.5 vh-short:px-4 vh-short:py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md uppercase tracking-wider font-heading text-body-sm sm:text-body-base shadow-[0_0_15px_rgba(106,90,205,0.5)] group"
              >
                <span className="relative z-10">Start Your Story</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/0 via-cyberpunk-blue/30 to-cyberpunk-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-0"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/portfolio"
                className="relative overflow-hidden inline-block bg-black/50 border border-cyberpunk-blue text-white px-5 py-2.5 vh-short:px-4 vh-short:py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md uppercase tracking-wider font-heading text-body-sm sm:text-body-base shadow-[0_0_10px_rgba(0,204,255,0.3)] group"
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
        className="absolute bottom-4 vh-short:bottom-2 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-cyberpunk-blue text-label-base sm:text-body-sm mb-1">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 vh-short:h-4 vh-short:w-4 text-cyberpunk-blue" />
        </motion.div>
      </motion.div>
    </section>
  )
} 