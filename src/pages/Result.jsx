import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import { AlertTriangle, CheckCircle, AlertCircle, Activity, RotateCcw, History } from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  const { currentResult, analysisHistory, resetApp } = useApp();

  // Navegação segura se não houver resultado
  useEffect(() => {
    if (!currentResult) {
      navigate('/');
    }
  }, [currentResult, navigate]);

  if (!currentResult) return null; // renderiza nada enquanto navega

  const hasImageAnalysis = currentResult.imageName !== undefined;

  const getRiskColor = (level) => {
    if (level === 'low') return 'text-emerald-600';
    if (level === 'medium') return 'text-yellow-600';
    if (level === 'high') return 'text-red-600';
    return 'text-gray-600';
  };

  const getRiskBgColor = (level) => {
    if (level === 'low') return 'bg-emerald-50 border-emerald-200';
    if (level === 'medium') return 'bg-yellow-50 border-yellow-200';
    if (level === 'high') return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getRiskIcon = (level) => {
    if (level === 'low') return <CheckCircle className="w-8 h-8 text-emerald-600" />;
    if (level === 'medium') return <AlertCircle className="w-8 h-8 text-yellow-600" />;
    if (level === 'high') return <AlertTriangle className="w-8 h-8 text-red-600" />;
    return null;
  };

  const getRiskLabel = (level) => {
    if (level === 'low') return 'Baixo Risco';
    if (level === 'medium') return 'Risco Moderado';
    if (level === 'high') return 'Alto Risco';
    return 'Indefinido';
  };

  const handleNewAnalysis = () => {
    resetApp();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Card de Resultado Principal */}
          <Card className={`border-2 ${getRiskBgColor(currentResult.riskLevel)} shadow-lg`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl text-emerald-800">Resultado da Análise</CardTitle>
                  <CardDescription className="text-base mt-2 text-gray-700">
                    Análise concluída em {new Date(currentResult.date).toLocaleString('pt-BR')}
                  </CardDescription>
                </div>
                {getRiskIcon(currentResult.riskLevel)}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <div className="inline-flex items-baseline">
                  <span className={`text-7xl font-bold ${getRiskColor(currentResult.riskLevel)}`}>
                    {currentResult.finalProbability}
                  </span>
                  <span className="text-3xl font-semibold text-gray-600 ml-2">%</span>
                </div>

                <p className="text-xl font-medium text-gray-700 mt-4">Probabilidade de Tuberculose</p>

                <p className={`text-lg font-semibold mt-2 ${getRiskColor(currentResult.riskLevel)}`}>
                  {getRiskLabel(currentResult.riskLevel)}
                </p>
              </div>

              <div className="space-y-2">
                <Progress value={currentResult.finalProbability} className="h-4" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aviso importante */}
          <Card className="bg-red-50 border-2 border-red-300 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">Aviso Importante</h3>
                  <p className="text-red-800 mb-2"><strong>Este resultado NÃO é diagnóstico médico.</strong></p>
                  <p className="text-red-800 mb-3">Procure um médico e realize exames específicos para confirmação.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalhamento da Análise */}
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="flex items-center text-xl text-emerald-800">
                <Activity className="w-5 h-5 mr-2" />
                Detalhamento da Análise
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {hasImageAnalysis ? (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Triagem de Sintomas</p>
                    <p className="text-2xl font-bold text-emerald-700">{currentResult.screeningScore}%</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Random Forest</p>
                    <p className="text-2xl font-bold text-blue-700">{currentResult.imageAnalysis.randomForest}%</p>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">CNN</p>
                    <p className="text-2xl font-bold text-indigo-700">{currentResult.imageAnalysis.cnn}%</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg col-span-3">
                    <p className="text-sm mb-2">Metodologia:</p>
                    <p className="text-sm text-gray-700">
                      Resultado final combina 3 modelos: sintomas (30%), Random Forest (35%) e CNN (35%).
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border">
                    <p className="text-sm">Triagem de Sintomas</p>
                    <p className="text-2xl font-bold text-emerald-700">{currentResult.screeningScore}%</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border">
                    <p className="text-sm font-semibold">Análise Apenas por Sintomas</p>
                    <p className="text-sm text-amber-700">A análise mais completa exige imagem de raio-X.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Histórico */}
          {analysisHistory.length > 1 && (
            <Card className="border-2 border-emerald-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center text-xl text-emerald-800">
                  <History className="w-5 h-5 mr-2" />
                  Histórico
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {analysisHistory.slice(0, 5).map((result) => (
                    <div key={result.id} className="p-3 bg-gray-50 border rounded-lg flex justify-between">
                      <div>
                        <p className="text-sm font-medium">{new Date(result.date).toLocaleString('pt-BR')}</p>
                        <p className="text-xs text-gray-500">{result.imageName || 'Triagem de sintomas'}</p>
                      </div>

                      <div className="text-right">
                        <p className={`text-lg font-bold ${getRiskColor(result.riskLevel)}`}>{result.finalProbability}%</p>
                        <p className="text-xs text-gray-500">{getRiskLabel(result.riskLevel)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botão Nova Análise */}
          <div className="text-center pt-4">
            <Button
              size="lg"
              onClick={handleNewAnalysis}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:opacity-90"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Nova Análise
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
