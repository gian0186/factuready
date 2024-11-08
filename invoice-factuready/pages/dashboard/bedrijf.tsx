// pages/dashboard/bedrijf.tsx
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export interface Bedrijfsgegevens {
  id?: number; // Voeg ID toe om te kunnen updaten
  logo: File | null;
  kleur1: string;
  kleur2: string;
  bedrijfsnaam: string;
  adres: string;
  postcode: string;
  stad: string;
  btwNummer: string;
  kvkNummer: string;
  email: string;
  telefoon: string;
  kleineondernemersregeling: boolean;
}

const Bedrijf: React.FC<{ onSave?: (data: Bedrijfsgegevens) => void }> = ({ onSave = () => {} }) => {
  const [bedrijfsgegevens, setBedrijfsgegevens] = useState<Bedrijfsgegevens>({
    logo: null,
    kleur1: '#000000',
    kleur2: '#000000',
    bedrijfsnaam: '',
    adres: '',
    postcode: '',
    stad: '',
    btwNummer: '',
    kvkNummer: '',
    email: '',
    telefoon: '',
    kleineondernemersregeling: false,
  });

  // Ophalen van bestaande gegevens bij laden component
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBedrijfsgegevens({
      ...bedrijfsgegevens,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    if (onSave) {
      onSave(bedrijfsgegevens);
    }

    // Check of het om een update gaat of een nieuwe record
    try {
      let response;
      if (bedrijfsgegevens.id) {
        // Update bestaande bedrijfsgegevens
        response = await fetch('/api/updateBedrijf', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bedrijfsgegevens),
        });
      } else {
        // Maak nieuwe bedrijfsgegevens aan
        response = await fetch('/api/saveBedrijf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bedrijfsgegevens),
        });
      }

      if (!response.ok) {
        throw new Error('Er is een fout opgetreden bij het opslaan van bedrijfsgegevens.');
      }

      const data = await response.json();
      console.log('Bedrijfsgegevens opgeslagen:', data);
      setBedrijfsgegevens(data); // Update de gegevens met de response data
    } catch (error) {
      console.error('Error bij het opslaan van bedrijfsgegevens:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className={`flex-grow p-8 bg-gray-50 fade-in`}>
        {/* Bedrijf content */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Factuurgegevens (Naar je klanten)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Logo</label>
              <input
                type="file"
                name="logo"
                onChange={(e) =>
                  setBedrijfsgegevens({
                    ...bedrijfsgegevens,
                    logo: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-medium">Merkkleur 1</label>
                  <input
                    type="color"
                    name="kleur1"
                    value={bedrijfsgegevens.kleur1}
                    onChange={handleInputChange}
                    className="w-full h-10"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Merkkleur 2</label>
                  <input
                    type="color"
                    name="kleur2"
                    value={bedrijfsgegevens.kleur2}
                    onChange={handleInputChange}
                    className="w-full h-10"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Bedrijfsnaam *</label>
                <input
                  type="text"
                  name="bedrijfsnaam"
                  value={bedrijfsgegevens.bedrijfsnaam}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Adres *</label>
                <input
                  type="text"
                  name="adres"
                  value={bedrijfsgegevens.adres}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Postcode *</label>
                <input
                  type="text"
                  name="postcode"
                  value={bedrijfsgegevens.postcode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Stad *</label>
                <input
                  type="text"
                  name="stad"
                  value={bedrijfsgegevens.stad}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">BTW-nummer *</label>
                <input
                  type="text"
                  name="btwNummer"
                  value={bedrijfsgegevens.btwNummer}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">KvK-nummer *</label>
                <input
                  type="text"
                  name="kvkNummer"
                  value={bedrijfsgegevens.kvkNummer}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">E-mailadres</label>
                <input
                  type="email"
                  name="email"
                  value={bedrijfsgegevens.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Telefoonnummer</label>
                <input
                  type="tel"
                  name="telefoon"
                  value={bedrijfsgegevens.telefoon}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="kleineondernemersregeling"
                    checked={bedrijfsgegevens.kleineondernemersregeling}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Kleineondernemersregeling</span>
                </label>
              </div>
            </div>
          </div>
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-6 rounded mt-4">
            Opslaan
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bedrijf;
