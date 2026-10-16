import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import type { Glyph } from "@/art/Glyphs";
import { ScrollScene } from "./ScrollScene";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type WordItem = {
  word: string;
  note: string;
  Art: Glyph;
};

type WordSceneProps = {
  items: readonly WordItem[];
  /** Tailwind classes for the pinned scene background and ink. */
  className?: string;
  wordClass?: string;
  numberClass?: string;
  height?: string;
};

/**
 * A pinned, full-screen scene. As the reader scrolls, each word takes the
 * screen in turn, its drawing sketches itself in, and then it holds still
 * before the next word arrives.
 */
export function WordScene({
  items,
  className,
  wordClass = "text-regal",
  numberClass = "text-redmark",
  height,
}: WordSceneProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <section className={cn("px-6 py-16 md:px-10 lg:px-14", className)}>
        <div className="mx-auto grid max-w-[1400px] gap-14">
          {items.map((item, index) => (
            <StaticWord key={item.word} item={item} index={index} count={items.length} wordClass={wordClass} numberClass={numberClass} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <ScrollScene height={height ?? `${items.length * 150}vh`} className={className}>
      {(progress) => (
        <div className="relative h-full">
          <div className="absolute inset-x-0 bottom-0 top-[4.25rem]">
            <div className="mx-auto h-full max-w-[1400px] px-6 md:px-10 lg:px-14">
              <div className="relative h-full">
                {items.map((item, index) => (
                  <SceneWord
                    key={item.word}
                    item={item}
                    progress={progress}
                    index={index}
                    count={items.length}
                    wordClass={wordClass}
                    numberClass={numberClass}
                  />
                ))}
              </div>
            </div>
          </div>
          <ProgressRule progress={progress} />
        </div>
      )}
    </ScrollScene>
  );
}

type SceneWordProps = {
  item: WordItem;
  progress: MotionValue<number>;
  index: number;
  count: number;
  wordClass: string;
  numberClass: string;
};

function SceneWord({ item, progress, index, count, wordClass, numberClass }: SceneWordProps) {
  const seg = 1 / count;
  const start = index * seg;
  const at = (fraction: number) => start + seg * fraction;

  // Each word gets the screen in three beats: its drawing sketches in over the
  // first half, then it holds, fully drawn, for the rest, and only then fades.
  const opacity = useTransform(
    progress,
    index === 0 ? [0, at(0.9), at(1)] : index === count - 1 ? [at(0), at(0.08), 1] : [at(0), at(0.08), at(0.9), at(1)],
    index === 0 ? [1, 1, 0] : index === count - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [at(0), at(0.12)], [index === 0 ? 0 : 36, 0]);
  const artProgress = useTransform(progress, [at(0.06), at(0.52)], [0, 1], { clamp: true });
  const Art = item.Art;

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 grid items-center gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-7">
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.24em]", numberClass)}>
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <h2 className={cn("mt-3 font-serif text-[clamp(4rem,12vw,9.4rem)] leading-[0.84]", wordClass)}>{item.word}</h2>
        <p className="mt-4 max-w-md text-base leading-relaxed opacity-80 md:text-lg">{item.note}</p>
      </div>
      <div className="flex justify-center md:col-span-5">
        <Art progress={artProgress} />
      </div>
    </motion.div>
  );
}

function StaticWord({ item, index, count, wordClass, numberClass }: Omit<SceneWordProps, "progress">) {
  const full = useMotionValue(1);
  const Art = item.Art;

  return (
    <div className="grid items-center gap-6 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.24em]", numberClass)}>
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <h2 className={cn("mt-3 font-serif text-6xl leading-none", wordClass)}>{item.word}</h2>
        <p className="mt-3 max-w-md opacity-80">{item.note}</p>
      </div>
      <div className="flex justify-center md:col-span-5">
        <Art progress={full} />
      </div>
    </div>
  );
}

function ProgressRule({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0.08, 1]);
  return <motion.div style={{ scaleX }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-redmark" />;
}
