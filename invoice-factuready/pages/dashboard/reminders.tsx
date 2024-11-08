import React, { useEffect, useState } from 'react';

const Reminders = () => {
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
        <h2 className="text-2xl font-bold">Verstuurde reminders</h2>
      </div>
      {/* Verstuurde reminders content */}
      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Factuur nr.</th>
              <th className="py-3 px-4 text-left">Klant</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Verstuurd op</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4">F001</td>
              <td className="py-3 px-4">Klant B</td>
              <td className="py-3 px-4">Verzonden</td>
              <td className="py-3 px-4">02-01-2024</td>
            </tr>
            {/* Andere reminders */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminders;
