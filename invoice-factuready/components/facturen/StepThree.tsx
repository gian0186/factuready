import React, { useState } from 'react';

interface StepThreeProps {
  nextStep: () => void;
  prevStep: () => void;
  title: string;
  addInvoiceType: (invoiceType: { type: string; frequency?: string }) => void;
}

const StepThree: React.FC<StepThreeProps> = ({ nextStep, prevStep, title, addInvoiceType }) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [periodicFrequency, setPeriodicFrequency] = useState<string>('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (type !== 'periodic') {
      setPeriodicFrequency(''); // Reset frequentie als het niet om een periodieke factuur gaat
    }
  };

  const handleNextStep = () => {
    if (selectedType === 'periodic' && !periodicFrequency) {
      return; // Als er een periodieke factuur is gekozen, moet er een frequentie worden geselecteerd
    }

    // Voeg het factuurtype toe
    addInvoiceType({
      type: selectedType,
      frequency: selectedType === 'periodic' ? periodicFrequency : undefined,
    });

    nextStep();
  };

  return (
    <div className="p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="mb-4">
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            className="form-radio"
            name="invoiceType"
            value="credit"
            checked={selectedType === 'credit'}
            onChange={() => handleTypeChange('credit')}
          />
          <span className="ml-2">Creditfactuur</span>
        </label>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            className="form-radio"
            name="invoiceType"
            value="periodic"
            checked={selectedType === 'periodic'}
            onChange={() => handleTypeChange('periodic')}
          />
          <span className="ml-2">Periodieke factuur</span>
        </label>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            className="form-radio"
            name="invoiceType"
            value="invoice"
            checked={selectedType === 'invoice'}
            onChange={() => handleTypeChange('invoice')}
          />
          <span className="ml-2">Factuur</span>
        </label>
      </div>

      {selectedType === 'periodic' && (
        <div className="ml-6 mb-4">
          <label className="block mb-2 font-bold">Frequentie:</label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio"
              name="frequency"
              value="monthly"
              checked={periodicFrequency === 'monthly'}
              onChange={() => setPeriodicFrequency('monthly')}
            />
            <span className="ml-2">Maandelijks</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio"
              name="frequency"
              value="quarterly"
              checked={periodicFrequency === 'quarterly'}
              onChange={() => setPeriodicFrequency('quarterly')}
            />
            <span className="ml-2">Per kwartaal</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="frequency"
              value="yearly"
              checked={periodicFrequency === 'yearly'}
              onChange={() => setPeriodicFrequency('yearly')}
            />
            <span className="ml-2">Per jaar</span>
          </label>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded">
          Vorige
        </button>
        <button
          onClick={handleNextStep}
          disabled={!selectedType || (selectedType === 'periodic' && !periodicFrequency)}
          className={`${
            !selectedType || (selectedType === 'periodic' && !periodicFrequency)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500'
          } text-white py-2 px-4 rounded`}
        >
          Volgende
        </button>
      </div>
    </div>
  );
};

export default StepThree;
