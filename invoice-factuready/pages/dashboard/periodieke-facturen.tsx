import React, { useEffect, useState } from 'react';

const PeriodiekeFacturen = () => {
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    setFadeClass('fade-in');
  }, []);

  return (
    <div className={`flex-grow p-8 bg-gray-50 ${fadeClass}`}>
      <div className="bg-orange-100 text-center py-3 rounded mb-6">
        Nog 3 dagen gratis facturen sturen, <a href="#" className="text-blue-500 underline">waardeer nu op!</a>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Terugkomende facturen</h2>
      </div>
      {/* Periodieke facturen content */}
      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Kenmerk</th>
              <th className="py-3 px-4 text-left">Klant</th>
              <th className="py-3 px-4 text-left">Periode</th>
              <th className="py-3 px-4 text-left">Aantal verstuurd</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Aanmaakdatum</th>
              <th className="py-3 px-4 text-left">Volgende factuur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4">R001</td>
              <td className="py-3 px-4">Klant A</td>
              <td className="py-3 px-4">Maandelijks</td>
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">Actief</td>
              <td className="py-3 px-4">01-01-2024</td>
              <td className="py-3 px-4">01-02-2024</td>
            </tr>
            {/* Andere periodieke facturen */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeriodiekeFacturen;
