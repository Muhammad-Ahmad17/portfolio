import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";

export type Progress = MotionValue<number>;

/** Animates 0 → 1 once the referenced element enters the viewport. */
export function useInViewProgress(ref: RefObject<Element>, duration = 2.4, amount = 0.3): Progress {
  const progress = useMotionValue(0);
  const inView = useInView(ref, { once: true, amount });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      progress.set(1);
      return;
    }
    if (!inView) return;
    const controls = animate(progress, 1, { duration, ease: "easeInOut" });
    return () => controls.stop();
  }, [inView, reduced, duration, progress]);

  return progress;
}

type StrokeProps = {
  d: string;
  progress: Progress;
  from?: number;
  to?: number;
  className?: string;
  width?: number;
  dash?: string;
};

/** A stroke that draws itself between two points of a progress value. */
export function P({ d, progress, from = 0, to = 1, className, width = 1.6, dash }: StrokeProps) {
  const length = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const start = useTransform(progress, [from, from + 0.002], [0, 1], { clamp: true });
  const fade = useTransform(progress, [from, to], [0, 1], { clamp: true });

  return (
    <motion.path
      d={d}
      className={className}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray={dash}
      style={dash ? { opacity: fade } : { pathLength: length, opacity: start }}
    />
  );
}

type FillProps = {
  d: string;
  progress: Progress;
  from?: number;
  to?: number;
  className?: string;
  opacity?: number;
};

/** A filled shape that fades in. */
export function F({ d, progress, from = 0, to = 1, className, opacity = 1 }: FillProps) {
  const fade = useTransform(progress, [from, to], [0, opacity], { clamp: true });
  return <motion.path d={d} className={className} fill="currentColor" stroke="none" style={{ opacity: fade }} />;
}

type TextProps = {
  x: number;
  y: number;
  children: ReactNode;
  progress: Progress;
  from?: number;
  to?: number;
  className?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
};

/** Label text that fades in; mono by default. */
export function T({ x, y, children, progress, from = 0.7, to = 1, className, size = 11, anchor = "middle" }: TextProps) {
  const fade = useTransform(progress, [from, to], [0, 1], { clamp: true });
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill="currentColor"
      stroke="none"
      className={`font-mono ${className ?? ""}`}
      style={{ opacity: fade, letterSpacing: "0.12em" }}
    >
      {children}
    </motion.text>
  );
}

/** A signal pulse that travels along a path. Not rendered under reduced motion. */
export function Pulse({ path, dur = 3.2, begin = 3, className }: { path: string; dur?: number; begin?: number; className?: string }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <circle r="3" fill="currentColor" className={className}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

type SketchProps = {
  viewBox: string;
  className?: string;
  duration?: number;
  label?: string;
  children: (progress: Progress) => ReactNode;
};

/** An SVG that draws itself when it scrolls into view. */
export function Sketch({ viewBox, className, duration = 2.6, label, children }: SketchProps) {
  const ref = useRef<SVGSVGElement>(null);
  const progress = useInViewProgress(ref, duration);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={className}
      fill="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children(progress)}
    </svg>
  );
}

/** An SVG shell driven by an external progress value, such as scroll. */
export function Canvas({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}
