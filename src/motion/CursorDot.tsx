import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useFinePointer } from "./useFinePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function CursorDot() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const springX = useSpring(x, { stiffness: 480, damping: 34, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 480, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 bg-cream mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    />
  );
}
