import type { ArtKind } from "@/data/academic";
import { P, Pulse, Sketch, T } from "./draw";
import { arcPath, handCircle, handLine, handPoly, handRect } from "./hand";

const arrowHead = (x: number, y: number, seed: number) =>
  handPoly(
    [
      [x - 9, y - 7],
      [x, y],
      [x - 9, y + 7],
    ],
    seed,
    false,
    0.4
  );

function Embedded() {
  const pins = (() => {
    const out: string[] = [];
    for (let i = 0; i < 4; i += 1) {
      const a = 125 + i * 16;
      out.push(handLine(a, 66, a, 80, i + 1, 0.4, 0), handLine(a, 160, a, 174, i + 5, 0.4, 0));
      const b = 95 + i * 16;
      out.push(handLine(96, b, 110, b, i + 9, 0.4, 0), handLine(190, b, 204, b, i + 13, 0.4, 0));
    }
    return out.join("");
  })();

  return (
    <Sketch viewBox="0 0 320 240" duration={2.8} className="h-full w-full" label="Drawing of a microcontroller reading a thermometer and an RFID card">
      {(p) => (
        <g>
          <P d={handRect(110, 80, 80, 80, 3)} progress={p} from={0} to={0.3} width={1.8} />
          <P d={pins} progress={p} from={0.15} to={0.4} width={1.3} />
          <P d={handCircle(124, 94, 3, 4)} progress={p} from={0.3} to={0.4} className="text-redmark" />
          <P d={handRect(40, 98, 12, 56, 6, 0.5)} progress={p} from={0.3} to={0.5} width={1.4} />
          <P d={handCircle(46, 166, 10, 7)} progress={p} from={0.35} to={0.55} width={1.4} />
          <P d={handLine(46, 160, 46, 128, 8, 0.4, 0)} progress={p} from={0.5} to={0.6} width={3} className="text-redmark" />
          <P d={handPoly([[52, 128], [76, 128], [76, 120], [96, 120]], 9, false, 0.6)} progress={p} from={0.45} to={0.65} width={1.4} />
          <P d={arcPath(204, 120, 16, -45, 45)} progress={p} from={0.6} to={0.7} className="text-redmark wifi-pulse" width={1.6} />
          <P d={arcPath(204, 120, 30, -45, 45)} progress={p} from={0.65} to={0.75} className="text-redmark wifi-pulse wifi-pulse-2" width={1.6} />
          <P d={arcPath(204, 120, 44, -45, 45)} progress={p} from={0.7} to={0.8} className="text-redmark wifi-pulse wifi-pulse-3" width={1.6} />
          <P d={handRect(258, 100, 50, 40, 12)} progress={p} from={0.65} to={0.85} width={1.6} />
          <P d={handCircle(274, 114, 5, 13)} progress={p} from={0.8} to={0.9} width={1.2} />
          <P d={handLine(268, 128, 298, 128, 14, 0.4, 0)} progress={p} from={0.82} to={0.92} width={1.2} />
          <T x={46} y={200} progress={p} from={0.85} to={1} size={9} className="text-redmark">
            LM35
          </T>
          <T x={283} y={164} progress={p} from={0.85} to={1} size={9} className="text-redmark">
            RFID
          </T>
          <T x={150} y={200} progress={p} from={0.85} to={1} size={9} className="text-regal">
            LCD · FAN · BUZZER
          </T>
        </g>
      )}
    </Sketch>
  );
}

