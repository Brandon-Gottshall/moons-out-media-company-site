"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/app/page";

interface ServiceCardProps {
  service: (typeof SERVICES)[number];
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  // Map colors to their RGB values for box shadows
  const colorToRgb = (color: string): string => {
    switch (color) {
      case "blue": return "var(--cp-blue-rgb)";
      case "pink": return "var(--cp-pink-rgb)";
      case "purple": return "var(--cp-purple-light-rgb)";
      case "teal": return "var(--cp-teal-rgb)";
      case "yellow": return "var(--cp-yellow-rgb)";
      case "cyan": return "var(--cp-cyan-rgb)";
      default: return "var(--cp-blue-rgb)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        y: -5,
        boxShadow: `0 10px 25px -5px rgba(var(--ui-black-rgb), 0.2), 0 0 15px rgba(${colorToRgb(service.color)}, 0.3)`,
      }}
      className={`bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyberpunk-${service.color}/30 transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-cyberpunk-${service.color}/10 border border-cyberpunk-${service.color}/30`}
        >
          {service.icon}
        </div>
        <h3
          className={`text-heading-md font-heading mb-3 text-cyberpunk-${service.color}`}
        >
          {service.title}
        </h3>
        <p className="text-gray-300 mb-4">{service.description}</p>
      </div>
      <Link
        href="/services"
        className={`-mr-1 inline-flex items-center text-cyberpunk-${service.color} hover:underline group self-end`}
      >
        Learn more
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
