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
    <section id="skills" className="relative bg-background py-24 lg:py-32">
      <div className="relative container mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-heading mb-4 block">{section.eyebrow}</span>
          <h2 className="mb-6 text-4xl text-primary md:text-5xl uppercase">{section.title}</h2>
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
                className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 p-5 shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.08] blur-2xl" />

                <div className="relative mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-muted/40">
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
                      className="rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-mono text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40"
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
