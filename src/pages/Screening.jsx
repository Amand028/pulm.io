import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import { ClipboardList, ArrowRight } from 'lucide-react';

export default function Screening() {
  const navigate = useNavigate();
  const { setScreeningData } = useApp();

  const [formData, setFormData] = useState({
    persistentCough: false,
    fever: false,
    weightLoss: false,
    nightSweats: false,
    fatigue: false,
    chestPain: false,
    tbContact: false,
  });

  const questions = [
    {
      id: 'persistentCough',
      label: 'Tosse persistente por mais de 3 semanas?',
      description: 'Tosse seca ou com catarro que não melhora',
    },
    {
      id: 'fever',
      label: 'Febre, especialmente à tarde?',
      description: 'Temperatura elevada, geralmente no final do dia',
    },
    {
      id: 'weightLoss',
      label: 'Perda de peso inexplicada?',
      description: 'Emagrecimento sem mudança na dieta ou exercícios',
    },
    {
      id: 'nightSweats',
      label: 'Sudorese noturna intensa?',
      description: 'Transpiração excessiva durante a noite',
    },
    {
      id: 'fatigue',
      label: 'Fadiga e fraqueza constantes?',
      description: 'Cansaço persistente e falta de energia',
    },
    {
      id: 'chestPain',
      label: 'Dor no peito ao respirar ou tossir?',
      description: 'Desconforto ou dor na região torácica',
    },
    {
      id: 'tbContact',
      label: 'Contato recente com pessoa com tuberculose?',
      description: 'Convivência com alguém diagnosticado com TB',
    },
  ];

  const handleCheckboxChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = () => {
    setScreeningData(formData);
    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="text-3xl text-emerald-800 flex items-center">
                <ClipboardList className="w-8 h-8 mr-3 text-emerald-600" />
                Triagem de Sintomas
              </CardTitle>
              <CardDescription className="text-base text-gray-700 mt-2">
                Responda às perguntas abaixo sobre seus sintomas atuais
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                {questions.map((question) => (
                  <Card key={question.id} className="border-emerald-100 hover:border-emerald-300 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          id={question.id}
                          checked={formData[question.id]}
                          onCheckedChange={() => handleCheckboxChange(question.id)}
                          className="mt-1 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <div className="flex-1">
                          <Label htmlFor={question.id} className="text-base font-semibold text-gray-900 cursor-pointer">
                            {question.label}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{question.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-sm text-blue-900">
                    <strong>Nota:</strong> Estas perguntas ajudam a avaliar a probabilidade de tuberculose com base em sintomas comuns.
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => navigate('/')} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  Voltar
                </Button>
                <Button onClick={handleSubmit} className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
}
