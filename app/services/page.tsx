"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Video, Code2 } from "lucide-react"

export default function ServicesChooserPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black">
      {/* Global page styling elements */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-50 pointer-events-none"></div>

      {/* Cyberpunk grid overlay - very subtle */}
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
            className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-pink"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Path
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you need cinematic storytelling or cutting-edge technology, we've got you covered.
          </motion.p>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Creative Services Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <Link href="/services/creative">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyberpunk-blue/20 to-cyberpunk-purple/20 border border-cyberpunk-blue/30 p-8 h-full hover:border-cyberpunk-blue/60 transition-all duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center mb-4 group-hover:bg-cyberpunk-blue/30 transition-colors">
                      <Video className="w-8 h-8 text-cyberpunk-blue" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Creative Services</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      Cinematic storytelling that converts. From brand narratives to digital campaigns that drive real results.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative z-10 mb-6">
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyberpunk-blue rounded-full mr-3"></div>
                        Digital Marketing Campaigns
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyberpunk-blue rounded-full mr-3"></div>
                        Brand Storytelling
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyberpunk-blue rounded-full mr-3"></div>
                        Social Media Content
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex items-center text-cyberpunk-blue group-hover:text-white transition-colors">
                    <span className="font-semibold">Explore Creative Services</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Labs & Tech Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="group"
            >
              <Link href="/services/labs">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyberpunk-pink/20 to-cyberpunk-purple/20 border border-cyberpunk-pink/30 p-8 h-full hover:border-cyberpunk-pink/60 transition-all duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 rounded-full bg-cyberpunk-pink/20 flex items-center justify-center mb-4 group-hover:bg-cyberpunk-pink/30 transition-colors">
                      <Code2 className="w-8 h-8 text-cyberpunk-pink" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Labs & Tech</h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      Launch a lightning-fast, ADA-ready site in 21 days. Custom web apps, AI automation, and cloud solutions.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative z-10 mb-6">
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyberpunk-pink rounded-full mr-3"></div>
                        Web Application Development
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyberpunk-pink rounded-full mr-3"></div>
                        AI & Automation Engineering
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-cyberpunk-pink rounded-full mr-3"></div>
                        Cloud & DevOps Solutions
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex items-center text-cyberpunk-pink group-hover:text-white transition-colors">
                    <span className="font-semibold">Explore Labs & Tech</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}

