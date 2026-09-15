"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

const inputWrapperClassName = cn(
  "bg-muted/40 relative w-full rounded-xl border border-border/70 transition-all duration-150 overflow-hidden",
  "focus-within:border-accent hover:border-border",
);

const inputClassName =
  "w-full bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground";

type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
  wrapperClassName?: string;
};

type SmoothInputType = "text" | "password" | "email";

type SmoothInputProps = Omit<InputFieldProps, "type"> & {
  type?: SmoothInputType;
};

const Input = ({ className, wrapperClassName, ...props }: InputFieldProps) => {
  return (
    <div className={cn(inputWrapperClassName, wrapperClassName)}>
      <input className={cn(inputClassName, className)} {...props} />
    </div>
  );
};

const PASSWORD_CHAR =
  typeof window !== "undefined" && typeof navigator !== "undefined" && navigator.userAgent.match(/firefox|fxios/i)
    ? "●"
    : "•";

const SmoothInput = ({
  className,
  wrapperClassName,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  placeholder,
  style,
  ...props
}: SmoothInputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const caretX = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = value !== undefined;

  const springConfig = prefersReducedMotion
    ? { stiffness: 10000, damping: 100, mass: 0.1 }
    : { stiffness: 500, damping: 30, mass: 0.5 };

  const springCaretX = useSpring(caretX, springConfig);

  const inputValue = isControlled ? String(value) : internalValue;
  const isEmailType = type === "email";
  const domType = isEmailType ? "text" : type;
  const displayPlaceholder = placeholder || "";

  const syncMeasureSpan = () => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return;

    const styles = window.getComputedStyle(input);
    const isPassword = input.type === "password";

    let fontSize = styles.fontSize;
    if (
      PASSWORD_CHAR === "\u2022" &&
      isPassword &&
      !navigator.userAgent.match(/chrome|chromium|crios/i)
    ) {
      fontSize = `${parseFloat(fontSize) + 6.25}px`;
    }

    measureSpan.style.font = `${styles.fontStyle} ${styles.fontWeight} ${fontSize} ${styles.fontFamily}`;
    measureSpan.style.letterSpacing = styles.letterSpacing;
    measureSpan.style.fontFeatureSettings = styles.fontFeatureSettings;
    measureSpan.style.fontVariationSettings = styles.fontVariationSettings;
  };

  const measurePrefixWidth = (text: string) => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return null;

    syncMeasureSpan();
    measureSpan.textContent = text;

    const paddingLeft =
      parseFloat(window.getComputedStyle(input).paddingLeft) || 0;

    return text.length > 0
      ? measureSpan.offsetWidth + paddingLeft
      : paddingLeft - 1;
  };

  const scrollCaretIntoView = (
    target: HTMLInputElement,
    absoluteWidth: number,
  ) => {
    const styles = window.getComputedStyle(target);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
    const visibleRight = target.scrollLeft + target.clientWidth - paddingRight;
    const visibleLeft = target.scrollLeft + paddingLeft;

    if (absoluteWidth > visibleRight) {
      target.scrollLeft = Math.min(
        absoluteWidth - target.clientWidth + paddingRight,
        maxScroll,
      );
      return;
    }

    if (absoluteWidth < visibleLeft) {
      target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
    }
  };

  const getCaretIndex = (target: HTMLInputElement) => {
    const selectionStart = target.selectionStart ?? 0;
    const selectionEnd = target.selectionEnd ?? 0;

    if (selectionStart === selectionEnd) {
      return selectionStart;
    }

    return target.selectionDirection === "backward"
      ? selectionStart
      : selectionEnd;
  };

  const updateCaretFromInput = (target: HTMLInputElement) => {
    const selectionStart = target.selectionStart ?? 0;
    const selectionEnd = target.selectionEnd ?? 0;
    const hasSelection = selectionStart !== selectionEnd;
    const caretIndex = getCaretIndex(target);
    const isPassword = target.type === "password";
    const textBeforeCaret = isPassword
      ? PASSWORD_CHAR.repeat(caretIndex)
      : target.value.slice(0, caretIndex);

    const absoluteWidth = measurePrefixWidth(textBeforeCaret);
    if (absoluteWidth === null) return;

    scrollCaretIntoView(target, absoluteWidth);

    const styles = window.getComputedStyle(target);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const caretPosition = absoluteWidth - target.scrollLeft;
    const minX = paddingLeft - 1;
    const maxX = target.clientWidth - paddingRight;
    const isCaretVisible =
      caretPosition >= minX && caretPosition <= maxX + 1;

    caretX.set(Math.min(caretPosition, maxX));

    if (!isCaretVisible || hasSelection) {
      caretOpacity.set(0);
      return;
    }

    caretOpacity.set(1);
  };

  const updateCaretRef = useRef(updateCaretFromInput);
  updateCaretRef.current = updateCaretFromInput;
  const caretOpacityRef = useRef(caretOpacity);
  caretOpacityRef.current = caretOpacity;

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      updateCaretRef.current(input);
    }
  }, [inputValue]);


  useEffect(() => {
    const input = inputRef.current;
    const container = containerRef.current;
    if (!input || !container) return;

    const updateCaretIfFocused = () => {
      if (document.activeElement === input) {
        updateCaretRef.current(input);
      }
    };

    const handleSelectionChange = () => {
      if (document.activeElement !== input) return;

      requestAnimationFrame(() => {
        if (document.activeElement === input) {
          updateCaretRef.current(input);
        }
      });
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.fonts.addEventListener("loadingdone", updateCaretIfFocused);
    void document.fonts.ready.then(updateCaretIfFocused);
    input.addEventListener("scroll", updateCaretIfFocused);

    const resizeObserver = new ResizeObserver(updateCaretIfFocused);
    resizeObserver.observe(container);

    updateCaretIfFocused();

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.fonts.removeEventListener("loadingdone", updateCaretIfFocused);
      input.removeEventListener("scroll", updateCaretIfFocused);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(inputWrapperClassName, wrapperClassName)}
    >
      <div
        className="relative grid grid-cols-1 p-0"
        style={{
          caretColor: "transparent",
        }}
      >
        <input
          {...props}
          ref={inputRef}
          type={domType}
          inputMode={
            isEmailType ? (props.inputMode || "email") : props.inputMode
          }
          autoComplete={
            isEmailType ? (props.autoComplete || "email") : props.autoComplete
          }
          placeholder={displayPlaceholder}
          className={cn(
            inputClassName,
            "col-start-1 col-end-2 row-start-1 row-end-2 text-inherit",
            className,
          )}
          style={style}
          value={inputValue}
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value);
            onChange?.(e);
            requestAnimationFrame(() => {
              updateCaretRef.current(e.target);
            });
          }}
          onFocus={(e) => {
            onFocus?.(e);
            requestAnimationFrame(() => {
              updateCaretRef.current(e.target);
            });
          }}
          onBlur={(e) => {
            caretOpacityRef.current.set(0);
            onBlur?.(e);
          }}
        />
        <span
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
        />
        <motion.div
          className="bg-accent pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 h-[1.2em] w-0.5 self-center rounded-full"
          style={{ x: springCaretX, opacity: caretOpacity }}
        />
      </div>
    </div>
  );
};

