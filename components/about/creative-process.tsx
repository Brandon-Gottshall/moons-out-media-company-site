"use client";

import { useRef } from "react";
import { motion, useScroll, useInView, useTransform } from "framer-motion";

type ProcessStep = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We begin by deeply understanding your brand, audience, goals, and challenges through collaborative workshops and research.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Strategy",
    description:
      "We develop a tailored content strategy that aligns with your business objectives and resonates with your target audience.",
    icon: "🧠",
  },
  {
    id: 3,
    title: "Creation",
    description:
      "Our creative team brings your story to life through high-quality production, authentic storytelling, and cinematic techniques.",
    icon: "🎬",
  },
  {
    id: 4,
    title: "Distribution",
    description:
      "We implement targeted distribution strategies to ensure your content reaches and engages your ideal audience.",
    icon: "🚀",
  },
  {
    id: 5,
    title: "Analysis & Optimization",
    description:
      "We measure performance against KPIs, providing detailed analytics and insights to optimize future content. Using the data we collect, we can make adjustments to the strategy to improve results.",
    icon: "📊",
  },
];

export default function CreativeProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-heading mb-16 text-center">
          Our Creative <span className="text-cyberpunk-blue">Process</span>
        </h2>

        {/* Our Creative Process */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-1 bg-gray-800 hidden md:block"></div>
              <motion.div
                className="absolute left-8 md:left-16 top-0 bottom-0 w-1 hidden md:block"
                style={{
                  scaleY: progressWidth,
                  transformOrigin: "top",
                  background:
                "linear-gradient(to bottom, var(--cp-blue), var(--cp-pink), var(--cp-green))",
                }}
              ></motion.div>

          {/* Glowing dot that follows progress */}
          <motion.div
            className="absolute left-8 md:left-16 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(var(--ui-white-rgb), 0.8)] hidden md:block z-20"
            style={{
              top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              translateX: "-50%",
            }}
          ></motion.div>

          {/* Process Steps */}
          <div className="space-y-16 md:space-y-28">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-start gap-6 md:gap-10"
              >
                <div className="flex-shrink-0 w-16 h-16 md:w-32 md:h-32 rounded-full bg-black/80 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(var(--cp-blue-rgb),0.2)] relative">
                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyberpunk-blue opacity-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  ></motion.div>

                  <span className="text-3xl md:text-5xl">{step.icon}</span>
                </div>

                <div className="flex-1 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 md:p-8 shadow-[0_4px_12px_rgba(var(--ui-black-rgb), 0.2)] relative overflow-hidden group">
                  {/* Animated gradient border on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                    background: [
                      "linear-gradient(90deg, transparent, rgba(var(--cp-blue-rgb), 0.1), transparent)",
                      "linear-gradient(90deg, transparent, rgba(var(--cp-pink-rgb), 0.1), transparent)",
                      "linear-gradient(90deg, transparent, rgba(var(--cp-green-rgb), 0.1), transparent)",
                      "linear-gradient(90deg, transparent, rgba(var(--cp-blue-rgb), 0.1), transparent)",
                    ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  ></motion.div>

                  <div className="flex items-center mb-4 md:mb-6 relative z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyberpunk-purple flex items-center justify-center mr-4 shadow-[0_0_10px_rgba(var(--cp-purple-light-rgb),0.3)]">
                      <span className=" md:text-body-lg text-white font-heading">
                        {step.id}
                      </span>
                    </div>
                    <h3 className="text-heading-md md:text-2xl font-heading text-white">
                      {step.title}
                    </h3>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg relative z-10">
                    <p className="text-white text-body-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process for working with us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-black/40 border border-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-heading mb-6 text-center">
              How We <span className="text-cyberpunk-pink">Work</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyberpunk-blue/20 flex items-center justify-center">
                  <span className="text-2xl font-heading text-cyberpunk-blue">
                    1
                  </span>
                </div>
                <h4 className="text-body-lg font-subheading mb-2">
                  Initial Consultation
                </h4>
                <p className="text-body-sm text-gray-400">
                  We begin with a deep dive into your brand, goals, and
                  audience.
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyberpunk-pink/20 flex items-center justify-center">
                  <span className="text-2xl font-heading text-cyberpunk-pink">
                    2
                  </span>
                </div>
                <h4 className="text-body-lg font-subheading mb-2">
                  Content Development
                </h4>
                <p className="text-body-sm text-gray-400">
                  Our team crafts your story with precision and creative
                  excellence.
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyberpunk-green/20 flex items-center justify-center">
                  <span className="text-2xl font-heading text-cyberpunk-green">
                    3
                  </span>
                </div>
                <h4 className="text-body-lg font-subheading mb-2">
                  Launch & Optimize
                </h4>
                <p className="text-body-sm text-gray-400">
                  We deploy your content and continuously refine for maximum
                  impact.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
