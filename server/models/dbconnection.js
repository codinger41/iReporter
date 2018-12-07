import { Pool } from 'pg';
import { userTable, recordTable } from './tables';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// eslint-disable-next-line no-unused-vars
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.connect()
  .then(client => client.query(userTable)
    .then((res) => {
      client.release();
      console.log(res.rows[0]);
    })
    .catch((err) => {
      client.release();
      console.log(err);
    }));
