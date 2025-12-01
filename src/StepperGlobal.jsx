// StepperGlobal.jsx
import React from "react";
import { useApp } from "./context/AppContext";
import Stepper from "./Stepper";

const steps = ["Início", "Triagem", "Upload", "Resultados"];

export default function StepperGlobal() {
  const { currentStep } = useApp();
  return <Stepper steps={steps} currentStep={currentStep} />;
}
