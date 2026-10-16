import { CtaBand } from "@/components/site/CtaBand";
import { LeatherFeature } from "@/components/site/LeatherFeature";
import { PageHeader } from "@/components/site/PageHeader";
import { freelance } from "@/data/freelance";
import { person } from "@/data/person";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";

export default function Work() {
  usePageTitle("Work — Muhammad Ahmad");
  const job = freelance.experience;

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          tone="freelance"
          index="02"
          label="Work"
          title="Shipped"
          lede="A live storefront for a real business. Study projects, boards, and cloud experiments are kept with the academic record."
        />
      </FullScreenReveal>

      <div className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <LeatherFeature />
        </div>
      </div>

      <CurtainSection curtain="chiffon" className="on-red border-t border-chiffon/25 bg-redmark px-6 py-20 text-chiffon md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
          <Rise className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">Employment</p>
          </Rise>
          <Rise className="md:col-span-9" delay={0.05}>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              {job.title}
              <span className="italic">, {job.company}</span>
            </h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] opacity-60">
              {job.period} · {job.place}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80">{job.text}</p>
            <p className="mt-5 flex flex-wrap gap-x-6 font-mono text-[11px] uppercase tracking-[0.16em]">
              <a href={job.companyUrl} className="underline decoration-chiffon/60 underline-offset-4 hover:opacity-70" target="_blank" rel="noreferrer">
                Company ↗
              </a>
              <a href={job.log} className="underline decoration-chiffon/60 underline-offset-4 hover:opacity-70" target="_blank" rel="noreferrer">
                Daily log ↗
              </a>
            </p>
          </Rise>
        </div>
      </CurtainSection>

      <CurtainSection curtain="warm" className="border-t border-regal/15 px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
          <Rise className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">Tools on this side</p>
          </Rise>
          <ul className="grid gap-x-10 sm:grid-cols-2 md:col-span-9">
            {freelance.skills.map((item, index) => (
              <Rise key={item.name} as="li" delay={(index % 4) * 0.04} className="flex items-baseline justify-between gap-4 border-t border-regal/15 py-3">
                <span className="text-sm">
                  <span className="mr-3 font-mono text-[11px] text-redmark">{String(index + 1).padStart(2, "0")}</span>
                  {item.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-55">{item.note}</span>
              </Rise>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-10 max-w-[1400px] font-mono text-[11px] uppercase tracking-[0.18em]">
          <MagneticLink href={person.social.github}>More on GitHub ↗</MagneticLink>
        </p>
      </CurtainSection>

      <CtaBand />
    </>
  );
}
