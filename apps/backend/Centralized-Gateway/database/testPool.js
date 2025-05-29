// testPool.js
const pool = require('./db'); // ✅ match the path

async function testConnection() {
    try {
        const res = await pool.query(`SELECT * from users`); // safer than querying users table
        console.log('✅ Connected! Server time:', res.rows[0].now);
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    } finally {
        await pool.end(); // ✅ gracefully closes pool
    }
}

testConnection();