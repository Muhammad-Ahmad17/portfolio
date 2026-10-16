import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { palettes, setPalette, usePalette, type Palette } from "@/theme/palettes";

const groups: Palette["group"][] = ["Classic", "Bold", "Creamy"];

function Swatches({ palette }: { palette: Palette }) {
  return (
    <span className="flex h-4 w-12 shrink-0 overflow-hidden border border-black/20" aria-hidden="true">
      <span className="flex-1" style={{ background: palette.a }} />
      <span className="flex-1" style={{ background: palette.b }} />
      <span className="flex-1" style={{ background: palette.paper }} />
    </span>
  );
}

/* A temporary picker for comparing colour trios. The choice is kept in localStorage and applies to the whole site. */
export function PaletteSwitcher() {
  const current = usePalette();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={box}
      className="fixed bottom-4 right-4 z-[55] flex flex-col-reverse items-end gap-2 md:bottom-auto md:left-1/2 md:right-auto md:top-4 md:-translate-x-1/2 md:flex-col md:items-center"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="palette-list"
        className="flex items-center gap-3 border border-regal/40 bg-chiffon px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-regal shadow-sm transition-opacity hover:opacity-90"
      >
        <Swatches palette={current} />
        Palette · {current.name}
      </button>

      {open && (
        <div
          id="palette-list"
          role="listbox"
          aria-label="Colour palette"
          className="max-h-[70dvh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto border border-regal/40 bg-chiffon p-2 text-regal shadow-lg"
        >
          {groups.map((group) => (
            <div key={group} className="mb-1 last:mb-0">
              <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-regal/60">{group}</p>
              {palettes
                .filter((palette) => palette.group === group)
                .map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    role="option"
                    aria-selected={palette.id === current.id}
                    onClick={() => setPalette(palette.id)}
                    className={cn(
                      "flex w-full items-center gap-3 px-2 py-2 text-left font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                      palette.id === current.id ? "bg-regal text-chiffon" : "hover:bg-regal/10"
                    )}
                  >
                    <Swatches palette={palette} />
                    {palette.name}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
