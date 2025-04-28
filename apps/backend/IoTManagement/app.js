const express = require('express');
const app = express();
const deviceRoutes = require('./src/presentation/routes/deviceRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ✅ Health check
app.get('/', (req, res) => {
    res.send('🚀 IoTManagement API is running!');
});

// ✅ Routes
app.use('/devices', deviceRoutes);

// ✅ 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// ✅ Server start
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`🚀 IoTManagement Service running at http://localhost:${PORT}`);
});
