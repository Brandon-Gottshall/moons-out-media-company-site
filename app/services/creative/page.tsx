"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Target, Users, TrendingUp, Camera, Edit, Share2 } from "lucide-react"
import { MASTER_SERVICES } from "@/app/data/services"
import ServiceShowcase from "@/components/services/service-showcase"

export default function CreativeServicesPage() {
  const creativeServices = MASTER_SERVICES.filter(service => service.branch === "media")

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We dive deep into your brand story, audience, and goals to craft the perfect narrative strategy.",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: "02", 
      title: "Storyboarding",
      description: "Visual planning and script development to ensure every frame serves your message.",
      icon: <Camera className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Production",
      description: "In-house shooting, editing, and perfecting every visual with Marine-veteran precision.",
      icon: <Edit className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Distribution",
      description: "Strategic campaign deployment with performance tracking and real-time optimization.",
      icon: <Share2 className="w-6 h-6" />
    }
  ]

  const caseStudies = [
    {
      title: "300% Conversion Increase",
      metric: "Digital Campaign",
      image: "/images/digital-marketing.webp",
      description: "Authentic storytelling drove unprecedented engagement"
    },
    {
      title: "2M+ Video Views",
      metric: "Brand Story",
      image: "/images/storytelling.webp", 
      description: "Documentary-style content that resonated deeply"
    },
    {
      title: "150% Follower Growth",
      metric: "Social Strategy",
      image: "/images/Whiteboard Colab Scene.webp",
      description: "Community-building content that converts"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black">
      {/* Global page styling elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-50 pointer-events-none"></div>

      {/* Cyberpunk grid overlay */}
      <div
        className="fixed inset-0 z-40 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 204, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 204, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(0,204,255,0.15)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Cinematic Storytelling That Converts
          </motion.h1>
          <motion.p 
            className="text-heading-md text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We craft authentic narratives that connect with your audience on an emotional level, 
            driving measurable results through compelling visual storytelling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white px-8 py-4 rounded-lg font-subheading hover:scale-105 transition-transform">
              Schedule Creative Discovery Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Creative Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {creativeServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 to-gray-900/60 border border-gray-800 p-6 h-full hover:border-cyberpunk-blue/50 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-heading-md font-heading text-white mb-3">{service.shortTitle || service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.shortDescription}</p>
                  <ul className="space-y-2">
                    {service.features?.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center text-body-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-cyberpunk-blue rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Showcase Carousel */}
      <section className="py-20 relative">
        <ServiceShowcase branch="media" />
      </section>

      {/* CTA Bar */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/20 to-cyberpunk-purple/20"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Tell Your Story?
          </motion.h2>
          <motion.p 
            className="text-heading-md text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's create cinematic content that converts your audience into customers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white px-8 py-4 rounded-lg font-subheading hover:scale-105 transition-transform">
              Schedule a Creative Discovery Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 