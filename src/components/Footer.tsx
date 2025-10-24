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

  const quickLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { icon: Github, href: portfolioData.social.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "Email" }
  ];

  return (
    <footer className="relative bg-card/50 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              {portfolioData.personal.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md leading-relaxed">
              {portfolioData.personal.tagline} based in {portfolioData.personal.location}.
              Passionate about building exceptional digital experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-4 text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="block hover:text-primary transition-colors duration-300"
              >
                {portfolioData.personal.email}
              </a>
              <div>{portfolioData.personal.phone}</div>
              <div>{portfolioData.personal.location}</div>
            </div>
            <div>
              <h5 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                Preferences
              </h5>
              <div className="flex gap-2">
                <ColorPicker />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-1">
              <div className="text-sm text-muted-foreground">
                © {currentYear} {portfolioData.personal.name}. All rights reserved.
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                <span>Built with React, TypeScript & Tailwind CSS</span>
                <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
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
