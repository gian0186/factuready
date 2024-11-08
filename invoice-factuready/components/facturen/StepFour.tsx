// StepFour.tsx

import React from 'react';
import CreativeInvoiceTemplate from '../CreativeInvoiceTemplate'; // Corrigeer de import

interface StepFourProps {
  prevStep: () => void;
  title: string;
  client: { name: string; email: string; telefoon: string } | null;
  products: { productName: string; quantity: number; price: number; vat: number; discount: number }[];
  invoiceType: string;
  periodicFrequency: string;
  selectedTemplate: string;
  bedrijfsgegevens: {
    bedrijfsnaam: string;
    adres: string;
    postcode: string;
    stad: string;
    btwNummer: string;
    kvkNummer: string;
    email: string;
    telefoon: string;
  } | null;
}

const StepFour: React.FC<StepFourProps> = ({
  prevStep,
  title,
  client,
  products,
  invoiceType,
  periodicFrequency,
  selectedTemplate,
  bedrijfsgegevens,
}) => {
  return (
    <div className="p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p>Controleer alle ingevoerde gegevens en klik op &quot;Verzenden&quot; om de factuur te versturen.</p>

      {/* Klantinformatie */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Klantinformatie:</h3>
        {client ? (
          <>
            <p>Naam: {client.name}</p>
            <p>Email: {client.email}</p>
            <p>Telefoon: {client.telefoon}</p>
          </>
        ) : (
          <p>Geen klantinformatie beschikbaar</p>
        )}
      </div>

      {/* Productinformatie */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Producten:</h3>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index}>
              <p>Product/Dienst: {product.productName}</p>
              <p>Aantal: {product.quantity}</p>
              <p>Prijs: € {product.price.toFixed(2)}</p>
              <p>BTW: {product.vat}%</p>
              <p>Korting: {product.discount}%</p>
              <hr className="my-2" />
            </div>
          ))
        ) : (
          <p>Geen producten toegevoegd</p>
        )}
      </div>

      {/* Factuurtype */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Factuurtype:</h3>
        <p>{invoiceType}</p>
        {invoiceType === 'periodic' && <p>Frequentie: {periodicFrequency}</p>}
      </div>

      {/* Template selectie */}
      {selectedTemplate === 'Creatief Template' && bedrijfsgegevens && (
        <CreativeInvoiceTemplate
          client={client}
          bedrijf={{
            name: bedrijfsgegevens.bedrijfsnaam,
            address: bedrijfsgegevens.adres,
            phone: bedrijfsgegevens.telefoon,
            email: bedrijfsgegevens.email,
          }}
          productInfo={products.map((product) => ({
            productName: product.productName,
            quantity: product.quantity,
            price: product.price,
            vat: product.vat,
          }))}
        />
      )}

      <div className="mt-4 flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded">
          Vorige
        </button>
      </div>
    </div>
  );
};

export default StepFour;
