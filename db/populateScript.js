// ? why do I need to run this file first?

import  {Client} from 'pg';
require('dotenv').config();

// raw SQL
const SQL = ``;
async function main() {
  console.log('seeding...');
  // connection process
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/top_users`,
  });

  await client.connect();

  // query code
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
