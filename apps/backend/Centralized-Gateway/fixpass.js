// fix-passwords.js
const pool = require('./database/db');
const bcrypt = require('bcrypt');

const DEFAULT_PASSWORD = '123456';

function isBcryptHash(str) {
    return typeof str === 'string' && str.startsWith('$2b$') && str.length === 60;
}

async function fixPasswords() {
    try {
        const result = await pool.query('SELECT id, email, password_hash FROM users');
        const users = result.rows;

        let updated = 0;

        for (const user of users) {
            if (!isBcryptHash(user.password_hash)) {
                console.log(`🔧 Fixing password for: ${user.email}`);
                const newHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

                await pool.query(
                    'UPDATE users SET password_hash = $1 WHERE id = $2',
                    [newHash, user.id]
                );

                updated++;
            }
        }

        console.log(`✅ Password fix completed. ${updated} user(s) updated.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error during password fix:", err.message);
        process.exit(1);
    }
}

fixPasswords();