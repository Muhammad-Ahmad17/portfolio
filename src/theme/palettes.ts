import { useSyncExternalStore } from "react";

/*
  Colour palettes. Every colour in the site is a CSS variable (see tailwind.config.ts), so
  switching a palette is one pass of setProperty on <html>.

  Roles
    a      the navy of the header, footer, and ink on paper
    b      the red accent, and the red call bands
    paper  the page colour between header and footer
    ink    the dark accent that sits on the freelance room (strokes, kickers)

  Freelance colours marked "deepened" were darkened slightly from the first suggestion so the
  paper-coloured text on them stays readable (at least 3.6:1).
*/

export type Palette = {
  id: string;
  group: "Classic" | "Bold" | "Creamy";
  name: string;
  a: string;
  b: string;
  paper: string;
  ink: string;
  /* Optional exact values that replace the derived tints (used to keep the first palette untouched). */
  lift?: string;
  tints?: { deep: string; light: string; muted: string; paperLight: string; paperWarm: string; paperMuted: string };
};

export const palettes: Palette[] = [
  {
    id: "classic",
    group: "Classic",
    name: "Navy, Red & Chiffon",
    a: "#0D3B66",
    b: "#C8312B",
    paper: "#FAF0CA",
    ink: "#0D3B66",
    lift: "#EE6A60",
    tints: {
      deep: "#071F36",
      light: "#144B7E",
      muted: "#2A5580",
      paperLight: "#FCF8E8",
      paperWarm: "#F5E6AC",
      paperMuted: "#E6DAB0",
    },
  },
  { id: "teal", group: "Bold", name: "Teal & Burnt Orange", a: "#0F4C5C", b: "#D5521D", paper: "#F6EEDC", ink: "#0B2F39" },
  { id: "forest", group: "Bold", name: "Forest & Terracotta", a: "#1F3D36", b: "#C35B39", paper: "#F3EBDD", ink: "#16302A" },
  { id: "signal", group: "Bold", name: "Ink & Signal Orange", a: "#14213D", b: "#D5520B", paper: "#F4F1EA", ink: "#14213D" },
  { id: "plum", group: "Bold", name: "Plum & Coral", a: "#3B1F4A", b: "#E4432F", paper: "#FBEFE4", ink: "#2E1839" },
  { id: "burgundy", group: "Bold", name: "Burgundy & Sage", a: "#5B1A2B", b: "#678364", paper: "#F7F1E5", ink: "#3F1220" },
  { id: "coffee", group: "Creamy", name: "Coffee & Cream", a: "#3E2C23", b: "#AE6C3B", paper: "#F7EFE2", ink: "#2B1D16" },
  { id: "cocoa", group: "Creamy", name: "Cocoa & Rose", a: "#4A3338", b: "#B96767", paper: "#F8F1EA", ink: "#33211F" },
  { id: "olive", group: "Creamy", name: "Olive & Butter", a: "#4B5233", b: "#97761A", paper: "#F6F0DC", ink: "#2F3320" },
  { id: "slate", group: "Creamy", name: "Slate & Apricot", a: "#3D4F63", b: "#C36325", paper: "#F7F0E4", ink: "#27333F" },
  { id: "mocha", group: "Creamy", name: "Mocha & Sage", a: "#5A4636", b: "#718062", paper: "#F4EDE0", ink: "#3A2E24" },
];

export const DEFAULT_PALETTE = "classic";
const STORAGE_KEY = "palette-v2";

type Rgb = [number, number, number];

const toRgb = (hex: string): Rgb => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;

const mix = (from: Rgb, to: Rgb, amount: number): Rgb =>
  [0, 1, 2].map((i) => from[i] + (to[i] - from[i]) * amount) as Rgb;

const luminance = ([r, g, b]: Rgb) => {
  const [lr, lg, lb] = [r, g, b].map((value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

const contrast = (x: Rgb, y: Rgb) => {
  const lx = luminance(x);
  const ly = luminance(y);
  return (Math.max(lx, ly) + 0.05) / (Math.min(lx, ly) + 0.05);
};

const toHsl = ([r, g, b]: Rgb): [number, number, number] => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
  }
  return [h, s, l];
};

const fromHsl = ([h, s, l]: [number, number, number]): Rgb => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)));
  };
  return [f(0), f(8), f(4)];
};

