"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

type Service = {
  id: string
  title: string
  description: string
  features: string[]
  image: string
  caseStudyLink: string
  color: string
}

const services: Service[] = [
  {
    id: "documentary",
    title: "Documentary-Style Production",
    description:
      "We create cinematic, documentary-style content that captures the authentic essence of your brand and connects with your audience on an emotional level.",
    features: [
      "Brand Documentaries",
      "Behind-the-Scenes Features",
      "Customer Journey Stories",
      "Company Culture Films",
      "Product Origin Stories",
    ],
    image: "/images/documentary.png",
    caseStudyLink: "/portfolio/documentary",
    color: "blue",
  },
  {
    id: "digital",
    title: "Digital Marketing Campaigns",
    description:
      "We develop targeted digital campaigns that combine compelling storytelling with data-driven strategies to drive measurable results for your business.",
    features: [
      "Social Media Campaigns",
      "Video Ad Series",
      "Conversion-Focused Content",
      "Performance Analytics",
      "A/B Testing & Optimization",
    ],
    image: "/images/digital-marketing.png",
    caseStudyLink: "/portfolio/digital-marketing",
    color: "pink",
  },
  {
    id: "storytelling",
    title: "Brand Storytelling",
    description:
      "We craft authentic narratives that communicate your brand's values, mission, and unique selling proposition in a way that resonates with your target audience.",
    features: [
      "Brand Narrative Development",
      "Visual Identity Enhancement",
      "Messaging Strategy",
      "Audience Connection Mapping",
      "Emotional Engagement Tactics",
    ],
    image: "/images/brand-storytelling.png",
    caseStudyLink: "/portfolio/storytelling",
    color: "purple",
  },
  {
    id: "social",
    title: "Social Media Content",
    description:
      "We create engaging, platform-optimized content that builds community, drives engagement, and establishes your brand as a thought leader in your industry.",
    features: [
      "Platform-Specific Content",
      "Community Building",
      "Engagement Strategies",
      "Influencer Collaborations",
      "Viral Content Development",
    ],
    image: "/images/social-media.png",
    caseStudyLink: "/portfolio/social-media",
    color: "green",
  },
]

const getServiceColor = (color: string) => {
  switch (color) {
    case "blue":
      return "rgba(0, 204, 255, 1)"
    case "pink":
      return "rgba(255, 105, 180, 1)"
    case "purple":
      return "rgba(106, 90, 205, 1)"
    case "green":
      return "rgba(0, 255, 127, 1)"
    default:
      return "rgba(0, 204, 255, 1)"
  }
}

export default function ServiceShowcase() {
  const [activeService, setActiveService] = useState<Service>(services[0])
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Get color values for the active service
  const activeColor = getServiceColor(activeService.color)

  return (
    <motion.div
      ref={containerRef}
      id="services-showcase"
      className="relative bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-lg opacity-20 z-0 blur-xl"
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8 }}
      ></motion.div>

      <div className="flex flex-col md:flex-row relative z-10">
        {/* Service Selection - Left Column */}
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800">
          <div className="p-6 border-b border-gray-800 bg-black/40">
            <h3 className="text-xl font-bold text-white">Our Services</h3>
            <p className="text-gray-400 text-sm mt-1">Select a service to learn more</p>
          </div>

          <div className="divide-y divide-gray-800">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                className={`w-full text-left p-6 transition-all relative ${
                  activeService.id === service.id
                    ? `bg-black/70 border-l-4 border-cyberpunk-${service.color}`
                    : "hover:bg-black/40 border-l-4 border-transparent"
                }`}
                onClick={() => setActiveService(service)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {/* Hover effect */}
                {activeService.id !== service.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r opacity-0"
                    style={{
                      background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(${getServiceColor(service.color).replace("1)", "0.1)")}) 100%)`,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                )}

                <h4
                  className={`text-lg font-medium relative z-10 ${
                    activeService.id === service.id ? `text-cyberpunk-${service.color}` : "text-white"
                  }`}
                >
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2 relative z-10">{service.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Service Details - Right Column */}
        <div className="md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <div className="relative aspect-video overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>

                <motion.img
                  src={activeService.image || "/placeholder.svg"}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Animated overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 z-20"
                  style={{
                    background: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(${activeColor.replace("1)", "0.2)")}) 100%)`,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>

                {/* Service title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                  <motion.h3
                    className={`text-3xl font-bold text-white inline-block`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {activeService.title}
                    <motion.div
                      className={`h-1 bg-cyberpunk-${activeService.color} mt-2`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    ></motion.div>
                  </motion.h3>
                </div>
              </div>

              <div className="p-8">
                <motion.div
                  className="bg-black/40 p-5 rounded-lg mb-6 border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-white text-lg leading-relaxed">{activeService.description}</p>
                </motion.div>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h4 className={`text-lg font-medium text-cyberpunk-${activeService.color} mb-4 flex items-center`}>
                    <span className={`w-2 h-2 rounded-full bg-cyberpunk-${activeService.color} mr-2`}></span>
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeService.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full bg-cyberpunk-${activeService.color}/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3 border border-cyberpunk-${activeService.color}/30`}
                        >
                          <ChevronRight className={`h-3 w-3 text-cyberpunk-${activeService.color}`} />
                        </div>
                        <span className="text-white">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button
                    className={`bg-cyberpunk-${activeService.color} hover:bg-cyberpunk-${activeService.color}/80 text-white py-6 text-base relative overflow-hidden group`}
                    asChild
                  >
                    <Link href={activeService.caseStudyLink}>
                      <span className="relative z-10 flex items-center">
                        View Case Studies <ExternalLink className="ml-2 h-4 w-4" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-black/20"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: "100%", opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Digital noise overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-20 pointer-events-none"></div>
    </motion.div>
  )
}

