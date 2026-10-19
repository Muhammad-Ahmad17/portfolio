import { Logo } from "@/components/site/Logo";
import { PaletteSwitcher } from "@/components/site/PaletteSwitcher";
import { person } from "@/data/person";
import { cn } from "@/lib/utils";
import { MagneticLink } from "@/motion/MagneticLink";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const items = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/notes", label: "Notes" },
  { to: "/contact", label: "Contact" },
];

const bar = "on-navy border-chiffon/20 bg-regal text-chiffon";
const hover = "hover:opacity-70";
const active = "bg-crimson text-cream";

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);

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
          <Link to="/" aria-label="Muhammad Ahmad, home" className={cn("block", hover)}>
            <Logo blink className="h-8 w-auto" />
          </Link>

          <nav className="hidden items-center gap-x-5 md:flex" aria-label="Site">
            {items.map((item) => (
              <SiteLink key={item.to} item={item} pathname={pathname} />
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={person.resume}
              download
              className={cn("hidden font-mono text-[10px] uppercase tracking-[0.2em] lg:inline", hover)}
            >
              Resume
            </a>
            <a
              href={person.social.github}
              target="_blank"
              rel="noreferrer"
              className={cn("hidden font-mono text-[10px] uppercase tracking-[0.2em] lg:inline", hover)}
            >
              GitHub ↗
            </a>
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
          <nav className={cn("absolute inset-x-0 top-full flex flex-col gap-4 border-b px-6 py-6 md:hidden", bar)} aria-label="Site">
            {items.map((item) => (
              <SiteLink key={item.to} item={item} pathname={pathname} />
            ))}
            <a href={person.resume} download className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Resume
            </a>
            <a href={person.social.github} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.2em]">
              GitHub ↗
            </a>
          </nav>
        )}
      </header>

      <main id="content" className="flex-1 pt-[4.25rem]">
        <Outlet />
      </main>

      <footer className={cn("border-t px-6 py-12 md:px-10 lg:px-14", bar)}>
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-3 md:items-end">
          <div>
            <Logo className="h-12 w-auto" />
            <p className="mt-3 max-w-xs font-mono text-[11px] uppercase leading-5 tracking-[0.16em] opacity-70">
              Software engineer · computer engineer by degree
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
            {items.map((item) => (
              <Link key={item.to} to={item.to} className={hover}>
                {item.label}
              </Link>
            ))}
            <a href={person.social.github} target="_blank" rel="noreferrer" className={hover}>
              GitHub ↗
            </a>
            <a href={person.social.linkedin} target="_blank" rel="noreferrer" className={hover}>
              LinkedIn ↗
            </a>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <MagneticLink href={`mailto:${person.email}`} className="font-mono text-[13px] tracking-normal hover:text-redmark">
              {person.email}
            </MagneticLink>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">{person.location}</p>
            <PaletteSwitcher inline />
          </div>
        </div>
      </footer>
    </div>
  );
}

function SiteLink({ item, pathname }: { item: (typeof items)[number]; pathname: string }) {
  const isActive = pathname === item.to || pathname.startsWith(`${item.to}/`);

  return (
    <NavLink
      to={item.to}
      className={cn(
        "relative inline-block px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        hover,
        isActive && active
      )}
    >
      {item.label}
    </NavLink>
  );
}
