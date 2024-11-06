import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar';

const Bedrijf = () => {
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar handleNavigation={handleNavigation} />

      {/* Main Content */}
      <div className={`flex-grow p-8 bg-gray-50 ${fadeClass}`}>
        <div className="bg-orange-100 text-center py-3 rounded mb-6">
          Nog 3 dagen gratis facturen sturen, <a href="#" className="text-blue-500 underline">waardeer nu op!</a>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Bedrijf</h2>
        </div>
        {/* Bedrijf content */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Factuurgegevens (Naar je klanten)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Logo</label>
              <input type="file" className="mb-4" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-medium">Merkkleur 1</label>
                  <input type="color" className="w-full h-10" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Merkkleur 2</label>
                  <input type="color" className="w-full h-10" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Bedrijfsnaam *</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Adres *</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Postcode *</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Stad *</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">BTW-nummer *</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">KvK-nummer *</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">E-mailadres</label>
                <input type="email" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Telefoonnummer</label>
                <input type="tel" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Kleineondernemersregeling</span>
                </label>
              </div>
            </div>
          </div>
          <button className="bg-blue-500 text-white py-2 px-6 rounded mt-4">Opslaan</button>
        </div>
        {/* Jouw facturen content */}
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Jouw facturen</h3>
          <p>Hier vind je jouw aangeschafte credits</p>
          <div className="bg-gray-100 p-4 rounded mt-4">
            <p>Aantal: <strong>1</strong></p>
            <p>Gebruikt: <strong>0</strong></p>
            <p>Gekocht op: <strong>5 november 2024</strong></p>
            <p>Vervalt op: <strong>Vervalt niet</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bedrijf;
