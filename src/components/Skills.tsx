import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio";
import { Code2, Server, Cloud, Wrench, Sparkles, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    skills: portfolioData.skills.languages,
    icon: Code2,
  },
  {
    title: "Backend",
    skills: portfolioData.skills.backend,
    icon: Server,
  },
  {
    title: "DevOps",
    skills: portfolioData.skills.devops,
    icon: Cloud,
  },
  {
    title: "Tools",
    skills: portfolioData.skills.tools,
    icon: Wrench,
  },
  {
    title: "Hardware & Embedded",
    skills: portfolioData.skills.hardware,
    icon: Cpu,
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Technical Skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Technologies I'm <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Learning</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I'm currently working with and improving my skills in
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-border ml-4" />
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge 
                      variant="secondary"
                      className="px-4 py-2.5 text-sm font-medium bg-card/50 hover:bg-card border border-border/50 hover:border-border transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
                    >
                      <span className="text-foreground/90">{skill.name}</span>
                      <span className="ml-2 text-xs text-primary font-semibold">{skill.level}%</span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20"
        >
          {[
            { label: "Languages", count: portfolioData.skills.languages.length },
            { label: "Backend", count: portfolioData.skills.backend.length },
            { label: "Hardware", count: portfolioData.skills.hardware.length },
            { label: "DevOps & Tools", count: portfolioData.skills.devops.length + portfolioData.skills.tools.length }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-card/30 border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                {stat.count}+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
