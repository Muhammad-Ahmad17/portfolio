import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { person } from "@/data/person";
import { MagneticLink } from "@/motion/MagneticLink";
import { StrokeDraw } from "@/motion/StrokeDraw";
import { cn } from "@/lib/utils";

type Item = { to: string; label: string; end?: boolean };

type SectionFrameProps = {
  tone: "academic" | "freelance";
  section: string;
  items: Item[];
  cross: { to: string; label: string };
  footnote: string;
};

export function SectionFrame({ tone, section, items, cross, footnote }: SectionFrameProps) {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const academic = tone === "academic";

  useLayoutEffect(() => {
    document.body.dataset.tone = tone;
    return () => {
      delete document.body.dataset.tone;
    };
  }, [tone]);

  useEffect(() => {
    setOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  const bar = academic ? "on-navy border-chiffon/20 bg-regal text-chiffon" : "on-red border-chiffon/25 bg-redmark text-chiffon";
  const hover = "hover:opacity-70";
  const active = academic ? "text-redmark" : "";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-chiffon text-regal">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-chiffon focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <header className={cn("fixed inset-x-0 top-0 z-30 border-b", bar)}>
        <div className="flex h-[4.25rem] items-center justify-between gap-6 px-6 md:px-10 lg:px-14">
          <div className="flex items-baseline gap-4">
            <Link to="/" className="font-serif text-[1.7rem] italic leading-none">
              M.A.
            </Link>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] opacity-70 sm:inline">{section}</span>
          </div>

          <nav className="hidden items-center gap-x-5 md:flex" aria-label={section}>
            {items.map((item) => (
              <FrameLink key={item.to} item={item} pathname={pathname} activeClass={active} hoverClass={hover} />
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={person.social.github}
              target="_blank"
              rel="noreferrer"
              className={cn("hidden font-mono text-[10px] uppercase tracking-[0.2em] lg:inline", hover)}
            >
              GitHub ↗
            </a>
            <Link to={cross.to} className={cn("hidden font-mono text-[10px] uppercase tracking-[0.2em] lg:inline", hover)}>
              {cross.label}
            </Link>
            <button
              type="button"
              className="font-mono text-[11px] uppercase tracking-[0.2em] md:hidden"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {open && (
          <nav className={cn("absolute inset-x-0 top-full flex flex-col gap-4 border-b px-6 py-6 md:hidden", bar)} aria-label={section}>
            {items.map((item) => (
              <FrameLink key={item.to} item={item} pathname={pathname} activeClass={active} hoverClass={hover} />
            ))}
            <a href={person.social.github} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.2em]">
              GitHub ↗
            </a>
            <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-80">
              Index
            </Link>
            <Link to={cross.to} className="font-mono text-[11px] uppercase tracking-[0.2em]">
              {cross.label}
            </Link>
          </nav>
        )}
      </header>

      <main id="content" className="flex-1 pt-[4.25rem]">
        <Outlet />
      </main>

      <footer className={cn("border-t px-6 py-12 md:px-10 lg:px-14", bar)}>
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-3 md:items-end">
          <div>
            <p className="font-serif text-3xl italic leading-none">M.A.</p>
            <p className="mt-3 max-w-xs font-mono text-[11px] uppercase leading-5 tracking-[0.16em] opacity-70">{footnote}</p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
            <Link to="/" className={hover}>
              Index
            </Link>
            <Link to={cross.to} className={hover}>
              {cross.label}
            </Link>
            <a href={person.social.github} target="_blank" rel="noreferrer" className={hover}>
              GitHub ↗
            </a>
            <a href={person.social.linkedin} target="_blank" rel="noreferrer" className={hover}>
              LinkedIn ↗
            </a>
          </div>
          <div className="md:text-right">
            <MagneticLink
              href={`mailto:${person.email}`}
              className={cn("font-mono text-[13px] tracking-normal", academic ? "hover:text-redmark" : "hover:opacity-70")}
            >
              {person.email}
            </MagneticLink>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">{person.location}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

type FrameLinkProps = { item: Item; pathname: string; activeClass: string; hoverClass: string };

function FrameLink({ item, pathname, activeClass, hoverClass }: FrameLinkProps) {
  const isActive = item.end ? pathname === item.to : pathname === item.to || pathname.startsWith(`${item.to}/`);

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={cn(
        "relative inline-block pb-2 font-mono text-[11px] uppercase tracking-[0.18em]",
        hoverClass,
        isActive && activeClass
      )}
    >
      {item.label}
      {isActive && <StrokeDraw className="absolute -bottom-0.5 left-0 w-full" delay={0.05} />}
    </NavLink>
  );
}
