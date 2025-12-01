import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  
  const [screeningData, setScreeningData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // ✅ movido para cá

  // Função para adicionar ao histórico
  const addToHistory = (result) => {
    setAnalysisHistory((prev) => [result, ...prev]);
  };

  // Função para resetar o app
  const resetApp = () => {
    setScreeningData(null);
    setUploadedImage(null);
    setCurrentResult(null);
    setAnalysisHistory([]);
    setCurrentStep(0);
  };

  return (
    <AppContext.Provider
      value={{
        screeningData,
        setScreeningData,
        uploadedImage,
        setUploadedImage,
        currentResult,
        setCurrentResult,
        analysisHistory,
        addToHistory,
        resetApp,
        currentStep,
        setCurrentStep, // ✅ disponibilizado no contexto
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
