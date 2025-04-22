const express = require('express');
const app = express();
const deviceRoutes = require('./src/presentation/routes/deviceRoutes');

app.use(express.json());
app.use('/devices', deviceRoutes);

app.get('/', (req, res) => res.send('🚀 IoT Device Management Service'));
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

app.listen(3010, () => console.log(`IoT Device Service running on http://localhost:3010`));