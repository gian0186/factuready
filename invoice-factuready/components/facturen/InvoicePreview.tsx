import React, { useEffect, useState } from 'react';
import CreativeInvoiceTemplate, { generateCreativeInvoicePDF } from '../CreativeInvoiceTemplate';

interface InvoicePreviewProps {
  selectedTemplate: string;
  client: { name: string; email: string; telefoon: string } | null;
  productInfo: { productName: string; quantity: number; price: number; vat: number }[];
}

interface Bedrijf {
  name: string;
  address: string;
  phone: string;
  email: string;
  btwNummer: string;
  kvkNummer: string;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ selectedTemplate, client, productInfo }) => {
  const [bedrijf, setBedrijf] = useState<Bedrijf | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ophalen van de bedrijfsgegevens
    const fetchBedrijf = async () => {
      try {
        const response = await fetch('/api/getBedrijf');
        if (response.ok) {
          const data = await response.json();
          setBedrijf(data);
        } else {
          console.error('Error fetching bedrijf data');
        }
      } catch (error) {
        console.error('Fout bij ophalen van bedrijfsgegevens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBedrijf();
  }, []);

  const handleGeneratePDF = () => {
    if (!client || !bedrijf) {
      alert('Bedrijfsgegevens of klantgegevens ontbreken. Probeer het later opnieuw.');
      return;
    }

    generateCreativeInvoicePDF({
      client,
      bedrijf: {
        name: bedrijf.name,
        address: bedrijf.address,
        phone: bedrijf.phone,
        email: bedrijf.email,
      },
      productInfo: productInfo,
    });
  };

  if (isLoading) {
    return <p>Bezig met laden...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        {selectedTemplate === 'Creatief Template' && bedrijf && (
          <CreativeInvoiceTemplate
            client={client}
            bedrijf={{
              name: bedrijf.name,
              address: bedrijf.address,
              phone: bedrijf.phone,
              email: bedrijf.email,
            }}
            productInfo={productInfo}
          />
        )}
      </div>
      <button onClick={handleGeneratePDF} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
        Download als PDF
      </button>
    </div>
  );
};

export default InvoicePreview;
