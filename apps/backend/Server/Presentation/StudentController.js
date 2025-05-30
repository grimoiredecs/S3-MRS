import express from 'express';
import { StudentServices } from '../Business/StudentServices.js'; // Adjust the path if needed

/**
 * Creates and returns an Express Router configured for Student-related API endpoints.
 * @param {StudentServices} studentServiceInstance - An instance of StudentServices to use for business logic.
 * @returns {express.Router} The configured Express Router.
 */
function createStudentController(studentServiceInstance) {
    if (!studentServiceInstance) {
        throw new Error('StudentServices instance must be provided to StudentController.');
    }

    const router = express.Router();

    router.get('/:id', async (req, res, next) => {
        try {
            const studentId = parseInt(req.params.id, 10);
            const student = await studentServiceInstance.getStudent(studentId);
            res.json(student);
        } catch (error) {
            if (error.message.includes("Invalid student ID")) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes("not found")) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    });

    router.get('/', async (req, res, next) => {
        try {
            const students = await studentServiceInstance.getAllStudents();
            res.json(students);
        } catch (error) {
            next(error);
        }
    });

    return router;
}

export default createStudentController;