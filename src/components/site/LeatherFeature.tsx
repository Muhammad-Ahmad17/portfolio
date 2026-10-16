import { Link } from "react-router-dom";
import { JacketDrawing } from "@/art/JacketDrawing";
import { freelance } from "@/data/freelance";
import { Rise } from "@/motion/Rise";
import { cn } from "@/lib/utils";

type LeatherFeatureProps = {
  /** Compact is the home-page teaser; full is the work page. */
  compact?: boolean;
};

export function LeatherFeature({ compact = false }: LeatherFeatureProps) {
  const project = freelance.project;

  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <Rise className="lg:col-span-5">
        <figure className="relative border border-chiffon/30 bg-regal-deep p-6">
          <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-chiffon/10" />
          <figcaption className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
            fig. {project.index}
          </figcaption>
          <JacketDrawing className="mx-auto h-auto w-full max-w-[420px] pt-4 text-chiffon" />
        </figure>
      </Rise>

      <div className="flex flex-col lg:col-span-7">
        <Rise>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-redmark">
            {project.index} · {project.kind}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.92]">{project.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-85">{project.summary}</p>
        </Rise>

        {!compact && (
          <ul className="mt-8 max-w-xl">
            {project.points.map((point, index) => (
              <Rise key={point} as="li" delay={index * 0.06} className="flex gap-4 border-t border-chiffon/15 py-3 text-sm leading-relaxed">
                <span className="font-mono text-[11px] text-redmark">{String(index + 1).padStart(2, "0")}</span>
                {point}
              </Rise>
            ))}
          </ul>
        )}

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="border border-chiffon/30 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
              {tag}
            </li>
          ))}
        </ul>

        <p className={cn("mt-10 flex flex-wrap items-center gap-x-8 gap-y-4")}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="bg-redmark px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-chiffon transition-opacity hover:opacity-80"
            >
              {link.label} ↗
            </a>
          ))}
          {compact && (
            <Link to="/freelance/work" className="font-mono text-[12px] uppercase tracking-[0.2em] underline decoration-redmark underline-offset-[7px] hover:text-redmark">
              The details
            </Link>
          )}
        </p>
      </div>
    </article>
  );
}
