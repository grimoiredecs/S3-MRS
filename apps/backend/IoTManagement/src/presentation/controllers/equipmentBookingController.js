// === presentation/controllers/equipmentBookingController.js ===
const EquipmentBookingService = require('../../business/equipmentBookingService');

const EquipmentBookingController = {
    async create(req, res) {
        try {
            const booking = await EquipmentBookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

module.exports = EquipmentBookingController;
