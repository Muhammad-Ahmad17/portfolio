import { F, P, Sketch, T } from "./draw";
import { handLine, handPoly, handRect } from "./hand";

type SemesterStripProps = {
  current: number;
  total: number;
  className?: string;
};

export function SemesterStrip({ current, total, className }: SemesterStripProps) {
  const width = 80 * total;

  return (
    <Sketch
      viewBox={`0 0 ${width} 130`}
      duration={3}
      className={className}
      label={`Semester ${current} of ${total}, drawn as a row of boxes`}
    >
      {(p) => (
        <g>
          {Array.from({ length: total }).map((_, i) => {
            const x = 8 + i * 80;
            const from = (i / total) * 0.7;
            const to = from + 0.22;
            const done = i < current - 1;
            const now = i === current - 1;
            return (
              <g key={i}>
                <P d={handRect(x, 34, 62, 62, i + 1)} progress={p} from={from} to={to} width={now ? 2.2 : 1.6} className={now ? "text-redmark" : undefined} />
                {done && (
                  <P d={handPoly([[x + 16, 66], [x + 28, 80], [x + 47, 50]], i + 40, false, 0.5)} progress={p} from={to - 0.05} to={to + 0.08} width={2} />
                )}
                {now && (
                  <>
                    <F d={`M${x + 4} 36H${x + 60}V94H${x + 4}Z`} progress={p} from={to} to={to + 0.15} className="text-redmark" opacity={0.18} />
                    <P d={handLine(x + 10, 88, x + 52, 42, 70, 0.6, 0) + handLine(x + 22, 92, x + 56, 58, 71, 0.6, 0)} progress={p} from={to} to={to + 0.15} width={1.2} className="text-redmark" />
                  </>
                )}
                <T x={x + 31} y={118} progress={p} from={to} to={to + 0.12} size={10} className={now ? "text-redmark" : "text-regal"}>
                  {String(i + 1).padStart(2, "0")}
                </T>
              </g>
            );
          })}
          <P d={handLine(8, 18, width - 18, 18, 99, 0.8, 0)} progress={p} from={0.6} to={0.95} width={1} className="text-regal/40" />
          <T x={8} y={12} progress={p} from={0.85} to={1} size={9} anchor="start" className="text-regal">
            2023
          </T>
          <T x={width - 18} y={12} progress={p} from={0.85} to={1} size={9} anchor="end" className="text-regal">
            2027
          </T>
        </g>
      )}
    </Sketch>
  );
}
