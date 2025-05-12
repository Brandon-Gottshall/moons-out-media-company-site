"use client"

import { motion } from "framer-motion"

export default function CreativeProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We immerse ourselves in your brand, audience, and objectives to uncover the authentic story at your core.",
    },
    {
      number: "02",
      title: "Strategy",
      description: "We develop a comprehensive content strategy that aligns your story with measurable business goals.",
    },
    {
      number: "03",
      title: "Creation",
      description: "Our team brings your story to life through high-quality, emotionally resonant content production.",
    },
    {
      number: "04",
      title: "Distribution",
      description:
        "We implement targeted distribution strategies to ensure your content reaches and engages the right audience.",
    },
    {
      number: "05",
      title: "Analysis & Optimization",
      description: "We measure performance against KPIs, providing detailed analytics and insights to optimize future content. Using the data we collect, we can make adjustments to the strategy to improve results.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-16 text-center">
          Our Creative <span className="text-cyberpunk-blue">Process</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col md:flex-row items-start mb-16 relative group"
            >
              {/* Line connecting steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "calc(100% - 4rem)" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute left-6 top-16 w-0.5 bg-gradient-to-b from-cyberpunk-blue to-cyberpunk-pink hidden md:block"
                ></motion.div>
              )}

              {/* Step number */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-black flex items-center justify-center border-2 border-cyberpunk-blue text-cyberpunk-blue font-bold text-lg z-10 mb-4 md:mb-0 group-hover:border-cyberpunk-pink group-hover:text-cyberpunk-pink transition-all duration-300"
              >
                {step.number}
              </motion.div>

              {/* Step content */}
              <div className="md:ml-8 bg-black/30 p-6 rounded-lg border border-gray-800 w-full group-hover:border-cyberpunk-blue/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyberpunk-blue transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 max-w-2xl">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6 text-center">
              How We <span className="text-cyberpunk-pink">Work</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyberpunk-blue">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Initial Consultation</h4>
                <p className="text-sm text-gray-400">We begin with a deep dive into your brand, goals, and audience.</p>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyberpunk-pink/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyberpunk-pink">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Content Development</h4>
                <p className="text-sm text-gray-400">
                  Our team crafts your story with precision and creative excellence.
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyberpunk-green/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyberpunk-green">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Launch & Optimize</h4>
                <p className="text-sm text-gray-400">
                  We deploy your content and continuously refine for maximum impact.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

