import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorTheme } from "@/components/ColorProvider";

const colorThemes = [
  { name: "pink", color: "hsl(330, 81%, 60%)" },
  { name: "orange", color: "hsl(25, 95%, 53%)" },
  { name: "green", color: "hsl(142, 76%, 36%)" },
  { name: "blue", color: "hsl(205, 69%, 49%)" },
  { name: "purple", color: "hsl(259, 94%, 51%)" },
];

export function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { colorTheme, setColorTheme } = useColorTheme();

  const currentTheme = colorThemes.find(theme => theme.name === colorTheme) || colorThemes[3];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors"
        whileTap={{ scale: 0.95 }}
      >
        <div 
          className="h-4 w-4 rounded-full border-2 border-background shadow-sm"
          style={{ backgroundColor: currentTheme.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg p-2 shadow-lg backdrop-blur-sm z-50"
          >
            <div className="flex flex-col gap-2">
              {colorThemes.map((theme) => (
                <motion.button
                  key={theme.name}
                  onClick={() => {
                    setColorTheme(theme.name as any);
                    setIsOpen(false);
                  }}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="h-5 w-5 rounded-full border-2 border-background shadow-sm"
                    style={{ backgroundColor: theme.color }}
                  />
                  {colorTheme === theme.name && (
                    <motion.div
                      layoutId="selected-color"
                      className="absolute inset-0 rounded-full border-2 border-foreground/20"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}