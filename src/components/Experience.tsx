import { motion } from "framer-motion";
import { Calendar, Briefcase, Award, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-32">
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
              My Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Learning & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic background and hands-on learning experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Projects & Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-6">
              {portfolioData.experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {job.title}
                            </h3>
                            <p className="text-base text-primary font-medium mb-2">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{job.period}</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={index === 0 
                            ? "border-blue-500/30 text-blue-500" 
                            : "border-green-500/30 text-green-500"
                          }
                        >
                          {index === 0 ? 'Completed' : 'Active'}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">Key Achievements</span>
                        </div>
                        {job.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {edu.degree}
                            </h3>
                            <p className="text-base text-primary font-medium mb-2">
                              {edu.institution}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{edu.period}</span>
                              </div>
                              {edu.gpa && (
                                <span className="text-green-500 font-medium">GPA: {edu.gpa}</span>
                              )}
                              {edu.grade && (
                                <span className="text-green-500 font-medium">Grade: {edu.grade}</span>
                              )}
                              {edu.completion && (
                                <span className="text-cyan-500">{edu.completion}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={edu.status === 'in-progress' 
                            ? "border-green-500/30 text-green-500" 
                            : "border-blue-500/30 text-blue-500"
                          }
                        >
                          {edu.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
