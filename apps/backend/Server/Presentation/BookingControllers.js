// controllers/BookingController.js
import express from 'express';

/**
 * Creates and returns an Express Router for Booking endpoints.
 * @param {object} bookingService - An instance of BookingService.
 * @returns {express.Router}
 */
function createBookingController(bookingService) {
    if (!bookingService) {
        throw new Error('BookingService must be provided to BookingController.');
    }

    const router = express.Router();

    // POST /bookings
    router.post('/', async (req, res) => {
        try {
            const booking = await bookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (err) {
            res.status(409).json({ error: err.message });
        }
    });

    // GET /bookings
    router.get('/', async (req, res) => {
        try {
            const bookings = await bookingService.getAllBookings();
            res.json(bookings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /bookings/:id
    router.get('/:id', async (req, res) => {
        try {
            const booking = await bookingService.getBookingById(req.params.id);
            res.json(booking);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    });

    // PUT /bookings/cancel/:id
    router.put('/cancel/:id', async (req, res) => {
        try {
            const result = await bookingService.cancelBooking(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // DELETE /bookings/:id
    router.delete('/:id', async (req, res) => {
        try {
            await bookingService.deleteBooking(req.params.id);
            res.status(204).end();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
}

export default createBookingController;