import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ProjectArt } from "@/art/ProjectArt";
import type { AcademicProject } from "@/data/academic";
import { useMediaQuery } from "@/motion/useMediaQuery";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Project cards that stack on top of each other as the reader scrolls.
 * Each card stays pinned while the next one slides over it like a curtain.
 */
export function ProjectStack({ projects }: { projects: readonly AcademicProject[] }) {
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const tall = useMediaQuery("(min-height: 640px)");
  const stack = wide && tall && !reduced;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {projects.map((project, index) => (
        <StackCard
          key={project.index}
          project={project}
          index={index}
          total={projects.length}
          stack={stack}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

type StackCardProps = {
  project: AcademicProject;
  index: number;
  total: number;
  stack: boolean;
  progress: MotionValue<number>;
};

function StackCard({ project, index, total, stack, progress }: StackCardProps) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.035]);
  const shade = useTransform(progress, [Math.max(index / total, 0), 1], [0, index === total - 1 ? 0 : 0.14]);

  return (
    <div
      className={cn("mb-8 md:mb-[12vh]", stack && "sticky")}
      style={stack ? { top: `calc(5.25rem + ${index * 18}px)` } : undefined}
    >
      <motion.article
        style={stack ? { scale } : undefined}
        className={cn(
          "relative origin-top border border-regal/30 p-6 md:min-h-[62vh] md:p-10",
          index % 2 === 0 ? "bg-chiffon-light" : "bg-chiffon-warm"
        )}
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-regal/10" />
        {stack && (
          <motion.span
            aria-hidden="true"
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 bg-regal"
          />
        )}
        <div className="relative grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col md:col-span-7">
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-7xl leading-none text-redmark md:text-[7rem]">{project.index}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">{project.domain}</span>
            </div>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.04]">{project.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80 md:text-base">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-regal/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] underline decoration-redmark decoration-1 underline-offset-[6px] hover:text-redmark"
                >
                  {link.label} ↗
                </a>
              ))}
            </p>
          </div>
          <div className="md:col-span-5">
            <figure className="relative border border-regal/20 bg-chiffon/60 p-4">
              <figcaption className="absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                fig. {project.index}
              </figcaption>
              <div className="aspect-[4/3] w-full pt-3">
                <ProjectArt kind={project.art} />
              </div>
            </figure>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
