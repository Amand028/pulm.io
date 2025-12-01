import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import { Upload, Image, Loader2, AlertCircle, ArrowRight } from "lucide-react";


const UploadPage = () => {
  const navigate = useNavigate();
  const { screeningData, setUploadedImage, setCurrentResult, addToHistory } = useApp();
  

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!screeningData) {
      navigate("/screening");
    }
  }, [screeningData, navigate]);

  const handleAnalyze = async () => {
  console.log("INICIOU");
  setIsAnalyzing(true);

  // Cria o resultado da análise (exemplo fictício)
  const fakeResult = {
    finalProbability: 75,
    riskLevel: 'medium',
    date: new Date(),
    screeningScore: 80,
    imageName: file?.name, // se houver imagem
    imageAnalysis: {
      randomForest: 70,
      cnn: 80,
    }
  };

  // ⚡ Define no contexto
  setCurrentResult(fakeResult);

  // ⚡ Adiciona ao histórico
  addToHistory(fakeResult);

  // Espera um pouco para mostrar o loading e navega
  setTimeout(() => {
    console.log("VAI NAVEGAR");
    navigate("/result");
  }, 500);
};
// ← fecha o handleAnalyze aqui

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    setFile(selectedFile);
    setUploadedImage(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSkip = () => {
    console.log("PULOU");
    handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="text-3xl text-emerald-800">
                Upload de Raio-X
              </CardTitle>
              <CardDescription className="text-base text-gray-700 mt-2">
                Envie um raio-X para análise ou pule esta etapa
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-96 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">{file?.name}</p>
                    <Button
                      onClick={() => {
                        setPreview(null);
                        setFile(null);
                        setUploadedImage(null);
                      }}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      variant="outline"
                    >
                      Remover Imagem
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Arraste e solte aqui
                      </p>
                      <p className="text-sm text-gray-500 mt-1">ou</p>
                    </div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Selecionar arquivo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-900 space-y-2">
                      <p className="font-semibold">Dicas para melhor análise:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Use imagens em boa qualidade</li>
                        <li>Certifique-se de boa nitidez</li>
                        <li>Formatos: JPG, PNG, JPEG</li>
                        <li>Se não tiver imagem, você pode pular</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/screening")}
                  disabled={isAnalyzing}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Voltar
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    disabled={isAnalyzing}
                    className="border-gray-300"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        Pular Etapa
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleAnalyze(false)}
                    disabled={!file || isAnalyzing}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      "Analisar Raio-X"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ✅ Export default necessário
export default UploadPage;

