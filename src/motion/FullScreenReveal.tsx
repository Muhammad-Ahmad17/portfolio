import { motion } from "framer-motion";
import { useRef } from "react";
import { curtain } from "@/theme/motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type FullScreenRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function FullScreenReveal({ children, className }: FullScreenRevealProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: reduced ? 0 : 0.9, ease: curtain }}
      onAnimationComplete={() => ref.current?.classList.add("reveal-done")}
    >
      {children}
    </motion.div>
  );
}
