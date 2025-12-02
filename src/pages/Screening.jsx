import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { ClipboardList, AlertCircle} from "lucide-react";

export default function Screening() {
  const navigate = useNavigate();
  const { setScreeningData } = useApp();

  const [formData, setFormData] = useState({
    fever: false,
    coughWithBlood: false,
    bloodySputum: false,
    nightSweats: false,
    chestPain: false,
    backPain: false,
    shortnessOfBreath: false,
    weightLoss: false,
    fatigue: false,
    swollenLymphNodes: false,
    persistentCough: false,
    lossOfAppetite: false,
  });

  const questions = [
    {
      id: "fever",
      label: "Febre persistente?",
      description: "Temperatura corporal elevada por vários dias",
    },
    {
      id: "persistentCough",
      label: "Tosse persistente há mais de 3 semanas?",
      description: "Tosse seca ou com catarro constante",
    },
    {
      id: "coughWithBlood",
      label: "Tosse com sangue?",
      description: "Pequenas quantidades de sangue ao tossir",
    },
    {
      id: "bloodySputum",
      label: "Catarro com sangue?",
      description: "Secreção avermelhada ou com vestígios de sangue",
    },
    {
      id: "nightSweats",
      label: "Sudorese noturna?",
      description: "Suor excessivo durante a noite",
    },
    {
      id: "chestPain",
      label: "Dor no peito?",
      description: "Desconforto ao respirar ou tossir",
    },
    {
      id: "backPain",
      label: "Dor nas costas?",
      description: "Dor persistente na região torácica ou lombar",
    },
    {
      id: "shortnessOfBreath",
      label: "Falta de ar?",
      description: "Dificuldade para respirar ou respirar ofegante",
    },
    {
      id: "weightLoss",
      label: "Perda de peso inexplicada?",
      description: "Emagrecimento sem dieta ou exercícios",
    },
    {
      id: "fatigue",
      label: "Fadiga constante?",
      description: "Cansaço prolongado sem motivo aparente",
    },
    {
      id: "swollenLymphNodes",
      label: "Inchaço dos gânglios linfáticos?",
      description: "Nódulos inchados no pescoço, axilas ou virilha",
    },
    {
      id: "lossOfAppetite",
      label: "Perda de apetite?",
      description: "Diminuição significativa da fome",
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
    navigate("/upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardTitle className="text-3xl text-emerald-800 flex items-center">
                <ClipboardList className="w-8 h-8 mr-3 text-emerald-600" />
                Triagem de Sintomas
              </CardTitle>
              <CardDescription className="text-base text-gray-700 mt-2">
                Selecione os sintomas que você está apresentando
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                {questions.map((question) => (
                  <Card
                    key={question.id}
                    className="border-emerald-100 hover:border-emerald-300 transition-colors"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          id={question.id}
                          checked={formData[question.id]}
                          onCheckedChange={() => handleCheckboxChange(question.id)}
                          className="mt-1 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={question.id}
                            className="text-base font-semibold text-gray-900 cursor-pointer"
                          >
                            {question.label}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {question.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>



              <Card className="bg-blue-50 border-2 border-blue-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-900">
                    <strong>Importante:</strong> Marque apenas sintomas reais para obter uma
                    análise mais confiável.
                  </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  Continuar
                  
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

