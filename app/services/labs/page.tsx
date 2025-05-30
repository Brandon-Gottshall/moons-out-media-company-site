"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, CheckCircle, Code2, Bot, Cloud, Zap, Shield, Gauge } from "lucide-react"
import { MASTER_SERVICES } from "@/app/data/services"


export default function LabsServicesPage() {
  const labsServices = MASTER_SERVICES.filter(service => service.branch === "labs")

  const sprintTimeline = [
    {
      phase: "Week 1",
      title: "Discovery & Blueprint",
      description: "Requirements gathering, technical architecture, and detailed project blueprint",
      icon: <Code2 className="w-6 h-6" />
    },
    {
      phase: "Week 2",
      title: "Core Development",
      description: "Backend infrastructure, database design, and core functionality implementation",
      icon: <Bot className="w-6 h-6" />
    },
    {
      phase: "Week 3",
      title: "Frontend & Integration",
      description: "User interface development, API integration, and comprehensive testing",
      icon: <Cloud className="w-6 h-6" />
    },
    {
      phase: "Launch",
      title: "Deploy & Optimize",
      description: "Production deployment, performance optimization, and knowledge transfer",
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const offerStack = [
    {
      title: "Free Technical Audit",
      price: "Free",
      description: "15-minute assessment of your current tech stack and growth opportunities",
      features: ["Performance Analysis", "Security Review", "Scalability Assessment", "Recommendations Report"],
      cta: "Book Free Audit",
      highlight: false
    },
    {
      title: "Technical Blueprint",
      price: "$750",
      description: "Comprehensive technical strategy and implementation roadmap",
      features: ["Detailed Architecture", "Technology Stack Selection", "Timeline & Milestones", "Cost Breakdown"],
      cta: "Get Blueprint",
      highlight: true
    },
    {
      title: "Full Development",
      price: "$6k-12k",
      description: "Complete custom development with 21-day delivery guarantee",
      features: ["Custom Development", "ADA Compliance", "Performance Optimization", "Security Implementation"],
      cta: "Start Project",
      highlight: false
    },
    {
      title: "Ongoing Care",
      price: "$199/mo",
      description: "Continuous monitoring, updates, and technical support",
      features: ["24/7 Monitoring", "Security Updates", "Performance Optimization", "Priority Support"],
      cta: "Add Care Plan",
      highlight: false
    }
  ]

  const proofPoints = [
    {
      metric: "100",
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
      question: "What's included in the 21-day sprint?",
      answer: "Complete custom development including design, backend, frontend, testing, deployment, and knowledge transfer. You'll receive a fully functional, production-ready application."
    },
    {
      question: "Do you guarantee ADA compliance?",
      answer: "Yes, all our builds meet WCAG 2.1 AA standards for accessibility, ensuring your site is usable by everyone and legally compliant."
    },
    {
      question: "What happens after the 21 days?",
      answer: "You receive full ownership of the code, documentation, and training. Our optional Care Plan provides ongoing support, but you're never locked in."
    },
    {
      question: "Can you work with our existing systems?",
      answer: "Absolutely. We specialize in integrations and can work with your current CRM, payment systems, databases, and third-party tools."
    },
    {
      question: "What if we need changes during development?",
      answer: "Our agile process includes regular check-ins and allows for adjustments. Major scope changes may affect timeline, but we'll communicate this upfront."
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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,105,180,0.15)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Launch a Lightning-Fast, ADA-Ready Site in 21 Days
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Custom web applications, AI automation, and cloud infrastructure built with Marine-veteran precision. 
            No templates, no compromises—just results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#audit" className="inline-flex items-center bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform">
              Book Free 15-Min Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 21-Day Sprint Timeline */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            21-Day Development Sprint
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {sprintTimeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                {/* Connection line */}
                {index < sprintTimeline.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyberpunk-pink to-transparent z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    {phase.icon}
                  </div>
                  <div className="text-sm text-cyberpunk-pink font-semibold mb-2">{phase.phase}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-gray-300">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-pink/5 to-cyberpunk-purple/5"></div>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Service Stack
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {offerStack.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-xl p-6 border ${
                  offer.highlight 
                    ? 'border-cyberpunk-pink bg-gradient-to-br from-cyberpunk-pink/20 to-cyberpunk-purple/20' 
                    : 'border-gray-800 bg-black/60'
                } hover:border-cyberpunk-pink/50 transition-all duration-300`}
              >
                {offer.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                  <div className="text-3xl font-bold text-cyberpunk-pink mb-2">{offer.price}</div>
                  <p className="text-gray-300 text-sm">{offer.description}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyberpunk-pink mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  offer.highlight
                    ? 'bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple text-white hover:scale-105'
                    : 'border border-cyberpunk-pink text-cyberpunk-pink hover:bg-cyberpunk-pink hover:text-white'
                }`}>
                  {offer.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Technical Services
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {labsServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 to-gray-900/60 border border-gray-800 p-6 h-full hover:border-cyberpunk-pink/50 transition-all duration-300 group-hover:scale-105">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.shortTitle || service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.shortDescription}</p>
                  <ul className="space-y-2">
                    {service.features?.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-cyberpunk-pink rounded-full mr-2"></div>
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
                <div className="text-4xl md:text-5xl font-bold text-cyberpunk-pink mb-2">{proof.metric}</div>
                <div className="text-xl font-semibold text-white mb-1">{proof.label}</div>
                <div className="text-gray-300">{proof.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly Embed */}
      <section id="audit" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Book Your Free 15-Minute Technical Audit
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-black/60 border border-gray-800 rounded-xl p-8">
                             <div className="h-96 flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-gray-300 mb-4">Ready to get started?</div>
                   <Link 
                     href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ10MfFXCLnngwj5wQ9CRQ6Mqw2r6sF1IBHMYr8y2pQmV4OZ8-kcvoeWxbx8mHgWM2QfLW4aPVZw"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform"
                   >
                     Book Free 15-Min Audit
                     <ArrowRight className="w-5 h-5 ml-2" />
                   </Link>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/60 border border-gray-800 rounded-xl p-6 hover:border-cyberpunk-pink/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 