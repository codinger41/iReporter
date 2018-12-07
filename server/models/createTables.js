import { Client } from 'pg';
import { recordTable, userTable } from './tables';


const client = new Client({
  connectionString: 'postgres://kgwczdbs:fYHZhGvcrB-b-NXZiehQx5-u93DFFBwH@pellefant.db.elephantsql.com:5432/kgwczdbs',
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
