import React from "react";
import { useTheme } from "../context/ThemeProvider";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme(); 

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden" 
      style={{ backgroundColor: theme.colors.secondaryBg, color: theme.colors.primaryText }}
      >
        {/* Simple Header */}
        <header className="p-4 border-b" style={{ backgroundColor: theme.colors.modalBg, borderColor: theme.colors.borderColor }}>
          <h1 className="text-xl font-bold" style={{ color: theme.colors.primaryText }}>metatron Header</h1>
        </header>
        
        <div className="flex flex-1">
          {/* Simple Sidebar */}
          <aside className="w-64 p-4 border-r" style={{ backgroundColor: theme.colors.modalBg, borderColor: theme.colors.borderColor }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: theme.colors.primaryText }}>Navigation</h2>
            <nav>
              <ul className="space-y-2">
                <li><a href="/dashboard" className="block p-2 rounded hover:bg-gray-700" style={{ color: theme.colors.secondaryText }}>Dashboard</a></li>
                <li><a href="/vote" className="block p-2 rounded hover:bg-gray-700" style={{ color: theme.colors.secondaryText }}>Vote</a></li>
                <li><a href="/profile" className="block p-2 rounded hover:bg-gray-700" style={{ color: theme.colors.secondaryText }}>Profile</a></li>
              </ul>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex flex-col flex-1">
            {children}
          </main>
        </div>
    </div>
  );
};
