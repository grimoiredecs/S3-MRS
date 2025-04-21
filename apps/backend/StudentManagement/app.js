const express = require('express');
const app = express();
const studentRoutes = require('./src/presentation/routes/studentRoutes');

// Middleware to parse JSON
app.use(express.json());

// Mount student routes
app.use('/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('👋 Welcome to StudentManagement API');
});


// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 StudentManagement API running at http://localhost:${PORT}`);
});