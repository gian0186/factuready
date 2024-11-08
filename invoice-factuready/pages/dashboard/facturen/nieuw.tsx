// pages/dashboard/facturen/nieuw.tsx

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import StepOne from '../../../components/facturen/StepOne';
import StepTwo from '../../../components/facturen/StepTwo';
import StepThree from '../../../components/facturen/StepThree';
import StepFour from '../../../components/facturen/StepFour';
import ProgressBar from '../../../components/facturen/ProgressBar';
import InvoicePreview from '../../../components/facturen/InvoicePreview';
import { Bedrijfsgegevens } from '../bedrijf';

const FactuurAanmaken: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [client, setClient] = useState<{ name: string; email: string; telefoon: string } | null>(null);
  const [products, setProducts] = useState<{ productName: string; quantity: number; price: number; vat: number; discount: number }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Standaard Template');
  const [invoiceType, setInvoiceType] = useState<{ type: string; frequency?: string } | null>(null);
  const [bedrijfsgegevens, setBedrijfsgegevens] = useState<Bedrijfsgegevens | null>(null);

  const stepNames: string[] = [
    'Klantinformatie',
    'Productinformatie',
    'Factuurtype',
    'Controleren',
  ];

  useEffect(() => {
    const fetchBedrijfsgegevens = async () => {
      try {
        const response = await fetch('/api/getBedrijf');
        if (response.ok) {
          const data = await response.json();
          setBedrijfsgegevens(data);
        } else {
          console.error('Error fetching bedrijfsgegevens:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching bedrijfsgegevens:', error);
      }
    };

    fetchBedrijfsgegevens();
  }, []);

  const nextStep = (): void => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const prevStep = (): void => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const addClient = (newClient: { name: string; email: string; telefoon: string }): void => {
    setClient(newClient);
  };

  const addInvoiceType = (type: { type: string; frequency?: string }) => {
    setInvoiceType(type);
  };

  return (
    <DashboardLayout>
      <div className="flex-grow p-8 bg-gray-50">
        <div className="w-full mx-auto">
          <div className="bg-orange-100 text-center py-3 rounded mb-6 w-full">
            Nog 3 dagen gratis facturen sturen,{' '}
            <a href="#" className="text-blue-500 underline">
              waardeer nu op!
            </a>
          </div>

          <ProgressBar
            currentStep={currentStep}
            totalSteps={4}
            stepNames={stepNames}
            onStepClick={setCurrentStep}
          />

          <div className="mt-6 flex flex-col lg:flex-row gap-6 items-start w-full">
            <div className="w-full lg:w-2/5 p-6 bg-white rounded-lg shadow-md">
              {currentStep === 1 && (
                <StepOne
                  nextStep={nextStep}
                  title="Klantinformatie"
                  addClient={addClient}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  title="Productinformatie"
                  products={products}
                  setProducts={setProducts}
                  clientName={client?.name || ''}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  nextStep={nextStep}
                  prevStep={prevStep}
                  title="Factuurtype"
                  addInvoiceType={addInvoiceType}
                />
              )}
              {currentStep === 4 && (
                <StepFour
                  prevStep={prevStep}
                  title="Controleren"
                  client={client}
                  products={products}
                  invoiceType={invoiceType?.type || ''}
                  periodicFrequency={invoiceType?.frequency || ''}
                  selectedTemplate={selectedTemplate}
                  bedrijfsgegevens={bedrijfsgegevens}
                />
              )}
            </div>

            {currentStep === 4 && (
              <div className="w-full lg:w-3/5 p-6 bg-white rounded-lg shadow-md">
                <InvoicePreview
                  selectedTemplate={selectedTemplate}
                  client={client}
                  productInfo={products.map((product) => ({
                    productName: product.productName,
                    quantity: product.quantity,
                    price: product.price,
                    vat: product.vat,
                  }))}
                />
              </div>
            )}
          </div>

          {currentStep === 4 && (
            <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Kies Template</h2>
              <select
                className="w-full p-2 border rounded mb-4"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option value="Standaard Template">Standaard Template</option>
                <option value="Creatief Template">Creatief Template</option>
                <option value="Zakelijk Template">Zakelijk Template</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FactuurAanmaken;
