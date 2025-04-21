const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomController');

router.get('/', controller.getAllRooms);
router.get('/:id', controller.getRoomByID);
router.post('/', controller.createRoom);
router.put('/:id/status', controller.updateRoomStatus);
router.put('/:id/condition', controller.updateRoomCondition);
router.get('/:id/equipments', controller.getRoomEquipments);

module.exports = router;