const Skiper106 = () => {
  return (
    <div className="bg-muted text-foreground flex h-full w-full flex-col items-center justify-center">
      <div className="-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:bg-linear-to-b after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:from-transparent after:content-['']">
          Try typing below
        </span>
      </div>
      <div className="flex w-full flex-col items-center space-y-4">
        <SmoothInput aria-label="Smooth caret input" />
        <Input
          placeholder="normal input"
          className="caret-primary text-2xl"
          wrapperClassName="max-w-[420px] p-4"
          aria-label="Normal input"
        />
      </div>
    </div>
  );
};

type TextareaFieldProps = ComponentPropsWithoutRef<"textarea"> & {
  wrapperClassName?: string;
};

const SmoothTextarea = ({
  className,
  wrapperClassName,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  style,
  rows = 4,
  ...props
}: TextareaFieldProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const caretX = useMotionValue(0);
  const caretY = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const [caretHeight, setCaretHeight] = useState(18);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = value !== undefined;
  const inputValue = isControlled ? String(value) : internalValue;

  const springConfig = prefersReducedMotion
    ? { stiffness: 10000, damping: 100, mass: 0.1 }
    : { stiffness: 500, damping: 30, mass: 0.5 };

  const springCaretX = useSpring(caretX, springConfig);
  const springCaretY = useSpring(caretY, springConfig);

  const updateCaret = () => {
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;
    const marker = markerRef.current;
    if (!textarea || !mirror || !marker) return;

    if (document.activeElement !== textarea) {
      caretOpacity.set(0);
      return;
    }

    const selectionStart = textarea.selectionStart ?? 0;
    const selectionEnd = textarea.selectionEnd ?? 0;

    if (selectionStart !== selectionEnd) {
      caretOpacity.set(0);
      return;
    }

    // Sync mirror styles with textarea
    const computed = window.getComputedStyle(textarea);
    mirror.style.fontFamily = computed.fontFamily;
    mirror.style.fontSize = computed.fontSize;
    mirror.style.fontWeight = computed.fontWeight;
    mirror.style.fontStyle = computed.fontStyle;
    mirror.style.letterSpacing = computed.letterSpacing;
    mirror.style.lineHeight = computed.lineHeight;
    mirror.style.paddingTop = computed.paddingTop;
    mirror.style.paddingBottom = computed.paddingBottom;
    mirror.style.paddingLeft = computed.paddingLeft;
    mirror.style.paddingRight = computed.paddingRight;
    mirror.style.borderWidth = computed.borderWidth;
    mirror.style.boxSizing = computed.boxSizing;
    mirror.style.width = `${textarea.clientWidth}px`;

    const textBefore = textarea.value.substring(0, selectionStart);
    // Trailing newline in pre-wrap requires zero-width space to create the next line in DOM
    const textToInsert = textBefore.endsWith("\n")
      ? textBefore + "\u200b"
      : textBefore;

    // Populate mirror
    mirror.innerHTML = "";
    mirror.appendChild(document.createTextNode(textToInsert));
    mirror.appendChild(marker);

    const paddingLeft = parseFloat(computed.paddingLeft) || 0;
    const paddingTop = parseFloat(computed.paddingTop) || 0;
    const paddingRight = parseFloat(computed.paddingRight) || 0;
    const paddingBottom = parseFloat(computed.paddingBottom) || 0;

    const markerLeft = marker.offsetLeft;
    const markerTop = marker.offsetTop;
    const markerHeight =
      marker.offsetHeight || parseFloat(computed.fontSize) * 1.2 || 18;
    setCaretHeight(markerHeight);

    const x = markerLeft - textarea.scrollLeft;
    const y = markerTop - textarea.scrollTop;

    const isVisible =
      y >= paddingTop - 2 &&
      y <= textarea.clientHeight - paddingBottom + 2 &&
      x >= paddingLeft - 2 &&
      x <= textarea.clientWidth - paddingRight + 2;

    caretX.set(x);
    caretY.set(y);

    if (isVisible) {
      caretOpacity.set(1);
    } else {
      caretOpacity.set(0);
    }
  };

  useEffect(() => {
    updateCaret();
  }, [inputValue]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleSelectionChange = () => {
      if (document.activeElement === textarea) {
        requestAnimationFrame(updateCaret);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updateCaret);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    textarea.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateCaret);

    const ro = new ResizeObserver(() => updateCaret());
    ro.observe(textarea);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      textarea.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCaret);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-muted/40 relative w-full rounded-xl border border-border/70 transition-all duration-150 overflow-hidden",
        "focus-within:border-accent hover:border-border",
        wrapperClassName,
      )}
    >
      {/* Hidden Mirror Div for exact 2D Caret coordinate calculation */}
      <div
        ref={mirrorRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre-wrap break-words overflow-hidden"
      >
        <span ref={markerRef}>|</span>
      </div>

      <textarea
        {...props}
        ref={textareaRef}
        rows={rows}
        placeholder={placeholder}
        value={inputValue}
        style={{ caretColor: "transparent", ...style }}
        className={cn(
          "w-full bg-transparent px-4 py-3 text-sm text-foreground outline-none resize-none placeholder:text-muted-foreground block",
          className,
        )}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChange?.(e);
          requestAnimationFrame(updateCaret);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          requestAnimationFrame(updateCaret);
        }}
        onBlur={(e) => {
          caretOpacity.set(0);
          onBlur?.(e);
        }}
      />

      {/* 2D Spring Caret */}
      <motion.div
        className="bg-accent pointer-events-none absolute top-0 left-0 w-0.5 rounded-full"
        style={{
          x: springCaretX,
          y: springCaretY,
          height: caretHeight,
          opacity: caretOpacity,
        }}
      />
    </div>
  );
};

export { Input, Skiper106, SmoothInput, SmoothTextarea };
