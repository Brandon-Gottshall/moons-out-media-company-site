"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/use-mobile";
import { AnimatedTypewriter } from "./animated-typewriter";
import { ChevronDown } from "lucide-react";
import MetaCategoryNavButtons from "./meta-category-nav-buttons";
import MetaCategorySwiper from "./meta-category-swiper";
import type { MetaCategory } from "@/lib/category-data";

const TRANSITION_INTERVAL = 4000; // Time in milliseconds between transitions
const TEXT_DELAY = 1000; // Delay in milliseconds before text changes after video

// Combined data structure for videos and words
const storyContent = [
  {
    word: "Reminds People To Slow Down",
    video: {
      url: "https://cdn.pixabay.com/video/2025/03/18/265501_small.mp4",
      alt: "A fluffy baby chick calmly preens its feathers while resting on soft straw, capturing a quiet moment of innocence and peace.",
    },
  },
  {
    word: "Connects People",
    video: {
      url: "https://cdn.pixabay.com/video/2024/11/27/243647_small.mp4",
      alt: "A visually engaging clip that suggests gradual change, growth, and progression through subtle motion.",
    },
  },
  {
    word: "Satiates the Curious",
    video: {
      url: "https://cdn.pixabay.com/video/2024/09/24/233024_medium.mp4",
      alt: "A medium-shot video that draws the eye with intriguing movement and rich, atmospheric detail.",
    },
  },
  {
    word: "Reminds People to Embrace",
    video: {
      url: "https://cdn.pixabay.com/video/2024/12/09/245932_small.mp4",
      alt: "A dynamic, shifting view—perhaps abstract or urban—symbolizing change and new beginnings.",
    },
  },
  {
    word: "Ignites the Imagination",
    video: {
      url: "https://cdn.pixabay.com/video/2022/05/16/117133-710564131.mp4",
      alt: "A vibrant, energetic scene that appears to burst with color and life, sparking excitement.",
    },
  },
  {
    word: "Refreshes the Mind",
    video: {
      url: "https://cdn.pixabay.com/video/2022/07/31/126234-735976664.mp4",
      alt: "A warm, inviting clip that hints at human or natural connection, filled with gentle motion and light.",
    },
  },
  {
    word: "Brings Nostalgia",
    video: {
      url: "https://cdn.pixabay.com/video/2022/02/08/107142-675298847.mp4",
      alt: "A video with an exploratory feel—possibly a journey or a close-up detail that invites curiosity.",
    },
  },
  {
    word: "Captures a Moment of Joy",
    video: {
      url: "https://cdn.pixabay.com/video/2023/01/28/148282-793718077.mp4",
      alt: "A creative, thought-provoking scene that opens up possibilities, blending dreamy visuals with subtle motion.",
    },
  },
];

interface PortfolioHeroProps {
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
  selectedMetaCategoryId: string;
  featuredProject?: React.ReactNode;
  metaCategories: MetaCategory[];
  onHeroMetaButtonSelect: (metaId: string) => void;
  gallerySectionId: string;
}

// Define variants for hero section and search form to batch animations and enable layout transitions
const heroSectionVariants: Variants = {
  collapsed: { height: "100dvh" },
  expanded: { height: "auto" },
}

const searchFormVariants: Variants = {
  collapsed: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%", // full width when collapsed
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "transparent",
    padding: 0,
    borderRadius: 0,
    boxShadow: "none",
    scale: 1,
  },
  expanded: {
    position: "fixed",
    top: "4rem",
    left: 0, x: 0,
    width: "100vw",
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
    scale: 1.02,
    zIndex: 100,
  },
}

