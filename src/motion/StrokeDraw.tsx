import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const strokes = {
  underline: {
    viewBox: "0 0 120 14",
    d: "M1 9 C 16 4, 28 13, 46 8 S 74 3, 96 8 S 112 12, 119 7",
  },
  circle: {
    viewBox: "0 0 140 78",
    d: "M34 42 C 30 12, 88 4, 112 26 C 138 50, 104 74, 66 72 C 24 70, 8 48, 26 26 C 36 14, 62 16, 72 24",
  },
  arrow: {
    viewBox: "0 0 48 16",
    d: "M1 8 C 10 7, 22 9, 40 8 M 31 2.5 L 44 8 L 31 13.5",
  },
} as const;

type StrokeDrawProps = {
  variant?: keyof typeof strokes;
  className?: string;
  delay?: number;
};

export function StrokeDraw({ variant = "underline", className, delay = 0.35 }: StrokeDrawProps) {
  const reduced = usePrefersReducedMotion();
  const stroke = strokes[variant];

  return (
    <svg viewBox={stroke.viewBox} className={cn("block h-[0.45em] w-full", className)} fill="none" aria-hidden="true">
      <motion.path
        d={stroke.d}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.95, delay: reduced ? 0 : delay, ease: "easeInOut" }}
      />
    </svg>
  );
}
