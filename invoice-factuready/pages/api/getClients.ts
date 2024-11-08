import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

export default async function getClients(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const searchTerm = req.query.searchTerm as string;

    try {
      let queryText = 'SELECT * FROM "Client"';
      const values: string[] = [];

      if (searchTerm) {
        queryText += ' WHERE LOWER(name) LIKE $1';
        values.push(`%${searchTerm.toLowerCase()}%`);
      }

      const result = await db.query(queryText, values);
      res.status(200).json({ clients: result.rows });
    } catch (error) {
      console.error('Fout bij het ophalen van klanten:', error);
      res.status(500).json({ error: 'Er is iets misgegaan bij het ophalen van klanten' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Methode ${req.method} niet toegestaan`);
  }
}
