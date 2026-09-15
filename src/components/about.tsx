"use client";

import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { SectionWrapper } from "./section-wrapper";
import { socialLinks, isRealLink } from "@/lib/data";

export function About() {
  const renderIcon = (name: string) => {
    switch (name) {
      case "GitHub":
        return <GithubLogo size={18} weight="bold" className="shrink-0" />;
      case "LinkedIn":
        return <LinkedinLogo size={18} weight="bold" className="shrink-0" />;
      case "X":
      case "Twitter":
        return <XLogo size={18} weight="bold" className="shrink-0" />;
      case "Email":
        return <EnvelopeSimple size={18} weight="bold" className="shrink-0" />;
      default:
        return <ArrowUpRight size={16} className="shrink-0" />;
    }
  };

  return (
    <SectionWrapper id="about" className="max-w-4xl">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">
            01 / Identity
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            About
          </h2>
        </div>

        {/* Bio Body */}
        <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
          <p>
            I am a software engineer focused on building robust architectures
            across <strong className="text-foreground font-semibold">AI agents</strong>,{" "}
            <strong className="text-foreground font-semibold">Web3 infrastructure</strong>, and{" "}
            <strong className="text-foreground font-semibold">secure systems</strong>.
            My core interest lies where deterministic authorization rules govern
            probabilistic LLM reasoning — making sure autonomy is backed by strict
            auditability.
          </p>
          <p>
            From on-chain provably fair game loops on Monad to merchant-side
            commerce passports enabling autonomous buyers via MCP, I enjoy solving
            unconventional system bottlenecks from first principles.
          </p>
          <p>
            Whether implementing zero-knowledge-adjacent privacy models or
            validating super-resolution satellite diffusion pipelines, I prioritize
            reproducible technical depth over hype.
          </p>
        </div>

        {/* Tactile Social Buttons */}
        <div className="pt-4 border-t border-border/40 space-y-3">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block">
            Channels & Direct
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks
              .filter((social) => isRealLink(social.href))
              .map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border/80 bg-surface/80 hover:bg-surface text-foreground text-sm font-medium transition-all duration-200 ease-out hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-sm press-feedback focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label={`Open Jatin's ${social.name}`}
                >
                  <span className="text-muted-foreground group-hover:text-accent transition-colors duration-200">
                    {renderIcon(social.name)}
                  </span>
                  <span>{social.name}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
