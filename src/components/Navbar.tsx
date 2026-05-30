import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderOpen, Sparkles, Briefcase, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
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
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const dockIcons: Record<string, typeof Home> = {
    "/": Home,
    "/about": User,
    "/projects": FolderOpen,
    "/contact": Mail,
  };

  const dockNavigation = portfolioData.navigation.filter((item) =>
    ["/", "/about", "/projects", "/contact"].includes(item.href),
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/60"
            : "bg-transparent"
          }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo */}
            <motion.div whileHover={{ opacity: 0.7 }} className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/")}
                className="p-0 h-auto hover:bg-transparent text-foreground flex items-center gap-2 sm:gap-3"
              >
                <span className="font-mono text-xs tracking-[0.35em] text-primary">{"{*}"}</span>
                <span className="text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em]">Muhammad Ahmad</span>
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

            {/* Mobile theme toggle */}
            <div className="lg:hidden flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </motion.header>

      <motion.nav
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.45 }}
        className="lg:hidden fixed bottom-4 left-4 right-4 z-50"
      >
        <div className="rounded-full border border-border/60 bg-background/85 px-2 py-2 shadow-[var(--shadow-elegant)] backdrop-blur-xl">
          <div className="flex w-full items-stretch justify-between gap-1">
            {dockNavigation.map((item) => {
              const Icon = dockIcons[item.href] ?? Home;
              const active = isActive(item.href);

              return (
                <motion.button
                  key={item.href}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex min-h-14 flex-1 basis-0 flex-col items-center justify-center rounded-full px-1 py-2 text-[9px] uppercase tracking-[0.16em] font-mono transition-colors ${active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4 mb-1" />
                  <span className="leading-none truncate">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
