import { P, Sketch, type Progress } from "./draw";
import { handCircle, handLine, handPoly, handRect } from "./hand";
import { cn } from "@/lib/utils";

export type IconKind = "code" | "chip" | "server" | "cloud" | "tools" | "card" | "cart" | "plug";

const chipPins = (() => {
  const out: string[] = [];
  for (let i = 0; i < 3; i += 1) {
    const a = 22 + i * 10;
    out.push(handLine(a, 8, a, 16, i + 1, 0.2, 0), handLine(a, 48, a, 56, i + 5, 0.2, 0));
    out.push(handLine(8, a, 16, a, i + 9, 0.2, 0), handLine(48, a, 56, a, i + 13, 0.2, 0));
  }
  return out.join("");
})();

function Paths({ kind, p }: { kind: IconKind; p: Progress }) {
  switch (kind) {
    case "code":
      return (
        <>
          <P d={handPoly([[24, 18], [8, 32], [24, 46]], 1, false, 0.6)} progress={p} from={0} to={0.5} width={2} />
          <P d={handPoly([[40, 18], [56, 32], [40, 46]], 2, false, 0.6)} progress={p} from={0.1} to={0.6} width={2} />
          <P d={handLine(37, 12, 27, 52, 3, 0.6, 0)} progress={p} from={0.4} to={1} width={2} className="text-redmark" />
        </>
      );
    case "chip":
      return (
        <>
          <P d={handRect(16, 16, 32, 32, 1, 0.6)} progress={p} from={0} to={0.5} width={2} />
          <P d={chipPins} progress={p} from={0.3} to={0.9} width={1.6} />
          <P d={handCircle(24, 24, 2, 4)} progress={p} from={0.8} to={1} className="text-redmark" width={2} />
        </>
      );
    case "server":
      return (
        <>
          <P d={handRect(10, 10, 44, 12, 1, 0.5)} progress={p} from={0} to={0.4} width={1.8} />
          <P d={handRect(10, 26, 44, 12, 2, 0.5)} progress={p} from={0.15} to={0.55} width={1.8} />
          <P d={handRect(10, 42, 44, 12, 3, 0.5)} progress={p} from={0.3} to={0.7} width={1.8} />
          <P d={handCircle(18, 16, 1.6, 4) + handCircle(18, 32, 1.6, 5) + handCircle(18, 48, 1.6, 6)} progress={p} from={0.7} to={1} width={2} className="text-redmark" />
        </>
      );
    case "cloud":
      return (
        <>
          <P d="M18 46H48A10 10 0 0 0 46 26A14 14 0 0 0 20 24A11 11 0 0 0 18 46Z" progress={p} from={0} to={0.7} width={2} />
          <P d={handLine(32, 52, 32, 60, 3, 0.2, 0)} progress={p} from={0.7} to={1} width={2} className="text-redmark" />
        </>
      );
    case "tools":
      return (
        <>
          <P d={handLine(14, 52, 38, 28, 1, 0.5, 0)} progress={p} from={0} to={0.5} width={3} />
          <P d={handCircle(44, 20, 10, 2)} progress={p} from={0.3} to={0.8} width={2} />
          <P d={handLine(40, 12, 50, 22, 3, 0.2, 0)} progress={p} from={0.7} to={1} width={2} className="text-redmark" />
        </>
      );
    case "card":
      return (
        <>
          <P d={handRect(8, 16, 48, 32, 1, 0.6)} progress={p} from={0} to={0.5} width={2} />
          <P d={handLine(8, 27, 56, 27, 2, 0.4, 0)} progress={p} from={0.4} to={0.7} width={3} />
          <P d={handRect(14, 36, 14, 6, 3, 0.3)} progress={p} from={0.7} to={1} width={1.8} className="text-redmark" />
        </>
      );
    case "cart":
      return (
        <>
          <P d={handPoly([[6, 12], [14, 12], [20, 38], [48, 38], [54, 20], [16, 20]], 1, false, 0.5)} progress={p} from={0} to={0.7} width={2} />
          <P d={handCircle(24, 49, 3.5, 2) + handCircle(44, 49, 3.5, 3)} progress={p} from={0.7} to={1} width={2} className="text-redmark" />
        </>
      );
    case "plug":
      return (
        <>
          <P d={handLine(24, 6, 24, 22, 1, 0.2, 0) + handLine(40, 6, 40, 22, 2, 0.2, 0)} progress={p} from={0} to={0.4} width={2.4} />
          <P d={handRect(14, 22, 36, 18, 3, 0.5)} progress={p} from={0.2} to={0.65} width={2} />
          <P d="M32 40V52Q32 58 42 58" progress={p} from={0.6} to={1} width={2} className="text-redmark" />
        </>
      );
  }
}

export function GroupIcon({ kind, className }: { kind: IconKind; className?: string }) {
  return (
    <Sketch viewBox="0 0 64 64" duration={1.8} className={cn("h-14 w-14", className)}>
      {(p) => <Paths kind={kind} p={p} />}
    </Sketch>
  );
}
