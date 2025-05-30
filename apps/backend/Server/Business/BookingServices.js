// services/BookingService.js
import BookingRepository from '../Persistence/BookingRepository.js';

const BookingService = {
    createBooking: async (data) => {
        const { roomId, date, startTime, endTime } = data;

        const hasConflict = await BookingRepository.isConflict(roomId, date, startTime, endTime);
        if (hasConflict) throw new Error('Time slot already booked');

        return await BookingRepository.createBooking(data);
    },

    cancelBooking: async (id) => {
        return await BookingRepository.cancelBooking(id);
    },

    deleteBooking: async (id) => {
        return await BookingRepository.deleteBooking(id);
    },

    getAllBookings: async () => {
        return await BookingRepository.findAll();
    },

    getBookingById: async (id) => {
        const booking = await BookingRepository.findById(id);
        if (!booking) throw new Error('Booking not found');
        return booking;
    }
};

export default BookingService;