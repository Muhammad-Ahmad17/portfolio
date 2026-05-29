import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div whileHover={{ opacity: 0.7 }} className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/")}
              className="p-0 h-auto hover:bg-transparent text-foreground flex items-center gap-3"
            >
              <span className="font-mono text-xs tracking-[0.35em] text-primary">{"{*}"}</span>
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em]">Muhammad Ahmad</span>
            </Button>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-6">
            {portfolioData.navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`relative text-[11px] uppercase tracking-[0.3em] font-mono transition-colors duration-300 ${isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-foreground/70"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side - Theme toggle only */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-transparent"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-1 border-t border-border/50 mt-3">
                {portfolioData.navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`block w-full text-left py-2.5 text-[11px] uppercase tracking-[0.3em] font-mono transition-colors ${isActive(item.href)
                          ? "text-foreground"
                          : "text-muted-foreground"
                        }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
                <div className="flex items-center gap-4 pt-5 mt-4 border-t border-border/50">
                  <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" 
                     aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" 
                     aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${portfolioData.personal.email}`} 
                     aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
