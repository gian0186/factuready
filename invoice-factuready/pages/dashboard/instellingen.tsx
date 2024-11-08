// pages/dashboard/instellingen.tsx
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const Instellingen: React.FC = () => {
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    setFadeClass('fade-in');
  }, []);

  return (
    <DashboardLayout>
      <div className={`flex-grow p-8 bg-gray-50 ${fadeClass}`}>
        <div className="bg-orange-100 text-center py-3 rounded mb-6">
          Nog 3 dagen gratis facturen sturen, <a href="#" className="text-blue-500 underline">waardeer nu op!</a>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Instellingen</h2>
        </div>

        {/* Instellingen Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mollie Profiel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Selecteer een Mollie profiel</h3>
            <p className="text-gray-600 mb-4">
              Verstuur betaalverzoeken met Mollie! Hiermee kunnen jouw klanten jouw facturen met Ideal en Creditcard snel betalen.
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Connect via Mollie</button>
          </div>

          {/* BCC E-mailadressen */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Stel BCC e-mailadressen in</h3>
            <p className="text-gray-600 mb-4">
              Stuur je facturen standaard door naar je boekhouder of eigen mail voor de administratie.
            </p>
            <input type="text" className="w-full p-2 border rounded mb-4" placeholder="info@factuready.nl,boekhouder@boekhouding.nl etc..." />
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Opslaan</button>
          </div>

          {/* Standaard Mail */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Standaard mail</h3>
            <p className="text-gray-600 mb-4">
              Pas hier de standaard mail aan naar eigen wens, de codes met %_% worden automatisch ingevuld bij het versturen van de facturen.
            </p>
            <textarea className="w-full p-2 border rounded mb-4" rows={6}>
Beste %klant_naam%,

In de bijlage kan je de factuur %factuur_nummer% vinden voor onze dienstverlening. Gelieve deze factuur te betalen voor %factuur_verloop_datum%.

Groetjes,
%bedrijf_naam%
            </textarea>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Opslaan</button>
          </div>

          {/* Herinneringsinstellingen */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Herinneringsinstellingen</h3>
            <p className="text-gray-600 mb-4">
              Stuur herinnering naar klanten voor of na de vervaldatum van de factuur
            </p>
            <div className="flex items-center mb-4">
              <select className="p-2 border rounded mr-2">
                <option>Voor</option>
                <option>Na</option>
              </select>
              <input type="number" className="w-16 p-2 border rounded mr-2" defaultValue={1} />
              <span>dagen</span>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Aanmaken</button>
          </div>

          {/* Automatisch Credits Opwaarderen */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Automatisch credits opwaarderen</h3>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-gray-700">Automatisch opwaarderen inschakelen</span>
            </label>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Instellingen;
