import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-dark relative">
      <div className="container mx-auto px-6 lg:px-8 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {portfolioData.personal.name}
            </h3>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              {portfolioData.personal.tagline} based in {portfolioData.personal.location}.
            </p>
            <div className="flex gap-4">
              <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" 
                 aria-label="GitHub" className="opacity-70 hover:opacity-100 transition-opacity">
                <Github className="w-5 h-5" />
              </a>
              <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" 
                 aria-label="LinkedIn" className="opacity-70 hover:opacity-100 transition-opacity">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} 
                 aria-label="Email" className="opacity-70 hover:opacity-100 transition-opacity">
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
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-5">Navigation</h4>
            <nav className="grid grid-cols-2 gap-2.5">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavigation(link.href)}
                  className="text-sm text-left opacity-75 hover:opacity-100 transition-opacity"
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
          >
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-5">Contact</h4>
            <div className="space-y-2.5 text-sm mb-6">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="block opacity-75 hover:opacity-100 transition-opacity"
              >
                {portfolioData.personal.email}
              </a>
              <div className="opacity-75">
                {portfolioData.personal.location}
              </div>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-3">Appearance</h5>
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
          className="pt-8 border-t border-current/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-sm opacity-70">
                © {currentYear} {portfolioData.personal.name}
              </div>
              <div className="text-xs opacity-50 mt-1">
                Built with React, TypeScript & Tailwind CSS
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full border border-current/20 hover:border-current/40 hover:bg-transparent transition-all"
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
