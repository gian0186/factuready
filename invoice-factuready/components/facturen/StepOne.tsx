import React, { useEffect, useState } from 'react';

interface StepOneProps {
  nextStep: () => void;
  title: string;
  addClient: (client: { name: string; email: string; telefoon: string; bedrijfsnaam?: string }) => void;
}

interface Client {
  id: number;
  name: string;
  email: string;
  telefoon: string;
  bedrijfsnaam?: string;
}

const StepOne: React.FC<StepOneProps> = ({ nextStep, title, addClient }) => {
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  // Functie om klanten op te halen op basis van de zoekterm
  useEffect(() => {
    if (searchTerm) {
      const fetchClients = async () => {
        try {
          const response = await fetch(`/api/getClients?searchTerm=${searchTerm}`);
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
    } else {
      setClients([]);
    }
  }, [searchTerm]);

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
          addClient(data.client);
          setClients([...clients, data.client]);
          setClientName('');
          setClientEmail('');
          setClientPhone('');
          setCompanyName('');
          setShowClientForm(false);
          setSelectedClient(data.client); // Selecteer automatisch de toegevoegde klant
        } else {
          console.error('Fout bij het toevoegen van klant');
        }
      } catch (error) {
        console.error('Er is een fout opgetreden', error);
      }
    } else {
      console.error('Alle klantgegevens moeten worden ingevuld.');
    }
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  const handleNextStep = () => {
    if (selectedClient) {
      addClient(selectedClient);
      nextStep();
    }
  };

  return (
    <div className="p-6 mb-6">
      {/* Titel en knop naast elkaar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={() => setShowClientForm(!showClientForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-4"
        >
          + Nieuwe Klant
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Zoek een klant op naam"
          className="w-full p-2 border rounded mb-4"
        />
        {searchTerm && (
          <div className="p-2 rounded mb-4">
            {clients.length > 0 ? (
              clients.map((client, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectClient(client)}
                  className={`cursor-pointer p-2 border-b last:border-b-0 ${
                    selectedClient?.id === client.id ? 'bg-blue-200' : ''
                  }`}
                >
                  {client.name}
                </div>
              ))
            ) : (
              <div className="text-gray-600">Geen klanten gevonden</div>
            )}
          </div>
        )}
      </div>

      {selectedClient && (
        <div className="mb-4">
          <h3 className="font-bold">Geselecteerde Klant:</h3>
          <p>{selectedClient.name}</p>
        </div>
      )}

      {showClientForm && (
        <div className="p-4 mb-4">
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Klantnaam"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Bedrijfsnaam"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Klant email"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="tel"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="Telefoonnummer"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleAddClient}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Voeg Klant Toe
          </button>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleNextStep}
          className={`${
            !selectedClient ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
          } text-white py-2 px-4 rounded`}
          disabled={!selectedClient}
        >
          Volgende
        </button>
      </div>
    </div>
  );
};

export default StepOne;
