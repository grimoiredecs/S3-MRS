const express = require('express');
const app = express();
const studentRoutes = require('./src/presentation/routes/studentRoutes');

app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (req, res) => res.send('👋 StudentManagement API'));
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));