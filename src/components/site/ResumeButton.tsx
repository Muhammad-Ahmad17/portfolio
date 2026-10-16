import { Download } from "lucide-react";
import { handRect } from "@/art/hand";
import { person } from "@/data/person";
import { cn } from "@/lib/utils";

const outline = handRect(3, 3, 194, 46, 9, 1, 3);

type ResumeButtonProps = {
  /** "red" sits on chiffon, "chiffon" and "ghost" sit on red. */
  variant?: "red" | "chiffon" | "ghost";
  className?: string;
};

const fills = {
  red: "bg-redmark text-chiffon",
  chiffon: "bg-chiffon text-crimson",
  ghost: "border border-chiffon/70 text-chiffon",
} as const;

const strokes = {
  red: "text-regal",
  chiffon: "text-chiffon",
  ghost: "text-chiffon",
} as const;

export function ResumeButton({ variant = "red", className }: ResumeButtonProps) {
  return (
    <a
      href={person.resume}
      download
      className={cn(
        "group relative inline-flex items-center gap-3 px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em]",
        fills[variant],
        className
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 52"
        preserveAspectRatio="none"
        fill="none"
        className={cn("pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]", strokes[variant])}
      >
        <path
          d={outline}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0]"
        />
      </svg>
      Resume
      <Download className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" aria-hidden="true" />
    </a>
  );
}
