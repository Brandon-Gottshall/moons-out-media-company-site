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
      case "blue": return "0, 204, 255";
      case "pink": return "255, 105, 180";
      case "purple": return "106, 90, 205";
      case "teal": return "20, 184, 166";
      case "yellow": return "234, 179, 8";
      case "cyan": return "6, 182, 212";
      default: return "0, 204, 255";
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
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 15px rgba(${colorToRgb(service.color)}, 0.3)`,
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
          className={`text-xl font-bold mb-3 text-cyberpunk-${service.color}`}
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
