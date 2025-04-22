const rateLimit = require('express-rate-limit');

// Limit: 5 requests per minute per IP for login
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
    message: {
        message: 'Too many login attempts. Please try again after a minute.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// General limiter for public API (optional)
const generalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        message: 'Too many requests. Please slow down.',
    },
});

module.exports = { loginLimiter, generalLimiter };