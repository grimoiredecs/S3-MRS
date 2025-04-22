const express = require("express");
const router = express.Router();
const bookingService = require("../business/bookingService");

// 🌐 Root route to check API status
router.get("/", (req, res) => {
    res.send("📚 Booking Management API is live");
});

// 📥 Create a new booking
router.post("/bookings", async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📃 Get all bookings
router.get("/bookings", async (req, res) => {
    try {
        const allBookings = await bookingService.getAllBookings();
        res.json(allBookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔍 Search bookings by filter
router.get("/bookings/search", async (req, res) => {
    try {
        const filtered = await bookingService.queryBookings(req.query);
        res.json(filtered);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ❌ Delete a booking
router.delete("/bookings/:id", async (req, res) => {
    try {
        const result = await bookingService.deleteBooking(req.params.id);
        res.json({ message: "Booking deleted", result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;