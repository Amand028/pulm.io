import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home";
import Screening from "./pages/Screening";
import Upload from "./pages/Upload";
import Result from "./pages/Result";

function AppContent() {
  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* 📌 Conteúdo das páginas */}
      <div className="pt-0"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
