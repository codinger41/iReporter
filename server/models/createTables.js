import { Client } from 'pg';
import dotenv from 'dotenv';
import { recordTable, userTable } from './tables';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  database: 'ireporter',
});

const creeateTables = async () => {
  try {
    await client.connect();
    await client.query(userTable);
    await client.query(recordTable);
    await client.end();
    console.log('User and Record tables created successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

creeateTables();
