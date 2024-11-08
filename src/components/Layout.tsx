import React from "react";
import Sidebar from "@/components/Nav/Sidebar";
import { Header } from "@/components/Nav/Header";
import { useTheme } from "@/context/ThemeProvider";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme(); 

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden" 
      style={{ backgroundColor: theme.colors.secondaryBg, color: theme.colors.primaryText }}
      >
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex flex-col flex-1">
            {children}
          </main>
        </div>
    </div>
  );
};
