import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, CheckCircle, AlertCircle, Activity, History } from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  const { currentResult, analysisHistory, resetApp } = useApp();

  if (!currentResult) {
    navigate('/');
    return null;
  }

  const hasImageAnalysis = currentResult.imageName !== undefined;

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-emerald-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'low': return 'bg-emerald-50 border-emerald-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-8 h-8 text-emerald-600" />;
      case 'medium': return <AlertCircle className="w-8 h-8 text-yellow-600" />;
      case 'high': return <AlertTriangle className="w-8 h-8 text-red-600" />;
      default: return null;
    }
  };

  const getRiskLabel = (level) => {
    switch (level) {
      case 'low': return 'Baixo Risco';
      case 'medium': return 'Risco Moderado';
      case 'high': return 'Alto Risco';
      default: return 'Indefinido';
    }
  };

  const handleNewAnalysis = () => {
    resetApp();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Main Result Card */}
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
                <p className="text-xl font-medium text-gray-700 mt-4">
                  Probabilidade de Tuberculose
                </p>
                <p className={`text-lg font-semibold mt-2 ${getRiskColor(currentResult.riskLevel)}`}>
                  {getRiskLabel(currentResult.riskLevel)}
                </p>
              </div>

              {/* Progress Bar */}
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

          {/* Warning Card */}
          <Card className="bg-red-50 border-2 border-red-300 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">Aviso Importante - Leia com Atenção</h3>
                  <p className="text-red-800 mb-3">
                    <strong>Este resultado é apenas uma estimativa probabilística</strong> gerada por algoritmos de Machine Learning e <strong>NÃO constitui um diagnóstico médico</strong>.
                  </p>
                  <p className="text-red-800 mb-3">
                    A tuberculose é uma doença séria que requer avaliação profissional adequada. 
                    Independentemente do resultado apresentado, você deve:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-red-800 ml-2">
                    <li>Consultar um médico pneumologista ou clínico geral</li>
                    <li>Realizar exames laboratoriais específicos (baciloscopia, cultura, etc.)</li>
                    <li>Seguir as orientações médicas profissionais</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Details */}
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="flex items-center text-xl text-emerald-800">
                <Activity className="w-5 h-5 mr-2 text-emerald-600" />
                Detalhamento da Análise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasImageAnalysis ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Random Forest</p>
                      <p className="text-2xl font-bold text-blue-700">{currentResult.screeningScore}%</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p className="text-sm text-gray-600 mb-1">CNN (Rede Neural)</p>
                      <p className="text-2xl font-bold text-indigo-700">{currentResult.imageAnalysis.cnn}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Metodologia de Análise:</p>
                    <p className="text-sm text-gray-700">
                      O resultado final combina dois componentes: algoritmo Random Forest (50%) e Rede Neural Convolucional (50%). Cada modelo foi treinado com dados históricos de casos de tuberculose.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">Triagem de Sintomas</p>
                  <p className="text-2xl font-bold text-emerald-700">{currentResult.screeningScore}%</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center pt-4">
            <Button
              size="lg"
              onClick={handleNewAnalysis}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg"
            >
              
              Nova Análise
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
