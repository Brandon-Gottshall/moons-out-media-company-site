"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink"></div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to <span className="text-cyberpunk-pink">Tell Your Story</span>?
          </h2>
          <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-cyberpunk-blue/20 max-w-2xl mx-auto mb-8">
            <p className="text-xl text-gray-200">
              Let's create documentary-style content that captures the essence of your brand.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link
              href="/contact"
              className="relative overflow-hidden inline-block bg-gradient-to-r from-cyberpunk-blue via-cyberpunk-purple to-cyberpunk-pink text-white px-8 py-4 rounded-md uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(106,90,205,0.5)] group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-pink via-cyberpunk-purple to-cyberpunk-blue opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 