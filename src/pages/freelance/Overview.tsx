import { Link } from "react-router-dom";
import { DeskDrawing } from "@/art/DeskDrawing";
import { GroupIcon } from "@/art/GroupIcon";
import { ListenGlyph, ShapeGlyph, ShipGlyph, SoftwareGlyph } from "@/art/Glyphs";
import { CtaBand } from "@/components/site/CtaBand";
import { LeatherFeature } from "@/components/site/LeatherFeature";
import { ResumeButton } from "@/components/site/ResumeButton";
import { freelance } from "@/data/freelance";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CircuitField } from "@/motion/CircuitField";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { LetterRise } from "@/motion/LetterRise";
import { MarqueeLine } from "@/motion/MarqueeLine";
import { Rise } from "@/motion/Rise";
import { StrokeDraw } from "@/motion/StrokeDraw";
import { WordScene } from "@/motion/WordScene";

const glyphs = [ListenGlyph, ShapeGlyph, SoftwareGlyph, ShipGlyph];
const sceneItems = freelance.process.map((item, index) => ({ word: `${item.step}.`, note: item.text, Art: glyphs[index] }));

export default function Overview() {
  usePageTitle("Software Engineer — Muhammad Ahmad");

  return (
    <>
      <FullScreenReveal>
        <section className="relative min-h-[calc(100dvh-4.25rem)] overflow-hidden bg-chiffon text-regal">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <CircuitField room="freelance" />
          </div>
          <div className="relative mx-auto grid min-h-[calc(100dvh-4.25rem)] max-w-[1500px] gap-10 px-6 py-10 md:px-10 lg:grid-cols-12 lg:px-14">
            <div className="flex flex-col justify-between gap-12 border-t-4 border-redmark pt-6 lg:col-span-7">
              <div className="flex items-center justify-between gap-4">
                <p className="inline-flex items-center gap-2.5 bg-redmark px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-chiffon">
                  <span className="inline-block h-1.5 w-1.5 bg-chiffon" />
                  Freelance · Software engineer
                </p>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-regal/60 sm:inline">02 / PRACTICE</span>
              </div>
              <div>
                <h1 className="font-serif text-[clamp(3.5rem,10.5vw,9rem)] leading-[0.82] tracking-[-0.045em] text-regal">
                  <span className="block">
                    <LetterRise text="Software" />
                  </span>
                  <span className="block">
                    <LetterRise text="Engineer" delay={0.14} />
                  </span>
                </h1>
                <div className="mt-3 w-36 text-redmark md:w-48">
                  <StrokeDraw delay={0.75} />
                </div>
                <p className="mt-8 max-w-md text-base leading-relaxed text-regal/85 md:text-lg">{freelance.lede}</p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Link
                    to="/freelance/contact"
                    className="bg-redmark px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-chiffon transition-opacity hover:opacity-85"
                  >
                    Start a project
                  </Link>
                  <ResumeButton variant="ghost" />
                  <Link
                    to="/freelance/work"
                    className="font-mono text-[12px] uppercase tracking-[0.2em] text-regal underline decoration-redmark underline-offset-[7px] hover:text-redmark"
                  >
                    See the work
                  </Link>
                </div>
                <p className="mt-8 max-w-md border-l-2 border-redmark pl-4 text-sm leading-relaxed text-regal/85">
                  {freelance.meeting.text}{" "}
                  <a href={freelance.meeting.href} className="whitespace-nowrap font-medium text-redmark underline decoration-redmark/60 underline-offset-4 hover:opacity-75">
                    Book a call
                  </a>
                </p>
              </div>
              <div className="flex items-end justify-between gap-6 border-t border-regal/15 pt-5">
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-regal">
                  <span className="inline-block h-2 w-2 bg-redmark" />
                  {freelance.availability}
                </p>
                <div className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-regal sm:flex">
                  Scroll
                  <span className="scroll-hint block h-12 w-px bg-redmark" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-5">
              <div className="relative w-full border border-regal/25 bg-chiffon-light/90 p-5 shadow-[8px_8px_0_0_rgb(var(--c-redmark))] md:p-7">
                <div className="mb-3 flex items-center justify-between border-b border-regal/15 pb-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-regal/70">
                  <span>FIG. 00 — DELIVERY DESK</span>
                  <span className="text-redmark">STOREFRONT · API · PAYMENTS</span>
                </div>
                <DeskDrawing className="h-auto max-h-[62vh] w-full" />
              </div>
            </div>
          </div>
        </section>
      </FullScreenReveal>

      <MarqueeLine items={freelance.marquee} className="border-regal/20 bg-chiffon-warm text-regal" />

      <WordScene
        items={sceneItems}
        className="bg-chiffon text-regal"
        wordClass="text-redmark"
        numberClass="text-regal"
      />

      <CurtainSection curtain="red" className="border-t border-regal/15 bg-chiffon-light px-6 py-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-6xl">Selected work</h2>
            <Link to="/freelance/work" className="font-mono text-[11px] uppercase tracking-[0.18em] hover:text-redmark">
              All of it
            </Link>
          </Rise>
          <LeatherFeature compact />
        </div>
      </CurtainSection>

      <CurtainSection curtain="warm" className="border-t border-regal/15 px-6 py-24 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Rise className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-6xl">What I take on</h2>
            <Link to="/freelance/services" className="font-mono text-[11px] uppercase tracking-[0.18em] hover:text-redmark">
              All services
            </Link>
          </Rise>
          <ul>
            {freelance.services.map((service, index) => (
              <Rise key={service.index} as="li" delay={(index % 3) * 0.05}>
                <Link
                  to="/freelance/services"
                  className="group grid grid-cols-[auto_1fr] items-center gap-x-6 border-t border-regal/15 py-4 hover:text-redmark md:grid-cols-12"
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] text-redmark md:col-span-1">{service.index}</span>
                  <span className="font-serif text-2xl transition-transform duration-500 group-hover:translate-x-2 md:col-span-9 md:text-4xl">
                    {service.name}
                  </span>
                  <GroupIcon kind={service.icon} className="hidden h-10 w-10 justify-self-end text-regal group-hover:text-redmark md:col-span-2 md:block" />
                </Link>
              </Rise>
            ))}
          </ul>
        </div>
      </CurtainSection>

      <CtaBand />
    </>
  );
}
