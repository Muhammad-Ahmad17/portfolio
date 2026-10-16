import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GroupIcon } from "@/art/GroupIcon";
import { WaveDivider } from "@/art/WaveDivider";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHeader } from "@/components/site/PageHeader";
import { freelance } from "@/data/freelance";
import { usePageTitle } from "@/hooks/usePageTitle";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { Rise } from "@/motion/Rise";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const services = freelance.services;

export default function Services() {
  usePageTitle("Services — Muhammad Ahmad");
  const [active, setActive] = useState(0);

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

      <section className="border-t border-chiffon/15 bg-regal-deep text-chiffon">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
          <Stage active={active} />
          <div className="px-6 md:px-10 lg:col-span-7 lg:px-14">
            {services.map((service, index) => (
              <Block key={service.index} index={index} onActive={setActive} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider seed={4} className="bg-regal py-4" />

      <section className="bg-regal px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Process</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Four steps, no surprises.</h2>
          </Rise>
          <ol className="mt-10 grid gap-px bg-chiffon/20 sm:grid-cols-2 lg:grid-cols-4">
            {freelance.process.map((item, index) => (
              <Rise key={item.step} as="li" delay={index * 0.06} className="bg-regal px-5 py-8">
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

/** The pinned left panel: the active service is drawn large, and re-drawn on each change. */
function Stage({ active }: { active: number }) {
  const reduced = usePrefersReducedMotion();
  const service = services[active];

  return (
    <div className="hidden lg:col-span-5 lg:block">
      <div className="sticky top-[4.25rem] flex h-[calc(100dvh-4.25rem)] flex-col justify-between border-r border-chiffon/20 py-12 pr-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-chiffon/75">
          <span className="text-redmark">{service.index}</span> / {String(services.length).padStart(2, "0")}
        </p>

        <div className="relative mx-auto flex aspect-square w-full max-w-[22rem] items-center justify-center">
          <span aria-hidden="true" className="absolute inset-0 border border-chiffon/20" />
          <span aria-hidden="true" className="absolute inset-3 border border-chiffon/10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={service.index}
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.35 }}
              className="h-3/5 w-3/5 text-chiffon"
            >
              <GroupIcon kind={service.icon} className="h-full w-full [&_path]:![stroke-width:1.1px]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="flex items-center gap-2" aria-hidden="true">
          {services.map((item, index) => (
            <li
              key={item.index}
              className={cn(
                "h-px transition-all duration-500",
                index === active ? "w-12 bg-redmark" : "w-4 bg-chiffon/40"
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

type BlockProps = { index: number; onActive: (index: number) => void };

function Block({ index, onActive }: BlockProps) {
  const service = services[index];
  const ref = useRef<HTMLElement>(null);
  const focused = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (focused) onActive(index);
  }, [focused, index, onActive]);

  return (
    <article
      ref={ref}
      className={cn(
        "flex min-h-[60vh] flex-col justify-center border-b border-chiffon/15 py-14 transition-opacity duration-500 last:border-b-0 lg:min-h-[78vh]",
        focused ? "opacity-100" : "lg:opacity-35"
      )}
    >
      <div className="mb-6 h-14 w-14 text-chiffon lg:hidden">
        <GroupIcon kind={service.icon} className="h-full w-full" />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">{service.index}</p>
      <h2 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95]">{service.name}</h2>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-chiffon/85">{service.text}</p>
      <ul className="mt-8 max-w-lg">
        {service.points.map((point) => (
          <li key={point} className="flex items-baseline gap-4 border-t border-chiffon/20 py-3 font-mono text-[12px] uppercase tracking-[0.12em]">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 bg-redmark" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
