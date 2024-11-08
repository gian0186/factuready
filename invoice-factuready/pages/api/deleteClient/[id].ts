import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma'; // Zorg ervoor dat dit pad naar `prisma.ts` correct is

export default async function deleteClient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Geen id opgegeven om de klant te verwijderen.' });
    }

    try {
      // Prisma delete query
      const deletedClient = await prisma.client.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(deletedClient);
    } catch (error) {
      console.error('Fout bij het verwijderen van de klant:', error);
      res.status(500).json({ error: 'Er is iets misgegaan bij het verwijderen van de klant.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Methode ${req.method} niet toegestaan`);
  }
}
