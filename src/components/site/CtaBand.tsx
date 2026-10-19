import { Link } from "react-router-dom";
import { freelance } from "@/data/freelance";
import { person } from "@/data/person";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";
import { StrokeDraw } from "@/motion/StrokeDraw";

type CtaBandProps = {
  title?: string;
};

/** A full-width deep-navy call to action; a red curtain lifts off it on scroll. */
export function CtaBand({ title = "Have a store, an API, or a payment flow to build?" }: CtaBandProps) {
  const meeting = freelance.meeting;

  return (
    <section className="on-red border-t border-chiffon/25 bg-redmark px-6 py-24 text-chiffon md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <Rise>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-chiffon/75">Start a project</p>
          <h2 className="mt-5 max-w-4xl font-serif text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[0.95]">{title}</h2>
          <div className="mt-3 w-40 text-redmark">
            <StrokeDraw delay={0.2} />
          </div>
        </Rise>

        <Rise delay={0.1} className="mt-10 grid gap-8 border-t border-chiffon/25 pt-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-redmark">{meeting.label}</p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-chiffon/90">{meeting.text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-6 lg:justify-end">
            <MagneticLink
              href={meeting.href}
              className="bg-chiffon px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-crimson hover:opacity-85"
            >
              {meeting.short}
            </MagneticLink>
            <MagneticLink
              href={`mailto:${person.email}`}
              className="border border-chiffon/60 px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] hover:bg-chiffon hover:text-crimson"
            >
              {person.email}
            </MagneticLink>
            <Link
              to="/services"
              className="font-mono text-[12px] uppercase tracking-[0.2em] underline decoration-chiffon/60 underline-offset-[7px] hover:opacity-70"
            >
              What I take on
            </Link>
          </div>
        </Rise>
      </div>
    </section>
  );
}
