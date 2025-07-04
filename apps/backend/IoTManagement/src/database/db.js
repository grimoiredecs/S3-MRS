const { Pool } = require('pg');
require('dotenv').config(); // make sure this line is included

const pool = new Pool({
    connectionString:"postgresql://admin:123@localhost:5908/admin", // ✅ USE this

});

pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL (IoT)');
});

module.exports = pool;