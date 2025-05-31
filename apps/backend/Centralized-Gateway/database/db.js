// Database/connection/postgres.js



const connectionString =  "postgresql://postgres:jUHLvNUGrqfgfzTsLxljlUHcEqmJOzqS@gondola.proxy.rlwy.net:13672/railway";



// db.js
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const pool = new Client({
    connectionString: connectionString,
});

await pool.connect();
export default pool;