import { CtaBand } from "@/components/site/CtaBand";
import { LeatherFeature } from "@/components/site/LeatherFeature";
import { PageHeader } from "@/components/site/PageHeader";
import { ProjectStack } from "@/components/site/ProjectStack";
import { academic } from "@/data/academic";
import { freelance } from "@/data/freelance";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { Rise } from "@/motion/Rise";

const systemsProjects = academic.projects.filter((project) => project.track === "systems");
const softwareProjects = academic.projects.filter((project) => project.track === "software");

export default function Work() {
  usePageTitle("Work — Muhammad Ahmad");
  const job = freelance.experience;

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          index="01"
          label="Work"
          title="Shipped"
          lede="A live storefront, an internship, and the projects from the degree: boards, pipelines, and the software built beside them."
        />
      </FullScreenReveal>

      <div className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <LeatherFeature />
        </div>
      </div>

      <CurtainSection curtain="navy" className="on-navy border-t border-chiffon/20 bg-regal px-6 py-20 text-chiffon md:px-10 lg:px-14">
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

      <div className="px-6 pt-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-10 border-b border-regal/20 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Track A</p>
            <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none">Hardware & systems</h2>
            <p className="mt-3 max-w-md text-sm opacity-75">The degree: boards, signals, and pipelines.</p>
          </Rise>
          <ProjectStack projects={systemsProjects} />
        </div>
      </div>

      <div id="software" className="scroll-mt-24 px-6 pb-20 pt-8 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-10 border-b border-regal/20 pb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Track B</p>
            <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none">Software, in parallel</h2>
            <p className="mt-3 max-w-md text-sm opacity-75">Built alongside the same semesters.</p>
          </Rise>
          <ProjectStack projects={softwareProjects} />
        </div>
      </div>

      <CtaBand />
    </>
  );
}
