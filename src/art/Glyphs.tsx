import type { ComponentType } from "react";
import { Canvas, P, T, type Progress } from "./draw";
import { arcPath, handCircle, handLine, handPoly, handRect, squareWavePath } from "./hand";

export type GlyphProps = { progress: Progress };
export type Glyph = ComponentType<GlyphProps>;

const VIEW = "0 0 400 300";
const cls = "h-full w-full max-h-[34vh] md:max-h-[50vh]";

export function LogicGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      <P d={handLine(110, 80, 170, 80, 1, 0.8, 0) + handLine(170, 220, 110, 220, 2, 0.8, 0) + handLine(110, 220, 110, 80, 3, 0.8, 0)} progress={p} from={0} to={0.4} width={2} />
      <P d="M170 80A70 70 0 0 1 170 220" progress={p} from={0.2} to={0.5} width={2} />
      <P d={handLine(40, 115, 110, 115, 4, 0.8, 0)} progress={p} from={0.3} to={0.5} width={1.6} />
      <P d={handLine(40, 185, 110, 185, 5, 0.8, 0)} progress={p} from={0.35} to={0.55} width={1.6} />
      <P d={handLine(240, 150, 340, 150, 6, 0.8, 0)} progress={p} from={0.5} to={0.7} width={1.8} className="text-redmark" />
      <P d={squareWavePath(40, 282, 320, 16, 6)} progress={p} from={0.6} to={1} width={1.5} />
      <T x={28} y={119} progress={p} from={0.5} to={0.7} size={12} className="text-redmark">
        A
      </T>
      <T x={28} y={189} progress={p} from={0.55} to={0.75} size={12} className="text-redmark">
        B
      </T>
      <T x={356} y={154} progress={p} from={0.7} to={0.9} size={12} className="text-redmark">
        Y
      </T>
      <T x={140} y={156} progress={p} from={0.6} to={0.8} size={16} className="text-regal">
        &amp;
      </T>
    </Canvas>
  );
}

const hwPins = (() => {
  const out: string[] = [];
  for (let i = 0; i < 5; i += 1) {
    const a = 160 + i * 20;
    out.push(handLine(a, 54, a, 70, i + 1, 0.4, 0), handLine(a, 190, a, 206, i + 8, 0.4, 0));
    const b = 90 + i * 20;
    out.push(handLine(124, b, 140, b, i + 15, 0.4, 0), handLine(260, b, 276, b, i + 22, 0.4, 0));
  }
  return out.join("");
})();

export function HardwareGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      <P d={handRect(140, 70, 120, 120, 2)} progress={p} from={0} to={0.3} width={2} />
      <P d={hwPins} progress={p} from={0.15} to={0.45} width={1.4} />
      <P d={handCircle(156, 86, 4, 4)} progress={p} from={0.35} to={0.45} className="text-redmark" />
      <P d={handPoly([[124, 130], [100, 130], [92, 122], [84, 138], [76, 122], [68, 138], [60, 130], [30, 130]], 6, false, 0.6)} progress={p} from={0.4} to={0.65} width={1.6} />
      <P d={handLine(276, 130, 310, 130, 7, 0.4, 0)} progress={p} from={0.5} to={0.6} width={1.6} />
      <P d={handLine(310, 110, 310, 150, 8, 0.4, 0)} progress={p} from={0.58} to={0.66} width={2} />
      <P d={handLine(324, 110, 324, 150, 9, 0.4, 0)} progress={p} from={0.6} to={0.68} width={2} />
      <P d={handLine(324, 130, 366, 130, 10, 0.4, 0)} progress={p} from={0.65} to={0.74} width={1.6} />
      <P d={handLine(200, 206, 200, 246, 11, 0.4, 0)} progress={p} from={0.65} to={0.76} width={1.6} className="text-redmark" />
      <P d={handLine(176, 250, 224, 250, 12, 0.4, 0)} progress={p} from={0.74} to={0.82} width={2} className="text-redmark" />
      <P d={handLine(186, 260, 214, 260, 13, 0.4, 0)} progress={p} from={0.78} to={0.86} width={2} className="text-redmark" />
      <P d={handLine(194, 270, 206, 270, 14, 0.4, 0)} progress={p} from={0.82} to={0.9} width={2} className="text-redmark" />
      <T x={200} y={134} progress={p} from={0.7} to={0.9} size={12} className="text-regal">
        MCU
      </T>
      <T x={60} y={160} progress={p} from={0.8} to={1} size={9} className="text-redmark">
        R
      </T>
      <T x={317} y={172} progress={p} from={0.8} to={1} size={9} className="text-redmark">
        C
      </T>
    </Canvas>
  );
}

type Node = { x: number; y: number; r: number; label: string };
const nodes: Node[] = [
  { x: 200, y: 150, r: 34, label: "CORE" },
  { x: 80, y: 70, r: 24, label: "WEB" },
  { x: 320, y: 70, r: 24, label: "QUEUE" },
  { x: 76, y: 232, r: 24, label: "DB" },
  { x: 324, y: 232, r: 24, label: "CACHE" },
];

function edge(a: Node, b: Node, seed: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return handLine(a.x + ux * (a.r + 4), a.y + uy * (a.r + 4), b.x - ux * (b.r + 4), b.y - uy * (b.r + 4), seed, 1, 0);
}

