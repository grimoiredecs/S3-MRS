// Database/connection/postgres.js (ES Module version)

import 'dotenv/config'; // Modern way to load .env in ES Modules

import pg from 'pg'; // Import the entire 'pg' module

console.log("Begin connectio")
const connectionString = "postgresql://postgres:dtHqABKszwCMLqBCakvYvLliVMyXGpWT@shuttle.proxy.rlwy.net:50296/railway"
// Use process.env.POSTGRES directly, as dotenv/config loads it
const pool = new pg.Client({ // Correctly access Client from the imported pg object
    connectionString

});

// Test Postgres connection - this should still run
pool.connect()
    .then(() => console.log('PostgreSQL client connected successfully!'))
    .catch(err => console.error('PostgreSQL client connection error:', err.stack));


// Export the pool instance as the default export
export default pool;