export default function PortfolioHero({
  isSearchActive,
  setIsSearchActive,
  selectedMetaCategoryId,
  featuredProject,
  metaCategories,
  onHeroMetaButtonSelect,
  gallerySectionId
}: PortfolioHeroProps) {
  // Use a single index for tracking position
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Single useEffect for transitions
  useEffect(() => {
    if (!mounted || isSearchActive) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % storyContent.length);
    }, TRANSITION_INTERVAL); // Use the constant instead of hardcoded value

    return () => clearInterval(interval);
  }, [mounted, storyContent.length, isSearchActive]);

  // Video playback effect
  useEffect(() => {
    if (!mounted) return;

    // Get all video elements
    const videoElements = document.querySelectorAll("video");

    // For the current video, set a calculated start time and play
    videoElements.forEach((video, index) => {
      if (index === currentIndex) {
        // Wait for metadata to load to get duration
        if (video.readyState === 0) {
          video.addEventListener(
            "loadedmetadata",
            () => {
              setCalculatedTimeAndPlay(video);
            },
            { once: true }
          );

          // Start loading the video
          video.load();
        } else {
          setCalculatedTimeAndPlay(video);
        }
      }
    });

    // Helper function to set calculated time and play
    function setCalculatedTimeAndPlay(video: HTMLVideoElement) {
      // Get video duration (or use a default if not available)
      const duration = video.duration || 10;

      // Calculate a start time that ensures we don't loop during our display time
      // We want to show exactly TRANSITION_INTERVAL seconds of the video
      const transitionSeconds = TRANSITION_INTERVAL / 1000;

      // If the video is shorter than our transition interval, start from the beginning
      if (duration <= transitionSeconds) {
        video.currentTime = 0;
      } else {
        // Otherwise, pick a random start point that ensures we don't reach the end
        // during our transition interval
        const maxStartTime = Math.max(0, duration - transitionSeconds);
        const randomTime = Math.random() * maxStartTime;
        video.currentTime = randomTime;
      }

      video.play().catch((err) => console.log("Autoplay prevented:", err));
    }
  }, [currentIndex, mounted]);

  // Add this new effect after the existing video playback effect
  useEffect(() => {
    if (!mounted || isSearchActive) return;

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page is now visible again, resume the current video
        const videoElements = document.querySelectorAll("video");
        const currentVideo = videoElements[currentIndex] as HTMLVideoElement;

        if (currentVideo && currentVideo.paused) {
          currentVideo
            .play()
            .catch((err) => console.log("Could not resume video:", err));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted, currentIndex, isSearchActive]);

  // Reset typewriter when currentIndex changes
  useEffect(() => {
    // The Typewriter component will handle the animation
    // when it receives the new currentIndex prop
  }, [currentIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSearchActive) {
      setIsSearchActive(true);
      // Focus the search input after animation completes
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    } else {
      // In a real implementation, this would trigger a search
      console.log("Searching for:", searchQuery);
    }
  };

  const handleInputFocus = () => {
    if (!isSearchActive) {
      setIsSearchActive(true);
    }
  };

  const handleFilterClick = () => {
    if (!isSearchActive) {
      setIsSearchActive(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    // After closing search, scroll to gallery section
    setTimeout(() => {
      document.getElementById(gallerySectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  };

  const handleShortcutButtonClick = (subCategoryId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onHeroMetaButtonSelect(subCategoryId);
  };

  // Cancel search when Escape key is pressed
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchQuery("");
        setIsSearchActive(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Don't render video content during SSR
  if (!mounted) {
    return (
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-cyberpunk-background z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.2)_0%,transparent_70%)] z-20"></div>
          <img
            src="/images/portfolio-hero.png"
            alt="Portfolio Hero Background"
            className="absolute w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block">Stories That Inspire</span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className={`transform-gpu relative overflow-hidden flex flex-col justify-center ${isSearchActive ? 'pt-20 pb-16' : 'pt-[max(6rem,12vh)] pb-[max(3rem,6vh)] lg:pt-16 lg:pb-12 vh-short:pt-[max(4rem,8vh)] vh-short:pb-[max(2rem,4vh)]'}`}
      variants={heroSectionVariants}
      initial="collapsed"
      animate={isSearchActive ? "expanded" : "collapsed"}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        layout: { type: "spring", stiffness: 300, damping: 30 }
      }}
      layout
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
                loop={false}
                playsInline
                preload="metadata"
                className="absolute w-full h-full object-cover"
                poster="/images/portfolio-hero.png"
              >
                <source src={content.video.url} type="video/mp4" />
              </video>
              <div
                className="absolute inset-0 bg-black/80 z-2"
                style={{ opacity: isSearchActive ? 0.75 : 0.8 }}
              ></div>
            </div>
          ))}
        </div>
        {/* Overlay gradients */}
        <motion.div
          className={`transform-gpu absolute inset-0 z-10 ${isSearchActive ? "cursor-pointer" : ""}`}
          initial={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, var(--cyberpunk-background) 100%)",
            position: "absolute",
          }}
          animate={{
            background: isSearchActive
              ? "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, var(--cyberpunk-background) 100%)",
            pointerEvents: isSearchActive ? "auto" : "none",
            position: isSearchActive ? "fixed" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            zIndex: isSearchActive ? 30 : 10,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            background: { duration: 0.8, ease: "easeInOut" },
          }}
          onClick={() => { if (isSearchActive) { clearSearch(); } }}
        ></motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,90,205,0.2)_0%,transparent_70%)] z-20 pointer-events-none"></div>
      </div>

      {/* Content Wrapper - Flexbox for responsiveness */}
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center lg:items-stretch gap-8 lg:gap-6 z-30 relative vh-short:gap-2">
        
        {/* Left Column: Text, Search, Filters */}
        <motion.div 
          className="transform-gpu w-full sm:w-1/2 flex flex-col justify-center items-center text-center lg:text-left lg:items-start order-1 lg:order-1 sm:pt-0 vh-short:py-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Group all content elements in a flex column with consistent gap */}
          <div className="flex flex-col gap-4 w-full vh-short:gap-2">
            {/* Title and animated text */}
            <AnimatePresence mode="wait">
              {!isSearchActive && (
                <motion.h1
                  className="transform-gpu text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl vh-short:text-lg font-bold"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-white mb-1 vh-short:mb-0">Our Work</span>
                    <div className="neon-text-accent w-full h-16 sm:h-20 md:h-24 lg:h-20 xl:h-20 vh-short:h-8 whitespace-normal break-words text-center lg:text-left text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl vh-short:text-xl" key={currentIndex}>
                      <AnimatedTypewriter word={storyContent[currentIndex].word} />
                    </div>
                  </div>
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Search form */}
            <motion.form
              onSubmit={handleSearch}
              className="transform-gpu flex gap-2 relative z-50 w-full"
              variants={searchFormVariants}
              initial="collapsed"
              animate={isSearchActive ? "expanded" : "collapsed"}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                layout: { type: "spring", stiffness: 300, damping: 30 }
              }}
              layout
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search stories..."
                  className="bg-black/50 border-gray-700 focus:border-cyberpunk-blue text-white pl-10 h-10 vh-short:h-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value && !isSearchActive) {
                      setIsSearchActive(true);
                    }
                  }}
                  onFocus={handleInputFocus}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                {isSearchActive && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); clearSearch(); }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                className="cyberpunk-button h-10 vh-short:h-8 px-4 vh-short:px-3 text-sm vh-short:text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                Search
              </Button>
            </motion.form>

            {/* Filter buttons */}
            <AnimatePresence>
              {!isSearchActive && (
                <>
                  {/* Default button layout for narrow widths */}
                  <div className="block min-[1050px]:hidden">
                    <motion.div
                      className={`transform-gpu w-full ${isSearchActive ? "max-w-xl" : "max-w-xs sm:max-w-md lg:max-w-xs xl:max-w-lg 2xl:max-w-xl"} mx-auto lg:mx-0 ${isSearchActive ? "fixed top-[9rem] left-1/2 -translate-x-1/2 z-[100] calc(100% - 3rem)" : ""} vh-short:py-0`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, height: 0, overflow: "hidden" }}
                      transition={{ duration: 0.3 }}
                    >
                      <MetaCategoryNavButtons
                        metaCategories={metaCategories}
                        onMetaCategorySelect={onHeroMetaButtonSelect}
                        gallerySectionId={gallerySectionId}
                      />
                    </motion.div>
                  </div>

                  {/* Swiper layout for wider widths */}
                  <div className="hidden min-[1050px]:block">
                    <MetaCategorySwiper
                      metaCategories={metaCategories}
                      selectedMetaCategoryId={selectedMetaCategoryId}
                      onMetaCategorySelect={onHeroMetaButtonSelect}
                    />
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column: Featured Project */}
        <AnimatePresence mode="wait">
          {!isSearchActive && featuredProject && (
            <motion.div 
              className="transform-gpu w-full sm:w-1/2 flex flex-col justify-center items-center order-1 sm:order-2 lg:order-2 mt-8 sm:mt-0 vh-short:mt-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, position: "absolute", zIndex: -1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center w-full max-w-full sm:max-w-2xl">
                {featuredProject}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="transform-gpu absolute bottom-4 vh-short:bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {!isSearchActive && (
          <>
            <span className="text-cyberpunk-pink text-sm mb-1 vh-short:mb-0">Explore Stories</span>
            <motion.div className="transform-gpu" animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ChevronDown className="h-5 w-5 vh-short:h-4 vh-short:w-4 text-cyberpunk-pink" />
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.section>
  );
}
