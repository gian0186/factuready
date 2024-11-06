// components/Sidebar.tsx
import React from 'react';

const Sidebar = ({ handleNavigation }: { handleNavigation: (path: string) => void }) => (
  <div className="bg-blue-900 text-white w-64 p-5 flex flex-col">
    <h1 className="text-2xl font-bold mb-8">FactuReady</h1>
    <nav className="flex-grow">
      <ul className="space-y-3">
        <li>
          <button className="bg-green-500 text-black py-2 px-4 rounded w-full text-left whitespace-nowrap">+ FactuReady</button>
        </li>
        <li
          className="cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
          onClick={() => handleNavigation('/dashboard')}
        >
          Overzicht
        </li>
        <li
          className="cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
          onClick={() => handleNavigation('/dashboard/klanten')}
        >
          Klanten
        </li>
        <li
          className="cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
          onClick={() => handleNavigation('/dashboard/producten')}
        >
          Producten
        </li>
        <li
          className="cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
          onClick={() => handleNavigation('/dashboard/periodieke-facturen')}
        >
          Periodieke facturen
        </li>
        <li
          className="cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
          onClick={() => handleNavigation('/dashboard/reminders')}
        >
          Reminders
        </li>
        <li
          className="cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
          onClick={() => handleNavigation('/dashboard/templates')}
        >
          Templates
        </li>
      </ul>
    </nav>
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-2">Credits: 1</h3>
      <button className="bg-yellow-500 text-black py-2 px-4 rounded w-full">Koop credits</button>
    </div>
    <div className="mt-auto">
      <p
        className="mb-2 cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
        onClick={() => handleNavigation('/dashboard/bedrijf')}
      >
        Jouw bedrijf
      </p>
      <p 
        className="mb-2 cursor-pointer hover:bg-blue-700 p-2 rounded whitespace-nowrap"
        onClick={() => handleNavigation('/dashboard/instellingen')}
      >
        Instellingen
      </p>
    </div>
  </div>
);

export default Sidebar;
