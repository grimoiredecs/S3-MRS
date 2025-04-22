const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./src/presentation/controller');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/s3mrs-notification', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => res.send('📢 Notification Service is running'));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));