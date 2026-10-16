import { motion } from "framer-motion";
import { easeOut } from "@/theme/motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type RiseProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "li" | "span";
};

/** Content that lifts into place the first time it scrolls into view. */
export function Rise({ children, className, delay = 0, as = "div" }: RiseProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}
