const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://admin:123@localhost:5709/admin',
});

module.exports = pool;