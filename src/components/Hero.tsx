import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Code2, Cloud, Database, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const navigate = useNavigate();
  const [displayedTitle, setDisplayedTitle] = useState("");
  const fullTitle = portfolioData.personal.title;
  const [displayedExpertise, setDisplayedExpertise] = useState("");
  const [expertiseIndex, setExpertiseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const expertiseList = [
    "Backend Development with Node.js",
    "DevOps & AWS Cloud Services",
    "Full Stack Web Applications",
    "Microservices Architecture",
    "Docker & Kubernetes",
    "CI/CD Pipeline Automation",
    "Database Design & Optimization",
    "RESTful & GraphQL APIs"
  ];

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

  const stats = [
    { icon: Sparkles, label: "Years Experience", value: "4+" },
    { icon: Code2, label: "Projects Completed", value: "50+" },
    { icon: Rocket, label: "Happy Clients", value: "30+" },
  ];

  const skills = [
    { icon: Code2, name: "Full Stack Development" },
    { icon: Cloud, name: "Cloud & DevOps" },
    { icon: Database, name: "Backend Systems" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20 pb-20">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {portfolioData.personal.name}
                </span>
              </h1>
            </motion.div>

            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">
                {displayedTitle}
                <span className="inline-block w-1 h-7 bg-primary animate-pulse ml-1" />
              </div>
              <p className="text-base text-muted-foreground">
                {portfolioData.personal.tagline}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-base text-foreground/80 leading-relaxed max-w-2xl"
            >
              {portfolioData.personal.bio}
            </motion.p>

            {/* Expertise Cycling Box - Full Width */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-card via-primary/5 to-card border-2 border-primary/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block">
                      Currently Specialized In
                    </span>
                    <div className="text-lg font-bold text-primary min-h-[28px]">
                      {displayedExpertise}
                      <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-1" />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>8+ Core Skills</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
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
                onClick={() => navigate("/contact")}
                className="border-2"
              >
                <Mail className="mr-2 w-5 h-5" />
                Get In Touch
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-4"
            >
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary hover:bg-primary/10"
              >
                <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary hover:bg-primary/10"
              >
                <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-primary hover:bg-primary/10"
              >
                <a href={`mailto:${portfolioData.personal.email}`}>
                  <Mail className="w-6 h-6" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 lg:space-y-6"
          >
            {/* Stats Cards - Always in a row */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-3 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Get In Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="text-sm font-medium text-foreground">{portfolioData.personal.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    💼
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Work Status</div>
                    <div className="text-sm font-medium text-green-500">Available for Hire</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    ⏰
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                    <div className="text-sm font-medium text-foreground">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Available for Opportunities</h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    Open to freelance projects, consulting, and full-time positions. Let's build something amazing together!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
