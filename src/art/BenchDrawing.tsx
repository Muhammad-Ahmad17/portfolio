import { Pulse, P, Sketch, T } from "./draw";
import { arcPath, handCircle, handLine, handPoly, handRect, wavePath } from "./hand";

/** The bench: an STM32, an ESP32 and a Jetson Nano, wired together. */

const join = (parts: string[]) => parts.join("");

const stmPins = (() => {
  const out: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    const a = 55 + i * 20;
    out.push(handLine(a, 54, a, 70, i + 1, 0.6, 0));
    out.push(handLine(a, 210, a, 226, i + 11, 0.6, 0));
    const b = 85 + i * 20;
    out.push(handLine(24, b, 40, b, i + 21, 0.6, 0));
    out.push(handLine(180, b, 196, b, i + 31, 0.6, 0));
  }
  return join(out);
})();

const espTicks = (() => {
  const out: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    const y = 135 + i * 12;
    out.push(handLine(322, y, 330, y, i + 41, 0.4, 0));
    out.push(handLine(500, y, 508, y, i + 51, 0.4, 0));
  }
  return join(out);
})();

const espAntenna = handPoly(
  [
    [346, 120],
    [346, 100],
    [358, 100],
    [358, 112],
    [370, 112],
    [370, 100],
    [382, 100],
    [382, 112],
    [394, 112],
    [394, 100],
    [406, 100],
  ],
  61,
  false,
  0.8
);

const espShieldHatch = (() => {
  const out: string[] = [];
  for (let i = 0; i < 5; i += 1) {
    out.push(handLine(358 + i * 14, 218, 372 + i * 14, 152, i + 71, 0.8, 0));
  }
  return join(out);
})();

const fins = (() => {
  const out: string[] = [];
  for (let i = 0; i < 11; i += 1) {
    const x = 165 + i * 14;
    out.push(handLine(x, 378, x, 472, i + 81, 0.9, 0));
  }
  return join(out);
})();

const gpioTicks = (() => {
  const out: string[] = [];
  for (let i = 0; i < 9; i += 1) {
    const x = 350 + i * 12;
    out.push(handLine(x, 356, x, 382, i + 91, 0.3, 0));
  }
  return join(out);
})();

const marks = (() => {
  const corners: [number, number][] = [
    [18, 18],
    [542, 18],
    [18, 612],
    [542, 612],
  ];
  return join(
    corners.map(([x, y], i) => handLine(x - 8, y, x + 8, y, i + 101, 0.4, 0) + handLine(x, y - 8, x, y + 8, i + 111, 0.4, 0))
  );
})();

const cloudOutline = "M366 -16H512A22 22 0 0 0 512 -60A32 32 0 0 0 454 -82A27 27 0 0 0 402 -62A23 23 0 0 0 366 -16Z";
const cloudBars = handLine(404, -34, 404, -44, 201, 0.3, 0) + handLine(420, -34, 420, -54, 202, 0.3, 0) + handLine(436, -34, 436, -48, 203, 0.3, 0);
const cloudTrend = handPoly(
  [
    [452, -36],
    [466, -46],
    [478, -40],
    [494, -56],
  ],
  204,
  false,
  0.6
);
const cloudLink = "M440 50V-16";

const trace1 = "M196 145H259V183H322";
const trace2 = "M115 226V290H125V340";
const trace3 = "M415 240V300H400V356";

type BenchProps = { className?: string };

