"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function CallToAction() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-black to-cyberpunk-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyberpunk-purple/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyberpunk-blue/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 glitch-text tracking-tight"
              data-text="Convert Viewers to Customers"
            >
              Convert Viewers to Customers
            </h2>
            <p className="text-base md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto font-medium">
            Engaging Content + Cutting-Edge Tech = More Conversions
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12">
              <Button
                className="cyberpunk-button text-base md:text-lg py-4 md:py-6 px-6 md:px-8 shadow-glow-blue"
                onClick={() => (window.location.href = "/contact")}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="border-cyberpunk-blue text-cyberpunk-blue hover:bg-cyberpunk-blue/10 text-base md:text-lg py-4 md:py-6 px-6 md:px-8 shadow-glow-subtle"
                onClick={() => (window.location.href = "/portfolio")}
              >
                Explore Our Work
              </Button>
            </div>
          </motion.div>
          {/* Newsletter - To be added later */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/60 backdrop-blur-sm rounded-lg border border-cyberpunk-pink/30 p-5 md:p-8"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Stay Updated</h3>
            <p className="text-sm md:text-base text-gray-300 mb-5 md:mb-6">
              Subscribe to our newsletter for the latest insights on storytelling, marketing trends, and creative
              inspiration.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black/50 border-gray-700 focus:border-cyberpunk-blue text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="cyberpunk-button whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="text-cyberpunk-green font-medium">Thanks for subscribing! We'll be in touch soon.</div>
            )}
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}

