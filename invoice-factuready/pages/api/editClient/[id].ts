import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Zorg dat het pad naar je prisma instantie correct is

export default async function editClient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query; // Zorg ervoor dat het id correct wordt opgehaald
    const { name, email, telefoon, bedrijfsnaam } = req.body;

    // Controleer of alle noodzakelijke velden aanwezig zijn
    if (!name || !email || !telefoon || !id) {
      return res.status(400).json({ error: 'Vul alstublieft alle vereiste velden in (name, email, telefoon, id).' });
    }

    try {
      // Prisma update query
      const updatedClient = await prisma.client.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          telefoon,
          bedrijfsnaam, // Prisma moet dit veld nu herkennen na de migratie en genereren van de client
        },
      });

      if (!updatedClient) {
        return res.status(404).json({ error: 'Klant niet gevonden' });
      }

      // Verstuur het resultaat terug naar de client
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error('Fout bij het bewerken van de klant:', error);
      res.status(500).json({ error: 'Er is iets misgegaan bij het bewerken van de klant' });
    }
  } else {
    // Voor andere methoden dan PUT, stuur een foutmelding
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Methode ${req.method} niet toegestaan`);
  }
}
