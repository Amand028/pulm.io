import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Loader2, Upload, Image, AlertCircle } from 'lucide-react';
import { analyzeImage } from '@/lib/mlSimulator';

export default function UploadPage() {
  const navigate = useNavigate();
  const { screeningData, setUploadedImage, setCurrentResult, addToHistory } = useApp();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!screeningData) {
    navigate('/screening');
    return null;
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    setFile(selectedFile);
    setUploadedImage(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyze = async (skipImage = false) => {
    if (!screeningData) return;

    setIsAnalyzing(true);

    // Simula processamento de ML (2-3 segundos)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Valor fake de 70% para CNN e Random Forest
    const result = analyzeImage(screeningData, skipImage ? null : file);
    const fakeResult = {
      ...result,
      imageAnalysis: { cnn: 70 },
      screeningScore: 70,
    };

    setCurrentResult(fakeResult);
    addToHistory(fakeResult);

    setIsAnalyzing(false);
    navigate('/result');
  };

  const handleSkip = () => handleAnalyze(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="text-3xl text-emerald-800">Upload de Raio-X</CardTitle>
              <CardDescription className="text-base text-gray-700 mt-2">
                Envie uma imagem de raio-X do tórax para análise ou pule esta etapa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-300 hover:border-gray-400'
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
                      variant="outline"
                      onClick={() => {
                        setPreview(null);
                        setFile(null);
                        setUploadedImage(null);
                      }}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      Remover Imagem
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Arraste e solte uma imagem aqui
                      </p>
                      <p className="text-sm text-gray-500 mt-1">ou</p>
                    </div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      Selecionar Arquivo
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

              {/* Info Card */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 space-y-2">
                      <p className="font-semibold">Dicas para melhor análise:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Use imagens de raio-X do tórax em boa qualidade</li>
                        <li>Certifique-se de que a imagem está nítida e bem iluminada</li>
                        <li>Formatos aceitos: JPG, PNG, JPEG</li>
                        <li>Se não tiver uma imagem, você pode pular esta etapa</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/screening')}
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
                      'Pular esta Etapa'
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
                      'Analisar Raio-X'
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
}

