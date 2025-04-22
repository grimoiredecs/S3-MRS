const BookingRepo = require('../persistence/bookingRepository');

const BookingCommandService = {
    async create(data) {
        return await BookingRepo.createBooking(data);
    },

    async delete(id) {
        return await BookingRepo.deleteBooking(id);
    }
};

module.exports = BookingCommandService;