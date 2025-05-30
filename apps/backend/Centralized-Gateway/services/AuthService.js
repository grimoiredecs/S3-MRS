import bcrypt from 'bcryptjs';
import pool from '../database/db';
import { generateToken } from '../utils/token.js';

const AuthService = {
    login: async (email, password) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        const user = result.rows[0];

        if (!user) throw new Error('User not found');

        const storedPassword = user.password;

        // Check if password is hashed (starts with $2a or $2b)
        const isHashed = storedPassword.startsWith('$2');

        let valid = false;
        if (isHashed) {
            valid = await bcrypt.compare(password, storedPassword);
        } else {
            valid = password === storedPassword;
        }

        if (!valid) throw new Error('Invalid credentials');

        const token = generateToken(user);
        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            token
        };
    }
};

export default AuthService;