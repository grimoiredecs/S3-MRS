const Booking = require("../database/models/booking");

module.exports = {
    createBooking: async (data) => await Booking.create(data),
    getAllBookings: async () => await Booking.find(),
    getBookingByRoomAndTime: async (roomId, startTime, endTime) =>
        await Booking.findOne({
            roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        }),
    removeBookingById: async (id) => await Booking.removeById(id),
    queryBookings: async (filters) => await Booking.queryBookings(filters),
};