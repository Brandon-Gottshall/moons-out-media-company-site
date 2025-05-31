"use client"

import { motion } from "framer-motion"
import CreativeProcess from "@/components/about/creative-process"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

// FAQs for Working Together section
interface FAQ { question: string; answer: string }
const synergyFaqs: FAQ[] = [
  {
    question: "How do Moons Out Media and Labs work together?",
    answer: "By combining cinematic storytelling with rock-solid engineering, we deliver end-to-end solutions that are both compelling and reliable. Your narrative and technical requirements feed into one unified workflow—no handoffs, no siloed teams.",
  },
  {
    question: "What's the advantage of having creative and technical under one roof?",
    answer: "You save time, reduce miscommunication, and cut costs. Our cross-team collaboration means creative ideas are technically vetted from day one, and technical builds are informed by strategic storytelling.",
  },
]

export default function CreativeProcessPage() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-black/90">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-blue/5 via-transparent to-cyberpunk-pink/5" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-heading mb-6">
            Our Creative <span className="text-cyberpunk-blue">Process</span>
          </h1>
          <p className="text-heading-md md:text-2xl text-gray-300 max-w-3xl mx-auto">
            From discovery to optimization, discover how we bring your vision to life
          </p>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyberpunk-blue rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-cyberpunk-pink rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-cyberpunk-green rounded-full animate-pulse delay-2000" />
        </div>
      </section>

      {/* Content Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4"
      >
        <CreativeProcess />
      </motion.div>

      {/* Working Together FAQs */}
      <motion.section
        id="faq"
        className="py-20 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">Working Together</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {synergyFaqs.map((faq, index) => (
              <AccordionItem key={`synergy-faq-${index}`} value={`synergy-faq-${index}`}>
                <AccordionTrigger className="text-left text-body-lg font-subheading text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-300">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </div>
  )
} 