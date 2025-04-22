const express = require('express');
const router = express.Router();
const Controller = require('../controllers/deviceController');

router.get('/', Controller.getAllDevices);
router.get('/:id', Controller.getDeviceById);
router.post('/', Controller.createDevice);
router.put('/:id/status', Controller.updateDeviceStatus);
router.delete('/:id', Controller.deleteDevice);

// Issues
router.post('/issue', Controller.reportIssue);
router.get('/:id/issues', Controller.getIssues);

module.exports = router;