export function SystemsGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      {nodes.map((node, i) => (
        <P key={node.label} d={handCircle(node.x, node.y, node.r, i + 3)} progress={p} from={i * 0.07} to={0.25 + i * 0.07} width={i === 0 ? 2.2 : 1.7} className={i === 0 ? "text-redmark" : undefined} />
      ))}
      {nodes.slice(1).map((node, i) => (
        <P key={`e-${node.label}`} d={edge(nodes[0], node, i + 20)} progress={p} from={0.4 + i * 0.07} to={0.62 + i * 0.07} width={1.5} />
      ))}
      <P d={edge(nodes[1], nodes[2], 30)} progress={p} from={0.7} to={0.88} width={1.2} dash="4 6" />
      <P d={edge(nodes[3], nodes[4], 31)} progress={p} from={0.74} to={0.92} width={1.2} dash="4 6" />
      {nodes.map((node) => (
        <T key={`t-${node.label}`} x={node.x} y={node.y + 4} progress={p} from={0.8} to={1} size={node.r > 30 ? 11 : 9} className={node.r > 30 ? "text-redmark" : "text-regal"}>
          {node.label}
        </T>
      ))}
    </Canvas>
  );
}

export function SoftwareGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      <P d={handPoly([[150, 80], [84, 140], [150, 200]], 1, false, 1.2)} progress={p} from={0} to={0.4} width={2.4} />
      <P d={handPoly([[250, 80], [316, 140], [250, 200]], 3, false, 1.2)} progress={p} from={0.1} to={0.5} width={2.4} />
      <P d={handLine(222, 70, 178, 210, 5, 1, 0)} progress={p} from={0.35} to={0.6} width={2.4} className="text-redmark" />
      <P d={handLine(60, 250, 220, 250, 6, 0.8, 0)} progress={p} from={0.55} to={0.75} width={1.5} />
      <P d={handLine(60, 270, 150, 270, 7, 0.8, 0)} progress={p} from={0.65} to={0.82} width={1.5} />
      <P d={handLine(240, 270, 330, 270, 8, 0.8, 0)} progress={p} from={0.7} to={0.88} width={1.5} className="text-redmark" />
      <P d={handLine(340, 262, 340, 280, 9, 0.2, 0)} progress={p} from={0.85} to={0.95} width={2.4} className="text-redmark" />
    </Canvas>
  );
}

export function ListenGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      <P d={handRect(50, 40, 190, 84, 1)} progress={p} from={0} to={0.3} width={2} />
      <P d={handPoly([[90, 124], [80, 156], [120, 124]], 5, false, 0.5)} progress={p} from={0.25} to={0.35} width={2} />
      <P d={handLine(70, 66, 210, 66, 6, 1, 0) + handLine(70, 84, 180, 84, 7, 1, 0) + handLine(70, 102, 150, 102, 8, 1, 0)} progress={p} from={0.3} to={0.5} width={1.4} />
      <P d={handRect(160, 160, 190, 84, 9)} progress={p} from={0.4} to={0.7} width={2} className="text-redmark" />
      <P d={handPoly([[310, 244], [322, 274], [280, 244]], 13, false, 0.5)} progress={p} from={0.65} to={0.75} width={2} className="text-redmark" />
      <P d={handLine(180, 186, 330, 186, 14, 1, 0) + handLine(180, 204, 290, 204, 15, 1, 0) + handLine(180, 222, 250, 222, 16, 1, 0)} progress={p} from={0.7} to={0.95} width={1.4} className="text-redmark" />
    </Canvas>
  );
}

export function ShapeGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      <P d={handRect(50, 40, 270, 190, 1)} progress={p} from={0} to={0.3} width={2} />
      <P d={handLine(50, 78, 320, 78, 5, 0.8, 0)} progress={p} from={0.2} to={0.35} width={1.4} />
      <P d={handRect(66, 94, 70, 120, 6)} progress={p} from={0.3} to={0.5} width={1.4} />
      <P d={handRect(152, 94, 154, 56, 7)} progress={p} from={0.35} to={0.55} width={1.4} />
      <P d={handLine(152, 94, 306, 150, 8, 0.8, 0) + handLine(306, 94, 152, 150, 9, 0.8, 0)} progress={p} from={0.5} to={0.62} width={1} className="text-regal/60" />
      <P d={handRect(152, 166, 70, 48, 10)} progress={p} from={0.45} to={0.6} width={1.4} />
      <P d={handRect(236, 166, 70, 48, 11)} progress={p} from={0.5} to={0.65} width={1.4} />
      <P d={handPoly([[300, 260], [356, 200], [372, 214], [316, 274]], 12, true, 0.6)} progress={p} from={0.65} to={0.85} width={2} className="text-redmark" />
      <P d={handPoly([[300, 260], [296, 280], [316, 274]], 13, true, 0.4)} progress={p} from={0.82} to={0.92} width={2} className="text-redmark" />
    </Canvas>
  );
}

export function ShipGlyph({ progress: p }: GlyphProps) {
  return (
    <Canvas viewBox={VIEW} className={cls}>
      <P d={handPoly([[70, 160], [340, 56], [250, 232], [196, 184]], 1, true, 1.2)} progress={p} from={0} to={0.45} width={2.2} />
      <P d={handLine(340, 56, 196, 184, 6, 0.8, 0)} progress={p} from={0.35} to={0.55} width={1.6} />
      <P d={handLine(196, 184, 204, 244, 7, 0.8, 0)} progress={p} from={0.5} to={0.65} width={1.6} />
      <P d={handLine(204, 244, 250, 232, 8, 0.8, 0)} progress={p} from={0.55} to={0.7} width={1.6} />
      <P d="M30 262C80 236 110 286 168 252" progress={p} from={0.65} to={0.9} width={1.6} className="text-redmark" dash="5 7" />
      <P d={arcPath(340, 56, 18, 150, 250)} progress={p} from={0.85} to={0.95} width={1.4} className="text-redmark" />
      <P d={arcPath(340, 56, 30, 150, 250)} progress={p} from={0.88} to={0.98} width={1.4} className="text-redmark" />
    </Canvas>
  );
}
