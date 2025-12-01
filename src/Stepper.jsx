import React from "react";

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-t-lg">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Linha antes do círculo */}
            {index !== 0 && (
              <div
                className={`absolute top-1/2 left-0 w-full h-1 ${
                  isCompleted ? "bg-white" : "bg-white/30"
                } -z-10`}
              ></div>
            )}

            {/* Círculo */}
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isActive
                  ? "bg-white text-blue-600 border-white"
                  : isCompleted
                  ? "bg-white text-blue-600 border-white"
                  : "bg-transparent text-white border-white/50"
              }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <span className="text-xs mt-1">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
