"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion"
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

// Allow filtering by service branch
type ServiceBranch = 'media' | 'labs'
interface ServiceShowcaseProps {
  branch?: ServiceBranch
}

export default function ServiceShowcase({ branch }: ServiceShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperInstance | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  // Detect desktop width for static layout
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter services by branch if provided
  const services = branch ? MASTER_SERVICES.filter(s => s.branch === branch) : MASTER_SERVICES
  const activeService = services[activeIndex]
  const activeBorderClass = "border-primary/40"
  const inactiveBorderClass = "border-border/60 hover:border-primary/40"
  const activeTextClass = "text-primary"
  const activeBgClass = "bg-primary/20"
  const activeRingClass = "focus:ring-primary/50"

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
        <LayoutGroup>
        {isDesktop ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const isServiceActive = index === activeIndex
              const serviceBorderClass = isServiceActive ? activeBorderClass : inactiveBorderClass
              const serviceTitleClass = isServiceActive ? activeTextClass : "text-foreground"
              return (
                <motion.div
                  key={service.id}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden group border-2 ${serviceBorderClass} transition-all duration-300 ${isServiceActive ? 'scale-105 -translate-y-1.5' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-background/70" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-center">
                    <h4 className={`text-body-lg md:text-heading-md font-subheading transition-colors duration-300 ${serviceTitleClass}`}>
                      {service.title}
                    </h4>
                  </div>
                  {isServiceActive && (
                    <motion.div
                      className="absolute top-2 right-2 w-3 h-3 rounded-full"
                      className="bg-primary"
                      layoutId="active-indicator"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, A11y, EffectFade]}
            onSwiper={(swiper: SwiperInstance) => { swiperRef.current = swiper }}
            onSlideChange={handleSlideChange}
            loop={false}
            rewind={true}
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
            {services.map((service, index) => {
              const isServiceActive = index === activeIndex;
              const serviceBorderClass = isServiceActive ? activeBorderClass : inactiveBorderClass;
              const serviceTitleClass = isServiceActive ? activeTextClass : "text-foreground";
              
              return (
                <SwiperSlide key={service.id} className="h-auto">
                  <motion.div
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group border-2 ${serviceBorderClass} transition-all duration-300 ease-in-out bg-background/80`}
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
                    <div className="absolute inset-0 bg-background/70" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                      <h4 className={`text-body-lg md:text-heading-md font-subheading transition-colors duration-300 ${serviceTitleClass}`}>
                        {service.title}
                      </h4>
                    </div>
                    {isServiceActive && (
                       <motion.div 
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        className="bg-primary"
                        layoutId="active-indicator"
                      />
                    )}
                  </motion.div>
                </SwiperSlide>
              )}
            )}
          </Swiper>
        )}
        </LayoutGroup>

        {!isDesktop && (
          <>
            <button
              aria-label="Previous service"
              className={`swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 z-20 p-2 rounded-full bg-background/80 hover:bg-background transition-all text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${activeRingClass}`}
              style={{ marginLeft: '-10px' }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              aria-label="Next service"
              className={`swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 z-20 p-2 rounded-full bg-background/80 hover:bg-background transition-all text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${activeRingClass}`}
              style={{ marginRight: '-10px' }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div 
        className="relative bg-background/90 backdrop-blur-md border border-border/60 rounded-lg overflow-visible w-full max-w-4xl mx-auto p-6 md:p-8"
        aria-live="polite"
      >
        <motion.div
          className="absolute inset-x-0 top-[-20%] bottom-[-50%] rounded-lg opacity-20 blur-2xl z-0 bg-primary/10"
          key={`${activeService.id}-glow`}
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
                className="text-3xl md:text-4xl font-heading text-foreground inline-block"
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
              className="bg-background/80 p-5 rounded-lg mb-6 border border-border/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-muted-foreground md:text-body-lg leading-relaxed">{activeService.description}</p>
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
                  const featureIconContainerClass = "w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5 mr-2.5 border border-primary/30";
                  const featureIconClass = "h-3 w-3 text-primary";
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
                      <span className="text-muted-foreground">{feature}</span>
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
                <Button className="btn-primary py-3 px-6 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    View Our Projects <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
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
