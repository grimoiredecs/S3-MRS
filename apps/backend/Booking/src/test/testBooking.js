require('dotenv').config();
const mongoose = require('mongoose');
const connectMongo = require('../database/mongo');
const pool = require('../database/postgres');
const { createBooking, getBookingById } = require('../persistence/bookingRepository');

(async () => {
    try {
        // Connect to MongoDB and PostgreSQL
        await connectMongo();
        await pool.connect();

        // Sample booking data
        const sampleBooking = {
            userId: '2252304',   // MUST be a valid ID in StudentManagement!
            roomId: '102-C6',
            startTime: new Date(),
            endTime: new Date(Date.now() + 2 * 60 *60* 1000), // +2 hours
            userNumber: 3
        };

        const booking = await createBooking(sampleBooking);
        console.log('✅ Booking created:', booking);

        const fetched = await getBookingById(booking._id);
        console.log('📦 Booking fetched:', fetched);

        process.exit(0);
    } catch (err) {
        console.error('❌ Test failed:', err.message);
        process.exit(1);
    }
})();