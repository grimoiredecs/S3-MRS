const axios = require('axios');

const testBooking = {
    userId: '2258410', // replace with a real student ID in StudentManagement
    roomId: '501-A4',   // replace with a real room ID in RoomManagement
    startTime: '2025-04-23T08:00:00.000Z',
    endTime: '2025-04-23T09:30:00.000Z',
    userNumber: 4,
    isPrivate: false
};

(async () => {
    try {
        console.log(JSON.stringify(testBooking));
        const res = await axios.post('http://localhost:3000/api/bookings', testBooking);
        console.log('✅ Booking created successfully:', res.data);
    } catch (err) {
        console.error('❌ Booking creation failed:', err.response?.data || err.message);
    }
})();