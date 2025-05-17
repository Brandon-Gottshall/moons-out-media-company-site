"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  // First, add a state to track the last hovered link index
  const [activeLink, setActiveLink] = useState("")
  const [lastHoveredIndex, setLastHoveredIndex] = useState<number | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)
  const [animationDuration, setAnimationDuration] = useState(0.2)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)
  const [trackPositions, setTrackPositions] = useState<{ left: number; width: number }[]>([])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate track positions for each link
  useEffect(() => {
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll(".nav-item")
      const positions = Array.from(navItems).map((item) => {
        const el = item as HTMLElement
        return {
          left: el.offsetLeft,
          width: el.offsetWidth,
        }
      })
      setTrackPositions(positions)
    }
  }, [navRef.current, scrolled]) // Recalculate on scroll state change which affects padding

  // Update the active link and current page index when the pathname changes
  useEffect(() => {
    const currentLinkIndex = navLinks.findIndex(
      (link) => pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)),
    )
    const currentLink = navLinks[currentLinkIndex]
    setActiveLink(currentLink?.name || "")
    setCurrentPageIndex(currentLinkIndex !== -1 ? currentLinkIndex : 0)
  }, [pathname])

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Add a function to calculate animation duration based on distance
  const calculateAnimationDuration = (hoveredIndex: number | null) => {
    if (hoveredIndex === null) return 0.2

    // Calculate the distance between the hovered item and current page item
    const distance = Math.abs((hoveredIndex !== -1 ? hoveredIndex : 0) - currentPageIndex)

    // Set duration based on distance (200ms per item)
    return Math.max(0.2, distance * 0.2)
  }

  // Get the current active position
  const getActivePosition = () => {
    const index = lastHoveredIndex !== null ? lastHoveredIndex : currentPageIndex
    return trackPositions[index] || { left: 0, width: 0 }
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-cyberpunk-blue/50 animate-header-glow"
          : "bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-sm animate-header-glow-out",
      )}
      initial={{ paddingTop: "1rem", paddingBottom: "1rem", y: 0 }}
      animate={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        y: 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <style jsx global>{`
        @keyframes textFlicker {
          0% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          3% { opacity: 0.8; text-shadow: 0 0 2px rgba(0, 204, 255, 0.4); }
          6% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          7% { opacity: 0.9; text-shadow: 0 0 3px rgba(0, 204, 255, 0.5); }
          8% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          9% { opacity: 0.95; text-shadow: 0 0 3px rgba(0, 204, 255, 0.5); }
          10% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          30% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          31% { opacity: 0.85; text-shadow: 0 0 2px rgba(0, 204, 255, 0.4); }
          32% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          36% { opacity: 0.9; text-shadow: 0 0 3px rgba(0, 204, 255, 0.5); }
          37% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          71% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          72% { opacity: 0.75; text-shadow: 0 0 2px rgba(0, 204, 255, 0.4); }
          73% { opacity: 0.9; text-shadow: 0 0 3px rgba(0, 204, 255, 0.5); }
          74% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          100% { opacity: 1; text-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
        }

        @keyframes dramaticFlicker {
          0% { opacity: 1; box-shadow: 0 0 5px rgba(0, 204, 255, 0.7); }
          3% { opacity: 0.7; box-shadow: 0 0 4px rgba(0, 204, 255, 0.5); }
          6% { opacity: 1; box-shadow: 0 0 6px rgba(0, 204, 255, 0.8); }
          9% { opacity: 0.8; box-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          12% { opacity: 1; box-shadow: 0 0 5px rgba(0, 204, 255, 0.7); }
          20% { opacity: 0.9; box-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          23% { opacity: 1; box-shadow: 0 0 6px rgba(0, 204, 255, 0.8); }
          35% { opacity: 0.8; box-shadow: 0 0 4px rgba(0, 204, 255, 0.5); }
          38% { opacity: 1; box-shadow: 0 0 5px rgba(0, 204, 255, 0.7); }
          52% { opacity: 0.9; box-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          55% { opacity: 1; box-shadow: 0 0 6px rgba(0, 204, 255, 0.8); }
          70% { opacity: 0.8; box-shadow: 0 0 4px rgba(0, 204, 255, 0.5); }
          73% { opacity: 1; box-shadow: 0 0 5px rgba(0, 204, 255, 0.7); }
          88% { opacity: 0.9; box-shadow: 0 0 4px rgba(0, 204, 255, 0.6); }
          91% { opacity: 1; box-shadow: 0 0 6px rgba(0, 204, 255, 0.8); }
          100% { opacity: 1; box-shadow: 0 0 5px rgba(0, 204, 255, 0.7); }
        }
        
        .active-link {
          color: #00CCFF;
          animation: textFlicker 8s infinite;
        }
        
        .highlight-flicker {
          animation: textFlicker 8s infinite;
        }
        
        .microled-highlight {
          background: linear-gradient(to right, #00CCFF, #FF69B4);
          border-radius: 6px;
          box-shadow: 0 0 5px rgba(255, 105, 180, 0.7);
          height: 100%;
          animation: textFlicker 8s infinite, dramaticFlicker 8s infinite;
        }
        
        .led-track {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background-image: repeating-linear-gradient(
            to right,
            transparent,
            transparent 1px,
            rgba(255, 255, 255, 0.05) 1px,
            rgba(255, 255, 255, 0.05) 2px
          );
          border-radius: 6px;
          border: 1px solid rgba(0, 204, 255, 0.05);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), inset 0 -1px 1px rgba(255, 255, 255, 0.05);
          background-color: rgba(0, 0, 0, 0.2);
          overflow: hidden; /* Add this to contain the highlight */
        }
        
        .led-track::before {
          content: '';
          position: absolute;
          top: -1px;
          bottom: -1px;
          left: 0;
          width: 100%;
          background-image: 
            linear-gradient(to right, #00CCFF, #00CCFF 30%, #FF69B4 70%, #FF69B4),
            repeating-linear-gradient(
              to right,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.3) 1px,
              rgba(255, 255, 255, 0.3) 2px
            );
          background-blend-mode: overlay;
          border-radius: 6px;
          border: 1px solid rgba(255, 105, 180, 0.5);
          box-shadow: 0 0 3px rgba(0, 204, 255, 0.5), inset 0 1px 1px rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .led-track.active::before {
          opacity: 1;
        }
      `}</style>

      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.span
            className="text-2xl font-bold relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-cyberpunk-blue mr-1 tracking-wider">MOONS</span>
            <span className="text-cyberpunk-pink tracking-wider">OUT</span>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink"></span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block relative">
          <nav
            ref={navRef}
            className="flex items-center space-x-6 relative"
            onMouseLeave={() => {
              // Don't reset the animation, just set the target back to the current page
              // This allows the animation to smoothly reverse direction
              setActiveLink(navLinks[currentPageIndex]?.name || "")
              setLastHoveredIndex(null)
              setAnimationDuration(calculateAnimationDuration(lastHoveredIndex))
            }}
          >
            {/* LED Track with active section - centered under nav links */}
            <div
              className="absolute bottom-[-1px] h-[3px] led-track"
              style={{
                width:
                  trackPositions.length > 0
                    ? trackPositions[trackPositions.length - 1].left +
                      trackPositions[trackPositions.length - 1].width -
                      trackPositions[0].left
                    : "auto",
                left: trackPositions[0]?.left || 0,
                right: "auto",
              }}
            >
              {/* Active highlight that moves along the track */}
              <motion.div
                className="absolute top-0 bottom-0 microled-highlight"
                initial={false}
                animate={{
                  left: getActivePosition().left - (trackPositions[0]?.left || 0),
                  width: getActivePosition().width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400, // Reduced from 500 for less bounce
                  damping: 40, // Increased from 30 for more damping
                  duration: animationDuration,
                  // Add bounce: 0 to prevent overshooting
                  bounce: 0,
                }}
                // Add style to ensure the highlight stays within the track
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              />
            </div>

            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative py-2 transition-colors duration-300 nav-item",
                    isActive ? "text-cyberpunk-pink" : "text-white hover:text-cyberpunk-blue",
                  )}
                  onMouseEnter={() => {
                    setActiveLink(link.name)
                    setLastHoveredIndex(index)
                    setAnimationDuration(calculateAnimationDuration(index))
                  }}
                >
                  {link.name}
                </Link>
              )
            })}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                variant="outline"
                className="relative overflow-hidden bg-black/50 text-white px-6 py-2 rounded-md uppercase tracking-wider font-medium ml-4 transition-all border border-cyberpunk-blue/50 shadow-[0_0_10px_rgba(0,204,255,0.2)]"
                onClick={() => {
                  if (pathname === "/contact") {
                    // If already on contact page, just scroll to the element
                    const element = document.getElementById("guided-process")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  } else {
                    // Navigate to contact page with hash
                    router.push("/contact#guided-process")
                  }
                }}
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/20 via-cyberpunk-purple/20 to-cyberpunk-pink/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </nav>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="relative text-cyberpunk-blue hover:text-cyberpunk-pink p-2 border border-cyberpunk-blue/30 rounded-md overflow-hidden group"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="absolute inset-0 bg-cyberpunk-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black/95 border-t border-cyberpunk-blue/50 md:hidden shadow-[0_5px_20px_rgba(0,204,255,0.15)]"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  return (
                    <motion.div key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link
                        href={link.href}
                        className={cn(
                          "py-3 transition-colors duration-300 border-b border-gray-800 block relative",
                          isActive ? "active-link" : "text-white hover:text-cyberpunk-blue",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-[3px] microled-highlight highlight-flicker" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                  <Button
                    className="bg-cyberpunk-pink/90 text-white w-full mt-4 uppercase tracking-wider font-medium transition-all border-none shadow-md hover:bg-cyberpunk-pink"
                    onClick={() => {
                      if (pathname === "/contact") {
                        // If already on contact page, just scroll to the element
                        setIsMenuOpen(false)
                        const element = document.getElementById("guided-process")
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      } else {
                        // Navigate to contact page with hash
                        router.push("/contact#guided-process")
                        setIsMenuOpen(false)
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

