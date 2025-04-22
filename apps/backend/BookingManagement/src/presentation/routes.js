const express = require("express");
const router = express.Router();
const bookingService = require("../business/bookingService");

router.post("/bookings", async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/bookings", async (req, res) => {
    const all = await bookingService.getAll();
    res.json(all);
});

module.exports = router;