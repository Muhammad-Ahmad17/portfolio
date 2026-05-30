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
    <section className="relative isolate min-h-screen flex items-center bg-background pt-20 pb-28 md:pt-24 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid items-center gap-10 md:gap-12 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <span className="section-heading">Portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl text-primary uppercase"
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
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
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

            

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center sm:justify-start gap-6 pt-2"
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
            className="terminal-card hidden md:block rounded-xl overflow-hidden"
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
          className="mt-10 border-t border-border/60 pt-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">Open — Hire / Intern</div>
                <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
                  <a href={`mailto:${portfolioData.personal.email}`} aria-label="Email" className="text-muted-foreground hover:text-foreground">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                {portfolioData.personal.location}
              </div>
              <div className="text-[12px] text-muted-foreground uppercase tracking-[0.25em] mt-2 font-mono">
                Location
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="text-2xl sm:text-3xl font-semibold text-foreground">
                Backend & DevOps
              </div>
              <div className="text-[12px] text-muted-foreground uppercase tracking-[0.25em] mt-2 font-mono">
                Focus Areas
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
