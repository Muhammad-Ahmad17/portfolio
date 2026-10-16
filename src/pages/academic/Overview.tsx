import { Link } from "react-router-dom";
import { BenchDrawing } from "@/art/BenchDrawing";
import { HardwareGlyph, LogicGlyph, SoftwareGlyph, SystemsGlyph } from "@/art/Glyphs";
import { SemesterStrip } from "@/art/SemesterStrip";
import { WaveDivider } from "@/art/WaveDivider";
import { ResumeButton } from "@/components/site/ResumeButton";
import { academic } from "@/data/academic";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CircuitField } from "@/motion/CircuitField";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { LetterRise } from "@/motion/LetterRise";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";
import { StrokeDraw } from "@/motion/StrokeDraw";
import { WordScene } from "@/motion/WordScene";

const glyphs = [LogicGlyph, HardwareGlyph, SystemsGlyph, SoftwareGlyph];
const sceneItems = academic.study.map((item, index) => ({ ...item, Art: glyphs[index] }));

export default function Overview() {
  usePageTitle("Computer Engineer — Muhammad Ahmad");

  return (
    <>
      <FullScreenReveal>
        <section className="on-navy relative min-h-[calc(100dvh-4.25rem)] overflow-hidden bg-regal text-chiffon">
          <div className="pointer-events-none absolute inset-0">
            <CircuitField room="academic" />
          </div>
          <div className="relative mx-auto grid min-h-[calc(100dvh-4.25rem)] max-w-[1500px] gap-10 px-6 py-10 md:px-10 lg:grid-cols-12 lg:px-14">
            <div className="flex flex-col justify-between gap-12 lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-redmark">Academic · Computer engineering</p>
              <div>
                <h1 className="font-serif text-[clamp(3.5rem,10.5vw,9rem)] leading-[0.82] tracking-[-0.045em]">
                  <span className="block">
                    <LetterRise text="Computer" />
                  </span>
                  <span className="block">
                    <LetterRise text="Engineer" delay={0.14} />
                  </span>
                </h1>
                <div className="mt-3 w-36 text-redmark md:w-48">
                  <StrokeDraw delay={0.75} />
                </div>
                <p className="mt-8 max-w-md text-base leading-relaxed md:text-lg">{academic.lede}</p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <ResumeButton />
                  <a
                    href={academic.github}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-chiffon/60 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors hover:bg-chiffon hover:text-navy"
                  >
                    GitHub ↗
                  </a>
                  <Link
                    to="/academic/projects"
                    className="font-mono text-[12px] uppercase tracking-[0.2em] underline decoration-redmark underline-offset-[7px] hover:text-redmark"
                  >
                    Projects
                  </Link>
                </div>
              </div>
              <div className="flex items-end justify-between gap-6">
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                  <span className="inline-block h-2 w-2 bg-redmark" />
                  {academic.availability}
                </p>
                <div className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] sm:flex">
                  Scroll
                  <span className="scroll-hint block h-12 w-px bg-redmark" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-5">
              <BenchDrawing className="h-auto max-h-[70vh] w-full" />
            </div>
          </div>
        </section>
      </FullScreenReveal>

      <WordScene items={sceneItems} className="border-t border-regal/15 bg-chiffon" />

      <WaveDivider seed={5} className="border-t border-regal/15 py-4" />

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

      <CurtainSection curtain="red" className="border-t border-regal/15 bg-chiffon-light px-6 py-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-12">
            <Rise className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">Right now</p>
              <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.95]">
                {academic.semester}, <span className="italic">of eight.</span>
              </h2>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-regal/15 pt-6">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-redmark">CGPA</dt>
                  <dd className="mt-2 font-serif text-4xl">{academic.cgpa}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-redmark">Years</dt>
                  <dd className="mt-2 font-serif text-4xl">{academic.period}</dd>
                </div>
              </dl>
            </Rise>
            <div className="lg:col-span-7">
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
          </div>
          <SemesterStrip current={academic.semesterNumber} total={academic.semesterTotal} className="mt-16 h-auto w-full" />
        </div>
      </CurtainSection>

      <CurtainSection curtain="navy" className="border-t border-regal/15 px-6 py-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">{academic.parallel.kicker}</p>
            <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98]">{academic.parallel.title}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed opacity-80">{academic.parallel.lede}</p>
          </Rise>

          <div className="mt-14 grid gap-px border border-regal/20 bg-regal/20 md:grid-cols-2">
            {[academic.parallel.degree, academic.parallel.software].map((track, index) => (
              <Rise key={track.label} delay={index * 0.08} className="bg-chiffon px-6 py-8 md:px-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">
                  Track {index + 1}
                </p>
                <h3 className="mt-3 font-serif text-3xl">{track.label}</h3>
                <ul className="mt-5 font-mono text-[12px] uppercase leading-7 tracking-[0.1em] opacity-75">
                  {track.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Rise>
            ))}
          </div>

          <ol className="mt-14">
            {academic.parallel.entries.map((entry, index) => (
              <Rise key={entry.title} as="li" delay={index * 0.07} className="grid gap-3 border-t border-regal/15 py-7 md:grid-cols-12 md:gap-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-redmark md:col-span-3">{entry.period}</p>
                <div className="md:col-span-7">
                  <h3 className="font-serif text-2xl md:text-3xl">{entry.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-80">{entry.text}</p>
                </div>
                <p className="md:col-span-2 md:text-right">
                  <Link
                    to={entry.to}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] underline decoration-redmark underline-offset-[6px] hover:text-redmark"
                  >
                    {entry.cta}
                  </Link>
                </p>
              </Rise>
            ))}
          </ol>
        </div>
      </CurtainSection>

      <CurtainSection curtain="red" className="bg-regal px-6 py-24 text-chiffon md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-chiffon/70">Next</p>
          <Link
            to="/academic/projects"
            className="mt-5 block font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.88] transition-opacity hover:opacity-70"
          >
            Five projects, <span className="italic">stacked.</span>
          </Link>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-chiffon/25 pt-8 font-mono text-[12px] uppercase tracking-[0.2em]">
            <MagneticLink to="/academic/education" className="hover:text-chiffon hover:opacity-70">
              Education
            </MagneticLink>
            <MagneticLink to="/academic/skills" className="hover:text-chiffon hover:opacity-70">
              Skills
            </MagneticLink>
            <MagneticLink href={academic.github} className="hover:text-chiffon hover:opacity-70">
              GitHub ↗
            </MagneticLink>
            <MagneticLink to="/freelance" className="hover:text-chiffon hover:opacity-70">
              Freelance
            </MagneticLink>
          </div>
        </div>
      </CurtainSection>
    </>
  );
}
