const express = require('express');
const app = express();
const bookingRoutes = require('./src/presentation/bookingRoutes');

const connectMongo = require('./src/database/mongo');
connectMongo(); // ✅ ensure this runs before anything else
const cors = require("cors");
app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('🚀 Booking API is running fine!');
});

// ✅ Room API routes from BookingController
const BookingController = require('./src/presentation/bookingController');
app.get('/rooms', BookingController.getAllRooms);
app.get('/rooms/:id', BookingController.getRoomById);

// ✅ Booking API routes
app.use('/bookings', bookingRoutes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// ✅ Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Booking Service running at http://localhost:${PORT}`);
});
