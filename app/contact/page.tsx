"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import ContactHero from "@/components/contact/contact-hero"
import ContactFunnel from "@/components/contact/contact-funnel"
import ContactInfo from "@/components/contact/contact-info"
import ContactForm from "@/components/contact/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Scroll Indicator */}
      <div className="relative">
        <ContactHero />

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 mx-auto w-fit mb-4 flex flex-col items-center z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-cyberpunk-pink text-sm mb-1">Scroll for details</p>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="h-6 w-6 text-cyberpunk-pink" />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink">
              What's Your Biggest Media Challenge?
            </h2>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg max-w-3xl mx-auto border border-gray-800">
              <p className="text-white text-lg leading-relaxed">
                Tell us what's holding your brand back, and we'll show you how our documentary-style approach can
                transform your results. Our team is ready to craft a custom solution for your specific needs.
              </p>
            </div>
          </motion.div>

          {/* Contact Methods Tabs */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["Guided Process", "Quick Form"].map((tab, index) => (
                <motion.a
                  key={tab}
                  href={`#${tab.toLowerCase().replace(" ", "-")}`}
                  className="px-6 py-3 rounded-full bg-black border border-cyberpunk-blue/30 text-white hover:border-cyberpunk-pink/70 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(101, 206, 240, 0.5)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {tab}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Guided Process Section */}
          <section id="guided-process" className="mb-20">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="lg:col-span-8">
                <ContactFunnel />
              </div>

              <div className="lg:col-span-4">
                <ContactInfo />
              </div>
            </motion.div>
          </section>

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
              <h2 className="text-3xl font-bold mb-4 inline-block relative">
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
              <div className="space-y-6">
                {[
                  {
                    question: "What makes your documentary-style approach different?",
                    answer:
                      "Our documentary-style approach focuses on authentic storytelling that captures the real essence of your brand. Unlike traditional marketing videos, we create narrative-driven content that emotionally connects with your audience, resulting in higher engagement and conversion rates.",
                  },
                  {
                    question: "How long does a typical project take?",
                    answer:
                      "Project timelines vary based on complexity and scope. A standard documentary-style brand video typically takes 4-6 weeks from concept to final delivery. Digital marketing campaigns may take 2-3 weeks to develop, while comprehensive brand storytelling packages can take 8-12 weeks.",
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
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/40 border border-gray-800 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{
                      borderColor: "rgba(101, 206, 240, 0.5)",
                      boxShadow: "0 0 15px rgba(101, 206, 240, 0.2)",
                    }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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

            <div className="relative z-20 p-10 md:p-16 text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Ready to Transform Your Media Presence?
              </motion.h2>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Let's start crafting your brand's unique story today. Our team is ready to help you stand out in a
                crowded digital landscape.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a
                  href="#guided-process"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink text-white font-bold rounded-md hover:from-cyberpunk-pink hover:to-cyberpunk-blue transition-all duration-300 shadow-lg hover:shadow-cyberpunk-blue/50"
                >
                  Start Your Project Now
                </a>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

