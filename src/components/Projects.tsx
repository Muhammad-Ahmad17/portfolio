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
      className="relative bg-gradient-to-b from-muted/40 via-background to-background py-20 dark:from-card/40 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.12] dark:opacity-[0.08]" />

      <div className="relative container mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="section-heading mb-4 block">{section.eyebrow}</span>
          <h2 className="mb-6 text-4xl text-foreground md:text-5xl">{section.title}</h2>
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
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-[0_8px_40px_-16px_hsl(var(--foreground)/0.12)] ring-1 ring-foreground/[0.04] backdrop-blur-[2px] transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_48px_-20px_hsl(var(--foreground)/0.18)] dark:bg-card/60 dark:hover:border-primary/30"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-90" />

              <div className="flex flex-col md:flex-row">
                {project.image ? (
                  <div className="relative md:w-[38%] md:shrink-0">
                    <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:h-full md:min-h-[200px]">
                      <img
                        src={project.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r" />
                  </div>
                ) : (
                  <div className="relative hidden w-[min(120px,18%)] shrink-0 border-r border-border/40 bg-muted/30 dark:bg-muted/15 md:flex md:flex-col md:items-center md:justify-center md:py-10">
                    <span className="font-mono text-3xl font-light text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}

                <div className="min-w-0 flex-1 p-6 md:p-8 md:pl-8">
                  <div className="mb-4 flex flex-wrap items-start gap-3">
                    {project.image && (
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/50 bg-muted/40 font-mono text-xs text-muted-foreground dark:bg-muted/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl text-foreground">{project.title}</h3>
                        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-foreground dark:bg-primary/15">
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
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 dark:bg-muted/20"
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
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 dark:bg-muted/20"
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
                          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-foreground transition-colors hover:bg-primary/20 dark:bg-primary/15 dark:hover:bg-primary/25"
                        >
                          <Play className="h-4 w-4 shrink-0" />
                          <span>Demo video</span>
                        </button>
                      ) : (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 dark:bg-muted/20"
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
