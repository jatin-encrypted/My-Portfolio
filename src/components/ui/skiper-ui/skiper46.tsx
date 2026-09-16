"use client";

import React, { useState, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface Skiper46Props {
  className?: string;
  version?: string;
  routeType?: string;
  errorCount?: number;
  fixed?: boolean;
  position?: "bottom-left" | "bottom-right";
}

/**
 * Skiper46 — Next.js Interactive Gooey Menu
 *
 * Bespoke implementation of the Skiper UI Pro Next.js Gooey Menu component.
 * Features an interactive Next.js circular button with fluid liquid/gooey SVG
 * filter effects and spring-physics expandable tooltip displaying framework info.
 *
 * Designed with pure SVG filters and Framer Motion spring physics.
 */
export function Skiper46({
  className,
  version = "v15.2.0",
  routeType = "Static",
  errorCount = 0,
  fixed = false,
  position = "bottom-left",
}: Skiper46Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const filterId = `skiper46-gooey-${rawId.replace(/:/g, "")}`;
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 380, damping: 26 };

  const isRight = position === "bottom-right";
  const isLeft = position === "bottom-left";

  const fixedClasses = fixed
    ? isRight
      ? "fixed bottom-5 right-5 z-50"
      : "fixed bottom-5 left-5 z-50"
    : "relative inline-flex items-center justify-center";

  const alignmentClasses = isRight
    ? "items-end"
    : isLeft
      ? "items-start"
      : "items-center";

  return (
    <div
      ref={containerRef}
      className={cn(fixedClasses, className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* SVG Gooey Filter Definition */}
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative h-11 w-11">
        {/* Invisible Hover Bridge between Button and Tooltip Card */}
        {isOpen && (
          <div
            className={cn(
              "pointer-events-auto absolute bottom-11 h-4 w-11",
              isRight ? "right-0" : "left-0",
            )}
            aria-hidden="true"
          />
        )}

        {/* Gooey Filter Layer (Shapes Only — Exactly Aligned with Content Card) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ filter: prefersReducedMotion ? undefined : `url(#${filterId})` }}
        >
          {/* Morphing Liquid Bubble */}
          <motion.div
            initial={false}
            animate={{
              y: isOpen ? -56 : 0,
              width: isOpen ? 220 : 44,
              height: isOpen ? 108 : 44,
              borderRadius: isOpen ? 16 : 22,
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.6,
            }}
            transition={springConfig}
            className={cn(
              "absolute bottom-0 bg-neutral-950 dark:bg-black",
              isRight
                ? "right-0 origin-bottom-right"
                : isLeft
                  ? "left-0 origin-bottom-left"
                  : "left-0 origin-bottom",
            )}
          />

          {/* Base Anchor Circle */}
          <div
            className={cn(
              "absolute bottom-0 h-11 w-11 rounded-full bg-neutral-950 dark:bg-black",
              isRight ? "right-0" : "left-0",
            )}
          />
        </div>

        {/* Crisp Content Layer (100% Coincident with Morphing Bubble) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="tooltip-content"
              initial={{ opacity: 0, y: -48, scale: 0.96 }}
              animate={{ opacity: 1, y: -56, scale: 1 }}
              exit={{ opacity: 0, y: -48, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "pointer-events-auto absolute bottom-0 flex h-[108px] w-[220px] flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-950/95 p-3.5 text-xs text-neutral-200 shadow-2xl backdrop-blur-xs select-none dark:bg-black/95",
                isRight
                  ? "right-0 origin-bottom-right"
                  : isLeft
                    ? "left-0 origin-bottom-left"
                    : "left-0 origin-bottom",
              )}
            >
              {/* Row 1: Framework + Version */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-neutral-100">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Next.js
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  {version}
                </span>
              </div>

              {/* Row 2: Errors Badge */}
              <div className="flex items-center justify-between border-t border-neutral-800/60 pt-1">
                <span className="text-neutral-400">Errors</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[10px] font-medium",
                    errorCount > 0
                      ? "border border-rose-500/30 bg-rose-500/20 text-rose-400"
                      : "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400",
                  )}
                >
                  {errorCount}
                </span>
              </div>

              {/* Row 3: Route Mode */}
              <div className="flex items-center justify-between border-t border-neutral-800/60 pt-1">
                <span className="text-neutral-400">Route</span>
                <span className="font-mono text-[11px] font-medium text-neutral-300">
                  {routeType}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next.js Circular Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle Next.js Framework Details"
          className={cn(
            "group relative flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white shadow-md transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-accent dark:bg-black",
            isRight ? "ml-auto" : "mr-auto",
          )}
        >
          {/* Authentic Next.js SVG Logo */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200 group-hover:rotate-6"
          >
            <mask
              height="180"
              id={`mask0-${filterId}`}
              maskUnits="userSpaceOnUse"
              width="180"
              x="0"
              y="0"
              style={{ maskType: "alpha" }}
            >
              <circle cx="90" cy="90" fill="black" r="90" />
            </mask>
            <g mask={`url(#mask0-${filterId})`}>
              <circle cx="90" cy="90" fill="black" r="90" />
              <path
                d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z"
                fill={`url(#paint0_linear_${filterId})`}
              />
              <rect
                fill={`url(#paint1_linear_${filterId})`}
                height="72"
                width="12"
                x="115"
                y="54"
              />
            </g>
            <defs>
              <linearGradient
                id={`paint0_linear_${filterId}`}
                gradientUnits="userSpaceOnUse"
                x1="109"
                x2="144.5"
                y1="116.5"
                y2="160.5"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id={`paint1_linear_${filterId}`}
                gradientUnits="userSpaceOnUse"
                x1="121"
                x2="120.799"
                y1="54"
                y2="106.875"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Skiper46;
