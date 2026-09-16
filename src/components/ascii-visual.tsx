"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export function AsciiVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays reliably even with strict browser autoplay policies
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was prevented; retry on first interaction
          const handleFirstInteraction = () => {
            video.play().then(() => setIsPlaying(true));
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
          };
          window.addEventListener("click", handleFirstInteraction);
          window.addEventListener("touchstart", handleFirstInteraction);
        });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
      className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center mx-auto"
    >
      {/* Layer 1: Ambient Radial Glow Backing */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-accent/20 blur-3xl animate-pulse" />
      </div>

      {/* Layer 2: Cybernetic HUD Container */}
      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
        {/* Terminal Header Bar */}
        <div className="h-9 px-3.5 sm:px-4 border-b border-border/60 bg-surface/60 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-border/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-border/40" />
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-muted-foreground/90 tracking-wider flex items-center gap-1.5">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                isPlaying ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40"
              }`}
            />
            <span>ASCII // 60FPS</span>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative flex-1 w-full h-full bg-black/90 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/ASCII.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="ASCII Art Animation"
            className="w-full h-full object-cover select-none pointer-events-none"
          >
            <track kind="captions" />
          </video>

          {/* Vignette Overlay for smooth edges */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Corner Grid Crosshairs */}
          <div className="absolute top-2 left-2 pointer-events-none font-mono text-[9px] text-muted-foreground/40 select-none">
            +
          </div>
          <div className="absolute top-2 right-2 pointer-events-none font-mono text-[9px] text-muted-foreground/40 select-none">
            +
          </div>
          <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[9px] text-muted-foreground/40 select-none">
            +
          </div>
          <div className="absolute bottom-2 right-2 pointer-events-none font-mono text-[9px] text-muted-foreground/40 select-none">
            +
          </div>
        </div>
      </div>
    </motion.div>
  );
}
