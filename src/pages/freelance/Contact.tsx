import { person } from "@/data/person";
import { freelance } from "@/data/freelance";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CurtainSection } from "@/motion/CurtainSection";
import { FullScreenReveal } from "@/motion/FullScreenReveal";
import { LetterRise } from "@/motion/LetterRise";
import { MagneticLink } from "@/motion/MagneticLink";
import { Rise } from "@/motion/Rise";
import { StrokeDraw } from "@/motion/StrokeDraw";

const links = [
  { label: "GitHub", href: person.social.github },
  { label: "LinkedIn", href: person.social.linkedin },
  { label: "LeetCode", href: person.social.leetcode },
  { label: "Resume", href: person.resume },
  { label: "Phone", href: person.phoneHref },
];

export default function Contact() {
  usePageTitle("Contact — Muhammad Ahmad");

  return (
    <>
      <FullScreenReveal>
        <section className="on-red border-b border-chiffon/25 bg-redmark px-6 pb-20 pt-16 text-chiffon md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] opacity-80">04 — Contact</p>
            <h1 className="mt-5 max-w-5xl break-words font-serif text-[clamp(2.4rem,6.6vw,6rem)] leading-[0.95]">
              <a href={`mailto:${person.email}`} className="hover:opacity-80">
                <LetterRise text={person.email} stagger={0.02} />
              </a>
            </h1>
            <div className="mt-4 w-40 text-chiffon">
              <StrokeDraw delay={0.9} />
            </div>
            <p className="mt-8 max-w-md text-base leading-relaxed text-chiffon/90">
              Tell me what you sell, what it has to connect to, and when you need it. Or just ask for a free 15-minute call. {freelance.response}
            </p>
          </div>
        </section>
      </FullScreenReveal>

      <CurtainSection curtain="red" className="bg-regal px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Place", person.location],
              ["Phone", person.phone],
              ["Status", freelance.availability],
            ].map(([label, value], index) => (
              <Rise key={label} delay={index * 0.06} className="border-t border-chiffon/20 pt-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-redmark">{label}</dt>
                <dd className="mt-2 font-serif text-3xl">{value}</dd>
              </Rise>
            ))}
          </dl>

          <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-chiffon/20 pt-8">
            {links.map((link) => (
              <li key={link.label}>
                <MagneticLink href={link.href} className="font-mono text-[12px] uppercase tracking-[0.18em]">
                  {link.label} ↗
                </MagneticLink>
              </li>
            ))}
          </ul>
        </div>
      </CurtainSection>

      <CurtainSection curtain="red" className="border-t border-chiffon/15 bg-regal-deep px-6 py-24 text-chiffon md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-end">
          <Rise className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">{freelance.meeting.label}</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
              Fifteen minutes, <span className="italic">no pressure.</span>
            </h2>
            <div className="mt-3 w-40 text-redmark">
              <StrokeDraw delay={0.2} />
            </div>
          </Rise>
          <Rise delay={0.1} className="lg:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-chiffon/90">{freelance.meeting.text}</p>
            <MagneticLink
              href={freelance.meeting.href}
              className="mt-6 inline-block bg-redmark px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-chiffon hover:bg-chiffon hover:text-navy"
            >
              {freelance.meeting.short}
            </MagneticLink>
          </Rise>
        </div>
      </CurtainSection>
    </>
  );
}
