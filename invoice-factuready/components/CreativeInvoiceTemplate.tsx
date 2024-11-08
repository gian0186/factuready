import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface CreativeInvoiceTemplateProps {
  client: { name: string; email: string; telefoon: string } | null;
  bedrijf: { name: string; address: string; phone: string; email: string };
  productInfo: { productName: string; quantity: number; price: number; vat: number }[];
}

const CreativeInvoiceTemplate: React.FC<CreativeInvoiceTemplateProps> = ({
  client,
  bedrijf,
  productInfo,
}) => {
  return (
    <div className="bg-yellow-100 text-gray-900 p-8 rounded-lg shadow-md">
      <header className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Factuur</h1>
          <p>Factuurnummer: 2024-0001</p>
          <p>Factuurdatum: 08-11-2024</p>
          <p>Vervaldatum: 22-11-2024</p>
        </div>
        <div className="text-right">
          <p>{client?.name}</p>
          <p>{client?.email}</p>
          <p>{client?.telefoon}</p>
        </div>
      </header>

      {/* Bedrijfsgegevens weergeven */}
      <section className="mb-6">
        <h3 className="font-bold mb-2">Bedrijfsgegevens:</h3>
        <p>Naam: {bedrijf.name}</p>
        <p>Adres: {bedrijf.address}</p>
        <p>Telefoon: {bedrijf.phone}</p>
        <p>Email: {bedrijf.email}</p>
      </section>

      {/* Productinformatie weergeven */}
      <section className="mb-6">
        <h3 className="font-bold mb-2">Producten:</h3>
        {productInfo.length > 0 ? (
          productInfo.map((product, index) => (
            <div key={index} className="mb-2">
              <p>Product: {product.productName}</p>
              <p>Aantal: {product.quantity}</p>
              <p>Prijs per stuk: € {product.price.toFixed(2)}</p>
              <p>BTW: {product.vat}%</p>
              <hr className="my-2" />
            </div>
          ))
        ) : (
          <p>Geen producten toegevoegd</p>
        )}
      </section>
    </div>
  );
};

// Functie om de PDF te genereren
export const generateCreativeInvoicePDF = (props: CreativeInvoiceTemplateProps) => {
  const { client, bedrijf, productInfo } = props;

  if (!client) {
    alert('Klantgegevens ontbreken. Probeer het later opnieuw.');
    return;
  }

  // Maak een nieuw jsPDF-object aan
  const doc = new jsPDF('p', 'mm', 'a4');

  // Creatieve Template stijl
  doc.setFillColor(255, 240, 200); // Lichtgele achtergrond
  doc.rect(0, 0, 210, 297, 'F'); // Vul de hele pagina
  doc.setTextColor(0, 0, 0); // Zwarte tekst
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('Factuur', 14, 20);

  // Klantinformatie en factuurdetails
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Factuurnummer: 2024-0001', 14, 30);
  doc.text('Factuurdatum: 08-11-2024', 14, 35);
  doc.text('Vervaldatum: 22-11-2024', 14, 40);

  // Bedrijfsgegevens (Van)
  doc.setFont('helvetica', 'bold');
  doc.text('Van', 14, 50);
  doc.setFont('helvetica', 'normal');
  if (bedrijf.name) doc.text(bedrijf.name, 14, 55);
  if (bedrijf.address) doc.text(bedrijf.address, 14, 60);
  if (bedrijf.phone) doc.text(bedrijf.phone, 14, 65);
  if (bedrijf.email) doc.text(bedrijf.email, 14, 70);

  // Klantgegevens (Aan)
  doc.setFont('helvetica', 'bold');
  doc.text('Aan', 140, 50);
  doc.setFont('helvetica', 'normal');
  if (client.name) doc.text(client.name, 140, 55);
  if (client.email) doc.text(client.email, 140, 60);
  if (client.telefoon) doc.text(client.telefoon, 140, 65);

  // Productinformatie tabel
  const productRows = productInfo.map((product) => [
    product.quantity.toString(),
    product.productName,
    `€ ${product.price.toFixed(2)}`,
    `€ ${(product.price * product.quantity * (1 + product.vat / 100)).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 90,
    head: [['Aantal', 'Omschrijving', 'Prijs per stuk', 'Bedrag']],
    body: productRows,
    theme: 'grid',
    styles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [230, 230, 230], // Lichtgrijze achtergrond voor header
      textColor: [0, 0, 0],
    },
  });

  // Button to download PDF
  doc.save('factuur.pdf');
};

export default CreativeInvoiceTemplate;