function Pipeline() {
  return (
    <Sketch viewBox="0 0 320 240" duration={2.8} className="h-full w-full" label="Drawing of a medical image being inspected and passed to an AI model">
      {(p) => (
        <g>
          <P d={handRect(22, 70, 92, 92, 3)} progress={p} from={0} to={0.25} width={1.7} />
          <P d={handCircle(52, 100, 14, 4)} progress={p} from={0.15} to={0.3} width={1.3} />
          <P d={handCircle(52, 100, 5, 5)} progress={p} from={0.25} to={0.32} width={1.3} />
          <P d={handCircle(84, 128, 18, 6)} progress={p} from={0.2} to={0.36} width={1.3} />
          <P d={handCircle(84, 128, 7, 7)} progress={p} from={0.3} to={0.38} width={1.3} />
          <P d={handCircle(58, 144, 8, 8)} progress={p} from={0.25} to={0.38} width={1.3} />
          <P d={handLine(120, 115, 150, 115, 9, 0.6, 0)} progress={p} from={0.35} to={0.45} width={1.5} />
          <P d={arrowHead(152, 115, 10)} progress={p} from={0.42} to={0.48} width={1.5} />
          <P d={handCircle(190, 112, 30, 11)} progress={p} from={0.4} to={0.6} width={2} />
          <P d={handLine(212, 134, 238, 162, 12, 0.6, 0)} progress={p} from={0.55} to={0.65} width={5} />
          <P d={handCircle(186, 108, 11, 13)} progress={p} from={0.6} to={0.7} width={1.8} className="text-redmark" />
          <P d={handLine(222, 98, 246, 98, 14, 0.6, 0)} progress={p} from={0.65} to={0.72} width={1.5} />
          <P d={arrowHead(248, 98, 15)} progress={p} from={0.7} to={0.75} width={1.5} />
          <P d={handRect(254, 68, 54, 60, 16)} progress={p} from={0.68} to={0.85} width={1.7} />
          <T x={281} y={104} progress={p} from={0.85} to={0.95} size={14} className="text-redmark">
            AI
          </T>
          <P d={handRect(220, 176, 88, 36, 17)} progress={p} from={0.78} to={0.92} width={1.5} />
          <P d={handPoly([[236, 212], [230, 226], [250, 212]], 18, false, 0.4)} progress={p} from={0.88} to={0.95} width={1.5} />
          <T x={264} y={199} progress={p} from={0.9} to={1} size={9} className="text-regal">
            ASK THE IMAGE
          </T>
          <T x={68} y={188} progress={p} from={0.85} to={1} size={9} className="text-regal">
            SCAN
          </T>
        </g>
      )}
    </Sketch>
  );
}

function Deploy() {
  const pushToBuild = "M82 120H122";
  const buildToCloud = "M200 120H232";
  return (
    <Sketch viewBox="0 0 320 240" duration={2.8} className="h-full w-full" label="Drawing of a code push turning into a container and landing in the cloud">
      {(p) => (
        <g>
          <P d={handCircle(40, 150, 7, 3)} progress={p} from={0} to={0.15} width={1.6} />
          <P d={handCircle(40, 90, 7, 4)} progress={p} from={0.05} to={0.2} width={1.6} />
          <P d={handCircle(68, 110, 7, 5)} progress={p} from={0.1} to={0.25} width={1.6} className="text-redmark" />
          <P d={handLine(40, 143, 40, 97, 6, 0.6, 0)} progress={p} from={0.15} to={0.3} width={1.6} />
          <P d={handLine(40, 128, 62, 115, 7, 0.6, 0)} progress={p} from={0.2} to={0.32} width={1.6} />
          <P d={pushToBuild} progress={p} from={0.3} to={0.42} width={1.5} />
          <P d={arrowHead(124, 120, 8)} progress={p} from={0.4} to={0.46} width={1.5} />
          <P d={handPoly([[160, 86], [190, 103], [190, 137], [160, 154], [130, 137], [130, 103]], 9, true, 0.8)} progress={p} from={0.38} to={0.6} width={1.8} />
          <P d={handPoly([[130, 103], [160, 120], [190, 103]], 10, false, 0.6)} progress={p} from={0.55} to={0.68} width={1.4} />
          <P d={handLine(160, 120, 160, 154, 11, 0.5, 0)} progress={p} from={0.6} to={0.7} width={1.4} />
          <P d={buildToCloud} progress={p} from={0.6} to={0.72} width={1.5} />
          <P d={arrowHead(234, 120, 12)} progress={p} from={0.7} to={0.76} width={1.5} />
          <P d="M242 154H302A18 18 0 0 0 298 118A28 28 0 0 0 248 112A22 22 0 0 0 242 154Z" progress={p} from={0.68} to={0.9} width={1.8} />
          <P d={handPoly([[258, 136], [268, 146], [286, 126]], 13, false, 0.4)} progress={p} from={0.88} to={0.96} width={2} className="text-redmark" />
          <T x={50} y={194} progress={p} from={0.85} to={1} size={9} className="text-regal">
            PUSH
          </T>
          <T x={160} y={194} progress={p} from={0.85} to={1} size={9} className="text-regal">
            BUILD
          </T>
          <T x={272} y={194} progress={p} from={0.85} to={1} size={9} className="text-regal">
            DEPLOY
          </T>
          <g className="text-redmark">
            <Pulse path={pushToBuild} dur={1.4} begin={3.4} />
            <Pulse path={buildToCloud} dur={1.2} begin={3.8} />
          </g>
        </g>
      )}
    </Sketch>
  );
}

