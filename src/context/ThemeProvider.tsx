// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { darkTheme, lightTheme } from "@/consts/theme"; 

interface ThemeContextProps {
  theme: typeof darkTheme; 
  toggleTheme: () => void; 
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("user-theme");
    if (savedTheme === "light") {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === darkTheme ? lightTheme : darkTheme;
      localStorage.setItem("user-theme", newTheme === darkTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ backgroundColor: theme.colors.modalBg, color: theme.colors.primaryText }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
