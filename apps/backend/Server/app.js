// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import controllers
import createBookingController from './Presentation/BookingControllers.js';
import createStudentController from './Presentation/StudentController.js';
import createRoomController from './Presentation/RoomController.js';

// Import services
import BookingService from './Business/BookingServices.js';
import {StudentServices} from './Business/StudentServices.js';
import {RoomServices} from './Business/RoomServices.js';

// Connect to MongoDB or PostgreSQL if needed
import connectDB from './database/mongodb.js'; // optional, for MongoDB

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
await connectDB(); // Comment out if using PostgreSQL only

// Routes
app.use('/api/bookings', createBookingController(BookingService));
app.use('/api/students', createStudentController(new StudentServices()));
app.use('/api/rooms', createRoomController(new RoomServices()));

// Root route
app.get('/', (req, res) => {
    res.send('S3-MRS Unified Backend API is running 🚀');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;