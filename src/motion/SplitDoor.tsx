import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { curtain, easeOut } from "@/theme/motion";
import { LetterRise } from "./LetterRise";
import { StrokeDraw } from "./StrokeDraw";
import { useFinePointer } from "./useFinePointer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type Side = "academic" | "freelance";

const destinations: Record<Side, string> = {
  academic: "/academic",
  freelance: "/freelance",
};

export function SplitDoor() {
  const navigate = useNavigate();
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState<Side | null>(null);
  const [leaving, setLeaving] = useState<Side | null>(null);

  const academicGrow = !fine || reduced ? 1 : hover === "academic" ? 1.42 : hover === "freelance" ? 0.72 : 1;
  const freelanceGrow = !fine || reduced ? 1 : hover === "freelance" ? 1.42 : hover === "academic" ? 0.72 : 1;

  const choose = (side: Side) => {
    if (leaving) return;
    if (reduced) {
      navigate(destinations[side]);
      return;
    }
    setLeaving(side);
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-y-auto md:flex-row md:overflow-hidden">
      <Door
        side="academic"
        grow={academicGrow}
        kicker="01  —  Academic"
        title="Computer"
        titleSecond="Engineer"
        copy="The degree. Hardware, systems, and the record of study at COMSATS Lahore."
        action="Open the record"
        meta="Muhammad Ahmad"
        className="on-navy bg-regal text-chiffon"
        accent="text-redmark"
        seam
        onEnter={() => fine && setHover("academic")}
        onLeave={() => setHover(null)}
        onChoose={() => choose("academic")}
      />
      <Door
        side="freelance"
        grow={freelanceGrow}
        kicker="02  —  Freelance"
        title="Software"
        titleSecond="Engineer"
        copy="The practice. Backends, delivery, and software I build for other people."
        action="See the work"
        meta="Lahore, Pakistan"
        className="on-red bg-redmark text-chiffon"
        accent="text-chiffon"
        alignEnd
        onEnter={() => fine && setHover("freelance")}
        onLeave={() => setHover(null)}
        onChoose={() => choose("freelance")}
      />

      <AnimatePresence>
        {leaving && (
          <motion.div
            key={leaving}
            className={cn("fixed inset-0 z-50", leaving === "academic" ? "bg-regal" : "bg-redmark")}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.72, ease: curtain }}
            onAnimationComplete={() => navigate(destinations[leaving])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

type DoorProps = {
  side: Side;
  grow: number;
  kicker: string;
  title: string;
  titleSecond: string;
  copy: string;
  action: string;
  meta: string;
  className: string;
  accent: string;
  seam?: boolean;
  alignEnd?: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onChoose: () => void;
};

function Door({
  side,
  grow,
  kicker,
  title,
  titleSecond,
  copy,
  action,
  meta,
  className,
  accent,
  seam,
  alignEnd,
  onEnter,
  onLeave,
  onChoose,
}: DoorProps) {
  return (
    <motion.button
      type="button"
      initial={{ flexGrow: 1 }}
      animate={{ flexGrow: grow }}
      transition={{ duration: 0.55, ease: easeOut }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onChoose}
      aria-label={`${action}: ${title} ${titleSecond}`}
      className={cn(
        "group relative flex min-h-[100dvh] w-full min-w-0 shrink-0 basis-0 cursor-pointer flex-col justify-between bg-transparent px-6 py-6 text-left md:min-h-0 md:w-auto md:shrink md:px-10 md:py-8",
        seam && "border-b border-redmark md:border-b-0 md:border-r",
        className
      )}
    >
      <span className={cn("font-mono text-[11px] uppercase tracking-[0.24em]", alignEnd && "md:text-right")}>{meta}</span>

      <span className="block max-w-xl">
        <span className={cn("font-mono text-[11px] uppercase tracking-[0.24em]", accent)}>{kicker}</span>
        <span className="mt-4 block font-serif text-[clamp(3.4rem,8vw,7.4rem)] leading-[0.84] tracking-[-0.04em]">
          <LetterRise text={title} delay={side === "freelance" ? 0.12 : 0} />
          <span className="block">
            <LetterRise text={titleSecond} delay={side === "freelance" ? 0.24 : 0.12} />
          </span>
        </span>
        <span className={cn("mt-3 block w-28", accent)}>
          <StrokeDraw delay={side === "freelance" ? 0.7 : 0.5} />
        </span>
        <span className="mt-6 block max-w-sm text-sm leading-relaxed opacity-80 md:text-base">{copy}</span>
      </span>

      <span className="nudge inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
        {action}
        <span className={cn("inline-block w-11", accent)}>
          <StrokeDraw variant="arrow" delay={0.85} />
        </span>
      </span>
    </motion.button>
  );
}
