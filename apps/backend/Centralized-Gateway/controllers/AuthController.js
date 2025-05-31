import pool from '../database/db.js';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/token.js';

const AuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(401).json({ message: 'Invalid credentials' });

            const token = generateToken({ id: user.id, role: user.role, email: user.email });
            res.json({ token, id: user.id, role: user.role });

        } catch (err) {
            res.status(500).json({ message: 'Login error', error: err.message });
        }
    },

    verify: (req, res) => {
        const { token } = req.body;
        try {
            const decoded = verifyToken(token);
            res.json({ valid: true, payload: decoded });
        } catch (err) {
            res.status(401).json({ valid: false, message: 'Invalid or expired token' });
        }
    }
};

export default AuthController;