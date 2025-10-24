import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { Code2, Server, Cloud, Wrench, CheckCircle2 } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    skills: portfolioData.skills.frontend,
    icon: Code2,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    dotColor: "bg-cyan-500"
  },
  {
    title: "Backend",
    skills: portfolioData.skills.backend,
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    dotColor: "bg-green-500"
  },
  {
    title: "DevOps",
    skills: portfolioData.skills.devops,
    icon: Cloud,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    dotColor: "bg-orange-500"
  },
  {
    title: "Tools",
    skills: portfolioData.skills.tools,
    icon: Wrench,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    dotColor: "bg-pink-500"
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold">
              Technical Skills
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What I Work With
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build powerful applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className={`text-2xl font-semibold ${category.color}`}>
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.15) + (skillIndex * 0.05) }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${category.color} flex-shrink-0`} />
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${i < Math.ceil(skill.level / 20)
                                  ? category.dotColor
                                  : 'bg-muted'
                                }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-cyan-500 mb-2">
                    {portfolioData.skills.frontend.length + portfolioData.skills.backend.length +
                      portfolioData.skills.devops.length + portfolioData.skills.tools.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">4+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">30+</div>
                  <div className="text-sm text-muted-foreground">Satisfied Clients</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
