import React from "react";
import Sidebar from "@/components/Nav/Sidebar";
import { Header } from "@/components/Nav/Header";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-darkBg text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-col flex-1 p-4 bg-darkBg">{children}</main>
      </div>
    </div>
  );
};
