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
      setCurrentIndex((prev) => (prev + 1) % expertiseItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [expertiseItems.length]);

  const terminalLines = [
    "booting portfolio",
    `name: ${portfolioData.personal.name}`,
    `title: ${portfolioData.personal.title}`,
    `location: ${portfolioData.personal.location}`,
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-35" />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="section-heading">Portfolio</span>
              <span className="text-[10px] uppercase tracking-[0.35em] font-mono text-muted-foreground">
                Signal
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl text-primary uppercase"
            >
              {portfolioData.personal.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl"
            >
              {portfolioData.personal.title} | {portfolioData.personal.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={() => navigate("/projects")}
                className="btn-soft-filled group"
                size="lg"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" asChild size="lg" className="btn-soft">
                <a
                  href="/cv/Muhammad_Ahmad_Resume.pdf"
                  download="Muhammad_Ahmad_Resume.pdf"
                >
                  <FileText className="mr-2 w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-mono text-muted-foreground"
            >
              <span>{portfolioData.hero.availability.status}</span>
              <span className="h-px w-12 bg-border/60" />
              <span>Response {portfolioData.hero.availability.responseTime}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-6 pt-2"
            >
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
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="terminal-card rounded-xl overflow-hidden"
          >
            <div className="terminal-header">
              <span>portfolio-runtime</span>
              <span className="text-primary">READY</span>
            </div>
            <div className="p-5 space-y-2">
              {terminalLines.map((line) => (
                <div key={line} className="terminal-line">
                  <span className="terminal-prompt">&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="terminal-line"
                >
                  <span className="terminal-prompt">&gt;</span>
                  <span>focus: {expertiseItems[currentIndex]}</span>
                </motion.div>
              </AnimatePresence>
              <div className="terminal-line">
                <span className="terminal-prompt">&gt;</span>
                <span>status: {portfolioData.hero.availability.status}</span>
                <span className="terminal-cursor" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 gap-6 border-t border-border/60 pt-8 sm:grid-cols-3"
        >
          {portfolioData.stats.map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="stat-number text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-2 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-mono text-muted-foreground">
          <span>Scroll</span>
          <div className="w-px h-10 bg-border/60" />
        </div>
      </motion.div>
    </section>
  );
}
