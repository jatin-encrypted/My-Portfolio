"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "./section-wrapper";
import { techStackCategories } from "@/lib/data";
import {
  Code,
  Browsers,
  LockKey,
  Database,
  Brain,
  Wrench,
} from "@phosphor-icons/react";

export function TechStack() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code size={18} className="text-accent" />;
      case "Frameworks / Libraries":
        return <Browsers size={18} className="text-emerald-500" />;
      case "Security / Auth":
        return <LockKey size={18} className="text-rose-500" />;
      case "Databases":
        return <Database size={18} className="text-amber-500" />;
      case "AI / ML":
        return <Brain size={18} className="text-sky-500" />;
      case "Web3 / Dev Tools":
        return <Wrench size={18} className="text-purple-500" />;
      default:
        return <Code size={18} className="text-accent" />;
    }
  };

  return (
    <SectionWrapper id="stack">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">
            04 / Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Technologies &amp; Systems
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Hands-on technical stack utilized across production infrastructure,
            smart contracts, and machine learning pipelines.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="space-y-10">
          {techStackCategories.map((categoryGroup, catIndex) => (
            <motion.div
              key={categoryGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: catIndex * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-3.5"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2">
                {getCategoryIcon(categoryGroup.category)}
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {categoryGroup.category}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {categoryGroup.skills.map((skill, sIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: sIndex * 0.025,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    viewport={{ once: true }}
                    className="group rounded-xl p-3 bg-surface border border-border/70 hover:border-accent/40 flex items-center gap-2.5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                    <span className="font-mono text-xs font-medium text-foreground tracking-tight truncate">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
