const repository = require('../persistence/bookingRepository');
const eventProducer = require('../events/kafkaProducer');
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

// 🔐 Verify room by calling RoomManagement
const verifyRoom = async (id) => {
    try {
        const res = await axios.get(`http://localhost:3002/rooms/${id}`);
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

// ✅ Create a booking with full validation and event publishing
const createBooking = async (bookingData) => {
    await verifyStudent(bookingData.userId);
    await verifyRoom(bookingData.roomId);

    const conflict = await repository.getBookingByRoomAndTime(
        bookingData.roomId,
        bookingData.startTime,
        bookingData.endTime
    );
    if (conflict) throw new Error('Room already booked for that time');

    const newBooking = await repository.createBooking(bookingData);
    await eventProducer.sendBookingCreatedEvent(newBooking);
    return newBooking;
};

// 🔍 Get all bookings
const getAllBookings = async () => {
    return await repository.getAllBookings();
};

// 🔍 Query bookings by filter
const queryBookings = async (filters) => {
    return await repository.queryBookings(filters);
};

// 🔍 Check for overlap (for internal logic/testing)
const getOverlappingBooking = async (roomId, startTime, endTime) => {
    return await repository.getBookingByRoomAndTime(roomId, startTime, endTime);
};

// 🗑️ Delete a booking
const deleteBooking = async (id) => {
    return await repository.removeBookingById(id);
};

module.exports = {
    createBooking,
    getAllBookings,
    queryBookings,
    getOverlappingBooking,
    deleteBooking
};