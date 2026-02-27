import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Code2, Cloud, Database, Rocket, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const navigate = useNavigate();
  const [displayedTitle, setDisplayedTitle] = useState("");
  const fullTitle = portfolioData.personal.title;
  const [displayedExpertise, setDisplayedExpertise] = useState("");
  const [expertiseIndex, setExpertiseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const expertiseList = portfolioData.expertise;

  // Title typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // Expertise cycling effect
  useEffect(() => {
    const currentText = expertiseList[expertiseIndex];
    const typingSpeed = isDeleting ? 30 : 50;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedExpertise.length < currentText.length) {
          setDisplayedExpertise(currentText.slice(0, displayedExpertise.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayedExpertise.length > 0) {
          setDisplayedExpertise(currentText.slice(0, displayedExpertise.length - 1));
        } else {
          // Finished deleting, move to next expertise
          setIsDeleting(false);
          setExpertiseIndex((prevIndex) => (prevIndex + 1) % expertiseList.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedExpertise, isDeleting, expertiseIndex]);

  const stats = portfolioData.stats.map((stat, index) => ({
    ...stat,
    icon: [Sparkles, Code2, Rocket][index]
  }));

  const skills = [
    { icon: Code2, name: "Full Stack Development" },
    { icon: Cloud, name: "Cloud & DevOps" },
    { icon: Database, name: "Backend Systems" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-28 pb-16">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-5xl">
        {/* Centered Single Column Layout */}
        <div className="text-center space-y-6">

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {portfolioData.personal.name}
              </span>
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">
              {displayedTitle}
              <span className="inline-block w-1 h-7 bg-primary animate-pulse ml-1" />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-3xl mx-auto"
          >
            {portfolioData.personal.bio}
          </motion.p>

          {/* Expertise Cycling Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-block w-full max-w-2xl"
          >
            <div className="bg-gradient-to-r from-card via-primary/5 to-card border-2 border-primary/30 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                    Currently Focused On
                  </span>
                  <div className="text-base sm:text-lg font-bold text-primary min-h-[24px]">
                    {displayedExpertise}
                    <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
              <Button
                size="lg"
                onClick={() => navigate("/projects")}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
              >
                <a href="/cv/Muhammad_Ahmad_Resume.pdf" download="Muhammad_Ahmad_Resume.pdf">
                  <FileText className="mr-2 w-5 h-5" />
                  Download CV
                </a>
              </Button>
            </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex justify-center gap-3"
          >
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary hover:bg-primary/10 h-10 w-10"
            >
              <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary hover:bg-primary/10 h-10 w-10"
            >
              <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary hover:bg-primary/10 h-10 w-10"
            >
              <a href={`mailto:${portfolioData.personal.email}`} aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
