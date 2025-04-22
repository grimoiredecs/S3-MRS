const pool = require('../database/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken({ userId: user.id, role: user.role });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};