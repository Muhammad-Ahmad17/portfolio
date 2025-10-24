import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ColorPicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { useNavigate, useLocation } from "react-router-dom";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/")}
              className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent hover:bg-transparent p-2 h-auto"
            >
              {portfolioData.personal.name.split(' ')[0]}
            </Button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavigation(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 hover:text-primary hover:bg-muted/50 transition-all duration-300 rounded-lg"
              >
                <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 hover:text-primary hover:bg-muted/50 transition-all duration-300 rounded-lg"
              >
                <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-9 w-9 hover:text-primary hover:bg-muted/50 transition-all duration-300 rounded-lg"
              >
                <a href={`mailto:${portfolioData.personal.email}`} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="w-px h-6 bg-border/50 mx-2" />
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
              className="text-foreground hover:bg-muted/50 hover:text-primary transition-all duration-300 rounded-lg"
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
              <div className="py-4 space-y-1 bg-card/80 backdrop-blur-lg rounded-xl my-4 border border-border shadow-xl">
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
                      className={`w-full text-left justify-start transition-all duration-300 px-4 py-2 text-sm font-medium rounded-lg ${
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                      }`}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
                <div className="flex items-center justify-center space-x-2 pt-4 mt-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 hover:text-primary hover:bg-muted/50 transition-all duration-300 rounded-lg"
                  >
                    <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 hover:text-primary hover:bg-muted/50 transition-all duration-300 rounded-lg"
                  >
                    <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 hover:text-primary hover:bg-muted/50 transition-all duration-300 rounded-lg"
                  >
                    <a href={`mailto:${portfolioData.personal.email}`} aria-label="Email">
                      <Mail className="h-5 w-5" />
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
