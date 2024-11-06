import React from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
    
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path); // Wacht tot de fade-out animatie klaar is
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar handleNavigation={handleNavigation} />

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-50">
        <div className="bg-orange-100 text-center py-3 rounded mb-6">
          Nog 3 dagen gratis facturen sturen, <a href="#" className="text-blue-500 underline">waardeer nu op!</a>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Overzicht</h2>
          <div className="flex items-center">
            <button className="bg-white shadow p-2 mx-2 rounded-full">&#8249;</button>
            <select className="p-2 border rounded">
              <option>Kwartaal</option>
              {/* Add other options if needed */}
            </select>
            <button className="bg-white shadow p-2 mx-2 rounded-full">&#8250;</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-md p-5 rounded-lg text-center">
            <p className="text-xl font-bold">&euro; 0,00</p>
            <p className="text-gray-600">Omzet (2024 - Q4)</p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-lg text-center">
            <p className="text-xl font-bold">&euro; 0,00</p>
            <p className="text-gray-600">BTW (2024 - Q4)</p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-lg text-center">
            <p className="text-xl font-bold">0 &euro; 0,00</p>
            <p className="text-gray-600">Betaalde Facturen (2024 - Q4)</p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-lg text-center">
            <p className="text-xl font-bold">0 &euro; 0,00</p>
            <p className="text-gray-600">Onbetaalde Facturen</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md">
          <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-full mb-4" />
          <p className="text-lg mb-4">Stuur nu je eerste factuur om al je gegevens te zien!</p>
          <button className="bg-yellow-500 text-black py-3 px-6 rounded">+ FactuReady</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
