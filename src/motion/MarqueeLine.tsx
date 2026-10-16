import { cn } from "@/lib/utils";

type MarqueeLineProps = {
  items: readonly string[];
  className?: string;
};

export function MarqueeLine({ items, className }: MarqueeLineProps) {
  const text = items.join("     —     ");

  return (
    <div className={cn("overflow-hidden border-y border-regal/20 py-3", className)}>
      <div className="marquee-track font-mono text-[11px] uppercase tracking-[0.24em]">
        <span className="px-6">{text}</span>
        <span className="px-6" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
