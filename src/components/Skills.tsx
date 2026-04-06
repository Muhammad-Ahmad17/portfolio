import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code, Server, Cloud, Wrench, Cpu } from "lucide-react";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Languages": Code,
  "Backend": Server,
  "DevOps": Cloud,
  "Tools": Wrench,
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
  return (
    <section id="skills" className="py-20 lg:py-28 bg-background relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-15" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-heading block mb-4">Expertise</span>
          <h2 className="text-4xl md:text-5xl text-foreground mb-6">Technologies & Skills</h2>
          <div className="w-12 h-px bg-border/50 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Tools and technologies I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category.title];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
                viewport={{ once: true }}
                className="p-5 rounded-lg bg-[#E5E0D8] dark:bg-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-background dark:bg-muted flex items-center justify-center">
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-base text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className="px-3 py-1.5 text-xs rounded-full bg-background dark:bg-muted text-foreground">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-border/40"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Languages", count: portfolioData.skills.languages.length },
              { label: "Backend", count: portfolioData.skills.backend.length },
              { label: "Hardware", count: portfolioData.skills.hardware.length },
              { label: "DevOps & Tools", count: portfolioData.skills.devops.length + portfolioData.skills.tools.length }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="stat-number text-foreground mb-2">{stat.count}+</div>
                <div className="text-xs text-muted-foreground tracking-[0.15em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
