import { motion } from "framer-motion";
import { Terminal, Server, Calendar, CheckCircle, Play, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio";

const getTimestamp = (date: string) => {
  // Generate realistic timestamps
  return new Date(date).toISOString().replace('T', ' ').split('.')[0];
};

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* journalctl header */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-2">
                journalctl -u career.service --since "2020-01-01" --no-pager
              </span>
            </div>
            <div className="p-6 font-mono text-xs space-y-1.5">
              <div className="text-muted-foreground">
                -- Logs begin at 2020-01-01 00:00:00 UTC, end at {new Date().toISOString().split('T')[0]} {new Date().toTimeString().split(' ')[0]} UTC --
              </div>
              <div className="text-green-400">
                <span className="text-muted-foreground">[{new Date().toISOString().split('T')[0]}]</span> career.service: Service status: <span className="font-bold">active (running)</span>
              </div>
              <div className="text-cyan-400">
                <span className="text-muted-foreground">[{new Date().toISOString().split('T')[0]}]</span> career.service: Loaded {portfolioData.experience.length} professional experiences
              </div>
              <div className="text-blue-400">
                <span className="text-muted-foreground">[{new Date().toISOString().split('T')[0]}]</span> career.service: Academic records: {portfolioData.education.length} institutions
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 font-mono">
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                systemctl status work.service
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                systemctl status education.service
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
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Service header */}
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Play className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground font-mono mb-1">
                              {job.company.toLowerCase().replace(/\s+/g, '-')}.service
                            </h3>
                            <p className="text-sm text-primary mb-1">
                              Position: {job.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                              <Calendar className="w-3 h-3" />
                              <span>Runtime: {job.period}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-400 font-mono text-xs">
                          active
                        </Badge>
                      </div>

                      {/* Service logs */}
                      <div className="font-mono text-xs space-y-2 mb-4">
                        <div className="text-muted-foreground">
                          <span className="text-cyan-400">[INFO]</span> {job.description}
                        </div>
                      </div>

                      {/* Achievement logs */}
                      <div className="space-y-2 font-mono text-xs">
                        <div className="text-primary font-semibold mb-2">-- Service Logs --</div>
                        {job.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="text-green-400">[SUCCESS]</span> {achievement}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-border/30 font-mono text-xs text-muted-foreground">
                        <span className="text-green-400">●</span> Service running successfully. No errors detected.
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
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Service header */}
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Square className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground font-mono mb-1">
                              {edu.institution.toLowerCase().replace(/\s+/g, '-')}.service
                            </h3>
                            <p className="text-sm text-primary mb-1">
                              Program: {edu.degree}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono flex-wrap">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{edu.period}</span>
                              </div>
                              {edu.gpa && (
                                <span className="text-green-400">GPA: {edu.gpa}</span>
                              )}
                              {edu.completion && (
                                <span className="text-cyan-400">{edu.completion}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 font-mono text-xs">
                          completed
                        </Badge>
                      </div>

                      {/* Education logs */}
                      <div className="font-mono text-xs space-y-3">
                        <div className="text-muted-foreground">
                          <span className="text-blue-400">[ACADEMIC]</span> {edu.description}
                        </div>

                        <div className="bg-muted/20 rounded p-3 space-y-1">
                          <div className="text-primary font-semibold mb-2">-- Completion Status --</div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span>Degree program completed successfully</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span>All core requirements met</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span>Certification issued and verified</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-border/30 font-mono text-xs text-muted-foreground">
                        <span className="text-blue-400">●</span> Academic service completed. Ready for production deployment.
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Service Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="font-mono text-xs space-y-4">
                <div className="text-primary font-semibold text-sm">
                  $ systemctl list-units --type=service --state=running
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <Play className="w-4 h-4" />
                      Work Services
                    </div>
                    <div className="text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="text-foreground">{portfolioData.experience.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uptime:</span>
                        <span className="text-cyan-400">3+ years</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-semibold">
                      <Terminal className="w-4 h-4" />
                      Education Services
                    </div>
                    <div className="text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="text-foreground">{portfolioData.education.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-blue-400">Completed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Output:</span>
                        <span className="text-green-400">Success</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      System Health
                    </div>
                    <div className="text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Load Avg:</span>
                        <span className="text-cyan-400">0.45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Errors:</span>
                        <span className="text-green-400">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Performance:</span>
                        <span className="text-green-400">Optimal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30 text-muted-foreground">
                  <span className="text-green-400">●</span> All services loaded and running. System ready for production.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}