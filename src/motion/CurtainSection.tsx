import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type CurtainTone = "navy" | "deep" | "red" | "chiffon" | "warm";

const panel: Record<CurtainTone, string> = {
  navy: "bg-regal",
  deep: "bg-regal-deep",
  red: "bg-redmark",
  chiffon: "bg-chiffon",
  warm: "bg-chiffon-warm",
};

type CurtainSectionProps = {
  children: React.ReactNode;
  curtain?: CurtainTone;
  className?: string;
  id?: string;
};

/**
 * A section that is covered by a coloured curtain as it enters the screen.
 * The curtain is tied to scroll, so it lifts as the reader moves down.
 */
export function CurtainSection({ children, curtain = "navy", className, id }: CurtainSectionProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [36, 0]);

  return (
    <section ref={ref} id={id} className={cn("relative", className)}>
      <motion.div style={reduced ? undefined : { y: lift }}>{children}</motion.div>
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleY }}
          className={cn("pointer-events-none absolute inset-0 z-10 origin-bottom will-change-transform", panel[curtain])}
        />
      )}
    </section>
  );
}
