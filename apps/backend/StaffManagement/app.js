const express = require('express');
const app = express();
const staffRoutes = require('./src/presentation/staffRoutes');

app.use(express.json());
app.use('/staff', staffRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`✅ Staff Management microservice running on port ${PORT}`);
});