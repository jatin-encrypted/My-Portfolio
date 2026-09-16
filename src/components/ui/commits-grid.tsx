"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export interface CommitsGridProps {
  text: string;
  className?: string;
}

// Deterministic PRNG to guarantee exact SSR & client hydration match
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed + 1337) * 10000;
  return x - Math.floor(x);
};

export const CommitsGrid = ({ text, className }: CommitsGridProps) => {
  const cleanString = (str: string): string => {
    const upperStr = str.toUpperCase();

    const withoutAccents = upperStr
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const allowedChars = Object.keys(letterPatterns);
    return withoutAccents
      .split("")
      .filter((char) => allowedChars.includes(char))
      .join("");
  };

  const generateHighlightedCells = (inputText: string) => {
    const cleanedText = cleanString(inputText);

    const width = Math.max(cleanedText.length * 6, 6) + 1;

    let currentPosition = 1; // leave space for the top border
    const highlightedCells: number[] = [];

    cleanedText
      .toUpperCase()
      .split("")
      .forEach((char) => {
        if (letterPatterns[char]) {
          const pattern = letterPatterns[char].map((pos) => {
            const row = Math.floor(pos / 50);
            const col = pos % 50;
            return (row + 1) * width + col + currentPosition;
          });
          highlightedCells.push(...pattern);
        }
        currentPosition += 6;
      });

    return {
      cells: highlightedCells,
      width,
      height: 9, // 7 + 2 for the top and bottom borders
    };
  };

  const {
    cells: highlightedCells,
    width: gridWidth,
    height: gridHeight,
  } = React.useMemo(() => generateHighlightedCells(text), [text]);

  const commitColors = ["#39d353", "#26a641", "#48d55d", "#56d364"];

  const getCellColor = (index: number) => {
    const rand = pseudoRandom(index * 3 + 1);
    const colorIndex = Math.floor(rand * commitColors.length);
    return commitColors[colorIndex];
  };

  const getCellDelay = (index: number) => {
    const rand = pseudoRandom(index * 7 + 5);
    return `${(rand * 0.5).toFixed(2)}s`;
  };

  // Pre-generate cell data deterministically with O(1) Set lookup
  const cellData = React.useMemo(() => {
    const total = gridWidth * gridHeight;
    const highlightedSet = new Set(highlightedCells);
    const data = [];
    for (let i = 0; i < total; i++) {
      const isHighlighted = highlightedSet.has(i);
      data.push({
        isHighlighted,
        delay: isHighlighted ? getCellDelay(i) : undefined,
        color: isHighlighted ? getCellColor(i) : undefined,
      });
    }
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridWidth, gridHeight, text, highlightedCells]);

  return (
    <div className="w-full max-w-full overflow-x-auto no-scrollbar py-1">
      <section
        aria-label={text}
        className={cn(
          "w-full max-w-2xl bg-card/70 border border-border/80 grid p-2 sm:p-3 gap-[1px] sm:gap-[2px] rounded-[12px] sm:rounded-[16px] shadow-lg shadow-black/5",
          className
        )}
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`,
        }}
      >
        {cellData.map((cell, index) => {
          const isHighlighted = cell.isHighlighted;

          return (
            <div
              key={index}
              className={cn(
                "border h-full w-full aspect-square rounded-[1.5px] sm:rounded-[2.5px] transition-transform duration-150 hover:scale-125 hover:z-20 cursor-pointer",
                isHighlighted
                  ? "border-emerald-500/40 shadow-[0_0_6px_rgba(57,211,83,0.25)] animate-highlight"
                  : "border-border/30 sm:border-border/40 bg-card/40"
              )}
              style={
                isHighlighted
                  ? ({
                      animationDelay: cell.delay,
                      backgroundColor: cell.color,
                    } as CSSProperties)
                  : undefined
              }
            />
          );
        })}
      </section>
    </div>
  );
};

export const CommitsGridDemo = () => {
  return <CommitsGrid text="21st" />;
};

const letterPatterns: { [key: string]: number[] } = {
  A: [
    1, 2, 3, 50, 100, 150, 200, 250, 300, 54, 104, 154, 204, 254, 304, 151, 152,
    153,
  ],
  B: [
    0, 1, 2, 3, 4, 50, 100, 150, 151, 200, 250, 300, 301, 302, 303, 304, 54,
    104, 152, 153, 204, 254, 303,
  ],
  C: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304],
  D: [
    0, 1, 2, 3, 50, 100, 150, 200, 250, 300, 301, 302, 54, 104, 154, 204, 254,
    303,
  ],
  E: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304, 151, 152],
  F: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 151, 152, 153],
  G: [
    0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 153, 204, 154,
    304, 254,
  ],
  H: [
    0, 50, 100, 150, 200, 250, 300, 151, 152, 153, 4, 54, 104, 154, 204, 254,
    304,
  ],
  I: [0, 1, 2, 3, 4, 52, 102, 152, 202, 252, 300, 301, 302, 303, 304],
  J: [0, 1, 2, 3, 4, 52, 102, 152, 202, 250, 252, 302, 300, 301],
  K: [0, 4, 50, 100, 150, 200, 250, 300, 151, 152, 103, 54, 203, 254, 304],
  L: [0, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304],
  M: [
    0, 50, 100, 150, 200, 250, 300, 51, 102, 53, 4, 54, 104, 154, 204, 254, 304,
  ],
  N: [
    0, 50, 100, 150, 200, 250, 300, 51, 102, 153, 204, 4, 54, 104, 154, 204,
    254, 304,
  ],
  Ñ: [
    0, 50, 100, 150, 200, 250, 300, 51, 102, 153, 204, 4, 54, 104, 154, 204,
    254, 304,
  ],
  O: [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 303, 54, 104, 154, 204, 254],
  P: [0, 50, 100, 150, 200, 250, 300, 1, 2, 3, 54, 104, 151, 152, 153],
  Q: [
    1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 54, 104, 154, 204, 202, 253, 304,
  ],
  R: [
    0, 50, 100, 150, 200, 250, 300, 1, 2, 3, 54, 104, 151, 152, 153, 204, 254,
    304,
  ],
  S: [1, 2, 3, 4, 50, 100, 151, 152, 153, 204, 254, 300, 301, 302, 303],
  T: [0, 1, 2, 3, 4, 52, 102, 152, 202, 252, 302],
  U: [0, 50, 100, 150, 200, 250, 301, 302, 303, 4, 54, 104, 154, 204, 254],
  V: [0, 50, 100, 150, 200, 251, 302, 4, 54, 104, 154, 204, 253],
  W: [
    0, 50, 100, 150, 200, 250, 301, 152, 202, 252, 4, 54, 104, 154, 204, 254,
    303,
  ],
  X: [0, 50, 203, 254, 304, 4, 54, 152, 101, 103, 201, 250, 300],
  Y: [0, 50, 101, 152, 202, 252, 302, 4, 54, 103],
  Z: [0, 1, 2, 3, 4, 54, 103, 152, 201, 250, 300, 301, 302, 303, 304],
  "0": [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 303, 54, 104, 154, 204, 254],
  "1": [1, 52, 102, 152, 202, 252, 302, 0, 2, 300, 301, 302, 303, 304],
  "2": [0, 1, 2, 3, 54, 104, 152, 153, 201, 250, 300, 301, 302, 303, 304],
  "3": [0, 1, 2, 3, 54, 104, 152, 153, 204, 254, 300, 301, 302, 303],
  "4": [0, 50, 100, 150, 4, 54, 104, 151, 152, 153, 154, 204, 254, 304],
  "5": [0, 1, 2, 3, 4, 50, 100, 151, 152, 153, 204, 254, 300, 301, 302, 303],
  "6": [
    1, 2, 3, 50, 100, 150, 151, 152, 153, 200, 250, 301, 302, 204, 254, 303,
  ],
  "7": [0, 1, 2, 3, 4, 54, 103, 152, 201, 250, 300],
  "8": [
    1, 2, 3, 50, 100, 151, 152, 153, 200, 250, 301, 302, 303, 54, 104, 204, 254,
  ],
  "9": [1, 2, 3, 50, 100, 151, 152, 153, 154, 204, 254, 304, 54, 104],
  " ": [],
};
