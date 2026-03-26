"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: ReactNode;
  };
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.2)",
      }}
      className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/20 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-primary/10 border border-primary/30"
        >
          {service.icon}
        </div>
        <h3
          className="text-heading-md font-heading mb-3 text-primary"
        >
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>
      </div>
      <Link
        href="/services"
        className=" -mr-1 inline-flex items-center text-accent hover:underline group self-end"
      >
        Learn more
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
