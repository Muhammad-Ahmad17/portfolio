import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Blink the cursor, like a terminal prompt waiting for input. */
  blink?: boolean;
};

/*
  The mark: an M drawn with straight strokes and a terminal cursor under it.
  It takes the colour of the text around it (currentColor), so it works on any room.
  The favicon is the same drawing on a filled tile (public/favicon.svg, recoloured per palette in theme/palettes.ts).
*/
export function Logo({ className, blink = false }: LogoProps) {
  return (
    <svg viewBox="8 8 48 52" className={cn("block", className)} role="img" aria-label="Muhammad Ahmad">
      <path d="M15 44V17L32 34L49 17V44" fill="none" stroke="currentColor" strokeWidth="6.5" strokeLinejoin="miter" />
      <rect x="15" y="50" width="22" height="5.5" fill="currentColor" className={cn(blink && "logo-cursor")} />
    </svg>
  );
}
