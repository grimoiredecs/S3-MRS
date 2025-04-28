const fetch = require('node-fetch'); // install node-fetch if needed

async function testGetAllBookings() {
    try {
        const response = await fetch('http://localhost:3003/bookings');
        const data = await response.json();

        console.log('✅ API Response:', data);
    } catch (err) {
        console.error('❌ API Test failed:', err.message);
    }
}

testGetAllBookings();
