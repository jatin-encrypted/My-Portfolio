"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "./section-wrapper";
import { experience, leadership } from "@/lib/data";
import { Briefcase, Trophy } from "@phosphor-icons/react";

export function Experience() {
  return (
    <SectionWrapper id="experience" className="max-w-4xl">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">
            02 / Trajectory
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Experience &amp; Leadership
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative pl-6 md:pl-8 border-l border-border/80 space-y-12">
          {/* Experience Track */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Briefcase size={16} className="text-accent" />
              <span>Technical Domain Experience</span>
            </div>

            {experience.map((item, idx) => (
              <motion.div
                key={`${item.organization}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group rounded-xl p-5 md:p-6 bg-surface border border-border/70 hover:border-border transition-colors duration-200"
              >
                {/* Timeline node pip */}
                <div className="absolute -left-[31px] md:-left-[39px] top-6 w-3 h-3 rounded-full bg-surface border-2 border-accent" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">
                      {item.organization}
                    </h3>
                    <p className="text-sm font-medium text-accent">
                      {item.role}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full w-fit">
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Leadership Track */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Trophy size={16} className="text-accent" />
              <span>Campus Leadership</span>
            </div>

            {leadership.map((item, idx) => (
              <motion.div
                key={`${item.role}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative group rounded-xl p-5 md:p-6 bg-surface border border-border/70 hover:border-border transition-colors duration-200"
              >
                {/* Timeline node pip */}
                <div className="absolute -left-[31px] md:-left-[39px] top-6 w-3 h-3 rounded-full bg-surface border-2 border-accent" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">
                      {item.role}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full w-fit">
                    {item.period}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