function Shop() {
  return (
    <Sketch viewBox="0 0 320 240" duration={2.8} className="h-full w-full" label="Drawing of a buyer and a vendor connected through a shopping bag">
      {(p) => (
        <g>
          <P d={handRect(112, 100, 96, 100, 3)} progress={p} from={0} to={0.3} width={1.8} />
          <P d={arcPath(160, 100, 22, 180, 360)} progress={p} from={0.2} to={0.4} width={1.6} />
          <T x={160} y={160} progress={p} from={0.35} to={0.5} size={22} className="text-redmark">
            $
          </T>
          <P d={handCircle(40, 66, 12, 4)} progress={p} from={0.3} to={0.45} width={1.6} />
          <P d="M18 118Q40 82 62 118" progress={p} from={0.38} to={0.52} width={1.6} />
          <P d={handCircle(280, 66, 12, 5)} progress={p} from={0.35} to={0.5} width={1.6} />
          <P d="M258 118Q280 82 302 118" progress={p} from={0.42} to={0.56} width={1.6} />
          <P d={handLine(66, 106, 106, 134, 6, 0.8, 0)} progress={p} from={0.55} to={0.7} width={1.5} className="text-redmark" dash="4 5" />
          <P d={handLine(254, 106, 214, 134, 7, 0.8, 0)} progress={p} from={0.6} to={0.75} width={1.5} className="text-redmark" dash="4 5" />
          <P d={handLine(110, 218, 210, 218, 8, 0.6, 0)} progress={p} from={0.7} to={0.85} width={1.2} className="text-regal/60" />
          <T x={40} y={150} progress={p} from={0.8} to={1} size={9} className="text-regal">
            BUYER
          </T>
          <T x={280} y={150} progress={p} from={0.8} to={1} size={9} className="text-regal">
            VENDOR
          </T>
          <T x={160} y={236} progress={p} from={0.85} to={1} size={9} className="text-redmark">
            ORDERS · REST API
          </T>
        </g>
      )}
    </Sketch>
  );
}

function Cloud() {
  return (
    <Sketch viewBox="0 0 320 240" duration={2.8} className="h-full w-full" label="Drawing of a cloud with a lambda symbol above storage, a gateway and a database">
      {(p) => (
        <g>
          <P d="M82 122H236A26 26 0 0 0 232 72A40 40 0 0 0 156 64A34 34 0 0 0 82 122Z" progress={p} from={0} to={0.35} width={1.9} />
          <P d={handLine(146, 80, 176, 118, 3, 0.6, 0)} progress={p} from={0.3} to={0.45} width={2.2} className="text-redmark" />
          <P d={handLine(161, 100, 144, 118, 4, 0.6, 0)} progress={p} from={0.4} to={0.5} width={2.2} className="text-redmark" />
          <P d={handRect(34, 172, 54, 38, 5)} progress={p} from={0.4} to={0.58} width={1.6} />
          <P d={handRect(134, 172, 54, 38, 6)} progress={p} from={0.45} to={0.63} width={1.6} />
          <P d={handRect(234, 172, 54, 38, 7)} progress={p} from={0.5} to={0.68} width={1.6} />
          <P d={handLine(234, 184, 288, 184, 8, 0.4, 0)} progress={p} from={0.62} to={0.7} width={1.1} />
          <P d={handLine(61, 172, 112, 124, 9, 0.8, 0)} progress={p} from={0.65} to={0.8} width={1.4} className="text-redmark" />
          <P d={handLine(161, 172, 161, 124, 10, 0.8, 0)} progress={p} from={0.68} to={0.82} width={1.4} className="text-redmark" />
          <P d={handLine(261, 172, 206, 124, 11, 0.8, 0)} progress={p} from={0.7} to={0.85} width={1.4} className="text-redmark" />
          <T x={61} y={196} progress={p} from={0.8} to={1} size={10} className="text-regal">
            S3
          </T>
          <T x={161} y={196} progress={p} from={0.82} to={1} size={10} className="text-regal">
            API
          </T>
          <T x={261} y={200} progress={p} from={0.84} to={1} size={10} className="text-regal">
            DYNAMO
          </T>
        </g>
      )}
    </Sketch>
  );
}

export function ProjectArt({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "embedded":
      return <Embedded />;
    case "pipeline":
      return <Pipeline />;
    case "deploy":
      return <Deploy />;
    case "shop":
      return <Shop />;
    case "cloud":
      return <Cloud />;
  }
}
