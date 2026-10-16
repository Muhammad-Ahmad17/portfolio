import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SemesterStrip } from "@/art/SemesterStrip";
import { PageHeader } from "@/components/site/PageHeader";
import { academic } from "@/data/academic";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { Rise } from "@/motion/Rise";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";

export default function Education() {
  usePageTitle("Education — Muhammad Ahmad");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          index="02"
          label="Education"
          title="The record"
          lede="A computer engineering degree in progress, and the pre-engineering years that came before it."
        />
      </FullScreenReveal>

      <section className="border-b border-regal/15 px-6 py-14 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Degree progress</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">
              {academic.semester} of {academic.semesterTotal} · CGPA {academic.cgpa}
            </p>
          </div>
          <SemesterStrip current={academic.semesterNumber} total={academic.semesterTotal} className="mt-6 h-auto w-full" />
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div ref={ref} className="relative mx-auto max-w-[1400px] md:pl-10">
          <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-regal/15 md:block" />
          {!reduced && (
            <motion.span
              aria-hidden="true"
              style={{ scaleY }}
              className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-redmark md:block"
            />
          )}
          {academic.education.map((item) => (
            <Rise key={item.title} as="div" className="relative grid gap-4 border-b border-regal/15 py-12 last:border-b-0 md:grid-cols-12 md:gap-8">
              <span aria-hidden="true" className="absolute -left-[2.9rem] top-[3.4rem] hidden h-2.5 w-2.5 -translate-x-px bg-redmark md:block" />
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-redmark md:col-span-3">{item.period}</p>
              <div className="md:col-span-9">
                <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">{item.title}</h2>
                <p className="mt-3 text-base">{item.place}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] opacity-60">{item.meta}</p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80">{item.text}</p>
              </div>
            </Rise>
          ))}
        </div>
      </section>

      <CurtainSection curtain="navy" className="border-t border-regal/15 px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Ground covered</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-5xl">Boards, backends, and the cloud.</h2>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {academic.skills
              .flatMap((group) => group.items)
              .filter((item, index, all) => all.findIndex((other) => other.name === item.name) === index)
              .slice(0, 14)
              .map((item, index) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 border-t border-regal/15 py-3">
                  <span className="text-sm">
                    <span className="mr-3 font-mono text-[11px] text-redmark">{String(index + 1).padStart(2, "0")}</span>
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-55">{item.note}</span>
                </li>
              ))}
          </ul>
        </div>
      </CurtainSection>
    </>
  );
}
