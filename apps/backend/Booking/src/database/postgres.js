const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: "postgresql://postgres:dtHqABKszwCMLqBCakvYvLliVMyXGpWT@shuttle.proxy.rlwy.net:50296/railway",
});

pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch((err) => {
        console.error('❌ Failed to connect to PostgreSQL:', err.message);
        // Optional: Exit process if DB is essential
        process.exit(1);
    });

module.exports = pool;