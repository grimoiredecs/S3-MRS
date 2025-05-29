// Database/connection/postgres.js



const connectionString =  "postgresql://postgres:jUHLvNUGrqfgfzTsLxljlUHcEqmJOzqS@gondola.proxy.rlwy.net:13672/railway";



// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool; // ✅ EXPORTS THE POOL OBJECT