/* Paper tints: a little darker (and slightly richer) for the "warm" and "muted" variants. */
const shade = (rgb: Rgb, lightness: number, saturation = 0): Rgb => {
  const [h, s, l] = toHsl(rgb);
  return fromHsl([h, Math.min(1, Math.max(0, s + saturation)), Math.min(1, Math.max(0, l + lightness))]);
};

const WHITE: Rgb = [255, 255, 255];
const BLACK: Rgb = [0, 0, 0];

const triplet = (rgb: Rgb) => rgb.map((value) => Math.round(value)).join(" ");
const commas = (rgb: Rgb) => rgb.map((value) => Math.round(value)).join(", ");

export type PaletteRgb = {
  paper: string;
  room: string;
  ink: string;
  accent: string;
  lift: string;
};

export function resolve(palette: Palette) {
  const a = toRgb(palette.a);
  const b = toRgb(palette.b);
  const paper = toRgb(palette.paper);
  const ink = toRgb(palette.ink);
  const tints = palette.tints;

  /* The freelance colour, lightened until it reads on the academic room (used for accents there). */
  let lift = palette.lift ? toRgb(palette.lift) : b;
  if (!palette.lift) {
    for (let amount = 0.3; amount <= 0.9 && contrast(lift, a) < 4.6; amount += 0.05) {
      lift = mix(b, paper, amount);
    }
  }

  return {
    a,
    b,
    paper,
    ink,
    lift,
    regalDeep: tints ? toRgb(tints.deep) : mix(a, BLACK, 0.5),
    regalLight: tints ? toRgb(tints.light) : mix(a, WHITE, 0.1),
    regalMuted: tints ? toRgb(tints.muted) : mix(a, WHITE, 0.2),
    paperLight: tints ? toRgb(tints.paperLight) : mix(paper, WHITE, 0.55),
    paperWarm: tints ? toRgb(tints.paperWarm) : shade(paper, -0.06, 0.04),
    paperMuted: tints ? toRgb(tints.paperMuted) : shade(paper, -0.12, 0),
  };
}

export function rgbOf(palette: Palette): PaletteRgb {
  const r = resolve(palette);
  return {
    paper: commas(r.paper),
    room: commas(r.a),
    ink: commas(r.ink),
    accent: commas(r.b),
    lift: commas(r.lift),
  };
}

/* The favicon is the logo on a tile in the current palette: academic colour, paper M, lifted accent cursor. */
const faviconHref = (a: Rgb, paper: Rgb, lift: Rgb) => {
  const hex = (rgb: Rgb) => `#${rgb.map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${hex(a)}"/>` +
    `<path d="M15 44V17L32 34L49 17V44" fill="none" stroke="${hex(paper)}" stroke-width="6.5" stroke-linejoin="miter"/>` +
    `<rect x="15" y="50" width="22" height="5.5" fill="${hex(lift)}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export function applyPalette(palette: Palette) {
  const r = resolve(palette);
  const style = document.documentElement.style;
  const set = (name: string, value: Rgb) => style.setProperty(name, triplet(value));

  set("--c-regal", r.a);
  set("--c-regal-deep", r.regalDeep);
  set("--c-regal-light", r.regalLight);
  set("--c-regal-muted", r.regalMuted);
  set("--c-chiffon", r.paper);
  set("--c-chiffon-light", r.paperLight);
  set("--c-chiffon-warm", r.paperWarm);
  set("--c-chiffon-muted", r.paperMuted);
  set("--c-redmark", r.b);
  set("--c-lift", r.lift);
  set("--c-ink", r.ink);

  document.documentElement.dataset.palette = palette.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette.a);
  document.querySelector('link[rel="icon"][type="image/svg+xml"]')?.setAttribute("href", faviconHref(r.a, r.paper, r.lift));
}

/* A tiny external store so components (the switcher, the canvas) follow the current palette. */
const listeners = new Set<() => void>();

const find = (id: string | null) => palettes.find((palette) => palette.id === id);

const readStored = () => {
  try {
    return find(window.localStorage.getItem(STORAGE_KEY))?.id;
  } catch {
    return undefined;
  }
};

let current = find(readStored() ?? DEFAULT_PALETTE) ?? palettes[0];

export function initPalette() {
  applyPalette(current);
}

export function setPalette(id: string) {
  const next = find(id);
  if (!next || next.id === current.id) return;
  current = next;
  applyPalette(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, next.id);
  } catch {
    /* Storage can be unavailable (private mode); the choice then lasts for this visit only. */
  }
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function usePalette() {
  return useSyncExternalStore(subscribe, () => current, () => current);
}
