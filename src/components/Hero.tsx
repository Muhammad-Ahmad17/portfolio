import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const expertiseItems = [
  "Learning Backend Development with Node.js",
  "Exploring DevOps & Cloud Technologies",
  "Building RESTful APIs & Microservices",
  "Understanding API Design & Architecture",
  "Working with Docker Containers",
  "Practicing Database Design (MongoDB, PostgreSQL)",
  "Learning CI/CD Pipeline Automation",
  "Developing Problem-Solving Skills with DSA",
];

export function Hero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % expertiseItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center bg-background pt-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      {/* Decorative graphics */}
      <div className="absolute top-32 right-12 lg:right-32 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="graphic-container-lg"
        >
          <img
            src="/graphics/small-terminal-symbol.svg"
            alt=""
            className="graphic-icon-lg"
          />
        </motion.div>
      </div>
      <div className="absolute bottom-32 left-12 lg:left-32 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="graphic-container-lg"
        >
          <img
            src="/graphics/growthchart.svg"
            alt=""
            className="graphic-icon-lg"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center space-y-6">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-heading">Portfolio</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl text-foreground"
          >
            {portfolioData.personal.name}
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="graphic-container">
              <img
                src="/graphics/graduation-cap.png"
                alt=""
                className="graphic-icon"
              />
            </div>
            <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
              {portfolioData.personal.title}
            </p>
          </motion.div>

          {/* Expertise Slider */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-8 flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-sm sm:text-base text-primary/80 font-medium"
              >
                {expertiseItems[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-12 py-4"
          >
            {portfolioData.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground tracking-[0.15em] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
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

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-6 pt-2"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-10 bg-border/50" />
      </motion.div>
    </section>
  );
}
