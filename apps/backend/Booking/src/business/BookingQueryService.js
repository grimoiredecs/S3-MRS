const BookingRepo = require('../persistence/bookingRepository');

const BookingQueryService = {
    async getById(id) {
        return await BookingRepo.getBookingById(id);
    },

    async getByUser(userId) {
        return await BookingRepo.getBookingsByUser(userId);
    },

    async getAll() {
        return await BookingRepo.getAllBookings();
    }
};

module.exports = BookingQueryService;
