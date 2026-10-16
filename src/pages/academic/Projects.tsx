import { Link } from "react-router-dom";
import { WaveDivider } from "@/art/WaveDivider";
import { PageHeader } from "@/components/site/PageHeader";
import { ProjectStack } from "@/components/site/ProjectStack";
import { academic } from "@/data/academic";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";

const systemsProjects = academic.projects.filter((project) => project.track === "systems");
const softwareProjects = academic.projects.filter((project) => project.track === "software");

function TrackHeading({
  index,
  label,
  note,
  action,
}: {
  index: string;
  label: string;
  note: string;
  action?: { to: string; label: string };
}) {
  return (
    <Rise className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-regal/20 pb-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Track {index}</p>
        <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none">{label}</h2>
        <p className="mt-3 max-w-md text-sm opacity-75">{note}</p>
      </div>
      {action && (
        <Link
          to={action.to}
          className="font-mono text-[11px] uppercase tracking-[0.18em] underline decoration-redmark underline-offset-[6px] hover:text-redmark"
        >
          {action.label}
        </Link>
      )}
    </Rise>
  );
}

export default function Projects() {
  usePageTitle("Projects — Muhammad Ahmad");

  return (
    <>
      <FullScreenReveal>
        <PageHeader
          index="03"
          label="Projects"
          title="Built & wired"
          lede="Boards and pipelines from the degree, and the software I built in parallel. Five projects on two tracks, stacked in the order I would show them across a desk."
        >
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <MagneticLink href={academic.github}>All repositories on GitHub ↗</MagneticLink>
            <MagneticLink to="/freelance/work">Client work</MagneticLink>
          </p>
        </PageHeader>
      </FullScreenReveal>

      <div className="px-6 pt-12 md:px-10 md:pt-16 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <TrackHeading index="A" label="Hardware & systems" note="The degree: boards, signals, and pipelines." />
          <ProjectStack projects={systemsProjects} />
        </div>
      </div>

      <div id="software" className="scroll-mt-24 px-6 pb-20 pt-4 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <TrackHeading
            index="B"
            label="Software, in parallel"
            note="Built alongside the same semesters. More of this lives on the freelance side."
            action={{ to: "/freelance", label: "Freelance practice" }}
          />
          <ProjectStack projects={softwareProjects} />
        </div>
      </div>

      <WaveDivider seed={9} className="border-t border-regal/15 py-4" />

      <CurtainSection curtain="navy" className="px-6 py-20 md:px-10 lg:px-14">
        <Rise className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">More</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-5xl">The rest is in the repositories.</h2>
          </div>
          <div className="flex flex-col gap-3 font-mono text-[12px] uppercase tracking-[0.2em]">
            <a href={academic.github} target="_blank" rel="noreferrer" className="underline decoration-redmark underline-offset-[7px] hover:text-redmark">
              github.com/muhammad-ahmad17 ↗
            </a>
            <Link to="/academic/skills" className="hover:text-redmark">
              Skills
            </Link>
          </div>
        </Rise>
      </CurtainSection>
    </>
  );
}
