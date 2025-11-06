
import React from 'react';
import { SECTIONS } from '../constants';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps -1)) * 100;

  const getStepLabel = (step: number) => {
    if (step <= SECTIONS.length) {
        return `Bölüm ${step}`;
    }
    if (step === SECTIONS.length + 1) {
        return 'Özet';
    }
    return 'Rapor';
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-green-700">{getStepLabel(currentStep)}</span>
        <span className="text-sm font-medium text-green-700">{`${Math.round(progressPercentage)}%`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out' }}></div>
      </div>
    </div>
  );
};
