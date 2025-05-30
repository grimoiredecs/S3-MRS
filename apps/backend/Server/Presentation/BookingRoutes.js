// routes/booking.js
import express from 'express';
import BookingController from './BookingControllers.js';

const router = express.Router();

// Create a new booking
router.post('/', BookingController.createBooking);

// Get all bookings
router.get('/', BookingController.getAllBookings);

// Get a specific booking by ID
router.get('/:id', BookingController.getBookingById);

// Cancel a booking by ID
router.put('/:id/cancel', BookingController.cancelBooking);

// Delete a booking by ID
router.delete('/:id', BookingController.deleteBooking);

export default router;