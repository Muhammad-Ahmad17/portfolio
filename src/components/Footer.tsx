import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const currentYear = new Date().getFullYear();

  const handleNavigation = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_35%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--foreground)/0.05),transparent_30%)] pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-8 py-16 max-w-6xl relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr,0.9fr]">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4 font-mono">
              Let’s build something
            </p>
            <h3 className="text-2xl sm:text-3xl uppercase tracking-[0.08em] text-foreground mb-4">
              {portfolioData.personal.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              {portfolioData.personal.tagline} based in {portfolioData.personal.location}. I’m open to backend, DevOps, and cloud-focused work.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer"
                 aria-label="GitHub" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                <Github className="w-5 h-5" />
              </a>
              <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer"
                 aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${portfolioData.personal.email}`}
                 aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-5 font-mono">Navigation</h4>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
              {portfolioData.navigation.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-5 font-mono">Contact</h4>
              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-primary" />
                  {portfolioData.personal.email}
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {portfolioData.personal.location}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-[var(--shadow-elegant)]">
              <h5 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-3 font-mono">Appearance</h5>
              <ThemeToggle />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 pt-8 border-t border-border/60"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground">
              © {currentYear} {portfolioData.personal.name}. All rights reserved.
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full border border-border/60 bg-background/70 hover:border-primary/40 hover:bg-background transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
