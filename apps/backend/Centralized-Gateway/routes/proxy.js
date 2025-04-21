const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = express.Router();

router.use('/students', createProxyMiddleware({
    target: process.env.STUDENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/students': '' },
}));

router.use('/rooms', createProxyMiddleware({
    target: process.env.ROOM_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/rooms': '' },
}));

router.use('/bookings', createProxyMiddleware({
    target: process.env.BOOKING_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/bookings': '' },
}));

// Add more as needed...

module.exports = router;