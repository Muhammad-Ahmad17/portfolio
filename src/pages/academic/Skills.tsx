import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GroupIcon } from "@/art/GroupIcon";
import { PageHeader } from "@/components/site/PageHeader";
import { academic } from "@/data/academic";
import { person } from "@/data/person";
import { usePageTitle } from "@/hooks/usePageTitle";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";
import { RuleRow } from "@/motion/RuleRow";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type Group = (typeof academic.skills)[number];

export default function Skills() {
  usePageTitle("Skills — Muhammad Ahmad");

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          index="04"
          label="Skills"
          title="The bench"
          lede="From C on a microcontroller to Node.js and the cloud it reports to. Grouped by where they sit in the machine."
        >
          <ul className="mt-8 flex flex-wrap gap-2">
            {academic.skills.map((group, index) => (
              <li key={group.title}>
                <a
                  href={`#skill-${index}`}
                  className="inline-block border border-regal/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-redmark hover:text-redmark"
                >
                  {String(index + 1).padStart(2, "0")} {group.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em]">
            <MagneticLink href={academic.github}>Proof is on GitHub ↗</MagneticLink>
          </p>
        </PageHeader>
      </FullScreenReveal>

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

/**
 * One group. The title block stays pinned while its rows draw in beside it,
 * and a ghost numeral drifts slowly against the scroll.
 */
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
            <RuleRow
              key={item.name}
              delay={(itemIndex % 3) * 0.05}
              rule={dark ? "bg-chiffon/30" : "bg-regal/25"}
              className="py-4"
            >
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
