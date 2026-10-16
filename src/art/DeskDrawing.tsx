import { F, P, Pulse, Sketch, T } from "./draw";
import { handCircle, handLine, handRect } from "./hand";

/** The desk: a storefront, a small rack for the backend, and a payment card. */

const productCross = handLine(84, 120, 234, 270, 3, 1.4, 0) + handLine(234, 120, 84, 270, 4, 1.4, 0);

const textLines =
  handLine(258, 134, 430, 134, 5, 1.2, 0) +
  handLine(258, 156, 396, 156, 6, 1.2, 0) +
  handLine(258, 178, 414, 178, 7, 1.2, 0);

const rack = (() => {
  const out: string[] = [];
  for (let i = 0; i < 3; i += 1) {
    const y = 350 + i * 46;
    out.push(handRect(60, y, 156, 36, 20 + i));
    out.push(handCircle(80, y + 18, 4, 30 + i));
    out.push(handCircle(98, y + 18, 4, 40 + i));
    out.push(handLine(130, y + 18, 196, y + 18, 50 + i, 0.8, 0));
  }
  return out.join("");
})();

const cardNumber = (() => {
  const out: string[] = [];
  for (let i = 0; i < 4; i += 1) {
    const x = 298 + i * 46;
    out.push(handLine(x, 454, x + 32, 454, 60 + i, 0.6, 0));
  }
  return out.join("");
})();

const braceL = "M268 540Q252 540 252 556V570Q252 580 240 580Q252 580 252 590V604Q252 620 268 620";
const braceR = "M352 540Q368 540 368 556V570Q368 580 380 580Q368 580 368 590V604Q368 620 352 620";

const wire = "M216 420H262";

export function DeskDrawing({ className }: { className?: string }) {
  return (
    <Sketch
      viewBox="0 0 560 650"
      className={className}
      duration={4}
      label="Hand-drawn storefront in a browser window, a small server rack, and a payment card"
    >
      {(p) => (
        <g>
          {/* Browser */}
          <P d={handRect(60, 60, 440, 250, 1)} progress={p} from={0} to={0.25} />
          <P d={handLine(60, 96, 500, 96, 2, 0.8, 0)} progress={p} from={0.1} to={0.25} width={1.2} />
          <P d={handCircle(82, 78, 5, 8)} progress={p} from={0.15} to={0.22} width={1.2} />
          <P d={handCircle(100, 78, 5, 9)} progress={p} from={0.17} to={0.24} width={1.2} />
          <P d={handCircle(118, 78, 5, 10)} progress={p} from={0.19} to={0.26} width={1.2} />
          <P d={handRect(146, 68, 280, 20, 11, 0.6, 1)} progress={p} from={0.2} to={0.3} width={1.2} />
          <P d={handRect(84, 120, 150, 150, 12)} progress={p} from={0.25} to={0.42} />
          <P d={productCross} progress={p} from={0.3} to={0.5} width={1} className="text-navy/70" />
          <P d={textLines} progress={p} from={0.35} to={0.52} width={1.3} />
          <T x={258} y={216} progress={p} from={0.5} to={0.6} size={14} anchor="start" className="text-chiffon">
            $349
          </T>
          <F d="M258 232H378V266H258Z" progress={p} from={0.5} to={0.65} className="text-navy" opacity={0.95} />
          <P d={handRect(258, 232, 120, 34, 13, 0.8)} progress={p} from={0.4} to={0.55} width={1.4} />
          <T x={318} y={254} progress={p} from={0.6} to={0.7} size={10} className="text-chiffon">
            ADD TO CART
          </T>
          {/* Rack */}
          <P d={rack} progress={p} from={0.35} to={0.62} width={1.5} />
          <T x={138} y={500} progress={p} from={0.65} to={0.85} size={10} className="text-chiffon">
            API · DB · QUEUE
          </T>

          {/* Payment card */}
          <g transform="rotate(-5 380 430)">
            <P d={handRect(262, 366, 236, 140, 80)} progress={p} from={0.42} to={0.66} />
            <P d={handRect(282, 386, 40, 30, 81, 0.6)} progress={p} from={0.55} to={0.66} width={1.3} className="text-navy" />
            <P d={handLine(282, 401, 322, 401, 82, 0.4, 0)} progress={p} from={0.6} to={0.68} width={1} className="text-navy" />
            <P d={handLine(262, 436, 498, 436, 83, 0.6, 0)} progress={p} from={0.58} to={0.7} width={5} className="text-navy/60" />
            <P d={cardNumber} progress={p} from={0.62} to={0.75} width={1.3} />
            <P d={handCircle(462, 388, 10, 84)} progress={p} from={0.65} to={0.72} width={1.3} className="text-navy" />
            <P d={handCircle(476, 388, 10, 85)} progress={p} from={0.67} to={0.74} width={1.3} className="text-navy" />
          </g>

          {/* Wiring */}
          <P d={wire} progress={p} from={0.65} to={0.8} width={1.6} className="text-navy" />
          <P d={handLine(318, 266, 330, 360, 90, 1, 0)} progress={p} from={0.7} to={0.85} width={1.4} className="text-navy" dash="4 6" />

          {/* Braces */}
          <P d={braceL} progress={p} from={0.75} to={0.9} width={1.8} />
          <P d={braceR} progress={p} from={0.75} to={0.9} width={1.8} />
          <T x={310} y={586} progress={p} from={0.88} to={1} size={12} className="text-chiffon">
            api
          </T>

          <g className="text-navy">
            <Pulse path={wire} dur={1.6} begin={4.4} />
          </g>
        </g>
      )}
    </Sketch>
  );
}
