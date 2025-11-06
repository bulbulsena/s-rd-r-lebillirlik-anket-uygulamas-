import React from 'react';

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLoading?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ currentStep, totalSteps, onNext, onPrev, isLoading }) => {
  const buttonBaseClasses = "px-6 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const primaryButtonClasses = "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500";
  const secondaryButtonClasses = "text-green-700 bg-white border border-green-600 hover:bg-green-50 focus:ring-green-500";
  const disabledButtonClasses = "opacity-50 cursor-not-allowed";

  const isSummaryStep = currentStep === totalSteps - 1;
  const nextButtonText = isSummaryStep ? 'Rapor Oluştur' : 'Sonraki';

  return (
    <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
      <button
        onClick={onPrev}
        disabled={currentStep === 1 || isLoading}
        className={`${buttonBaseClasses} ${secondaryButtonClasses} ${(currentStep === 1 || isLoading) ? disabledButtonClasses : ''}`}
      >
        Önceki
      </button>

      <div className="text-sm text-gray-500">
        Adım {currentStep} / {totalSteps - 1}
      </div>

      <button
        onClick={onNext}
        disabled={isLoading}
        className={`${buttonBaseClasses} ${primaryButtonClasses} ${isLoading ? disabledButtonClasses : ''}`}
      >
        {isLoading ? 'Oluşturuluyor...' : nextButtonText}
      </button>
    </div>
  );
};