export function BenchDrawing({ className }: BenchProps) {
  return (
    <Sketch
      viewBox="0 -100 560 730"
      className={className}
      duration={4.2}
      label="Hand-drawn bench with an STM32 chip, an ESP32 module and a Jetson Nano board wired together, with the ESP32 reporting to an IoT cloud"
    >
      {(p) => (
        <g>
          <P d={marks} progress={p} from={0} to={0.1} width={1} className="text-regal/60" />

          {/* STM32 */}
          <P d={handRect(40, 70, 140, 140, 3)} progress={p} from={0} to={0.22} />
          <P d={stmPins} progress={p} from={0.08} to={0.3} width={1.3} />
          <P d={handCircle(55, 85, 4, 5)} progress={p} from={0.2} to={0.3} className="text-redmark" />
          <P d={handRect(70, 100, 80, 80, 8, 0.8)} progress={p} from={0.15} to={0.32} width={1.1} className="text-regal/70" />
          <T x={110} y={147} progress={p} from={0.3} to={0.45} size={12} className="text-regal">
            STM32
          </T>
          <T x={110} y={252} progress={p} from={0.75} to={0.95} size={10} className="text-redmark">
            STM32F407
          </T>

          {/* ESP32 */}
          <P d={handRect(330, 120, 170, 120, 12)} progress={p} from={0.1} to={0.34} />
          <P d={espTicks} progress={p} from={0.2} to={0.4} width={1.2} />
          <P d={espAntenna} progress={p} from={0.25} to={0.45} width={1.5} />
          <P d={handRect(352, 150, 76, 70, 16)} progress={p} from={0.3} to={0.45} width={1.2} />
          <P d={espShieldHatch} progress={p} from={0.38} to={0.55} width={0.9} className="text-regal/60" />
          <P d={handCircle(466, 205, 9, 18)} progress={p} from={0.4} to={0.5} width={1.2} />
          <P d={arcPath(440, 96, 16, 225, 315)} progress={p} from={0.58} to={0.68} width={1.6} className="text-redmark wifi-pulse" />
          <P d={arcPath(440, 96, 30, 225, 315)} progress={p} from={0.62} to={0.72} width={1.6} className="text-redmark wifi-pulse wifi-pulse-2" />
          <P d={arcPath(440, 96, 44, 225, 315)} progress={p} from={0.66} to={0.76} width={1.6} className="text-redmark wifi-pulse wifi-pulse-3" />
          <P d={handCircle(440, 98, 2.6, 19)} progress={p} from={0.55} to={0.6} className="text-redmark" width={2.2} />
          <T x={415} y={266} progress={p} from={0.75} to={0.95} size={10} className="text-redmark">
            ESP32
          </T>

          {/* IoT cloud */}
          <P d={cloudOutline} progress={p} from={0.6} to={0.82} width={1.8} />
          <P d={cloudBars} progress={p} from={0.74} to={0.86} width={2.4} className="text-regal" />
          <P d={cloudTrend} progress={p} from={0.8} to={0.92} width={1.6} className="text-redmark" />
          <P d={cloudLink} progress={p} from={0.7} to={0.84} width={1.4} dash="4 6" className="text-redmark" />
          <T x={440} y={-96} progress={p} from={0.86} to={1} size={10} className="text-redmark">
            IoT CLOUD · MQTT
          </T>

          {/* Jetson Nano */}
          <P d={handRect(70, 340, 420, 200, 21)} progress={p} from={0.2} to={0.5} />
          <P d={handCircle(88, 358, 6, 22)} progress={p} from={0.4} to={0.5} width={1.2} />
          <P d={handCircle(472, 358, 6, 23)} progress={p} from={0.42} to={0.52} width={1.2} />
          <P d={handCircle(88, 522, 6, 24)} progress={p} from={0.44} to={0.54} width={1.2} />
          <P d={handCircle(472, 522, 6, 25)} progress={p} from={0.46} to={0.56} width={1.2} />
          <P d={handRect(150, 370, 170, 110, 26)} progress={p} from={0.35} to={0.55} />
          <P d={fins} progress={p} from={0.45} to={0.65} width={1.2} className="text-regal/80" />
          <P d={handRect(338, 356, 122, 26, 27)} progress={p} from={0.45} to={0.58} width={1.3} />
          <P d={gpioTicks} progress={p} from={0.5} to={0.62} width={1} />
          <P d={handRect(340, 486, 64, 54, 28)} progress={p} from={0.5} to={0.62} width={1.3} />
          <P d={handRect(412, 486, 60, 54, 29)} progress={p} from={0.52} to={0.64} width={1.3} />
          <P d={handRect(100, 500, 72, 40, 30)} progress={p} from={0.54} to={0.66} width={1.3} />
          <P d={handRect(186, 512, 36, 28, 31)} progress={p} from={0.56} to={0.68} width={1.3} />
          <T x={280} y={572} progress={p} from={0.8} to={1} size={10} className="text-redmark">
            JETSON NANO
          </T>

          {/* Wires */}
          <P d={trace1} progress={p} from={0.5} to={0.72} width={1.5} className="text-redmark" />
          <P d={trace2} progress={p} from={0.55} to={0.76} width={1.5} className="text-redmark" />
          <P d={trace3} progress={p} from={0.58} to={0.8} width={1.5} className="text-redmark" />
          <P d={handCircle(125, 349, 3.5, 33)} progress={p} from={0.74} to={0.82} className="text-redmark" />
          <P d={handCircle(400, 366, 3.5, 34)} progress={p} from={0.78} to={0.86} className="text-redmark" />

          {/* Scope trace */}
          <P d={handLine(70, 600, 490, 600, 35, 0.8, 0)} progress={p} from={0.7} to={0.85} width={1} className="text-regal/50" />
          <P d={wavePath(70, 600, 420, 12, 5, 36)} progress={p} from={0.72} to={1} width={1.6} className="text-regal" />

          <g className="text-redmark">
            <Pulse path={trace1} dur={2.4} begin={4.6} />
            <Pulse path={trace2} dur={2.8} begin={5} />
            <Pulse path={trace3} dur={3} begin={5.4} />
            <Pulse path={cloudLink} dur={1.8} begin={5.8} />
          </g>
        </g>
      )}
    </Sketch>
  );
}
