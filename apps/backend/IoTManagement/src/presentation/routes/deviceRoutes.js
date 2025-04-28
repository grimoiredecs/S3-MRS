const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/DeviceController');

// API Routes
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getById);
router.put('/:id/on', DeviceController.turnOn);
router.put('/:id/off', DeviceController.turnOff);

module.exports = router;
