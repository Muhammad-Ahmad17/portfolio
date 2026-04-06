import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portfolioData } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-muted/20 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-line-pattern opacity-20" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-heading block mb-4">Journey</span>
          <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-8">
            Learning & Education
          </h2>
          <div className="w-16 h-px bg-border mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            My academic background and hands-on learning experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-transparent border border-border p-1">
              <TabsTrigger 
                value="experience" 
                className="data-[state=active]:bg-foreground data-[state=active]:text-background text-sm tracking-wide"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="data-[state=active]:bg-foreground data-[state=active]:text-background text-sm tracking-wide"
              >
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-8">
              {portfolioData.experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="handcrafted-card border-border/30 bg-card/50">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Timeline indicator */}
                        <div className="flex-shrink-0 pt-1">
                          <div className="w-2 h-2 bg-foreground rounded-full" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                            <h3 className="text-lg font-medium text-foreground">
                              {job.title}
                            </h3>
                            <span className="text-xs text-muted-foreground tracking-wider">
                              {job.period}
                            </span>
                          </div>
                          
                          <p className="text-primary text-sm mb-4">{job.company}</p>
                          
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {job.description}
                          </p>

                          <div className="space-y-2">
                            <span className="text-xs tracking-wider uppercase text-muted-foreground">
                              Key Achievements
                            </span>
                            {job.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="text-border mt-1.5">—</span>
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-8">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="handcrafted-card border-border/30 bg-card/50">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Education graphic */}
                        <div className="flex-shrink-0">
                          <img 
                            src="/graphics/graduation-cap.png" 
                            alt=""
                            className="w-10 h-10 object-contain opacity-60"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                            <h3 className="text-lg font-medium text-foreground">
                              {edu.degree}
                            </h3>
                            <span className="badge-minimal">
                              {edu.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </span>
                          </div>
                          
                          <p className="text-primary text-sm mb-1">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground mb-4">{edu.period}</p>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {edu.description}
                          </p>

                          {(edu.gpa || edu.grade) && (
                            <div className="mt-4 pt-4 border-t border-border/30">
                              {edu.gpa && (
                                <span className="text-sm text-foreground">GPA: {edu.gpa}</span>
                              )}
                              {edu.grade && (
                                <span className="text-sm text-foreground">Grade: {edu.grade}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
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
