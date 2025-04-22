
const mongoose = require('mongoose');
const pool = require('../database/postgres');
const axios = require('axios');

// ✅ Booking Schema
const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    userNumber: { type: Number, default: 1 },
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// 🔐 Verify student from StudentManagement
const verifyStudent = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3001/students/${id}`);
        return res.data;
    } catch {
        throw new Error('Student not found');
    }
};

// ✅ Create Booking with conflict checks
const createBooking = async (bookingData) => {
    const client = await pool.connect();
    try {
        const { userId, roomId, startTime, endTime, userNumber } = bookingData;

        // 1. Verify student exists
        await verifyStudent(userId);

        // 2. Prevent overlapping bookings by same student
        const conflict = await Booking.findOne({
            userId,
            $or: [
                {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            ]
        });
        if (conflict) {
            throw new Error('Booking time conflicts with another booking.');
        }

        // 3. Check room availability
        const roomRes = await client.query(
            'SELECT seat_remaining, condition, status FROM rooms WHERE room_id = $1',
            [roomId]
        );

        const room = roomRes.rows[0];
        if (!room) throw new Error('Room not found');
        if (!room.condition) throw new Error('Room is unavailable due to maintenance');
        if (room.seat_remaining < userNumber) {
            throw new Error(`Not enough seats. Required: ${userNumber}, Available: ${room.seat_remaining}`);
        }

        // 4. Create booking
        const booking = new Booking(bookingData);
        const result = await booking.save();

        // 5. Update seat_remaining
        const updatedSeats = Math.max(room.seat_remaining - userNumber, 0);
        await client.query(
            'UPDATE rooms SET seat_remaining = $1 WHERE room_id = $2',
            [updatedSeats, roomId]
        );

        // 6. Mark room unavailable if full
        if (updatedSeats === 0) {
            await client.query(
                "UPDATE rooms SET status = 'unavailable' WHERE room_id = $1",
                [roomId]
            );
        }

        return result;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    createBooking,
    getBookingById: async (id) => await Booking.findById(id),
    getBookingsByUser: async (userId) => await Booking.find({ userId }),
    deleteBooking: async (id) => await Booking.findByIdAndDelete(id)
};
