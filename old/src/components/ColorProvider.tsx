import { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "pink" | "orange" | "green" | "blue" | "purple";

type ColorProviderProps = {
  children: React.ReactNode;
  defaultColor?: ColorTheme;
  storageKey?: string;
};

type ColorProviderState = {
  colorTheme: ColorTheme;
  setColorTheme: (color: ColorTheme) => void;
};

const initialState: ColorProviderState = {
  colorTheme: "blue",
  setColorTheme: () => null,
};

const ColorProviderContext = createContext<ColorProviderState>(initialState);

export function ColorProvider({
  children,
  defaultColor = "blue",
  storageKey = "portfolio-color-theme",
  ...props
}: ColorProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () => (localStorage.getItem(storageKey) as ColorTheme) || defaultColor
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all color theme attributes
    root.removeAttribute("data-color");
    
    // Set the new color theme
    root.setAttribute("data-color", colorTheme);
  }, [colorTheme]);

  const value = {
    colorTheme,
    setColorTheme: (color: ColorTheme) => {
      localStorage.setItem(storageKey, color);
      setColorTheme(color);
    },
  };

  return (
    <ColorProviderContext.Provider {...props} value={value}>
      {children}
    </ColorProviderContext.Provider>
  );
}

export const useColorTheme = () => {
  const context = useContext(ColorProviderContext);

  if (context === undefined)
    throw new Error("useColorTheme must be used within a ColorProvider");

  return context;
};