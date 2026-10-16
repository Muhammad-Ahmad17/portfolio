import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Not on the map — Muhammad Ahmad");

  useLayoutEffect(() => {
    delete document.body.dataset.tone;
  }, []);

  return (
    <main className="flex min-h-[100dvh] flex-col justify-between bg-chiffon px-6 py-8 text-regal md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em]">Muhammad Ahmad</p>
      <div>
        <h1 className="font-serif text-[clamp(4rem,12vw,9rem)] leading-[0.84]">Unmapped.</h1>
        <p className="mt-6 max-w-md text-base leading-relaxed opacity-80">
          This address is not on the academic record or the freelance practice.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em]">
        <Link to="/" className="hover:text-redmark">
          Index
        </Link>
        <Link to="/academic" className="hover:text-redmark">
          Academic
        </Link>
        <Link to="/freelance" className="hover:text-redmark">
          Freelance
        </Link>
      </div>
    </main>
  );
}
