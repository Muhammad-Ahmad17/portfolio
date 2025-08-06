import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import Spline from "@splinetool/react-spline";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-hero">
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10" />
          
          {/* 3D Spline Scene - commented out for now as it needs a valid Spline scene URL */}
          {/* <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" /> */}
          
          {/* Animated background elements as fallback */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full animate-float" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary-glow/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
          >
            {portfolioData.personal.name}
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-8 font-medium"
          >
            {portfolioData.personal.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium shadow-elegant hover:shadow-glow transition-all duration-300"
              onClick={() => scrollToSection("#projects")}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 hover:border-primary hover:bg-primary/10 px-8 py-3 text-lg font-medium"
              asChild
            >
              <a href={portfolioData.personal.resume} download>
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex justify-center space-x-6 mb-16"
          >
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <a href={`mailto:${portfolioData.personal.email}`}>
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("#about")}
              className="animate-bounce hover:animate-none hover:text-primary transition-colors"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
    </section>
  );
}