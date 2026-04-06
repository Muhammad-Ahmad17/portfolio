import { motion } from "framer-motion";
import { Github, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { portfolioData } from "@/data/portfolio";
import { useState } from "react";

export function Projects() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const featuredProjects = portfolioData.projects.filter(project => project.featured);

  const handleDemoClick = (demoUrl: string) => {
    setSelectedVideo(demoUrl);
    setVideoOpen(true);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-[#E5E0D8] dark:bg-card">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-heading block mb-4">Work</span>
          <h2 className="text-4xl md:text-5xl text-foreground mb-6">Featured Projects</h2>
          <div className="w-12 h-px bg-foreground/20 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Projects I've built while learning full-stack development
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-background rounded-xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E0D8] dark:bg-muted flex items-center justify-center text-sm text-muted-foreground font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl text-foreground">{project.title}</h3>
                      <span className="px-3 py-1 text-xs rounded-full bg-[#E5E0D8] dark:bg-muted text-muted-foreground">
                        Featured
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5 ml-14">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="cream-tag">{tech}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 ml-14">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-4 h-4 mr-2" />
                    <span>View Code</span>
                  </a>
                  {project.demo ? (
                    <button onClick={() => handleDemoClick(project.demo!)}
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Play className="w-4 h-4 mr-2" />
                      <span>Watch Demo</span>
                    </button>
                  ) : (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button asChild className="btn-soft">
            <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All Repositories
            </a>
          </Button>
        </motion.div>

        {/* Video Modal */}
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-2xl w-full p-4 bg-background border-border rounded-xl">
            <DialogTitle className="sr-only">Video Demo</DialogTitle>
            {selectedVideo && (
              <div className="w-full bg-foreground/5 overflow-hidden aspect-video rounded-lg">
                <video width="100%" height="100%" controls autoPlay className="w-full h-full">
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
