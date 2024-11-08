import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const {
      id,
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
      if (!id) {
        return res.status(400).json({ error: 'Geen ID meegegeven voor update' });
      }

      const updatedBedrijf = await prisma.bedrijf.update({
        where: { id },
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

      res.status(200).json(updatedBedrijf);
    } catch (error) {
      console.error('Error bij het updaten van bedrijfsgegevens:', error); // Dit helpt om de fout te vinden
      res.status(500).json({ error: 'Er is een fout opgetreden bij het updaten van de gegevens.' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
