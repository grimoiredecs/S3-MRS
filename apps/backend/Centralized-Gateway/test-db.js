const pool = require('./database/db');

async function printAllUsers() {
    try {
        const res = await pool.query('SELECT id, email, password_hash, role FROM users');
        console.log("📋 All Users:");
        res.rows.forEach((user, index) => {
            console.log(`[${index + 1}] ${user.id} | ${user.email} | ${user.role} | ${user.password_hash}`);
        });
        process.exit(0);
    } catch (err) {
        console.error("❌ Error fetching users:", err.message);
        process.exit(1);
    }
}

printAllUsers();