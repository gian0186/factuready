// pages/api/getBedrijf.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const bedrijf = await prisma.bedrijf.findFirst();
      
      if (bedrijf) {
        res.status(200).json(bedrijf);
      } else {
        res.status(404).json({ error: 'Bedrijfsgegevens niet gevonden.' });
      }
    } catch (error) {
      console.error('Error retrieving bedrijfsgegevens:', error);
      res.status(500).json({ error: 'Er is iets fout gegaan bij het ophalen van de gegevens.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
