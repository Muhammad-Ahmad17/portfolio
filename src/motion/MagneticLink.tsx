import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useFinePointer } from "./useFinePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MagneticLinkProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  to?: string;
};

export function MagneticLink({ children, className, href, to }: MagneticLinkProps) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!fine || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classNames = cn("inline-block hover:text-redmark", className);
  const inner = to ? (
    <Link to={to} className={classNames}>
      {children}
    </Link>
  ) : (
    <a href={href} className={classNames} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  );

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {inner}
    </motion.span>
  );
}
