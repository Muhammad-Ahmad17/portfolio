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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal-style footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Server Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="font-mono text-xs space-y-2">
              <div className="text-primary font-semibold text-sm mb-3">
                $ cat /etc/server.info
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div><span className="text-cyan-400">SERVER_NAME=</span>{portfolioData.personal.name}</div>
                <div><span className="text-green-400">ROLE=</span>{portfolioData.personal.tagline}</div>
                <div><span className="text-orange-400">LOCATION=</span>{portfolioData.personal.location}</div>
                <div><span className="text-blue-400">STATUS=</span><span className="text-green-400">● active (running)</span></div>
                <div><span className="text-purple-400">UPTIME=</span>{currentYear - 2020} years</div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 rounded hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 rounded hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 rounded hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <a href={`mailto:${portfolioData.personal.email}`}>
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs">
              <div className="text-primary font-semibold mb-3">$ ls -la ~/pages</div>
              <div className="space-y-1">
                {["home", "about", "projects", "skills", "experience", "blog", "contact"].map((item, index) => (
                  <Button
                    key={item}
                    variant="ghost"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="block w-full text-left px-0 h-auto py-0.5 text-muted-foreground hover:text-primary hover:bg-transparent transition-all duration-300 font-mono text-xs"
                  >
                    <span className="text-cyan-400">drwxr-xr-x</span> {item}.tsx
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs space-y-3">
              <div className="text-primary font-semibold mb-3">$ cat contact.conf</div>
              <div className="space-y-1 text-muted-foreground">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="block hover:text-primary transition-colors duration-300"
                >
                  <span className="text-green-400">EMAIL=</span>{portfolioData.personal.email}
                </a>
                <div><span className="text-cyan-400">PHONE=</span>{portfolioData.personal.phone}</div>
                <div><span className="text-orange-400">TZ=</span>UTC+0</div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="text-muted-foreground mb-2">System Controls:</div>
                <div className="flex gap-2">
                  <ColorPicker />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Terminal Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-primary">#</span>
                <span>© {currentYear} {portfolioData.personal.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">#</span>
                <span>Built with React + TypeScript + Tailwind CSS</span>
                <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">#</span>
                <span className="text-green-400">All rights reserved. Licensed under MIT.</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="h-9 w-9 rounded hover:bg-primary/10 hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
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