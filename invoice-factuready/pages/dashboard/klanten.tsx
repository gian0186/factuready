import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';

const Klanten = () => {
  const [fadeClass, setFadeClass] = useState('fade-in');
  const router = useRouter();

  useEffect(() => {
    setFadeClass('fade-in');
  }, []);

  const handleNavigation = (path: string) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      router.push(path);
      setFadeClass('fade-in');
    }, 500);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar handleNavigation={handleNavigation} />

      {/* Main Content */}
      <div className={`flex-grow p-8 bg-gray-50 ${fadeClass}`}>
        <div className="bg-orange-100 text-center py-3 rounded mb-6">
          Nog 3 dagen gratis facturen sturen, <a href="#" className="text-blue-500 underline">waardeer nu op!</a>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Jouw Klanten</h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">+ Nieuwe Klant</button>
        </div>
        {/* Klanten content */}
        <div className="grid grid-cols-1 gap-6">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">Naam</th>
                <th className="py-3 px-4 text-left">E-mailadres</th>
                <th className="py-3 px-4 text-left">Onbetaald</th>
                <th className="py-3 px-4 text-left">Omzet (12 maanden)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4">Klant A</td>
                <td className="py-3 px-4">klanta@example.com</td>
                <td className="py-3 px-4">&euro; 100,00</td>
                <td className="py-3 px-4">&euro; 1200,00</td>
              </tr>
              {/* Andere klanten */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Klanten;
