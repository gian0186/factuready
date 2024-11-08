// pages/api/saveBedrijf.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      bedrijfsnaam,
      adres,
      postcode,
      stad,
      btwNummer,
      kvkNummer,
      email,
      telefoon,
      kleur1,
      kleur2,
      kleineondernemersregeling,
    } = req.body;

    try {
      const savedBedrijf = await prisma.bedrijf.create({
        data: {
          bedrijfsnaam,
          adres,
          postcode,
          stad,
          btwNummer,
          kvkNummer,
          email,
          telefoon,
          kleur1,
          kleur2,
          kleineondernemersregeling,
        },
      });

      res.status(200).json(savedBedrijf);
    } catch (error) {
      console.error('Error saving bedrijfsgegevens:', error);
      res.status(500).json({ error: 'Er is iets fout gegaan bij het opslaan van de gegevens.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
