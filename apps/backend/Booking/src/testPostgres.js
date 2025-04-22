const pool = require('./database/postgres');

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('🕒 Current time from PostgreSQL:', res.rows[0]);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error querying PostgreSQL:', err);
        process.exit(1);
    }
};

testConnection();