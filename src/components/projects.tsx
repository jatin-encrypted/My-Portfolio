"use client";

import { SectionWrapper } from "./section-wrapper";
import { ProjectCard } from "./project-card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">
            03 / Selected Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Engineering Projects
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Real implementations emphasizing systems engineering, cryptographic
            randomness, agent authorization pipelines, and geospatial machine
            learning.
          </p>
        </div>

        {/* 2-Column Responsive Grid with distinct card compositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
