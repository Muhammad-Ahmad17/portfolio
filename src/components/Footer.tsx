import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ColorPicker } from "@/components/ColorPicker";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/50 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              {portfolioData.personal.name}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
            <div className="flex gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300"
              >
                <a href={`mailto:${portfolioData.personal.email}`}>
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <div className="space-y-3">
              {["Home", "About", "Projects", "Skills", "Experience", "Blog", "Contact"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="block w-full text-left px-0 h-auto py-1 text-muted-foreground hover:text-primary hover:bg-transparent hover:translate-x-2 transition-all duration-300"
                >
                  {item}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-foreground">Get in Touch</h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${portfolioData.personal.email}`}
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {portfolioData.personal.email}
              </a>
              <p className="text-muted-foreground">{portfolioData.personal.phone}</p>
              <p className="text-muted-foreground">{portfolioData.personal.location}</p>
            </div>
            <div className="mt-8 flex gap-2">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © {currentYear} {portfolioData.personal.name}. Made with{" "}
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> using React & Tailwind CSS
          </p>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-glow"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}