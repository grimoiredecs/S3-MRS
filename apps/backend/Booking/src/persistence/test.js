// testRepository.js
const mongoose = require('mongoose');
require('dotenv').config(); // if you use .env
const { getAllBookings } = require('./bookingRepository'); // adjust your path
const MONGO_URI ="mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516"


async function test() {
    try {
        // ✅ Connect to MongoDB manually (if not auto-connected yet)
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');

        const bookings = await getAllBookings();
        console.log('✅ Retrieved bookings:', bookings);
    } catch (err) {
        console.error('❌ Test failed:', err.message);
    } finally {
        mongoose.disconnect();
    }
}

test();
