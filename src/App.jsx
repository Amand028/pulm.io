import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Home from "./pages/Home";
import Screening from "./pages/Screening";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import StepperGlobal from "./StepperGlobal";

function AppContent() {
  const { setCurrentStep } = useApp();
  const location = useLocation();

  // Sincroniza o currentStep com a página atual
  React.useEffect(() => {
    switch (location.pathname) {
      case "/":
        setCurrentStep(0);
        break;
      case "/screening":
        setCurrentStep(1);
        break;
      case "/upload":
        setCurrentStep(2);
        break;
      case "/result":
        setCurrentStep(3);
        break;
      default:
        setCurrentStep(0);
    }
  }, [location.pathname, setCurrentStep]);

  return (
    <>
      <StepperGlobal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

