const express = require('express');
const StaffController = require('../presentation/StaffController');
const router = express.Router();

router.post('/', StaffController.createStaff);
router.get('/', StaffController.listStaff);
router.get('/:id', StaffController.getStaffID);
router.put('/:id', StaffController.updateStaff);
router.delete('/:id', StaffController.deleteStaff);

module.exports = router;