// Persistence/BookingRepository.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const bookingSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
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

const Booking = mongoose.model('Booking', bookingSchema);

class BookingRepository {
    async createBooking(bookingData) {
        const booking = new Booking(bookingData);
        return await booking.save();
    }

    async findAll() {
        return await Booking.find().sort({ date: -1 });
    }

    async findById(id) {
        return await Booking.findById(id);
    }

    async findByUserId(userId) {
        return await Booking.find({ userId });
    }

    async cancelBooking(id) {
        return await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    }

    async deleteBooking(id) {
        return await Booking.findByIdAndDelete(id);
    }

    async isConflict(roomId, date, startTime, endTime) {
        return Booking.exists({
            roomId,
            date,
            startTime: {$lt: endTime},
            endTime: {$gt: startTime},
            status: {$ne: 'cancelled'}
        });
    }
}

export default BookingRepository;