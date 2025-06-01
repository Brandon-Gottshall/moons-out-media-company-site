"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, CheckCircle, Code2, Bot, Cloud, Zap, Shield, Gauge } from "lucide-react"
import { MASTER_SERVICES } from "@/app/data/services"
import ServiceShowcase from "@/components/services/service-showcase"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"


export default function LabsServicesPage() {
  const labsServices = MASTER_SERVICES.filter(service => service.branch === "labs")




  const proofPoints = [
    {
      metric: "90+",
      label: "Lighthouse Score",
      description: "Mobile Performance"
    },
    {
      metric: "< 2s",
      label: "Load Time",
      description: "Average Page Speed"
    },
    {
      metric: "99.9%",
      label: "Uptime",
      description: "Reliability Guarantee"
    }
  ]

  const faqs = [
    {
      question: "Do you guarantee ADA compliance?",
      answer: "Yes, all our builds meet WCAG 2.1 AA standards for accessibility, ensuring your site is usable by everyone and legally compliant."
    },
    {
      question: "What happens after we finish your project?",
      answer: "You receive full ownership of the code, documentation, and training. Our optional Care Plan and retainer packages provide ongoing support, but you're never locked in."
    },
    {
      question: "Can you work with our existing systems?",
      answer: "Absolutely. We excel in integrations and can work with your current CRM, payment systems, databases, and third-party tools. We're also experts in building custom solutions to fit your unique needs."
    },
    {
      question: "What if we need changes during development?",
      answer: "Our agile development process includes regular check-ins and allows for adjustments. We include you in the design process and can make changes as needed. Major scope changes may affect timeline, but we'll communicate this upfront or when changes are requested."
    },
    {
      question: "What technologies do you use? How do we know our project is secure, reliable, and future-proof?",
      answer: "We use the latest and greatest technologies to build your project. We're also experts in security and reliability. We're also experts in building custom solutions to fit your unique needs."
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
            linear-gradient(to right, rgba(255, 105, 180, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 105, 180, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-visible">
        <div className="absolute inset-x-0 top-0 bottom-[-50%] bg-[radial-gradient(circle_at_top_center,rgba(255,105,180,0.15)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Launch a Lightning-Fast, ADA-Ready Site in No Time!
          </motion.h1>
          <motion.p 
            className="text-heading-md text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Custom web applications, AI automation, and cloud infrastructure built with Marine-veteran precision, adaptability, and attention to detail. 
            No compromises—just results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#audit" className="inline-flex items-center bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple text-white px-8 py-4 rounded-lg font-subheading hover:scale-105 transition-transform">
              Book Free 15-Min Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Showcase Carousel */}
      <section className="py-20 relative">
        <ServiceShowcase branch="labs" />
      </section>

      {/* Proof Strip */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-pink/10 to-cyberpunk-purple/10"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {proofPoints.map((proof, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-4xl md:text-5xl font-heading text-cyberpunk-pink mb-2">{proof.metric}</div>
                <div className="text-heading-md font-subheading text-white mb-1">{proof.label}</div>
                <div className="text-gray-300">{proof.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative mx-4 md:mx-0">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
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
        </div>
      </section>
    </div>
  )
} 