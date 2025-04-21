const express = require('express');
const app = express();

const studentRoutes = require('./src/presentation/routes/studentRoutes');
const authRoutes = require('./src/presentation/routes/authRoutes');

app.use(express.json());

app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('👋 StudentManagement API'));
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});