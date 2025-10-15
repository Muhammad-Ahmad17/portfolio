import { motion } from "framer-motion";
import { Github, ExternalLink, GitBranch, GitCommit, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio";
import { useState } from "react";

export function Projects() {
  const featuredProjects = portfolioData.projects.filter(project => project.featured);
  const otherProjects = portfolioData.projects.filter(project => !project.featured);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Terminal header with git log */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-mono text-muted-foreground ml-2">
                git log --oneline --graph --all
              </span>
            </div>
            <div className="p-6 font-mono text-sm space-y-1.5">
              <div className="text-primary">* <span className="text-yellow-400">a3f9c21</span> <span className="text-muted-foreground">(HEAD -&gt; main, origin/main)</span> feat: Latest featured projects showcase</div>
              <div className="text-primary">* <span className="text-yellow-400">b7e2d34</span> <span className="text-muted-foreground">(tag: v2.0.0)</span> refactor: Improved architecture & performance</div>
              <div className="text-primary">* <span className="text-yellow-400">c5a8f67</span> <span className="text-muted-foreground">(deploy/production)</span> ci: Automated deployment pipeline</div>
              <div className="text-muted-foreground ml-4 mt-2">
                <span className="text-green-400">↓</span> Showing {featuredProjects.length} featured repositories
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Git repository header */}
                <div className="bg-muted/30 px-4 py-3 border-b border-border/50 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-semibold">
                      {project.title.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                    <Badge variant="outline" className="ml-auto text-xs border-green-500/30 text-green-400">
                      ★ Featured
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      main
                    </span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="w-3 h-3" />
                      {Math.floor(Math.random() * 500 + 100)} commits
                    </span>
                  </div>
                </div>

                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-4 font-mono leading-relaxed">
                    <span className="text-primary"># </span>
                    {project.description}
                  </p>

                  {/* Deployment Status */}
                  <div className="bg-muted/20 rounded p-3 mb-4 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>CI/CD Status:</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        Passing
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Deployment:</span>
                      <span className="flex items-center gap-1 text-blue-400">
                        <Clock className="w-3 h-3" />
                        Live
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Last Updated:</span>
                      <span className="text-foreground">{Math.floor(Math.random() * 30 + 1)}d ago</span>
                    </div>
                  </div>

                  {/* Tech Stack as file extensions */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20 font-mono"
                      >
                        .{tech.toLowerCase()}
                      </Badge>
                    ))}
                  </div>

                  {/* Git commands as buttons */}
                  <div className="flex gap-2 font-mono text-xs">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-1" />
                        git clone
                      </a>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        curl -X GET
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Repositories - Git ls-remote style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 border-b border-border/50 font-mono text-sm text-muted-foreground">
              $ git ls-remote --heads origin
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-card/30 backdrop-blur-sm border-border/30 hover:border-primary/20 hover:bg-card/50 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 font-mono">
                            <GitBranch className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">
                              {project.title.toLowerCase().replace(/\s+/g, '-')}
                            </h3>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" asChild className="h-7 w-7">
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-3 h-3" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="h-7 w-7">
                              <a href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground font-mono mb-3 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs border-primary/20 text-primary font-mono px-2 py-0"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs border-primary/20 text-muted-foreground font-mono px-2 py-0">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Git push to collaborate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className="font-mono text-sm space-y-3">
                <p className="text-muted-foreground">
                  <span className="text-primary">$ </span>
                  git remote add collaborate {portfolioData.social.github}
                </p>
                <p className="text-muted-foreground text-xs">
                  Ready to collaborate? Check out all repositories on GitHub
                </p>
                <Button size="lg" asChild className="font-mono">
                  <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    git fetch --all
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
