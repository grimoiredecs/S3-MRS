// models/Booking.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookingSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 }, // Custom UUID-based ID
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema, 'bookings');