import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Activity, AlertCircle, Stethoscope, TrendingUp } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent">
              Bem-vindo ao Pulm.io
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistema inteligente de triagem para tuberculose usando Machine Learning
            </p>
          </div>

          {/* Main Info Card */}
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="text-3xl text-emerald-800 flex items-center">
                <Activity className="w-8 h-8 mr-3 text-emerald-600" />
                O que é Tuberculose?
              </CardTitle>
              <CardDescription className="text-base text-gray-700 mt-2">
                Informações essenciais sobre a doença
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                A tuberculose (TB) é uma doença infecciosa causada pela bactéria{' '}
                <strong>Mycobacterium tuberculosis</strong>. Ela afeta principalmente os pulmões, mas
                pode atingir outros órgãos do corpo. É uma das doenças infecciosas mais mortais do
                mundo, mas é curável e evitável com tratamento adequado.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Symptoms */}
                <Card className="border-emerald-200 bg-emerald-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-emerald-800">
                      <Stethoscope className="w-5 h-5 mr-2 text-emerald-600" />
                      Principais Sintomas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Tosse persistente por mais de 3 semanas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Febre, especialmente à tarde</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Perda de peso inexplicada</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Sudorese noturna intensa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Fadiga e fraqueza constantes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Dor no peito ao respirar ou tossir</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Importance */}
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-blue-800">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Importância do Diagnóstico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Diagnóstico precoce salva vidas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Tratamento gratuito disponível no SUS</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Previne transmissão para outras pessoas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Taxa de cura superior a 95% com tratamento</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Evita complicações graves da doença</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Warning */}
              <Card className="bg-amber-50 border-2 border-amber-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-2">Importante:</p>
                      <p>
                        Esta ferramenta utiliza Machine Learning para auxiliar na triagem inicial,
                        mas <strong>NÃO substitui</strong> a avaliação médica profissional. Se você
                        apresenta sintomas, procure um médico imediatamente.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Button */}
              <div className="text-center pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/screening')}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-lg px-8 py-6 shadow-lg"
                >
                  Iniciar Análise
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}