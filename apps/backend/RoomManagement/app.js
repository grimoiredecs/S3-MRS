const express = require('express');
const app = express();

const roomRoutes = require('./src/presentation/routes/roomRoutes');

app.use(express.json());

app.use('/rooms', roomRoutes);

app.get('/', (req, res) => res.send('👋 RoomManagement API'));
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
