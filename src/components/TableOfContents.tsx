import { useEffect, useState, useRef } from "react";
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
  const tocScrollRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLButtonElement>(null);

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

    // Intersection Observer for active heading - improved sync
    const observerOptions = {
      rootMargin: '-80px 0px -80%',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    let mostVisibleHeading = '';
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Get the most visible heading (highest intersection ratio)
        const mostVisible = visibleEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        
        if (mostVisible.target.id !== mostVisibleHeading) {
          mostVisibleHeading = mostVisible.target.id;
          setActiveId(mostVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    articleHeadings.forEach((heading) => {
      observer.observe(heading);
    });

    // Check scroll position to hide/show TOC - hide near bottom for footer
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);
      
      // Show TOC after scrolling 400px but hide when within 600px of bottom
      setIsVisible(scrollY > 400 && distanceFromBottom > 600);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-scroll active heading into view in TOC
  useEffect(() => {
    if (activeId && activeLinkRef.current && tocScrollRef.current) {
      const activeElement = activeLinkRef.current;
      const container = tocScrollRef.current;
      
      // Calculate if element is in view
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();
      
      // Check if element is outside the visible area
      const isAbove = elementRect.top < containerRect.top;
      const isBelow = elementRect.bottom > containerRect.bottom;
      
      if (isAbove || isBelow) {
        // Scroll the active element into view with some padding
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [activeId]);

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
    <nav className="space-y-0.5">
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        const indent = (heading.level - 1) * 10;
        
        return (
          <button
            key={heading.id}
            ref={isActive ? activeLinkRef : null}
            onClick={() => scrollToHeading(heading.id)}
            className={cn(
              "w-full text-left px-2 py-1.5 text-xs rounded transition-all duration-200 flex items-start gap-1.5 group",
              isActive
                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
            )}
            style={{ paddingLeft: `${indent + 8}px` }}
          >
            <ChevronRight 
              className={cn(
                "w-2.5 h-2.5 mt-0.5 flex-shrink-0 transition-transform duration-200",
                isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-foreground/70",
                isActive && "rotate-90"
              )}
            />
            <span className="line-clamp-2 leading-snug">{heading.text}</span>
          </button>
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
            className="hidden 2xl:block fixed left-4 top-32 w-56 max-h-[calc(100vh-180px)] z-10"
          >
            <div className="bg-background/60 backdrop-blur-md border border-border/30 rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                <List className="w-3.5 h-3.5 text-primary" />
                <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  On This Page
                </h3>
              </div>
              
              {/* Scrollable content with custom scrollbar */}
              <div ref={tocScrollRef} className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1.5 custom-scrollbar">
                <TableOfContentsContent />
              </div>

              {/* Scroll indicator */}
              <div className="mt-3 pt-2 border-t border-border/30">
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/70">
                  <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" />
                  <span>Scroll to explore</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Floating Button & Sheet */}
      <div className="2xl:hidden">
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
