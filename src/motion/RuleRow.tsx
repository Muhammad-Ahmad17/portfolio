import { motion } from "framer-motion";
import { easeOut } from "@/theme/motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type RuleRowProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Tailwind colour class for the rule that draws across the top. */
  rule?: string;
};

/** A list row whose top rule draws left to right, then the content settles in. */
export function RuleRow({ children, className, delay = 0, rule = "bg-regal/25" }: RuleRowProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <li className={cn("relative", className)}>
        <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-px", rule)} />
        {children}
      </li>
    );
  }

  return (
    <motion.li
      className={cn("relative", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span
        aria-hidden="true"
        className={cn("absolute inset-x-0 top-0 h-px origin-left", rule)}
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
        transition={{ duration: 0.9, delay, ease: easeOut }}
      />
      <motion.div
        variants={{ hidden: { opacity: 0, x: -14 }, shown: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.7, delay: delay + 0.25, ease: easeOut }}
        className="flex items-baseline justify-between gap-4"
      >
        {children}
      </motion.div>
    </motion.li>
  );
}
