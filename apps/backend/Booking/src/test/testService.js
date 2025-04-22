require('dotenv').config();
const connectMongo = require('../database/mongo');
const pool = require('../database/postgres');

const BookingQueryService = require('../business/BookingQueryService');
const BookingCommandService = require('../business/BookingEditService');

(async () => {
    try {
        // 🔌 Connect to MongoDB and PostgreSQL
        await connectMongo();
        await pool.connect();

        // ✅ Test data
        const testBooking = {
            userId: '2156854',   // Make sure this exists in StudentManagement!
            roomId: '601-A1',
            startTime: new Date(),
            endTime: new Date(Date.now() + 60 * 60 * 1000), // +1 hour
            userNumber: 2
        };

        // 🧪 Create
        const created = await BookingCommandService.create(testBooking);
        console.log('✅ Created booking:', created);

        // 🧪 Get by ID
        const fetched = await BookingQueryService.getById(created._id);
        console.log('📦 Booking fetched:', fetched);

        // 🧪 Get all by user
        const userBookings = await BookingQueryService.getByUser(testBooking.userId);
        console.log('📚 All bookings for user:', userBookings.length);

        // 🧪 Delete
        const deleted = await BookingCommandService.delete(created._id);
        console.log('🗑️ Deleted booking:', deleted);

        process.exit(0);
    } catch (err) {
        console.error('❌ Test failed:', err.message);
        process.exit(1);
    }
})();