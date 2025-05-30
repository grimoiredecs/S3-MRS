// routes/auth.js
import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// POST /auth/login
// Logs in a user (admin, student, or staff) and returns a JWT
router.post('/login', AuthController.login);

export default router;