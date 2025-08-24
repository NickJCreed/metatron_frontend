import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import LandingPage from "./components/LandingPage";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<div>Dashboard Test</div>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
