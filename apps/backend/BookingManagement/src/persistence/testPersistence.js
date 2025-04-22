const mongoose = require('mongoose');
require('dotenv').config();
const repo = require('./bookingRepository');
MONGO_URI="mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516"

const run = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected');

        // 1. Create booking
        const booking = await repo.createBooking({
            userId: 'student-2250001',
            roomId: '501-A4',
            startTime: new Date('2025-05-02T08:00:00Z'),
            endTime: new Date('2025-05-02T10:00:00Z'),
            userNumber: 3,
            isPrivate: false
        });
        const booking1 = await repo.createBooking({
            userId: '2252304',
            roomId: '501-A4',
            startTime: new Date('2025-05-02T08:00:00Z'),
            endTime: new Date('2025-05-02T10:00:00Z'),
            userNumber: 3,
            isPrivate: false

        })
        console.log('📥 Created:', booking);

        // 2. Query by room and time (should detect overlap)
        const overlapping = await repo.getBookingByRoomAndTime(
            '501-A4',
            new Date('2025-05-02T09:00:00Z'),
            new Date('2025-05-02T11:00:00Z')
        );
        console.log('🔍 Overlapping booking:', overlapping);

        // 3. Query with filters
        const filtered = await repo.queryBookings({ roomId: '501-A4' });
        console.log('🔎 Filtered bookings:', filtered.length);

        // 4. Remove the booking
        const removed = await repo.removeBookingById(booking._id);
        console.log('🗑️ Removed:', removed);

        await mongoose.disconnect();
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
};

run();