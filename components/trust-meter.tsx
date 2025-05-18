"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

type TrustMeterProps = {
  className?: string
}

type Testimonial = {
  id: number
  name: string
  position: string
  company: string
  quote: string
  image: string
}

type Client = {
  id: number
  name: string
  logo: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Chief Marketing Officer",
    company: "EcoTech Innovations",
    quote:
      "Moons Out Media transformed our brand narrative. Their authentic story telling approach captured the essence of our mission in a way traditional marketing never could.",
    image: "/images/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Founder & CEO",
    company: "Urban Fitness",
    quote:
      "The authenticity of the content Moons Out created for us resonated deeply with our audience. We saw immediate engagement and conversion improvements.",
    image: "/images/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    position: "Creative Director",
    company: "Artisan Collective",
    quote:
      "Working with Moons Out Media was transformative. They understood our craftspeople's stories and translated them into compelling content that drove real business results.",
    image: "/images/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "David Park",
    position: "VP of Marketing",
    company: "TechStart Inc.",
    quote:
      "Moons Out Media helped us humanize our complex technology through storytelling. Our audience finally understood not just what we do, but why it matters.",
    image: "/images/placeholder.svg?height=100&width=100",
  },
]

const clients: Client[] = [
  { id: 1, name: "EcoTech Innovations", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 2, name: "Urban Fitness", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 3, name: "Artisan Collective", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 4, name: "TechStart Inc.", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 5, name: "Global Brands", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 6, name: "City Tourism Board", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 7, name: "Fashion Forward", logo: "/images/placeholder.svg?height=60&width=120" },
  { id: 8, name: "Culinary Masters", logo: "/images/placeholder.svg?height=60&width=120" },
]

const stats = [
  { label: "Client Satisfaction", value: "98%" },
  { label: "Projects Completed", value: "250+" },
  { label: "Industry Awards", value: "42" },
  { label: "Years of Experience", value: "15+" },
]

export default function TrustMeter({ className }: TrustMeterProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [trustLevel, setTrustLevel] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const meterProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const unsubscribe = meterProgress.onChange((latest) => {
      setTrustLevel(Math.min(Math.round(latest), 100))
    })

    return () => unsubscribe()
  }, [meterProgress])

  return (
    <div ref={containerRef} className={cn("relative py-12", className)}>
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 neon-text">Trust Meter</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          See how our clients' trust grows as you explore our proven track record of success.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative h-8 bg-black/50 rounded-full overflow-hidden border border-gray-700 mb-4">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink rounded-full"
            style={{ width: `${trustLevel}%` }}
          ></motion.div>

          {[25, 50, 75].map((mark) => (
            <div key={mark} className="absolute top-0 bottom-0 w-0.5 bg-gray-700" style={{ left: `${mark}%` }}></div>
          ))}

          <motion.div
            className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: trustLevel > 10 ? 1 : 0 }}
          >
            <span className="text-white font-bold text-sm">Trust Level: {trustLevel}%</span>
          </motion.div>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>Initial Contact</span>
          <span>Discovery</span>
          <span>Collaboration</span>
          <span>Long-term Partnership</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Testimonials */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-cyberpunk-blue/30 p-6 h-[400px] relative overflow-hidden">
          <h4 className="text-xl font-semibold text-white mb-6">Client Testimonials</h4>

          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 50,
                  zIndex: activeTestimonial === index ? 10 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image || "/images/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-white">{testimonial.name}</h5>
                      <p className="text-sm text-gray-400">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <blockquote className="flex-1 italic text-gray-300 border-l-2 border-cyberpunk-blue pl-4">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-center">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    activeTestimonial === index ? "bg-cyberpunk-blue" : "bg-gray-600"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-cyberpunk-pink/30 p-6">
          <h4 className="text-xl font-semibold text-white mb-6">By the Numbers</h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-black/50 backdrop-blur-sm border border-cyberpunk-blue/20 p-3 md:p-4 rounded-lg text-center shadow-xl"
              >
                <p className="text-3xl font-bold text-cyberpunk-gold mb-2">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-white text-center mb-8">Trusted By</h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-black/30 p-4 rounded-lg flex items-center justify-center h-24 border border-gray-800 hover:border-cyberpunk-blue/30 transition-colors"
            >
              <img src={client.logo || "/images/placeholder.svg"} alt={client.name} className="max-h-12 max-w-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Link href="/contact">
          <button className="bg-cyberpunk-blue text-white px-4 py-2 rounded-full">
            Contact Us
          </button>
        </Link>
      </motion.div>
    </div>
  )
}

