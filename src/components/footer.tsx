"use client";

import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { socialLinks, isRealLink } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const renderIcon = (name: string) => {
    switch (name) {
      case "GitHub":
        return <GithubLogo size={18} />;
      case "LinkedIn":
        return <LinkedinLogo size={18} />;
      case "X":
      case "Twitter":
        return <XLogo size={18} />;
      case "Email":
        return <EnvelopeSimple size={18} />;
      default:
        return null;
    }
  };

  return (
    <footer className="border-t border-border/60 py-10 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        {/* Dynamic Copyright */}
        <p className="font-mono">
          &copy; {currentYear} Jatin Kukreja. All rights reserved.
        </p>

        {/* Minimal Social Links */}
        <div className="flex items-center gap-3">
          {socialLinks
            .filter((social) => isRealLink(social.href))
            .map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors press-feedback focus-visible:outline-2 focus-visible:outline-accent"
                aria-label={social.name}
              >
                {renderIcon(social.name)}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
