"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import ContactHero from "@/components/contact/contact-hero"
import ContactFunnel from "@/components/contact/contact-funnel"
import ContactInfo from "@/components/contact/contact-info"
import ContactForm from "@/components/contact/contact-form"

interface FAQ {
  question: string
  answer: string
}

const faqList: FAQ[] = [
  {
    question: "What makes your authentic story telling approach different?",
    answer:
      "Our authentic story telling approach focuses on authentic storytelling that captures the real essence of your brand. Unlike traditional marketing videos, we create narrative-driven content that emotionally connects with your audience, resulting in higher engagement and conversion rates.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A standard authentic story telling brand video typically takes 4-6 weeks from concept to final delivery. Digital marketing campaigns may take 2-3 weeks to develop, while comprehensive brand storytelling packages can take 8-12 weeks.",
  },
  {
    question: "Do you work with clients outside your location?",
    answer:
      "We work with clients globally. Our team can travel to your location for filming, or we can coordinate remote production depending on your project needs. We've successfully completed projects across North America, Europe, and Asia.",
  },
  {
    question: "What's your pricing structure?",
    answer:
      "We create custom quotes based on your specific project requirements. Our pricing is transparent and comprehensive, with packages starting at $5,000 for smaller projects. We'll provide a detailed breakdown of costs during our initial consultation.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16 pt-20">
        <div className="max-w-5xl mx-auto">

          {/* Quick Form Section */}
          <motion.section
            id="quick-form"
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold my-4 inline-block relative">
                <span className="text-white">Quick Contact Form</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink"></span>
              </h2>
              <p className="text-gray-300">Need a quick response? Use our simplified contact form.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 inline-block relative">
                <span className="text-white">Frequently Asked Questions</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-blue"></span>
              </h2>
              <p className="text-gray-300">Quick answers to common questions about our services.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqList.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-300">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-pink/20 z-0"></div>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full grid grid-cols-12 gap-4">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-full border-r border-cyberpunk-blue/30"></div>
                  ))}
              </div>
              <div className="h-full w-full grid grid-rows-12 gap-4">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-full border-b border-cyberpunk-blue/30"></div>
                  ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

