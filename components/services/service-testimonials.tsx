"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

type Testimonial = {
  id: number
  name: string
  position: string
  company: string
  service: string
  quote: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Marketing Director",
    company: "TechVision Inc.",
    service: "Documentary-Style Production",
    quote:
      "Moons Out Media transformed our brand story into a compelling documentary that not only showcased our technology but the human impact behind it. The results were immediate—increased engagement, deeper customer connections, and a 40% boost in qualified leads.",
    image: "/images/testimonial-1.png",
  },
  {
    id: 2,
    name: "Samantha Chen",
    position: "CEO",
    company: "EcoSolutions",
    service: "Brand Storytelling",
    quote:
      "Working with Moons Out Media was transformative for our brand. They captured our mission and values in a way that resonated deeply with our audience. Their authentic storytelling approach helped us stand out in a crowded market and connect with customers who truly share our vision.",
    image: "/images/testimonial-2.png",
  },
  {
    id: 3,
    name: "Marcus Williams",
    position: "Head of Digital",
    company: "Urban Apparel",
    service: "Digital Marketing Campaigns",
    quote:
      "The digital campaign Moons Out Media created for us delivered exceptional ROI. Their data-driven approach combined with compelling storytelling resulted in a 215% increase in social engagement and a 78% boost in conversion rates. They truly understand how to blend creativity with performance.",
    image: "/images/testimonial-3.png",
  },
  {
    id: 4,
    name: "Priya Patel",
    position: "Founder",
    company: "Wellness Collective",
    service: "Social Media Content",
    quote:
      "Our social media presence was completely transformed by Moons Out Media. Their content strategy not only increased our following by 300% but created a genuine community around our brand. The authentic approach to storytelling made all the difference in building trust with our audience.",
    image: "/images/testimonial-4.png",
  },
]

export default function ServiceTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <motion.div
      ref={containerRef}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="relative bg-black/80 backdrop-blur-sm border border-cyberpunk-pink/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(255,105,180,0.15)]">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyberpunk-pink/5 blur-3xl"
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

        <div className="absolute top-8 right-8 text-cyberpunk-pink opacity-20">
          <Quote size={120} />
        </div>

        <div className="p-8 md:p-12 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-[300px] flex flex-col"
            >
              <motion.div
                className="bg-black/40 p-6 rounded-lg mb-8 border border-gray-800/50 relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent, rgba(255, 105, 180, 0.1), transparent)",
                      "linear-gradient(90deg, transparent, rgba(255, 105, 180, 0), transparent)",
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

                <blockquote className="text-xl text-white italic leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
              </motion.div>

              <motion.div
                className="mt-auto flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mr-6 border-2 border-cyberpunk-pink/30 relative">
                  {/* Pulsing border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyberpunk-pink opacity-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  ></motion.div>

                  <img
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-lg text-cyberpunk-blue">
                    {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                  </p>
                  <p className="text-base text-white mt-1">Service: {testimonials[currentIndex].service}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-800">
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-cyberpunk-pink w-6 shadow-[0_0_10px_rgba(255,105,180,0.5)]"
                    : "bg-gray-700 hover:bg-gray-500"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="flex space-x-3">
            <motion.button
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors border border-gray-800 hover:border-cyberpunk-pink/50"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors border border-gray-800 hover:border-cyberpunk-pink/50"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Digital noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-5 pointer-events-none"></div>
      </div>
    </motion.div>
  )
}

