const mongoose = require('mongoose');
require('dotenv').config();
const Booking = require('./booking');

const MONGODB_URI = "mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516";

(async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        const booking = new Booking({
            userId: '2451234',
            roomId: '501-A4',
            startTime: new Date('2025-05-01T08:00:00Z'),
            endTime: new Date('2025-05-01T10:00:00Z'),
            userNumber: 2,
            isPrivate: true
        });

        const result = await booking.save();
        console.log('📥 Booking saved:', result);

        await mongoose.disconnect();
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
})();