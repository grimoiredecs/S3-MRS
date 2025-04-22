const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/verifyToken');
const { forwardRequest } = require('./services/forwardServices');
const { generalLimiter } = require('./middlewares/rateLimiter');

// Global rate limit
app.use(generalLimiter);
app.use(express.json());

// Auth Routes (no token needed)
app.use('/auth', authRoutes);

// Gateway for internal services
app.use('/', verifyToken, forwardRequest);

const PORT = 3006;
app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`));