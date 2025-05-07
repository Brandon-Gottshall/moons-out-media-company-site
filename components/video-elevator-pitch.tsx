"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function VideoElevatorPitch() {
  // Initialize all state as null/false to avoid hydration mismatches
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const router = useRouter()

  // Only run client-side code after mounting
  useEffect(() => {
    setMounted(true)

    // Auto-open after scrolling
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsOpen(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render anything during SSR
  if (!mounted) {
    return null
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen && !isPlaying) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play()
          setIsPlaying(true)
        }
      }, 500)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-40 mb-4 mr-4 md:mb-8 md:mr-8">
      <div className="flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/80 backdrop-blur-md rounded-t-lg border border-cyberpunk-blue/30 overflow-hidden mb-2 w-full max-w-xs md:max-w-md"
            >
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg?height=270&width=480"
                  loop
                  muted={isMuted}
                >
                  <source src="#" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/40 rounded-full transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1.5 bg-cyberpunk-blue/20 hover:bg-cyberpunk-blue/40 rounded-full transition-colors"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 text-white" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                  <Button
                    size="sm"
                    className="text-xs bg-cyberpunk-pink hover:bg-cyberpunk-pink/80 text-white"
                    onClick={() => router.push("/contact")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">Discover Moons Out Media</h3>
                <p className="text-sm text-gray-300">
                Documentary-style storytelling, targeted digital advertising, and custom web, AI & DevOps solutions — all designed to connect with your audience and accelerate your business.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleOpen}
          className="flex items-center justify-center space-x-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-cyberpunk-blue/30 text-white hover:bg-black transition-colors"
          aria-label={isOpen ? "Close video pitch" : "Open video pitch"}
        >
          <span className="text-sm font-medium">Elevator Pitch</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-cyberpunk-blue" />
          ) : (
            <ChevronUp className="h-4 w-4 text-cyberpunk-blue" />
          )}
        </button>
      </div>
    </div>
  )
}

