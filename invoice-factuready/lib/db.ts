import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Zorg ervoor dat je DATABASE_URL correct is ingesteld in .env bestand
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Gebruik SSL in productie als dat nodig is
});

export const query = (text: string, params?: (string | number)[]) => {
  return pool.query(text, params);
};

const db = {
  query,
};

export default db;
