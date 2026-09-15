"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORDS = [
  "Jatin Kukreja",
  "Developer",
  "AI · Web3 · Systems",
];

export function Preloader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    let wordInterval: NodeJS.Timeout;
    let finishTimeout: NodeJS.Timeout;

    const initTimeout = setTimeout(() => {
      // Honor reduced motion immediately
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Check session storage
      const hasSeen = sessionStorage.getItem("jk_portfolio_preloader_seen");

      if (hasSeen || prefersReducedMotion) {
        setHasCheckedStorage(true);
        return;
      }

      setIsVisible(true);
      setHasCheckedStorage(true);

      // Rapid cycle: ~320ms per word, total duration ~960ms
      wordInterval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < WORDS.length - 1) {
            return prev + 1;
          }
          clearInterval(wordInterval);
          return prev;
        });
      }, 320);

      finishTimeout = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("jk_portfolio_preloader_seen", "true");
      }, 1050);
    }, 0);

    return () => {
      clearTimeout(initTimeout);
      if (wordInterval) clearInterval(wordInterval);
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, []);

  if (!hasCheckedStorage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1],
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground select-none"
        >
          <div className="flex flex-col items-center justify-center space-y-4 px-6 text-center">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">
              Initializing
            </span>
            <div className="h-12 overflow-hidden flex items-center justify-center">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"
              >
                {WORDS[currentIndex]}
              </motion.span>
            </div>
            <div className="w-24 h-0.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full bg-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
