// components/Header.tsx
import React, { useState } from 'react';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center space-x-6 ml-auto">
        {/* Notificatieknop */}
        <button className="relative">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600"></span>
        </button>

        {/* Gebruikersmenu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="font-medium text-gray-700">Gian Boender</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-700" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Gebruikersaccount
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Vertel een vriend
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Thema
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Uitloggen
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
