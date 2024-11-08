import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface Client {
  id: number;
  name: string;
  email: string;
  telefoon: string;
  bedrijfsnaam?: string;
}

const Klanten = () => {
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [showClientForm, setShowClientForm] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientName, setClientName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  useEffect(() => {
    setFadeClass('fade-in');
    // Haal de klanten op uit de database
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/getClients');
        if (response.ok) {
          const data = await response.json();
          setClients(data.clients);
        } else {
          console.error('Fout bij het ophalen van klanten');
        }
      } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van klanten:', error);
      }
    };
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    if (clientName && clientEmail && clientPhone) {
      try {
        const response = await fetch('/api/addClient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            telefoon: clientPhone,
            bedrijfsnaam: companyName,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setClients([...clients, data.client]);
          setClientName('');
          setCompanyName('');
          setClientEmail('');
          setClientPhone('');
          setShowClientForm(false);
        } else {
          console.error('Fout bij het toevoegen van klant');
        }
      } catch (error) {
        console.error('Er is een fout opgetreden', error);
      }
    }
  };

  const handleDeleteClient = async (client: Client) => {
    try {
      const response = await fetch(`/api/deleteClient/${client.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClients(clients.filter((c) => c.id !== client.id));
        setClientToDelete(null);
      } else {
        console.error('Fout bij het verwijderen van klant');
      }
    } catch (error) {
      console.error('Er is een fout opgetreden bij het verwijderen van de klant:', error);
    }
  };

  const handleEditClient = async () => {
    if (clientToEdit) {
      try {
        const response = await fetch(`/api/editClient/${clientToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            telefoon: clientPhone,
            bedrijfsnaam: companyName,
          }),
        });

        if (response.ok) {
          const updatedClient = await response.json();
          setClients(clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));
          setClientToEdit(null);
          setClientName('');
          setCompanyName('');
          setClientEmail('');
          setClientPhone('');
          setShowClientForm(false);
        } else {
          console.error('Fout bij het bewerken van klant');
        }
      } catch (error) {
        console.error('Er is een fout opgetreden', error);
      }
    }
  };

  const handleEditButtonClick = (client: Client) => {
    setClientToEdit(client);
    setClientName(client.name);
    setCompanyName(client.bedrijfsnaam || '');
    setClientEmail(client.email);
    setClientPhone(client.telefoon);
    setShowClientForm(true);
  };

  return (
    <div className={`flex-grow p-8 bg-gray-50 ${fadeClass}`}>
      <div className="bg-orange-100 text-center py-3 rounded mb-6">
        Nog 3 dagen gratis facturen sturen, <a href="#" className="text-blue-500 underline">waardeer nu op!</a>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Jouw Klanten</h2>
        <button
          onClick={() => setShowClientForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          + Nieuwe Klant
        </button>
      </div>

      {/* Formulier voor nieuwe klant */}
      {(showClientForm || clientToEdit) && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {clientToEdit ? 'Klant Bewerken' : 'Nieuwe Klant Toevoegen'}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Naam</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Bedrijfsnaam</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">E-mailadres</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Telefoonnummer</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowClientForm(false);
                  setClientToEdit(null);
                }}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Annuleren
              </button>
              <button
                onClick={clientToEdit ? handleEditClient : handleAddClient}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                {clientToEdit ? 'Klant Bewerken' : 'Voeg Klant Toe'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verwijderen bevestiging */}
      {clientToDelete && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              Weet je zeker dat je klant &quot;{clientToDelete.name}&quot; wilt verwijderen?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setClientToDelete(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Nee
              </button>
              <button
                onClick={() => handleDeleteClient(clientToDelete)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Ja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Klanten content */}
      <div className="grid grid-cols-1 gap-6">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Naam</th>
              <th className="py-3 px-4 text-left">E-mailadres</th>
              <th className="py-3 px-4 text-left">Telefoonnummer</th>
              <th className="py-3 px-4 text-left">Bedrijfsnaam</th>
              <th className="py-3 px-4 text-left">Acties</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id}>
                  <td className="py-3 px-4">{client.name}</td>
                  <td className="py-3 px-4">{client.email}</td>
                  <td className="py-3 px-4">{client.telefoon}</td>
                  <td className="py-3 px-4">{client.bedrijfsnaam || '-'}</td>
                  <td className="py-3 px-4 flex items-center">
                    <button
                      onClick={() => handleEditButtonClick(client)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => setClientToDelete(client)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-4 text-center" colSpan={5}>
                  Geen klanten gevonden
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Klanten;
