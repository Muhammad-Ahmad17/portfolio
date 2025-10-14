import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Hero() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const fullText = portfolioData.personal.title;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary-glow/[0.03]" />

      {/* Floating code snippets decoration */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-[5%] text-primary/20 text-xs font-mono hidden lg:block"
      >
        <div className="space-y-1">
          <div>const developer = {'{'}</div>
          <div className="pl-4">skills: ['React', 'TypeScript'],</div>
          <div className="pl-4">passion: 'Building'</div>
          <div>{'}'}</div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 right-[8%] text-primary/20 text-xs font-mono hidden lg:block"
      >
        <div className="space-y-1">
          <div>{'// Innovation through code'}</div>
          <div>function create() {'{'}</div>
          <div className="pl-4">return excellence;</div>
          <div>{'}'}</div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            {/* Terminal-style intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border backdrop-blur-sm"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">~/portfolio</span>
              <span className="text-primary">$</span>
              <span className="text-sm font-mono">whoami</span>
            </motion.div>

            {/* Name - Large and Bold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {portfolioData.personal.name}
                </span>
              </h1>
            </motion.div>

            {/* Typing effect for title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/80"
            >
              <Code2 className="w-8 h-8 text-primary" />
              <span className="font-mono">{typedText}</span>
              {typedText.length < fullText.length && (
                <span className="inline-block w-0.5 h-8 bg-primary animate-pulse" />
              )}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {portfolioData.personal.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={() => handleNavigation("/projects")}
                className="h-12 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-12 px-8 text-base font-medium hover-border-glow"
              >
                <a href={portfolioData.personal.resume} download>
                  <Download className="mr-2 w-5 h-5" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center justify-center gap-3 pt-8"
            >
              <span className="text-sm text-muted-foreground font-medium">Connect:</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-scale"
                >
                  <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-scale"
                >
                  <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover-scale"
                >
                  <a href={`mailto:${portfolioData.personal.email}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="pt-16"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-2 bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
