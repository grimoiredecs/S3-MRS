// testBusiness.js
const mongoose = require('mongoose');
require('dotenv').config();
const BookingQueryService = require('./BookingQueryService'); // adjust path if needed

const MONGO_URI = "mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516";

async function test() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Test business service
        const bookings = await BookingQueryService.getAll();
        console.log('✅ Retrieved bookings from Business Layer:', bookings);
    } catch (err) {
        console.error('❌ Test failed:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

test();
