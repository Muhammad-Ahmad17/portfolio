import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { rgbOf, usePalette } from "@/theme/palettes";

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  phase: number;
  pad?: boolean;
};

type CircuitFieldProps = {
  className?: string;
  /** Which room the field sits in; the traces take their colours from the current palette. */
  room: "academic" | "freelance";
};

function buildSegments(width: number, height: number) {
  let seed = 20260316;
  const random = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };

  const gap = width < 720 ? 42 : 64;
  const columns = Math.ceil(width / gap);
  const rows = Math.ceil(height / gap);
  const segments: Segment[] = [];

  for (let row = 0; row <= rows; row += 1) {
    for (let column = 0; column <= columns; column += 1) {
      const x = column * gap;
      const y = row * gap;
      if (column < columns && random() > 0.42) {
        const span = random() > 0.78 && column < columns - 1 ? 2 : 1;
        segments.push({
          x1: x,
          y1: y,
          x2: Math.min(x + gap * span, width),
          y2: y,
          phase: random(),
        });
      }
      if (row < rows && random() > 0.58) {
        segments.push({
          x1: x,
          y1: y,
          x2: x,
          y2: Math.min(y + gap, height),
          phase: random(),
        });
      }
      if (random() > 0.88) {
        segments.push({
          x1: x - 2,
          y1: y - 2,
          x2: x + 3,
          y2: y + 3,
          phase: random(),
          pad: true,
        });
      }
    }
  }

  return segments;
}

export function CircuitField({ className, room }: CircuitFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colours = rgbOf(usePalette());
  /* Traces sit in the room's ink on paper; the pointer lights them in the accent or room ink. */
  const ink = room === "academic" ? colours.room : colours.ink;
  const accent = colours.accent;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;
    let frame = 0;
    let time = 0;
    let segments: Segment[] = [];
    const pointer = { x: -9999, y: -9999 };
    let running = true;

    const fit = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      segments = buildSegments(width, height);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      for (const segment of segments) {
        const midX = (segment.x1 + segment.x2) / 2;
        const midY = (segment.y1 + segment.y2) / 2;
        const near = Math.hypot(midX - pointer.x, midY - pointer.y) < 128;

        if (segment.pad) {
          context.fillStyle = near ? `rgba(${accent}, 0.9)` : `rgba(${ink}, 0.38)`;
          context.fillRect(segment.x1, segment.y1, segment.x2 - segment.x1, segment.y2 - segment.y1);
          continue;
        }

        context.strokeStyle = near ? `rgba(${accent}, 0.8)` : `rgba(${ink}, 0.2)`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(segment.x1, segment.y1);
        context.lineTo(segment.x2, segment.y2);
        context.stroke();

        if (!reduced) {
          const progress = (time + segment.phase) % 1;
          const x = segment.x1 + (segment.x2 - segment.x1) * progress;
          const y = segment.y1 + (segment.y2 - segment.y1) * progress;
          context.fillStyle = near ? `rgb(${accent})` : `rgba(${ink}, 0.6)`;
          context.fillRect(x - 1.25, y - 1.25, 2.5, 2.5);
        }
      }
    };

    const loop = () => {
      if (!running) return;
      time += 0.0035;
      draw();
      frame = window.requestAnimationFrame(loop);
    };

    fit();
    draw();
    if (!reduced) frame = window.requestAnimationFrame(loop);

    const observer = new ResizeObserver(() => {
      fit();
      if (reduced) draw();
    });
    observer.observe(canvas);

    const onPointer = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (reduced) draw();
    };

    const onMotion = () => {
      const next = media.matches;
      if (next === reduced) return;
      reduced = next;
      window.cancelAnimationFrame(frame);
      if (!reduced) frame = window.requestAnimationFrame(loop);
      else draw();
    };

    window.addEventListener("mousemove", onPointer);
    media.addEventListener("change", onMotion);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("mousemove", onPointer);
      media.removeEventListener("change", onMotion);
    };
  }, [ink, accent]);

  return <canvas ref={canvasRef} className={cn("h-full w-full", className)} aria-hidden="true" />;
}
