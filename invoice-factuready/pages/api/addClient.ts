import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function editClient(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, email, telefoon, bedrijfsnaam } = req.body;

    // Controleer of alle noodzakelijke velden aanwezig zijn
    if (!name || !email || !telefoon || !id) {
      return res.status(400).json({ error: 'Vul alstublieft alle vereiste velden in (name, email, telefoon, id).' });
    }

    try {
      // SQL-update query
      const queryText = `
        UPDATE "Client"
        SET name = $1, email = $2, telefoon = $3, bedrijfsnaam = $4
        WHERE id = $5
        RETURNING *
      `;
      const values = [name, email, telefoon, bedrijfsnaam, id];

      // Voer de query uit
      const result = await db.query(queryText, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Klant niet gevonden' });
      }

      // Verstuur het resultaat terug naar de client
      res.status(200).json(result.rows[0]);
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
