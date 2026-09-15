"use client";

import React from "react";
import { motion } from "motion/react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  className = "",
  id,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true, margin: "-70px" }}
      className={`py-20 md:py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}
