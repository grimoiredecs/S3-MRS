
const express = require('express');
const router = express.Router();
const BookingController = require('./bookingController');

// GET booking by ID
router.get('/:id', BookingController.getById);

// GET all bookings by user ID
router.get('/user/:userId', BookingController.getByUser);

// POST new booking
router.post('/', BookingController.create);

// DELETE booking by ID
router.delete('/:id', BookingController.delete);

module.exports = router;
