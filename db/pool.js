import { Pool } from 'pg';
import 'dotenv/config'; 
// Again, this should be read from an environment variable
const pool = new Pool({
  connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/managing_app`,
});
export default pool;
