// components/facturen/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
  onStepClick?: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepNames, onStepClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {stepNames.map((name, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        return (
          <div key={step} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
            <div
              onClick={() => onStepClick && onStepClick(step)}
              className={`cursor-pointer px-4 py-2 rounded shadow-md transition-all duration-300 transform ${
                isActive ? 'bg-blue-500 text-white scale-105' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
              }`}
            >
              {name} ({step} van {totalSteps})
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
