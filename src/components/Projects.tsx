import { motion } from "framer-motion";
import { Github, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { portfolioData } from "@/data/portfolio";
import { useState } from "react";

function isVideoDemoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url.trim());
}

export function Projects() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const featuredProjects = portfolioData.projects.filter((project) => project.featured);
  const section = portfolioData.sections.projects;

  const handleDemoClick = (demoUrl: string) => {
    if (isVideoDemoUrl(demoUrl)) {
      setSelectedVideo(demoUrl);
      setVideoOpen(true);
      return;
    }
    window.open(demoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="projects"
      className="relative bg-background py-24 lg:py-32"
    >
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
          <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="mx-auto max-w-lg text-lg text-muted-foreground">{section.subtitle}</p>
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-border/60 bg-card/85 shadow-[var(--shadow-elegant)] backdrop-blur-[2px] transition-all duration-500 hover:border-primary/40"
            >
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-primary/80 via-primary/20 to-transparent" />

              <div className="flex flex-col md:flex-row">
                <div className="relative flex w-16 md:w-[min(120px,18%)] shrink-0 border-r border-border/40 bg-muted/30 items-center justify-center py-4 md:flex-col md:py-10">
                  <span className="font-mono text-xl md:text-3xl font-light text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0 flex-1 p-6 md:p-8 md:pl-8">
                  <div className="mb-4 flex flex-wrap items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl text-foreground">{project.title}</h3>
                        <span className="badge-minimal border-primary/40 text-foreground">
                          {section.featuredBadge}
                        </span>
                      </div>
                      <p className="leading-relaxed text-muted-foreground">{project.description}</p>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="cream-tag text-xs md:text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-mono text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                      >
                        <Github className="h-4 w-4 shrink-0" />
                        <span>Code</span>
                      </a>
                    ) : null}
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-mono text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        <span>Live</span>
                      </a>
                    ) : null}
                    {project.demo ? (
                      isVideoDemoUrl(project.demo) ? (
                        <button
                          type="button"
                          onClick={() => handleDemoClick(project.demo!)}
                          className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-mono text-foreground transition-colors hover:bg-primary/20"
                        >
                          <Play className="h-4 w-4 shrink-0" />
                          <span>Demo video</span>
                        </button>
                      ) : (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-mono text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                        >
                          <ExternalLink className="h-4 w-4 shrink-0" />
                          <span>Demo</span>
                        </a>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button asChild className="btn-soft">
            <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              {section.viewReposCta}
            </a>
          </Button>
        </motion.div>

        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="w-full max-w-2xl rounded-xl border-border bg-background p-4">
            <DialogTitle className="sr-only">Video demo</DialogTitle>
            {selectedVideo ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-foreground/5">
                <video width="100%" height="100%" controls autoPlay className="h-full w-full">
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
