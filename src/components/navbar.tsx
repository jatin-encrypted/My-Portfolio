"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "experience", "projects", "stack", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard accessibility: Escape key closes mobile navigation drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-3 pb-2 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto h-12 md:h-13 px-3 md:px-4 rounded-full flex items-center justify-between gap-4 md:gap-8 transition-all duration-300 border ${
          isScrolled
            ? "bg-surface/85 backdrop-blur-xl border-border/80 shadow-md shadow-black/5"
            : "bg-surface/60 backdrop-blur-md border-border/50 shadow-none"
        }`}
      >
        {/* Monogram / Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#hero");
          }}
          className="font-mono font-bold text-sm tracking-tighter px-2.5 py-1 rounded-full text-foreground hover:text-accent transition-colors duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Jatin Kukreja Home"
        >
          JK<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 press-feedback focus-visible:outline-2 focus-visible:outline-accent ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-foreground/5 rounded-full -z-10 border border-foreground/10"
                    transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5">
          <div className="scale-75 origin-center">
            <ThemeToggleButton />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-foreground hover:bg-foreground/5 press-feedback focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto fixed top-18 left-4 right-4 z-50 p-4 rounded-2xl bg-surface/95 backdrop-blur-2xl border border-border shadow-2xl flex flex-col gap-2 md:hidden"
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
