// components/Sidebar.tsx
import React from 'react';
import { FaHome, FaUsers, FaClipboardList, FaSyncAlt, FaBell, FaFileAlt, FaPlusCircle, FaBuilding, FaCog } from 'react-icons/fa';

const Sidebar = ({ handleNavigation }: { handleNavigation: (path: string) => void }) => (
  <div className="bg-blue-900 text-white w-64 p-5 flex flex-col min-h-screen shadow-lg">
    <h1 className="text-2xl font-bold mb-8 flex items-center">
      FactuReady
    </h1>

    <nav className="flex-grow">
      <ul className="space-y-3">
        <li
          className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
          onClick={() => handleNavigation('/dashboard')}
        >
          <FaHome size={20} aria-label="Overzicht" />
          <span className="ml-2">Overzicht</span>
        </li>
        <li
          className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
          onClick={() => handleNavigation('/dashboard/klanten')}
        >
          <FaUsers size={20} aria-label="Klanten" />
          <span className="ml-2">Klanten</span>
        </li>
        <li
          className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
          onClick={() => handleNavigation('/dashboard/producten')}
        >
          <FaClipboardList size={20} aria-label="Producten" />
          <span className="ml-2">Producten</span>
        </li>
        <li
          className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
          onClick={() => handleNavigation('/dashboard/periodieke-facturen')}
        >
          <FaSyncAlt size={20} aria-label="Periodieke facturen" />
          <span className="ml-2">Periodieke facturen</span>
        </li>
        <li
          className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
          onClick={() => handleNavigation('/dashboard/reminders')}
        >
          <FaBell size={20} aria-label="Reminders" />
          <span className="ml-2">Reminders</span>
        </li>
        <li
          className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
          onClick={() => handleNavigation('/dashboard/templates')}
        >
          <FaFileAlt size={20} aria-label="Templates" />
          <span className="ml-2">Templates</span>
        </li>
        <li className="mt-4">
          <button
            className="bg-green-500 text-white py-3 px-4 rounded w-full text-center whitespace-nowrap hover:bg-green-600 transition duration-300 font-bold flex items-center justify-center shadow-md hover:shadow-lg"
            onClick={() => handleNavigation('/dashboard/facturen/nieuw')}
          >
            <FaPlusCircle size={20} aria-label="Factuur maken" />
            <span className="ml-2">Factuur maken</span>
          </button>
        </li>
      </ul>
    </nav>

    <div className="mb-6 mt-8 border-t border-white opacity-100 pt-4">
      <h3 className="font-bold text-lg mb-2">Credits: <span className="text-yellow-300">1</span></h3>
      <button className="bg-yellow-500 text-white py-2 px-4 rounded w-full hover:bg-yellow-600 transition duration-300 font-bold shadow-md hover:shadow-lg">
        Koop credits
      </button>
    </div>

    <div className="mt-auto border-t border-white opacity-100 pt-4">
      <p
        className="mb-2 cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
        onClick={() => handleNavigation('/dashboard/bedrijf')}
      >
        <FaBuilding size={20} aria-label="Jouw bedrijf" />
        <span className="ml-2">Jouw bedrijf</span>
      </p>
      <p
        className="cursor-pointer flex items-center hover:bg-blue-700 p-3 rounded transition duration-300"
        onClick={() => handleNavigation('/dashboard/instellingen')}
      >
        <FaCog size={20} aria-label="Instellingen" />
        <span className="ml-2">Instellingen</span>
      </p>
    </div>
  </div>
);

export default Sidebar;
