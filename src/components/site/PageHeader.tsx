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
    <header className="border-b border-regal/15 bg-chiffon px-6 pb-14 pt-16 text-regal md:px-10 lg:px-14">
      <div className={cn("mx-auto max-w-[1400px] border-t-4 pt-6", red ? "border-redmark" : "border-regal")}>
        <p className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.28em]">
          <span
            className={cn(
              "px-2.5 py-0.5 text-[10px] text-chiffon",
              red ? "bg-redmark" : "bg-regal"
            )}
          >
            {index}
          </span>
          <span className="opacity-45">—</span>
          <span className={cn(red ? "text-redmark" : "text-regal")}>{label}</span>
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3.4rem,8vw,6.8rem)] leading-[0.88] text-regal">
          <LetterRise text={title} />
        </h1>
        <div className="mt-3 w-32 text-redmark">
          <StrokeDraw delay={0.7} />
        </div>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-regal/85 md:text-lg">{lede}</p>
        {children}
      </div>
    </header>
  );
}
