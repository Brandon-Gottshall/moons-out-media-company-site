"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Target, Users, TrendingUp, Camera, Edit, Share2 } from "lucide-react"
import { MASTER_SERVICES } from "@/app/data/services"
import ServiceShowcase from "@/components/services/service-showcase"
import { useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

// Define FAQ type and creative services FAQs
interface FAQ { question: string; answer: string }

const creativeFaqs: FAQ[] = [
  {
    question: "What services does Moons Out Media offer?",
    answer: `We provide cinematic storytelling and digital marketing services including:

• **Brand Storytelling & Video Production** - Documentary-style videos that tell your brand's story authentically
• **Digital Marketing Campaigns** - Targeted ad campaigns built around clear KPIs and continuous optimization
• **Social Media Content** - Platform-optimized content that builds community and drives engagement

All services focus on authentic storytelling that converts viewers into customers.`,
  },
  {
    question: "What can I expect from your creative process?",
    answer: `A transparent, collaborative workflow:

1. **Discovery** – Understand your story, goals, and audience
2. **Storyboarding** – Visual planning and script development  
3. **Production** – In-house shooting, editing, and perfecting every visual
4. **Distribution** – Strategic campaign deployment with performance tracking

You'll be involved at every stage with no surprises.`,
  },
  {
    question: "How do you measure creative campaign success?",
    answer: "By real metrics and ROI. We set goals (website leads, conversions, video engagement) upfront and build campaigns around them. You'll receive regular reports showing impressions, click-throughs, and conversions, then use that data to optimize in real time.",
  },
]

// Simple markdown renderer for bold text
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

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
            linear-gradient(to right, rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--cp-blue-rgb), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-visible">
        <div className="absolute inset-x-0 top-0 bottom-[-50%] bg-[radial-gradient(circle_at_top_center,rgba(var(--cp-blue-rgb),0.15)_0%,transparent_50%)]"></div>
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

      {/* Service Showcase Carousel */}
      <section className="pt-20 relative">
        <ServiceShowcase branch="media" />
      </section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="pb-20 relative mx-4 md:mx-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="text-heading-md font-subheading text-cyberpunk-blue mb-4 text-center">Creative Services</h3>
            <Accordion type="single" collapsible className="space-y-3">
              {creativeFaqs.map((faq, index) => (
                <AccordionItem key={`creative-faq-${index}`} value={`creative-faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.section>

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
