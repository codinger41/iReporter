import { Client } from 'pg';
import dotenv from 'dotenv';
import { recordTable, userTable } from './tables';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const creeateTables = async () => {
  await client.connect();
  await client.query(userTable);
  await client.query(recordTable);
  await client.end();
  console.log('User and Record tables created successfully');
  process.exit(0);
};

creeateTables();
