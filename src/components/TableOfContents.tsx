import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Add IDs to headings in the DOM
    const articleHeadings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6');
    articleHeadings.forEach((heading) => {
      const text = heading.textContent || '';
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      heading.id = id;
    });

    // Intersection Observer for active heading
    const observerOptions = {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    articleHeadings.forEach((heading) => {
      observer.observe(heading);
    });

    // Check scroll position to hide/show TOC
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsMobileOpen(false); // Close mobile drawer after click
    }
  };

  if (headings.length === 0) return null;
const TableOfContentsContent = () => (
    <nav className="space-y-1">
      {headings.map((heading, index) => {
        const isActive = activeId === heading.id;
        const indent = (heading.level - 1) * 12;
        
        return (
          <motion.button
            key={`${heading.id}-${index}`}
            onClick={() => scrollToHeading(heading.id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-start gap-2 group",
              isActive
                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
            )}
            style={{ paddingLeft: `${indent + 12}px` }}
          >
            <ChevronRight 
              className={cn(
                "w-3 h-3 mt-0.5 flex-shrink-0 transition-transform duration-200",
                isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-foreground/70",
                isActive && "rotate-90"
              )}
            />
            <span className="line-clamp-2 leading-tight">{heading.text}</span>
          </motion.button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="hidden xl:block fixed left-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto z-10"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                <List className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Table of Contents
                </h3>
              </div>
              
              <TableOfContentsContent />

              {/* Scroll indicator */}
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span>Scroll to explore</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Floating Button & Sheet */}
      <div className="xl:hidden">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full shadow-lg bg-primary hover:bg-primary/90 w-14 h-14 p-0"
                  >
                    <List className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <List className="w-5 h-5 text-primary" />
                      Table of Contents
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-6 pr-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                    <TableOfContentsContent />
                  </div>

                  {/* Hint */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                      <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                      <span>Tap any heading to jump to it</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
