import { P, Pulse, Sketch } from "./draw";
import { handLine, wavePath } from "./hand";
import { cn } from "@/lib/utils";

/** A hand-drawn signal line that draws itself across the page. */
export function WaveDivider({ className, seed = 3 }: { className?: string; seed?: number }) {
  const wave = wavePath(0, 24, 1200, 9, 16, seed);

  return (
    <div className={cn("w-full overflow-hidden px-0", className)} aria-hidden="true">
      <Sketch viewBox="0 0 1200 48" duration={3.2} className="block h-10 w-full min-w-[720px] md:h-12">
        {(p) => (
          <g>
            <P d={handLine(0, 24, 1200, 24, seed, 0.6, 0)} progress={p} from={0} to={0.6} width={0.8} className="opacity-40" />
            <P d={wave} progress={p} from={0.1} to={1} width={1.6} />
            <g className="text-redmark">
              <Pulse path={wave} dur={5.2} begin={3.4} />
            </g>
          </g>
        )}
      </Sketch>
    </div>
  );
}
