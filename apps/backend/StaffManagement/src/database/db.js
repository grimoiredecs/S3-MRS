const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://admin:123@localhost:5785/admin',
});

module.exports = pool;