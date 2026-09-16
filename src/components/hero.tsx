"use client";

import { motion } from "motion/react";
import { ArrowRight, User } from "@phosphor-icons/react";
import { CommitsGrid } from "@/components/ui/commits-grid";
import { AsciiVisual } from "./ascii-visual";

import type { Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Content Side (~58% visual weight on desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 z-10"
        >
          {/* Eyebrow / Salutation */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-sm text-muted-foreground tracking-wide flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              hey, I&apos;m
            </span>
          </motion.div>

          {/* Name Display - Interactive Commits Grid */}
          <motion.div variants={itemVariants} className="w-full">
            <h1 className="sr-only">Jatin Kukreja</h1>
            <CommitsGrid text="Jatin Kukreja" />
          </motion.div>

          {/* Locked Identity / Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-[45ch] leading-relaxed"
          >
            Developer building across AI, Web3, security, and modern software
            systems.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm transition-all duration-200 hover:brightness-110 press-feedback focus-visible:outline-2 focus-visible:outline-accent cursor-pointer shadow-lg shadow-accent/20"
            >
              <span>View Projects</span>
              <ArrowRight size={16} weight="bold" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface text-foreground font-medium text-sm border border-border transition-all duration-200 hover:bg-muted press-feedback focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
            >
              <User size={16} />
              <span>About Me</span>
            </button>
          </motion.div>
        </motion.div>

        {/* ASCII Video Visual (~42% visual weight on desktop) */}
        <div className="lg:col-span-5 relative flex items-center justify-center w-full">
          <AsciiVisual />
        </div>
      </div>
    </section>
  );
}
