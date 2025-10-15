import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ColorPicker } from "@/components/ColorPicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
        : "bg-background/50 backdrop-blur-sm"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Terminal-style Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/")}
              className="font-mono text-sm bg-gradient-primary bg-clip-text text-transparent hover:bg-transparent p-2 h-auto flex items-center gap-2"
            >
              <span className="text-primary">$</span>
              <span className="font-semibold">~/{portfolioData.personal.name.toLowerCase().replace(/\s+/g, '-')}</span>
            </Button>
          </motion.div>

          {/* Desktop Navigation - Terminal tabs */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavigation(item.href)}
                  className="relative px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-primary hover:bg-card transition-all duration-300 rounded group"
                >
                  <span className="text-primary mr-1">cd</span>
                  {item.label.toLowerCase()}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-primary group-hover:w-3/4 transition-all duration-300" />
                </Button>
              ))}
            </div>
          </div>

          {/* Right side - System controls */}
          <div className="hidden md:flex items-center gap-2 bg-muted/30 rounded-lg p-1">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8 hover:text-primary hover:bg-card transition-all duration-300 rounded"
              >
                <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8 hover:text-primary hover:bg-card transition-all duration-300 rounded"
              >
                <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8 hover:text-primary hover:bg-card transition-all duration-300 rounded"
              >
                <a href={`mailto:${portfolioData.personal.email}`} title="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="w-px h-4 bg-border/50" />
            <ThemeToggle />
            <ColorPicker />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <ColorPicker />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 bg-card/80 backdrop-blur-lg rounded-xl my-4 border border-border shadow-xl font-mono text-sm">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation(item.href)}
                      className="w-full text-left justify-start hover:text-primary hover:bg-primary/10 transition-all duration-300 px-4 py-2 font-mono text-xs"
                    >
                      <span className="text-primary mr-2">$</span>
                      cd ~/{item.label.toLowerCase()}
                    </Button>
                  </motion.div>
                ))}
                <div className="flex items-center justify-center space-x-2 pt-4 mt-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded"
                  >
                    <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded"
                  >
                    <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded"
                  >
                    <a href={`mailto:${portfolioData.personal.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}