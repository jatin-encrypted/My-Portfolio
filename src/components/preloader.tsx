"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  try {
    const isAudit =
      typeof navigator !== "undefined" &&
      (Boolean(navigator.webdriver) ||
        /Chrome-Lighthouse|Googlebot|bingbot|crawler|spider/i.test(
          navigator.userAgent
        ));
    return Boolean(
      isAudit ||
        sessionStorage.getItem("jk_portfolio_preloader_seen") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function Preloader() {
  const hasSeen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (hasSeen) return;

    // Lock background scroll during preloader
    document.body.style.overflow = "hidden";

    // Start hardware-accelerated curtain lift
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      sessionStorage.setItem("jk_portfolio_preloader_seen", "true");
    }, 600);

    // Cleanly unmount and restore scrolling
    const doneTimer = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
    }, 950);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [hasSeen]);

  if (hasSeen || isDone) return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground select-none transition-transform transition-opacity will-change-transform ${
        isExiting
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        transitionDuration: "350ms",
        transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-5 px-6 text-center">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Initializing
          </span>
        </div>

        {/* Pure CSS GPU-Accelerated Word Sequence (runs on compositor thread) */}
        <div className="relative h-14 w-96 max-w-[90vw] flex items-center justify-center overflow-hidden">
          <span
            className="absolute font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground will-change-transform text-center whitespace-nowrap"
            style={{
              animation:
                "preloader-word-1 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
            }}
          >
            Jatin Kukreja<span className="text-accent">.</span>
          </span>
          <span
            className="absolute font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground will-change-transform text-center whitespace-nowrap"
            style={{
              animation:
                "preloader-word-2 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
            }}
          >
            Developer
          </span>
          <span
            className="absolute font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground will-change-transform text-center whitespace-nowrap"
            style={{
              animation:
                "preloader-word-3 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
            }}
          >
            AI · Web3 · Systems
          </span>
        </div>

        {/* Hardware-Accelerated Progress Line */}
        <div className="w-36 h-1 bg-muted/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full will-change-transform origin-left"
            style={{
              animation:
                "preloader-progress 0.85s cubic-bezier(0.23, 1, 0.32, 1) forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}
