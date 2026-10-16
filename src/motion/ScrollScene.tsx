import { useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type ScrollSceneProps = {
  children: (progress: MotionValue<number>) => React.ReactNode;
  height?: string;
  className?: string;
};

export function ScrollScene({ children, height = "300vh", className }: ScrollSceneProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <section ref={ref} className={className}>
        {children(scrollYProgress)}
      </section>
    );
  }

  return (
    <section ref={ref} style={{ height }} className={className}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">{children(scrollYProgress)}</div>
    </section>
  );
}
