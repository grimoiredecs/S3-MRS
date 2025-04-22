const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.post('/', controller.createStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;