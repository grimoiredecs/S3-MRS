const RoomQueryService = require('../business/RoomQuery');
const BookingQueryService = require('../business/BookingQueryService');
const BookingCommandService = require('../business/BookingEditService');

const BookingController = {
    async getById(req, res) {
        try {
            const booking = await BookingQueryService.getById(req.params.id);
            if (!booking) return res.status(404).json({ message: 'Booking not found' });
            res.json(booking);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getByUser(req, res) {
        try {
            const bookings = await BookingQueryService.getByUser(req.params.userId);
            res.json(bookings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const result = await BookingCommandService.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await BookingCommandService.delete(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAllRooms(req, res) {
        try {
            const rooms = await RoomQueryService.getAllRooms();
            res.json(rooms);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getRoomById(req, res) {
        try {
            const room = await RoomQueryService.getRoomById(req.params.id);
            if (!room) return res.status(404).json({ message: 'Room not found' });
            res.json(room);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAllBookings(req, res) {
        try {
            const bookings = await BookingQueryService.getAll();
            res.json(bookings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = BookingController;
