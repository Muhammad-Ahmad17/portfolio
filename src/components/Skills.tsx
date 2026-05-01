import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code, Server, Cloud, Wrench, Cpu } from "lucide-react";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code,
  Backend: Server,
  DevOps: Cloud,
  Tools: Wrench,
  "Hardware & Embedded": Cpu
};

const skillCategories = [
  { title: "Languages", skills: portfolioData.skills.languages },
  { title: "Backend", skills: portfolioData.skills.backend },
  { title: "DevOps", skills: portfolioData.skills.devops },
  { title: "Tools", skills: portfolioData.skills.tools },
  { title: "Hardware & Embedded", skills: portfolioData.skills.hardware }
];

export function Skills() {
  const section = portfolioData.sections.skills;

  return (
    <section id="skills" className="relative bg-background py-20 lg:py-28">
      <div className="absolute inset-0 bg-dot-pattern opacity-15" />

      <div className="relative container mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-heading mb-4 block">{section.eyebrow}</span>
          <h2 className="mb-6 text-4xl text-foreground md:text-5xl">{section.title}</h2>
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
          <p className="mx-auto max-w-lg text-lg text-muted-foreground">{section.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category.title];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl border border-border/55 bg-[#E5E0D8]/85 p-5 shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md dark:bg-card/70 dark:hover:border-primary/30"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.07] blur-2xl dark:bg-primary/[0.09]" />

                <div className="relative mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/95 ring-1 ring-border/45 dark:bg-muted">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base text-foreground">{category.title}</h3>
                    <div className="mt-1 h-px w-10 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                </div>

                <div className="relative flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-border/35 bg-background/90 px-3 py-1.5 text-xs text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/30 dark:bg-muted/80 dark:hover:border-primary/25"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-border/40 pt-12"
        >
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { label: "Languages", count: portfolioData.skills.languages.length },
              { label: "Backend", count: portfolioData.skills.backend.length },
              { label: "Hardware", count: portfolioData.skills.hardware.length },
              { label: "DevOps & Tools", count: portfolioData.skills.devops.length + portfolioData.skills.tools.length }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="stat-number mb-2 text-foreground">{stat.count}+</div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
