"use client";

import { motion } from "motion/react";
import {
  GithubLogo,
  ArrowSquareOut,
  Presentation,
  ShieldCheck,
  Coins,
  Cpu,
  Planet,
} from "@phosphor-icons/react";
import { Project, isRealLink } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isBuilding = project.status === "BUILDING";

  // Visual Motif Icon per Project
  const renderProjectIcon = () => {
    switch (project.id) {
      case "mandex":
        return <Cpu size={24} className="text-amber-500" weight="duotone" />;
      case "spin2x":
        return <Coins size={24} className="text-purple-500" weight="duotone" />;
      case "lowkey-secure":
        return <ShieldCheck size={24} className="text-emerald-500" weight="duotone" />;
      case "isro-varna":
        return <Planet size={24} className="text-sky-500" weight="duotone" />;
      default:
        return <Cpu size={24} className="text-accent" />;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      viewport={{ once: true, margin: "-60px" }}
      className={`group relative rounded-2xl bg-surface border border-border/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 ${
        isBuilding ? "ring-1 ring-amber-500/20" : ""
      }`}
    >
      <div className="space-y-6">
        {/* Top Header: Category Icon + Status Pill */}
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-muted/60 border border-border/60">
            {renderProjectIcon()}
          </div>

          <span
            className={`font-mono text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border ${
              isBuilding
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isBuilding
                  ? "bg-amber-500 animate-pulse"
                  : "bg-emerald-500"
              }`}
            />
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-150">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-accent">
            {project.tagline}
          </p>
        </div>

        {/* Engineering Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Technical Architecture Callouts (Project-Specific) */}
        {project.id === "mandex" && (
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 font-mono text-xs text-foreground/80 space-y-1.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
              Execution Architecture
            </span>
            <p className="text-muted-foreground">
              LLM proposes → Deterministic rules authorize → Razorpay executes.
            </p>
          </div>
        )}

        {project.pipeline && (
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 font-mono text-xs space-y-1.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
              Multi-Stage Pipeline
            </span>
            <p className="text-muted-foreground break-words">{project.pipeline}</p>
          </div>
        )}

        {project.achievement && (
          <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-800 dark:text-sky-300">
            <span className="font-semibold block mb-0.5">Recognition:</span>
            {project.achievement}
          </div>
        )}

        {project.team && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Team: </span>
            {project.team.join(", ")} ({project.teamName})
          </div>
        )}
      </div>

      {/* Footer: Tech Stack Pills + Action Links */}
      <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
        {/* Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-muted/70 text-foreground/80 border border-border/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links (Strict: only rendered if real link exists) */}
        <div className="flex items-center gap-3 pt-2">
          {isRealLink(project.links.github) && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-accent press-feedback"
            >
              <GithubLogo size={16} />
              <span>Repository</span>
            </a>
          )}

          {isRealLink(project.links.live) && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline press-feedback"
            >
              <ArrowSquareOut size={16} />
              <span>Live Deployment</span>
            </a>
          )}

          {isRealLink(project.links.presentation) && (
            <a
              href={project.links.presentation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-500 hover:underline press-feedback"
            >
              <Presentation size={16} />
              <span>Solution Presentation</span>
            </a>
          )}

          {!isRealLink(project.links.github) &&
            !isRealLink(project.links.live) &&
            !isRealLink(project.links.presentation) && (
              <span className="text-xs text-muted-foreground/60 font-mono">
                {isBuilding ? "Code in active development" : "Repository private / review on request"}
              </span>
            )}
        </div>
      </div>
    </motion.article>
  );
}
