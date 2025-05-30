// controllers/BookingController.js
import BookingService from '../Business/BookingServices.js';

const BookingController = {
    createBooking: async (req, res) => {
        try {
            const booking = await BookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (err) {
            res.status(409).json({ error: err.message });
        }
    },

    getAllBookings: async (req, res) => {
        const bookings = await BookingService.getAllBookings();
        res.json(bookings);
    },

    getBookingById: async (req, res) => {
        try {
            const booking = await BookingService.getBookingById(req.params.id);
            res.json(booking);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    cancelBooking: async (req, res) => {
        const result = await BookingService.cancelBooking(req.params.id);
        res.json(result);
    },

    deleteBooking: async (req, res) => {
        await BookingService.deleteBooking(req.params.id);
        res.status(204).end();
    }
};

export default BookingController;