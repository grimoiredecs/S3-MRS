const Booking = require("../database/models/booking");

module.exports = {
    // ✅ Create a booking
    createBooking: async (data) => {
        return await Booking.create(data);
    },

    // ✅ Get all bookings
    getAllBookings: async () => {
        return await Booking.find();
    },

    // ✅ Get booking by room and time, including private room check and seat availability
    getBookingByRoomAndTime: async (roomId, startTime, endTime, isPrivate, userNumber) => {
        const query = {
            roomId,
            $and: [
                { startTime: { $lt: new Date(endTime) } },
                { endTime: { $gt: new Date(startTime) } }
            ]
        };

        // For private rooms, no other booking should overlap
        if (isPrivate) {
            return await Booking.findOne(query);
        }

        // For non-private rooms, the same overlap check applies
        return await Booking.findOne(query);
    },

    // ✅ Remove a booking by its ID
    removeBookingById: async (id) => {
        return await Booking.removeById(id);
    },

    // ✅ Query bookings with optional filters
    queryBookings: async (filters) => {
        return await Booking.queryBookings(filters);
    },

    // ✅ Check room capacity
    checkRoomCapacity: async (roomId, userNumber) => {
        const room = await Booking.findOne({ roomId });
        if (!room) {
            throw new Error("Room not found");
        }
        if (room.capacity < userNumber) {
            throw new Error(`Room does not have enough seats. Required: ${userNumber}, Available: ${room.capacity}`);
        }
        return room;
    }
};