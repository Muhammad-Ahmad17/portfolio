import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GroupIcon } from "@/art/GroupIcon";
import { SemesterStrip } from "@/art/SemesterStrip";
import { PageHeader } from "@/components/site/PageHeader";
import { academic } from "@/data/academic";
import { person } from "@/data/person";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";
import { RuleRow } from "@/motion/RuleRow";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";

type Group = (typeof academic.skills)[number];

export default function About() {
  usePageTitle("About — Muhammad Ahmad");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          index="02"
          label="About"
          title="The record"
          lede="A software engineer whose degree is computer engineering, in the seventh semester at COMSATS Lahore."
        >
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em]">
            <MagneticLink href={academic.github}>Proof is on GitHub ↗</MagneticLink>
          </p>
        </PageHeader>
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

      <CurtainSection curtain="red" className="border-t border-regal/15 bg-chiffon-light px-6 py-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">On the bench</p>
          <ul className="mt-5">
            {academic.bench.map((item, index) => (
              <Rise key={item.name} as="li" delay={index * 0.07} className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 border-t border-regal/15 py-4 md:grid-cols-12">
                <span className="font-mono text-[11px] text-redmark md:col-span-1">0{index + 1}</span>
                <span className="font-serif text-2xl md:col-span-4 md:text-3xl">{item.name}</span>
                <span className="col-start-2 text-sm opacity-75 md:col-span-7 md:col-start-auto">{item.note}</span>
              </Rise>
            ))}
          </ul>
        </div>
      </CurtainSection>

      <CurtainSection curtain="navy" className="border-t border-regal/15 px-6 py-24 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
          <Rise className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">How I work</p>
            <blockquote className="mt-5">
              <p className="font-serif text-[clamp(1.9rem,3.2vw,2.8rem)] italic leading-[1.18]">“{academic.quote}”</p>
            </blockquote>
          </Rise>
          <ol className="lg:col-span-6 lg:col-start-7">
            {academic.values.map((value, index) => (
              <Rise key={value.title} as="li" delay={index * 0.08} className="border-t border-regal/15 py-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-redmark">0{index + 1}</p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl">{value.title}</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed opacity-80">{value.text}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </CurtainSection>

      <div>
        {academic.skills.map((group, index) => (
          <Band key={group.title} group={group} index={index} dark={index % 2 === 1} />
        ))}
      </div>

      <section className="px-6 py-14 md:px-10 lg:px-14">
        <p className="mx-auto max-w-[1400px] text-sm leading-relaxed opacity-80">
          I practice problems on{" "}
          <a href={person.social.leetcode} className="underline decoration-redmark underline-offset-4 hover:text-redmark" target="_blank" rel="noreferrer">
            LeetCode
          </a>
          . It is drill, not a claim of mastery.
        </p>
      </section>
    </>
  );
}

function Band({ group, index, dark }: { group: Group; index: number; dark: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id={`skill-${index}`}
      className={cn(
        "relative scroll-mt-[4.25rem] overflow-clip border-b px-6 py-16 md:px-10 md:py-24 lg:px-14",
        dark ? "on-navy border-chiffon/15 bg-regal text-chiffon" : "border-regal/15 bg-chiffon text-regal"
      )}
    >
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { y: drift }}
        className={cn(
          "pointer-events-none absolute -right-4 top-6 select-none font-serif text-[clamp(10rem,28vw,26rem)] leading-none opacity-[0.07]",
          dark ? "text-chiffon" : "text-regal"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <div className="relative mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <GroupIcon kind={group.icon} className="h-20 w-20 text-regal" />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">
              {String(index + 1).padStart(2, "0")} / {String(academic.skills.length).padStart(2, "0")}
            </p>
            <Rise>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">{group.title}</h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-75">{group.blurb}</p>
            </Rise>
          </div>
        </div>

        <ul className="grid content-start md:col-span-8">
          {group.items.map((item, itemIndex) => (
            <RuleRow key={item.name} delay={(itemIndex % 3) * 0.05} rule={dark ? "bg-chiffon/30" : "bg-regal/25"} className="py-4">
              <span className="flex items-baseline gap-4 font-serif text-2xl md:text-[1.7rem]">
                <span className="font-mono text-[11px] text-redmark">{String(itemIndex + 1).padStart(2, "0")}</span>
                {item.name}
              </span>
              <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">{item.note}</span>
            </RuleRow>
          ))}
        </ul>
      </div>
    </section>
  );
}
