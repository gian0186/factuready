import React, { useEffect, useState } from 'react';

const Templates = () => {
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
        <h2 className="text-2xl font-bold">Templates</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">+ Nieuwe template</button>
      </div>

      {/* Template content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Kaart 1 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">FactuReady Original</h2>
          <p className="mb-4">
            Dit is de FactuReady Original template. Deze template gebruikt jouw merk kleuren, die je kan instellen in jouw bedrijf, ondersteunt de KOR, en je kunt notities toevoegen.
          </p>
          <div className="flex space-x-4">
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Preview template</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Template gebruiken</button>
          </div>
        </div>

        {/* Template Kaart 2 */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Remy Swirly</h2>
          <p className="mb-4">
            Dit is de nieuwste REMY template. Swirly gebruikt jouw merk kleuren, ondersteunt de KOR, en je kunt notities toevoegen.
          </p>
          <div className="flex space-x-4">
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Preview template</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Template gebruiken</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
