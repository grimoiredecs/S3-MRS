import BookingRepository from '../Persistence/BookingRepository.js';
import { StudentServices } from './StudentServices.js';

const bookingRepo = new BookingRepository();
const studentService = new StudentServices(); // ✅ only use business layer

const BookingService = {
    createBooking: async (data) => {
        const { userId, roomId, date, startTime, endTime } = data;

        // ✅ Call Business Layer to verify student
        const studentExists = await studentService.studentExists(userId);
        if (!studentExists) throw new Error(`Student with ID ${userId} not found`);

        const hasConflict = await bookingRepo.isConflict(roomId, date, startTime, endTime);
        if (hasConflict) throw new Error('Time slot already booked');

        return await bookingRepo.createBooking(data);
    },

    cancelBooking: async (id) => {
        return await bookingRepo.cancelBooking(id);
    },

    deleteBooking: async (id) => {
        return await bookingRepo.deleteBooking(id);
    },

    getAllBookings: async () => {
        return await bookingRepo.findAll();
    },

    getBookingById: async (id) => {
        const booking = await bookingRepo.findById(id);
        if (!booking) throw new Error('Booking not found');
        return booking;
    }
};

export default BookingService;