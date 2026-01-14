import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { Code2, Server, Cloud, Wrench, Laptop } from "lucide-react";
import { useState } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: portfolioData.skills.languages,
    icon: Code2,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    progressBar: "bg-purple-500",
    borderColor: "border-purple-500/20",
    hoverBg: "hover:bg-purple-500/20"
  },
  {
    title: "Frontend",
    skills: portfolioData.skills.frontend,
    icon: Laptop,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    progressBar: "bg-blue-500",
    borderColor: "border-blue-500/20",
    hoverBg: "hover:bg-blue-500/20"
  },
  {
    title: "Backend",
    skills: portfolioData.skills.backend,
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    progressBar: "bg-green-500",
    borderColor: "border-green-500/20",
    hoverBg: "hover:bg-green-500/20"
  },
  {
    title: "DevOps",
    skills: portfolioData.skills.devops,
    icon: Cloud,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    progressBar: "bg-orange-500",
    borderColor: "border-orange-500/20",
    hoverBg: "hover:bg-orange-500/20"
  },
  {
    title: "Tools",
    skills: portfolioData.skills.tools,
    icon: Wrench,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    progressBar: "bg-cyan-500",
    borderColor: "border-cyan-500/20",
    hoverBg: "hover:bg-cyan-500/20"
  }
];

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold">
              Technical Skills
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Technologies & Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I'm currently learning and working with to build modern web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className={`bg-card/50 backdrop-blur-sm border-2 ${category.borderColor} hover:border-opacity-60 hover:shadow-xl transition-all duration-300 h-full group`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        className="relative"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className={`text-xs font-semibold ${category.color}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${category.progressBar} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Languages", count: portfolioData.skills.languages.length },
            { label: "Frontend", count: portfolioData.skills.frontend.length },
            { label: "Backend", count: portfolioData.skills.backend.length },
            { label: "DevOps & Tools", count: portfolioData.skills.devops.length + portfolioData.skills.tools.length }
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardContent className="p-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold text-primary mb-1"
                >
                  {stat.count}+
                </motion.div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
