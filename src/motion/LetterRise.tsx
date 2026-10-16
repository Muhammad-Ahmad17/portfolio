import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { easeOut } from "@/theme/motion";
import { cn } from "@/lib/utils";

type LetterRiseProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Wait until the text scrolls into view instead of playing on mount. */
  onView?: boolean;
};

export function LetterRise({ text, className, delay = 0, stagger = 0.028, onView = false }: LetterRiseProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const play = onView ? inView : true;

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{text} </span>
      <span aria-hidden="true">
        {Array.from(text).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom leading-[0.88]"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: play ? "0%" : "110%" }}
              transition={{ duration: 0.72, delay: delay + index * stagger, ease: easeOut }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
