import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const navigate = useNavigate();
  const expertiseItems = portfolioData.expertise;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skillsItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const skillsItems = [
    "Learning Backend Development with Node.js",
    "Exploring DevOps & Cloud Infrastructure",
    "Building Scalable Database Systems",
    "Mastering Docker & Kubernetes",
  ];

  const terminalLines = [
    "portfolio-shell v2.0.0 initialized",
    `$ whoami`,
    `> Full Stack Developer`,
    `$ skills --list`,
  ];

  return (
    <section className="relative isolate min-h-screen flex flex-col justify-center bg-background pt-20 pb-20 md:pt-20 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Header with context info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="section-heading">Portfolio</span>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground">{portfolioData.hero.availability.status}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.2fr,1fr]">
          {/* Left: Primary content */}
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl text-primary uppercase leading-tight">
                {portfolioData.personal.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {portfolioData.personal.title}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl h-8"
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  {skillsItems[currentIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Info grid - repositioned and redesigned */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 gap-4 sm:gap-6 py-4"
            >
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
                  Location
                </div>
                <div className="text-base sm:text-lg font-semibold text-foreground">
                  {portfolioData.personal.location}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
                  Focus
                </div>
                <div className="text-base sm:text-lg font-semibold text-foreground">
                  Backend & DevOps
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            >
              <Button
                onClick={() => navigate("/projects")}
                size="lg"
                className="w-full sm:w-auto btn-soft-filled group"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full sm:w-auto btn-soft">
                <a
                  href="/cv/Muhammad_Ahmad_Resume.pdf"
                  download="Muhammad_Ahmad_Resume.pdf"
                >
                  <FileText className="mr-2 w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social links and availability */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4"
            >
              <div className="flex gap-6">
                <a
                  href={portfolioData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                Open for Hire / Intern
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="terminal-card hidden lg:block rounded-xl overflow-hidden"
          >
            <div className="terminal-header">
              <span>portfolio-shell</span>
              <span className="text-primary">READY</span>
            </div>
            <div className="p-5 space-y-2">
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span>portfolio-shell v2.0.0 initialized</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span>whoami</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span>Full Stack Developer</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span>skills --list</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="terminal-line"
                >
                  <span className="terminal-prompt">&gt;</span>
                  <span className="text-primary font-semibold">{skillsItems[currentIndex]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span>🚀 Ready to ship</span>
                <span className="terminal-cursor" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-mono text-muted-foreground">
          <span>Scroll</span>
          <div className="w-px h-10 bg-border/60" />
        </div>
      </motion.div>
    </section>
  );
}
