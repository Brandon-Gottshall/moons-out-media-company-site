"use client"

import { motion } from "framer-motion"
import { ChevronDown, ArrowRight, Video, Code2 } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import ContactForm from "@/components/contact/contact-form"
import Link from "next/link"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

const topCreativeFaqs: FAQ[] = [
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

const topLabsFaqs: FAQ[] = [
  {
    question: "What's included in the 21-day sprint?",
    answer: "Complete custom development including design, backend, frontend, testing, deployment, and knowledge transfer. You'll receive a fully functional, production-ready application with full code ownership.",
  },
  {
    question: "Do you guarantee ADA compliance?",
    answer: "Yes, all our builds meet WCAG 2.1 AA standards for accessibility, ensuring your site is usable by everyone and legally compliant.",
  },
  {
    question: "What happens after the 21 days?",
    answer: "You receive full ownership of the code, documentation, and training. Our optional Care Plan provides ongoing support, but you're never locked in.",
  },
]

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

// Helper function to render simple markdown (bold)
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function ContactPage() {
  const [showMoreFaqs, setShowMoreFaqs] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Global page styling elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-50 pointer-events-none"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 pt-20">
        <div className="max-w-5xl mx-auto">

          {/* Hero Section */}
          <motion.section
            className="text-center mb-16 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink">
              Let's Build Something Amazing
            </h1>
            <p className="text-heading-md text-gray-300 max-w-2xl mx-auto">
              Tell us about your next project—or book time instantly.
            </p>
          </motion.section>

          {/* Service Selector Cards */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-white mb-4">Choose Your Path</h2>
              <p className="text-gray-300">Select the service that best fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {/* Creative Services Card */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-purple/20 border border-cyberpunk-blue/30 p-6 hover:border-cyberpunk-blue/60 transition-all duration-300">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center mb-4">
                    <Video className="w-6 h-6 text-cyberpunk-blue" />
                  </div>
                  <h3 className="text-heading-md font-heading text-white mb-2">Moons Out Media</h3>
                  <p className="text-gray-300 text-body-sm mb-4">Creative storytelling, video production, and digital marketing campaigns</p>
                  <ul className="space-y-1 text-label-base text-gray-400">
                    <li>• Brand Storytelling</li>
                    <li>• Digital Marketing</li>
                    <li>• Social Media Content</li>
                  </ul>
                </div>
              </div>

              {/* Labs Services Card */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyberpunk-pink/20 to-cyberpunk-purple/20 border border-cyberpunk-pink/30 p-6 hover:border-cyberpunk-pink/60 transition-all duration-300">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-cyberpunk-pink/20 flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6 text-cyberpunk-pink" />
                  </div>
                  <h3 className="text-heading-md font-heading text-white mb-2">Moons Out Labs</h3>
                  <p className="text-gray-300 text-body-sm mb-4">Web development, AI automation, and cloud infrastructure</p>
                  <ul className="space-y-1 text-label-base text-gray-400">
                    <li>• Web Applications</li>
                    <li>• AI & Automation</li>
                    <li>• Cloud & DevOps</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Instant Booking Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-white mb-4">Book Time Instantly</h2>
              <p className="text-gray-300">Skip the form and schedule a call directly</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link 
                href="https://calendar.app.google/WBDFCapdi8Z9UDvJ7"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple p-6 rounded-xl text-center hover:scale-105 transition-transform">
                  <h3 className="text-body-lg font-subheading text-white mb-2">Creative Discovery Call</h3>
                  <p className="text-gray-200 text-body-sm mb-4">30 minutes • Strategy & Planning</p>
                  <div className="flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              <Link 
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ10MfFXCLnngwj5wQ9CRQ6Mqw2r6sF1IBHMYr8y2pQmV4OZ8-kcvoeWxbx8mHgWM2QfLW4aPVZw"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple p-6 rounded-xl text-center hover:scale-105 transition-transform">
                  <h3 className="text-body-lg font-subheading text-white mb-2">15-Min Labs Audit</h3>
                  <p className="text-gray-200 text-body-sm mb-4">15 minutes • Technical Assessment</p>
                  <div className="flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </motion.section>

          {/* Contact Form Section */}
          <motion.section
            id="contact-form"
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-white mb-4">Send Us a Message</h2>
              <p className="text-gray-300">Prefer to write? Tell us about your project</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            id="faq"
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading text-white mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Creative FAQs */}
              <div>
                <h3 className="text-heading-md font-subheading text-cyberpunk-blue mb-4 text-center">Creative Services</h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {topCreativeFaqs.map((faq, index) => (
                    <AccordionItem key={`creative-faq-${index}`} value={`creative-faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Labs FAQs */}
              <div>
                <h3 className="text-heading-md font-subheading text-cyberpunk-pink mb-4 text-center">Labs & Tech</h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {topLabsFaqs.map((faq, index) => (
                    <AccordionItem key={`labs-faq-${index}`} value={`labs-faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Synergy FAQs */}
              <div>
                <h3 className="text-heading-md font-subheading text-cyberpunk-green mb-4 text-center">Working Together</h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {synergyFaqs.map((faq, index) => (
                    <AccordionItem key={`synergy-faq-${index}`} value={`synergy-faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="text-gray-300 whitespace-pre-line">{renderMarkdown(faq.answer)}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* See More Toggle */}
              <div className="text-center">
                <button
                  onClick={() => setShowMoreFaqs(!showMoreFaqs)}
                  className="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors flex items-center mx-auto"
                >
                  {showMoreFaqs ? "Show Less" : "See More FAQs"}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showMoreFaqs ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-pink/20 z-0"></div>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

            <div className="relative z-20 p-8 text-center">
              <h2 className="text-2xl font-heading text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6">
                Thanks for your interest! Expect a reply within 1 business day. 
                Prefer to pick a time? Use the booking links above.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="https://calendar.app.google/WBDFCapdi8Z9UDvJ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white px-6 py-3 rounded-lg font-subheading hover:scale-105 transition-transform"
                >
                  Creative Discovery Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ10MfFXCLnngwj5wQ9CRQ6Mqw2r6sF1IBHMYr8y2pQmV4OZ8-kcvoeWxbx8mHgWM2QfLW4aPVZw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple text-white px-6 py-3 rounded-lg font-subheading hover:scale-105 transition-transform"
                >
                  15-Min Labs Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

