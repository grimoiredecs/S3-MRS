// utils/token.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';
const JWT_EXPIRY = '1h';

export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}