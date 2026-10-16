import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { GroupIcon } from "@/art/GroupIcon";
import { WaveDivider } from "@/art/WaveDivider";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { freelance } from "@/data/freelance";
import { usePageTitle } from "@/hooks/usePageTitle";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { Rise } from "@/motion/Rise";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";
import { easeOut } from "@/theme/motion";
import { cn } from "@/lib/utils";

const services = freelance.services;

/** Scroll distance given to each service. Its drawing finishes in under two seconds, then it holds. */
const DWELL_VH = 150;

export default function Services() {
  usePageTitle("Services — Muhammad Ahmad");
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          tone="freelance"
          index="03"
          label="Services"
          title="What I take on"
          lede="Custom development, backends, and payments, for stores and products that need to run in production. Small engagements are welcome."
        />
      </FullScreenReveal>

      <section className="border-t border-regal/15">
        {!reduced && <Pinned />}
        <Stacked className={reduced ? "" : "lg:hidden"} />
      </section>

      <WaveDivider seed={4} className="py-4" />

      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Process</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Four steps, no surprises.</h2>
          </Rise>
          <ol className="mt-10 grid gap-px bg-regal/15 sm:grid-cols-2 lg:grid-cols-4">
            {freelance.process.map((item, index) => (
              <Rise key={item.step} as="li" delay={index * 0.06} className="bg-chiffon px-5 py-8">
                <p className="font-mono text-[11px] text-redmark">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-3xl">{item.step}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{item.text}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/**
 * Desktop: the whole list is pinned to the screen. Each service takes it in
 * turn, its drawing sketches in, and it then holds still for a long stretch of
 * scroll before the next one replaces it.
 */
function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(services.length - 1, Math.max(0, Math.floor(value * services.length))));
  });

  const service = services[active];

  return (
    <div ref={ref} style={{ height: `${services.length * DWELL_VH}vh` }} className="relative hidden lg:block">
      <div className="sticky top-[4.25rem] h-[calc(100dvh-4.25rem)] overflow-hidden">
        <div className="mx-auto grid h-full max-w-[1400px] lg:grid-cols-12">
          <div className="flex flex-col justify-between border-r border-regal/15 py-12 pl-6 pr-10 md:pl-10 lg:col-span-5 lg:pl-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] opacity-75">
              <span className="text-redmark">{service.index}</span> / {String(services.length).padStart(2, "0")}
            </p>

            <div className="relative mx-auto flex aspect-square w-full max-w-[22rem] items-center justify-center">
              <span aria-hidden="true" className="absolute inset-0 border border-regal/20" />
              <span aria-hidden="true" className="absolute inset-3 border border-regal/10" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.index}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="h-3/5 w-3/5 text-regal"
                >
                  <GroupIcon kind={service.icon} className="h-full w-full [&_path]:![stroke-width:1.1px]" />
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="flex items-center gap-2" aria-hidden="true">
              {services.map((item, index) => (
                <li
                  key={item.index}
                  className={cn("h-px transition-all duration-500", index === active ? "w-12 bg-redmark" : "w-4 bg-regal/30")}
                />
              ))}
            </ul>
          </div>

          <div className="flex items-center px-6 md:px-10 lg:col-span-7 lg:px-14">
            <AnimatePresence mode="wait">
              <motion.article
                key={service.index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: easeOut }}
              >
                <Detail index={active} />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile and reduced motion: a plain list, one block after another. */
function Stacked({ className }: { className?: string }) {
  return (
    <div className={cn("px-6 md:px-10", className)}>
      <div className="mx-auto max-w-[1400px]">
        {services.map((service, index) => (
          <article key={service.index} className="border-b border-regal/15 py-12 last:border-b-0">
            <div className="mb-6 h-14 w-14 text-regal">
              <GroupIcon kind={service.icon} className="h-full w-full" />
            </div>
            <Detail index={index} />
          </article>
        ))}
      </div>
    </div>
  );
}

function Detail({ index }: { index: number }) {
  const service = services[index];

  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">{service.index}</p>
      <h2 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95]">{service.name}</h2>
      <p className="mt-5 max-w-lg text-base leading-relaxed opacity-85">{service.text}</p>
      <ul className="mt-8 max-w-lg">
        {service.points.map((point) => (
          <li key={point} className="flex items-baseline gap-4 border-t border-regal/15 py-3 font-mono text-[12px] uppercase tracking-[0.12em]">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 bg-redmark" />
            {point}
          </li>
        ))}
      </ul>
    </>
  );
}
