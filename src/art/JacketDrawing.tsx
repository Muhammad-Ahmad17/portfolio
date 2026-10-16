import { P, Sketch, T } from "./draw";
import { handCircle, handLine, handPoly, handRect } from "./hand";

/** A heritage leather jacket, stitched in dashes. */

const mirror = (points: [number, number][]): [number, number][] => points.map(([x, y]) => [400 - x, y]);

const leftHalf: [number, number][] = [
  [172, 58],
  [104, 84],
  [56, 160],
  [40, 322],
  [88, 330],
  [104, 206],
  [108, 364],
];
const rightHalf = mirror(leftHalf);

const body = handPoly([...leftHalf, ...rightHalf.slice().reverse()], 4, false, 1.4);

const collar = handPoly(
  [
    [172, 58],
    [150, 112],
    [200, 190],
    [250, 112],
    [228, 58],
  ],
  14,
  false,
  1.1
);

const innerCollar = handPoly(
  [
    [186, 62],
    [200, 96],
    [214, 62],
  ],
  24,
  false,
  0.7
);

const zip = handLine(200, 190, 200, 364, 34, 0.9, 0);

const zipTeeth = (() => {
  const out: string[] = [];
  for (let y = 200; y < 360; y += 10) {
    out.push(handLine(195, y, 205, y, y, 0.3, 0));
  }
  return out.join("");
})();

const pockets =
  handPoly(
    [
      [124, 262],
      [168, 276],
      [168, 316],
      [124, 308],
    ],
    44,
    true,
    0.9
  ) +
  handPoly(
    [
      [276, 262],
      [232, 276],
      [232, 316],
      [276, 308],
    ],
    54,
    true,
    0.9
  );

const belt =
  handLine(108, 340, 292, 340, 64, 0.8, 0) + handRect(186, 332, 28, 16, 66, 0.5) + handLine(214, 340, 238, 340, 67, 0.4, 0);

const sleeveSeams = handLine(92, 118, 52, 318, 74, 1, 0) + handLine(308, 118, 348, 318, 75, 1, 0);

const cuffs = handLine(40, 304, 90, 312, 84, 0.6, 0) + handLine(360, 304, 310, 312, 85, 0.6, 0);

const stitch1 = handPoly(
  [
    [112, 94],
    [64, 166],
    [48, 300],
  ],
  94,
  false,
  0.5
);
const stitch2 = handPoly(
  [
    [288, 94],
    [336, 166],
    [352, 300],
  ],
  104,
  false,
  0.5
);

export function JacketDrawing({ className }: { className?: string }) {
  return (
    <Sketch viewBox="0 0 400 420" className={className} duration={3.6} label="Hand-drawn leather jacket with stitching, zip and pockets">
      {(p) => (
        <g>
          <P d={body} progress={p} from={0} to={0.42} width={2} />
          <P d={collar} progress={p} from={0.25} to={0.5} width={1.8} />
          <P d={innerCollar} progress={p} from={0.4} to={0.55} width={1.2} />
          <P d={zip} progress={p} from={0.45} to={0.6} width={1.6} className="text-redmark" />
          <P d={zipTeeth} progress={p} from={0.55} to={0.7} width={1.1} className="text-redmark" />
          <P d={pockets} progress={p} from={0.5} to={0.7} width={1.5} />
          <P d={belt} progress={p} from={0.55} to={0.72} width={1.5} />
          <P d={sleeveSeams} progress={p} from={0.6} to={0.75} width={1.2} />
          <P d={cuffs} progress={p} from={0.65} to={0.76} width={1.4} />
          <P d={stitch1} progress={p} from={0.7} to={0.9} width={1.2} dash="3 5" className="text-redmark" />
          <P d={stitch2} progress={p} from={0.7} to={0.9} width={1.2} dash="3 5" className="text-redmark" />
          <P d={handCircle(200, 346, 5, 124)} progress={p} from={0.75} to={0.82} width={1.4} />
          <T x={200} y={400} progress={p} from={0.85} to={1} size={10} className="text-redmark">
            HAND-PATTERNED · GRAIN-MATCHED
          </T>
        </g>
      )}
    </Sketch>
  );
}
