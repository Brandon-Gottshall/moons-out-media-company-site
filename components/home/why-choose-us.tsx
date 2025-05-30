"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, BarChart2, Gem, FlaskConical } from "lucide-react";
import Link from "next/link";

export function WhyChooseUs() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex-col justify-center w-2/3"
    >
      <h2 className="text-2xl font-heading mb-6 text-white relative inline-block text-center w-full">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        {whyChooseUsItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-black/30 rounded-lg p-6 shadow border border-gray-800 w-full max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.03 }}
          >
            <motion.div
              className={`w-12 h-12 rounded-full bg-cyberpunk-${item.color}/20 flex items-center justify-center mb-4`}
              whileHover={{
                scale: 1.1,
                backgroundColor: `rgba(var(--color-cyberpunk-${item.color}-rgb), 0.3)`,
              }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-body-lg font-subheading text-white mb-2">
              {item.title}
            </h3>
{Array.isArray(item.description) ? (
              item.description.map((line, i) => (
                <p
                  key={i}
                  className={`w-full text-body-sm text-gray-300 leading-relaxed text-left ${
                    i === item.description.length - 1 ? "" : "mb-1"
                  }`}
                >
                  {item.linkText && item.linkHref && line.includes(item.linkText) ? (
                    <>
                      {line.split(item.linkText)[0]}
                      <Link 
                        href={item.linkHref}
                        className="text-cyberpunk-purple hover:text-cyberpunk-pink transition-colors underline"
                      >
                        {item.linkText}
                      </Link>
                      {line.split(item.linkText)[1]}
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))
            ) : (
              <p className="w-full text-body-sm text-gray-300 leading-relaxed text-left">
                {item.linkText && item.linkHref && typeof item.description === 'string' && item.description.includes(item.linkText) ? (
                  <>
                    {item.description.split(item.linkText)[0]}
                    <Link 
                      href={item.linkHref}
                      className="text-cyberpunk-purple hover:text-cyberpunk-pink transition-colors underline"
                    >
                      {item.linkText}
                    </Link>
                    {item.description.split(item.linkText)[1]}
                  </>
                ) : (
                  item.description
                )}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// --- Static Content and Types ---

interface WhyChooseUsItem {
  icon: React.ReactNode;
  title: string;
  description: string | string[];
  color: "blue" | "pink" | "green" | "purple";
  linkText?: string;
  linkHref?: string;
}

const whyChooseUsItems: WhyChooseUsItem[] = [
  {
    icon: <Target className="w-5 h-5 text-cyberpunk-blue" />,
    title: "Mission-Ready Media",
    description: [
      "Marine-veteran discipline shapes our approach.",
      "Digital native instincts help us find the clicks.",
    ],
    color: "blue",
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-cyberpunk-pink" />,
    title: "Results You Can Track",
    description: [
      "Campaigns built around clear, measurable KPIs.",
      "We adapt quickly to keep you on track.",
    ],
    color: "pink",
  },
  {
    icon: <Gem className="w-5 h-5 text-cyberpunk-green" />,
    title: "Quality First, Always",
    description: [
      "We shoot, edit, and perfect every visual ourselves.",
      "Human craftsmanship defines Moons Out Media.",
    ],
    color: "green",
  },
  {
    icon: <FlaskConical className="w-5 h-5 text-cyberpunk-purple" />,
    title: "In-House Innovation",
    description: [
      "Labs creates custom apps and tech-driven solutions.",
      "We build sites, web apps, and tools that bring your vision to life.",
    ],
    color: "purple",
    linkText: "Labs",
    linkHref: "/services/labs",
  },
];
