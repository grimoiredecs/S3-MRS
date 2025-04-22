const repository = require('../persistence/bookingRepository');
const roomRepository = require('../persistence/roomRepository'); // Import room repository
const axios = require('axios');

// 🔐 Verify student by calling StudentManagement
const verifyStudent = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3001/students/${id}`);
        return res.data;
    } catch {
        throw new Error('Student not found');
    }
};

// 🔐 Verify room by calling RoomManagement and check capacity
const verifyRoom = async (roomId, userNumber, startTime, endTime) => {
    try {
        // Check if room has enough remaining seats
        await roomRepository.checkRoomAvailability(roomId, userNumber);

        // Optionally, verify room availability (status check)
        const res = await axios.get(`http://localhost:3002/rooms/${roomId}`);
        if (res.data.status !== 'available') {
            throw new Error('Room is not available');
        }

        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            throw new Error('Room not found');
        }
        throw new Error('Error verifying room: ' + err.message);
    }
};

// ✅ Create a booking with full validation
const createBooking = async (bookingData) => {
    await verifyStudent(bookingData.userId); // Validate student

    // Check if room has enough seats at the requested time
    await verifyRoom(bookingData.roomId, bookingData.userNumber, bookingData.startTime, bookingData.endTime); // Verify room and capacity

    // Check for conflicting bookings
    const conflict = await repository.getBookingByRoomAndTime(
        bookingData.roomId,
        bookingData.startTime,
        bookingData.endTime,
        bookingData.isPrivate,
        bookingData.userNumber
    );

    if (conflict) {
        throw new Error(
            `⛔ Conflict: Room ${bookingData.roomId} is already booked from ${conflict.startTime.toISOString()} to ${conflict.endTime.toISOString()}`
        );
    }

    // Calculate time difference between current time and booking time
    const currentTime = new Date();
    const bookingStartTime = new Date(bookingData.startTime);
    const timeDiffInMilliseconds = bookingStartTime - currentTime; // Difference in milliseconds

    if (timeDiffInMilliseconds < 0) {
        throw new Error('Cannot book the room for a past time');
    }

    // Deduct remaining seats after booking
    await roomRepository.updateRemainingSeats(bookingData.roomId, bookingData.userNumber);

    // Create the booking
    return await repository.createBooking(bookingData);
};

// 🔍 Get all bookings
const getAllBookings = async () => {
    return await repository.getAllBookings();
};

// 🔍 Query bookings by filter
const queryBookings = async (filters) => {
    return await repository.queryBookings(filters);
};

// 🗑️ Delete a booking
const deleteBooking = async (id) => {
    return await repository.removeBookingById(id);
};

module.exports = {
    createBooking,
    getAllBookings,
    queryBookings,
    deleteBooking
};