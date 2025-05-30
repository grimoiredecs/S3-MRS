// repositories/BookingRepository.js
import Booking from './Booking.js';

const BookingRepository = {
    createBooking: async (bookingData) => {
        const booking = new Booking(bookingData);
        return await booking.save();
    },

    findAll: async () => {
        return await Booking.find().sort({ date: -1 });
    },

    findById: async (id) => {
        return await Booking.findById(id);
    },

    findByUserId: async (userId) => {
        return await Booking.find({ userId });
    },

    cancelBooking: async (id) => {
        return await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    },

    deleteBooking: async (id) => {
        return await Booking.findByIdAndDelete(id);
    },

    isConflict: async (roomId, date, startTime, endTime) => {
        return await Booking.exists({
            roomId,
            date,
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
            status: { $ne: 'cancelled' }
        });
    }
};

export default BookingRepository;