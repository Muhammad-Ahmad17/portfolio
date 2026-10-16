/**
 * Hand-drawn path helpers. Every function is deterministic, so a drawing looks
 * the same on every render, but no two lines are perfectly straight.
 */

type Pt = readonly [number, number];

function rng(seed: number) {
  let s = (Math.imul(Math.round(seed) + 7, 2654435761) >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296 - 0.5;
  };
}

const n = (v: number) => Math.round(v * 10) / 10;

export function handLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed = 1,
  wobble = 1.3,
  over = 2.5
): string {
  const r = rng(seed * 31 + x1 * 7 + y1 * 13 + x2 * 3 + y2 * 5);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.01) return `M${n(x1)} ${n(y1)}`;
  const ux = dx / len;
  const uy = dy / len;
  const w = Math.min(wobble, len / 10);
  const o = Math.min(over, len / 6);
  const sx = x1 - ux * o * (0.4 + Math.abs(r()));
  const sy = y1 - uy * o * (0.4 + Math.abs(r()));
  const ex = x2 + ux * o * (0.4 + Math.abs(r()));
  const ey = y2 + uy * o * (0.4 + Math.abs(r()));
  const mx = (x1 + x2) / 2 - uy * r() * 2 * w;
  const my = (y1 + y2) / 2 + ux * r() * 2 * w;
  return `M${n(sx)} ${n(sy)}Q${n(mx)} ${n(my)} ${n(ex)} ${n(ey)}`;
}

export function handRect(x: number, y: number, w: number, h: number, seed = 1, wobble = 1.2, over = 3): string {
  return [
    handLine(x, y, x + w, y, seed, wobble, over),
    handLine(x + w, y, x + w, y + h, seed + 1, wobble, over),
    handLine(x + w, y + h, x, y + h, seed + 2, wobble, over),
    handLine(x, y + h, x, y, seed + 3, wobble, over),
  ].join("");
}

export function handPoly(points: readonly Pt[], seed = 1, closed = false, wobble = 1.2, over = 0): string {
  const out: string[] = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    out.push(handLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], seed + i, wobble, over));
  }
  if (closed && points.length > 2) {
    const last = points[points.length - 1];
    const first = points[0];
    out.push(handLine(last[0], last[1], first[0], first[1], seed + points.length, wobble, over));
  }
  return out.join("");
}

export function handCircle(cx: number, cy: number, r: number, seed = 1, wobble = 1): string {
  const g = rng(seed * 17 + cx * 3 + cy * 5 + r);
  const K = 0.5523;
  const r0 = r + g() * wobble;
  const r1 = r + g() * wobble;
  const r2 = r + g() * wobble;
  const r3 = r + g() * wobble;
  const ox = g() * wobble * 0.6;
  const oy = g() * wobble * 0.6;
  const x = cx + ox;
  const y = cy + oy;
  return (
    `M${n(x + r0)} ${n(y)}` +
    `C${n(x + r0)} ${n(y + K * r1)} ${n(x + K * r0)} ${n(y + r1)} ${n(x)} ${n(y + r1)}` +
    `C${n(x - K * r2)} ${n(y + r1)} ${n(x - r2)} ${n(y + K * r1)} ${n(x - r2)} ${n(y)}` +
    `C${n(x - r2)} ${n(y - K * r3)} ${n(x - K * r2)} ${n(y - r3)} ${n(x)} ${n(y - r3)}` +
    `C${n(x + K * r0)} ${n(y - r3)} ${n(x + r0)} ${n(y - K * r3)} ${n(x + r0 + 1.2)} ${n(y - 1.4)}`
  );
}

/** Arc with angles in degrees, measured clockwise from the +x axis (SVG space). */
export function arcPath(cx: number, cy: number, r: number, a1: number, a2: number): string {
  const rad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const x2 = cx + r * Math.cos(rad(a2));
  const y2 = cy + r * Math.sin(rad(a2));
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `M${n(x1)} ${n(y1)}A${r} ${r} 0 ${large} 1 ${n(x2)} ${n(y2)}`;
}

export function wavePath(x0: number, y0: number, width: number, amp: number, cycles: number, seed = 1): string {
  const r = rng(seed);
  const steps = Math.max(24, Math.round(cycles * 18));
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = x0 + width * t;
    const y = y0 + amp * Math.sin(Math.PI * 2 * cycles * t) + r() * 0.8;
    d += `${i === 0 ? "M" : "L"}${n(x)} ${n(y)}`;
  }
  return d;
}

/** Square wave, useful for clocks and logic traces. */
export function squareWavePath(x0: number, y0: number, width: number, amp: number, cycles: number): string {
  const step = width / (cycles * 2);
  let d = `M${n(x0)} ${n(y0)}`;
  let level = y0;
  for (let i = 0; i < cycles * 2; i += 1) {
    const x = x0 + step * i;
    const next = level === y0 ? y0 - amp : y0;
    d += `L${n(x)} ${n(level)}L${n(x)} ${n(next)}L${n(x + step)} ${n(next)}`;
    level = next;
  }
  return d;
}
