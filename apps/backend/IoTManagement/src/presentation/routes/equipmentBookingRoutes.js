// === presentation/routes/equipmentBookingRoutes.js ===
const express = require('express');
const router = express.Router();
const EquipmentBookingController = require('../controllers/equipmentBookingController');

// POST /equipment-bookings
router.post('/', EquipmentBookingController.create);

module.exports = router;

