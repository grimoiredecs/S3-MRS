const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/verifyToken');
const { forwardRequest } = require('./services/forwardServices');
const { generalLimiter } = require('./middlewares/rateLimiter');
const cors = require('cors');
app.use(cors());

// Middleware: Log full URL of each request
app.use((req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log(`[${req.method}] ${fullUrl}`);
    next();
});

// Global rate limit
app.use(generalLimiter);
app.use(express.json());

// Auth Routes (no token needed)
app.use('/auth', authRoutes);

// Gateway for internal services
app.use('/', verifyToken, forwardRequest);

const PORT = 3006;
app.listen(PORT, () => console.log(`🚀 Gateway listening on http://localhost:${PORT}`));