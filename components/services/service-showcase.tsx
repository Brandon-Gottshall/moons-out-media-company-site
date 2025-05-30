"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperInstance } from "swiper"
import { Navigation, A11y, EffectFade } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

import { MASTER_SERVICES } from "@/app/data/services"

const getServiceRgbaColor = (colorName: string, opacity: number = 1): string => {
  const colors: Record<string, string> = {
    blue: "0, 204, 255",
    pink: "255, 105, 180",
    purple: "106, 90, 205",
    green: "0, 255, 127",
    teal: "32, 178, 170",
    yellow: "255, 223, 0",
    cyan: "0, 255, 255",
  }
  return `rgba(${(colors[colorName] || colors.blue)}, ${opacity})`
}

export default function ServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperInstance | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const activeService = MASTER_SERVICES[activeIndex]
  const activeRgbaColor = getServiceRgbaColor(activeService.color)
  const activeTailwindColorName = activeService.color // e.g. "blue", "pink"
  // Pre-construct strings for dynamic Tailwind classes that involve interpolation
  const activeBorderClass = `border-cyberpunk-${activeTailwindColorName}`
  const activeTextClass = `text-cyberpunk-${activeTailwindColorName}`
  const activeBgClass = `bg-cyberpunk-${activeTailwindColorName}`
  const activeRingClass = `focus:ring-cyberpunk-${activeTailwindColorName}`

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex)
  }

  const slideTo = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index)
    }
  }

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.realIndex !== activeIndex) {
      swiperRef.current.slideToLoop(activeIndex)
    }
  }, [activeIndex])
  
  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto py-12 md:py-16 before:hidden before:h-96 before:scroll-mt-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative mb-8 md:mb-12 px-4">
        <Swiper
          modules={[Navigation, A11y, EffectFade]}
          onSwiper={(swiper: SwiperInstance) => { swiperRef.current = swiper }}
          onSlideChange={handleSlideChange}
          loop={true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.2}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          className="!py-8"
        >
          {MASTER_SERVICES.map((service, index) => {
            const isServiceActive = index === activeIndex;
            const serviceBorderClass = isServiceActive ? activeBorderClass : 'border-gray-800 hover:border-gray-700';
            const serviceTitleClass = isServiceActive ? activeTextClass : 'text-white';
            
            return (
              <SwiperSlide key={service.id} className="h-auto">
                <motion.div
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group border-2 ${serviceBorderClass} transition-all duration-300 ease-in-out bg-black/30`}
                  onClick={() => slideTo(index)}
                  whileHover={{ scale: 1.03 }}
                  animate={{ scale: isServiceActive ? 1.05 : 1, y: isServiceActive ? -5 : 0}}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                    <h4 className={`text-body-lg md:text-heading-md font-subheading transition-colors duration-300 ${serviceTitleClass}`}>
                      {service.title}
                    </h4>
                  </div>
                  {isServiceActive && (
                     <motion.div 
                      className="absolute top-2 right-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: activeRgbaColor }}
                      layoutId="active-indicator"
                    />
                  )}
                </motion.div>
              </SwiperSlide>
            )}
          )}
        </Swiper>

        <button
          aria-label="Previous service"
          className={`swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${activeRingClass}`}
          style={{ marginLeft: '-10px' }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Next service"
          className={`swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${activeRingClass}`}
          style={{ marginRight: '-10px' }}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div 
        className="relative bg-black/60 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden w-full max-w-4xl mx-auto p-6 md:p-8"
        aria-live="polite"
      >
        <motion.div
          className="absolute -inset-2 rounded-lg opacity-20 blur-2xl z-0"
          key={`${activeService.id}-glow`}
          initial={{ background: `radial-gradient(circle at 50% 50%, ${getServiceRgbaColor(activeService.color, 0)} 0%, transparent 70%)` }}
          animate={{
            background: `radial-gradient(circle at 50% 50%, ${getServiceRgbaColor(activeService.color, 0.5)} 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8 }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="mb-6 md:mb-8 text-center">
              <motion.h3
                className="text-3xl md:text-4xl font-heading text-white inline-block"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {activeService.title}
              </motion.h3>
              <motion.div
                className={`h-1 ${activeBgClass} mt-2 mx-auto w-1/3 md:w-1/4`}
                initial={{ width: "0%" }}
                animate={{ width: "33%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
            
            <motion.div
              className="bg-black/40 p-5 rounded-lg mb-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-300  md:text-body-lg leading-relaxed">{activeService.description}</p>
            </motion.div>

            <motion.div
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className={`text-heading-md font-emphasis ${activeTextClass} mb-4 flex items-center`}>
                <span className={`w-2.5 h-2.5 rounded-full ${activeBgClass} mr-2.5`}></span>
                Key Features:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {activeService.features.map((feature, index) => {
                  const featureIconContainerClass = `w-5 h-5 rounded-full bg-cyberpunk-${activeTailwindColorName}/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-2.5 border border-cyberpunk-${activeTailwindColorName}/30`;
                  const featureIconClass = `h-3 w-3 text-cyberpunk-${activeTailwindColorName}`;
                  return (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    >
                      <div className={featureIconContainerClass}>
                        <ChevronRight className={featureIconClass} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  )}
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center md:text-left flex justify-center"
            >
              <Link href={activeService.caseStudyLink}>
                <Button
                  className={`${activeBgClass} hover:bg-cyberpunk-${activeTailwindColorName}/80 text-white py-3 px-6  relative overflow-hidden group`}
                >
                  <span className="relative z-10 flex items-center">
                    View Our Projects <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%", opacity: 0.5 }}
                    whileHover={{ x: 0, opacity: 0.2 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  ></motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] z-[-1] pointer-events-none"></div>
    </motion.div>
  )
}

