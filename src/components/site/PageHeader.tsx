import { LetterRise } from "@/motion/LetterRise";
import { StrokeDraw } from "@/motion/StrokeDraw";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  index: string;
  label: string;
  title: string;
  lede: string;
  tone?: "academic" | "freelance";
  children?: React.ReactNode;
};

export function PageHeader({ index, label, title, lede, tone = "academic", children }: PageHeaderProps) {
  const red = tone === "freelance";

  return (
    <header
      className={cn(
        "border-b px-6 pb-14 pt-16 md:px-10 lg:px-14",
        red ? "on-red border-chiffon/25 bg-redmark text-chiffon" : "on-navy border-chiffon/20 bg-regal text-chiffon"
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.28em]", red ? "opacity-80" : "text-redmark")}>
          {index}
          <span className="px-3 opacity-60">—</span>
          {label}
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3.4rem,8vw,6.8rem)] leading-[0.88]">
          <LetterRise text={title} />
        </h1>
        <div className={cn("mt-3 w-32", red ? "text-chiffon" : "text-redmark")}>
          <StrokeDraw delay={0.7} />
        </div>
        <p className="mt-6 max-w-xl text-base leading-relaxed opacity-85 md:text-lg">{lede}</p>
        {children}
      </div>
    </header>
  );
}
